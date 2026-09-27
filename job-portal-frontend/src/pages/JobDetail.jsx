import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getJobById } from '../api/jobApi'
import { applyForJob } from '../api/applicationApi'
import { extractErrorMessage } from '../api/axiosClient'
import { useAuth } from '../context/AuthContext'
import StatusMessage from '../components/StatusMessage'

export default function JobDetail() {
  const { id } = useParams()
  const { auth } = useAuth()
  const [job, setJob] = useState(null)
  const [error, setError] = useState(null)
  const [applyError, setApplyError] = useState(null)
  const [applySuccess, setApplySuccess] = useState(null)
  const [candidateNote, setCandidateNote] = useState('')
  const [applying, setApplying] = useState(false)

  useEffect(() => {
    getJobById(id)
      .then(({ data }) => setJob(data))
      .catch((err) => setError(extractErrorMessage(err)))
  }, [id])

  const handleApply = async (e) => {
    e.preventDefault()
    setApplyError(null)
    setApplySuccess(null)
    setApplying(true)
    try {
      await applyForJob(id, candidateNote)
      setApplySuccess('Application submitted successfully.')
    } catch (err) {
      setApplyError(extractErrorMessage(err))
    } finally {
      setApplying(false)
    }
  }

  if (error) return <div className="page"><StatusMessage type="error" message={error} /></div>
  if (!job) return <div className="page"><p>Loading...</p></div>

  return (
    <div className="page">
      <h2>{job.title}</h2>
      <p className="job-meta">{job.company} &middot; {job.location} &middot; {job.employmentType}</p>
      <p className="job-meta">Experience required: {job.experienceRequired ?? 'N/A'} yrs</p>
      {job.salaryMin != null && job.salaryMax != null && (
        <p className="job-meta">Salary: {job.salaryMin} - {job.salaryMax}</p>
      )}
      <p className="job-status">Status: {job.status}</p>
      <div className="job-description">{job.description}</div>

      {auth && auth.role === 'CANDIDATE' && (
        <form onSubmit={handleApply} className="form apply-form">
          <label>
            Note to recruiter (optional)
            <textarea
              value={candidateNote}
              onChange={(e) => setCandidateNote(e.target.value)}
              maxLength={500}
              rows={3}
            />
          </label>
          <StatusMessage type="error" message={applyError} />
          <StatusMessage type="success" message={applySuccess} />
          <button type="submit" className="btn btn-primary" disabled={applying}>
            {applying ? 'Applying...' : 'Apply for this job'}
          </button>
        </form>
      )}

      {!auth && <p>Please <a href="/login">login</a> as a candidate to apply.</p>}
      {auth && auth.role !== 'CANDIDATE' && (
        <p>Only candidate accounts can apply for jobs.</p>
      )}
    </div>
  )
}
