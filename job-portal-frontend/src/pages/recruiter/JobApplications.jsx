import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getApplicationsForJob, downloadCandidateResume } from '../../api/recruiterApi'
import { updateApplicationStatus } from '../../api/applicationApi'
import { extractErrorMessage } from '../../api/axiosClient'
import Pagination from '../../components/Pagination'
import StatusMessage from '../../components/StatusMessage'

const STATUSES = ['APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW', 'SELECTED', 'REJECTED']

export default function JobApplications() {
  const { jobId } = useParams()
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  // Per-row pending edits: { [applicationId]: { status, recruiterRemarks } }
  const [edits, setEdits] = useState({})

  const load = async (pageToLoad = 0) => {
    setError(null)
    try {
      const { data } = await getApplicationsForJob(jobId, { page: pageToLoad, size: 10 })
      setResult(data)
      const initialEdits = {}
      data.content.forEach((app) => {
        initialEdits[app.id] = { status: app.status, recruiterRemarks: app.recruiterRemarks || '' }
      })
      setEdits(initialEdits)
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  useEffect(() => { load(0) }, [jobId])

  const handleEditChange = (appId, field, value) => {
    setEdits({ ...edits, [appId]: { ...edits[appId], [field]: value } })
  }

  const handleUpdateStatus = async (appId) => {
    setError(null)
    setSuccess(null)
    try {
      await updateApplicationStatus(appId, edits[appId])
      setSuccess('Application status updated.')
      load(result?.pageNumber || 0)
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  const handleDownloadResume = async (resumeId, fileName) => {
    setError(null)
    try {
      const response = await downloadCandidateResume(resumeId)
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.download = fileName || 'resume.pdf'
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  return (
    <div className="page">
      <h2>Applications</h2>
      <StatusMessage type="error" message={error} />
      <StatusMessage type="success" message={success} />

      {!result && !error && <p>Loading...</p>}
      {result && result.content.length === 0 && <p>No applications for this job yet.</p>}

      {result && result.content.length > 0 && (
        <>
          <table className="data-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Resume</th>
                <th>Applied At</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {result.content.map((app) => (
                <tr key={app.id}>
                  <td>{app.candidateName}<br /><small>{app.candidateEmail}</small></td>
                  <td>
                    {app.resumeId ? (
                      <button className="link-button" onClick={() => handleDownloadResume(app.resumeId, app.resumeFileName)}>
                        {app.resumeFileName || 'Download'}
                      </button>
                    ) : '-'}
                  </td>
                  <td>{app.appliedAt}</td>
                  <td>
                    <select
                      value={edits[app.id]?.status || app.status}
                      onChange={(e) => handleEditChange(app.id, 'status', e.target.value)}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <input
                      value={edits[app.id]?.recruiterRemarks || ''}
                      onChange={(e) => handleEditChange(app.id, 'recruiterRemarks', e.target.value)}
                      maxLength={1000}
                    />
                  </td>
                  <td>
                    <button className="btn btn-secondary" onClick={() => handleUpdateStatus(app.id)}>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            pageNumber={result.pageNumber}
            totalPages={result.totalPages}
            first={result.first}
            last={result.last}
            onPageChange={load}
          />
        </>
      )}
    </div>
  )
}
