import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyJobs, deleteJob } from '../../api/recruiterApi'
import { extractErrorMessage } from '../../api/axiosClient'
import Pagination from '../../components/Pagination'
import StatusMessage from '../../components/StatusMessage'

export default function MyJobs() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const load = async (pageToLoad = 0) => {
    setError(null)
    try {
      const { data } = await getMyJobs({ page: pageToLoad, size: 10 })
      setResult(data)
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  useEffect(() => { load(0) }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job listing? This cannot be undone.')) return
    setError(null)
    setSuccess(null)
    try {
      await deleteJob(id)
      setSuccess('Job deleted.')
      load(result?.pageNumber || 0)
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  return (
    <div className="page">
      <h2>My Jobs</h2>
      <p><Link to="/recruiter/jobs/new" className="btn btn-primary">Post a New Job</Link></p>

      <StatusMessage type="error" message={error} />
      <StatusMessage type="success" message={success} />

      {!result && !error && <p>Loading...</p>}
      {result && result.content.length === 0 && <p>You haven't posted any jobs yet.</p>}

      {result && result.content.length > 0 && (
        <>
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {result.content.map((job) => (
                <tr key={job.id}>
                  <td><Link to={`/jobs/${job.id}`}>{job.title}</Link></td>
                  <td>{job.location}</td>
                  <td>{job.employmentType}</td>
                  <td>{job.status}</td>
                  <td className="actions-cell">
                    <Link to={`/recruiter/jobs/${job.id}/edit`}>Edit</Link>
                    {' | '}
                    <Link to={`/recruiter/jobs/${job.id}/applications`}>Applications</Link>
                    {' | '}
                    <button className="link-button" onClick={() => handleDelete(job.id)}>Delete</button>
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
