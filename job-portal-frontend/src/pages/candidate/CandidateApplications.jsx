import { useEffect, useState } from 'react'
import { getMyApplications } from '../../api/candidateApi'
import { extractErrorMessage } from '../../api/axiosClient'
import Pagination from '../../components/Pagination'
import StatusMessage from '../../components/StatusMessage'

export default function CandidateApplications() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)

  const load = async (pageToLoad) => {
    setError(null)
    try {
      const { data } = await getMyApplications({ page: pageToLoad, size: 10 })
      setResult(data)
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  useEffect(() => { load(0) }, [])

  const handlePageChange = (newPage) => {
    setPage(newPage)
    load(newPage)
  }

  return (
    <div className="page">
      <h2>My Applications</h2>
      <StatusMessage type="error" message={error} />

      {!result && !error && <p>Loading...</p>}
      {result && result.content.length === 0 && <p>No applications submitted yet.</p>}

      {result && result.content.length > 0 && (
        <>
          <table className="data-table">
            <thead>
              <tr>
                <th>Job</th>
                <th>Company</th>
                <th>Resume</th>
                <th>Status</th>
                <th>Applied At</th>
                <th>Recruiter Remarks</th>
              </tr>
            </thead>
            <tbody>
              {result.content.map((app) => (
                <tr key={app.id}>
                  <td>{app.jobTitle}</td>
                  <td>{app.companyName}</td>
                  <td>{app.resumeFileName || '-'}</td>
                  <td>{app.status}</td>
                  <td>{app.appliedAt}</td>
                  <td>{app.recruiterRemarks || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            pageNumber={result.pageNumber}
            totalPages={result.totalPages}
            first={result.first}
            last={result.last}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}
