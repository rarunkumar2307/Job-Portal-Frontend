import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllJobsAdmin, deleteJobAdmin } from '../../api/adminApi'
import { extractErrorMessage } from '../../api/axiosClient'
import Pagination from '../../components/Pagination'
import StatusMessage from '../../components/StatusMessage'

export default function AdminJobs() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const load = async (pageToLoad = 0) => {
    setError(null)
    try {
      const { data } = await getAllJobsAdmin({ page: pageToLoad, size: 10 })
      setResult(data)
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  useEffect(() => { load(0) }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job listing?')) return
    setError(null)
    setSuccess(null)
    try {
      await deleteJobAdmin(id)
      setSuccess('Job deleted.')
      load(result?.pageNumber || 0)
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  return (
    <div className="page">
      <h2>All Jobs</h2>
      <StatusMessage type="error" message={error} />
      <StatusMessage type="success" message={success} />

      {!result && !error && <p>Loading...</p>}
      {result && result.content.length === 0 && <p>No jobs found.</p>}

      {result && result.content.length > 0 && (
        <>
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Recruiter</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {result.content.map((job) => (
                <tr key={job.id}>
                  <td><Link to={`/jobs/${job.id}`}>{job.title}</Link></td>
                  <td>{job.company}</td>
                  <td>{job.recruiterName}</td>
                  <td>{job.location}</td>
                  <td>{job.status}</td>
                  <td>
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
