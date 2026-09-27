import { useEffect, useState } from 'react'
import { getAllApplicationsAdmin } from '../../api/adminApi'
import { extractErrorMessage } from '../../api/axiosClient'
import Pagination from '../../components/Pagination'
import StatusMessage from '../../components/StatusMessage'

// View-only: the backend has no admin endpoint for changing application
// status (only recruiters can, via PUT /api/applications/{id}/status), so
// no action buttons are shown here.
export default function AdminApplications() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const load = async (pageToLoad = 0) => {
    setError(null)
    try {
      const { data } = await getAllApplicationsAdmin({ page: pageToLoad, size: 10 })
      setResult(data)
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  useEffect(() => { load(0) }, [])

  return (
    <div className="page">
      <h2>All Applications</h2>
      <StatusMessage type="error" message={error} />

      {!result && !error && <p>Loading...</p>}
      {result && result.content.length === 0 && <p>No applications found.</p>}

      {result && result.content.length > 0 && (
        <>
          <table className="data-table">
            <thead>
              <tr>
                <th>Job</th>
                <th>Company</th>
                <th>Candidate</th>
                <th>Status</th>
                <th>Applied At</th>
              </tr>
            </thead>
            <tbody>
              {result.content.map((app) => (
                <tr key={app.id}>
                  <td>{app.jobTitle}</td>
                  <td>{app.companyName}</td>
                  <td>{app.candidateName}</td>
                  <td>{app.status}</td>
                  <td>{app.appliedAt}</td>
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
