import { useEffect, useState } from 'react'
import { getAllUsers, updateUserStatus } from '../../api/adminApi'
import { extractErrorMessage } from '../../api/axiosClient'
import Pagination from '../../components/Pagination'
import StatusMessage from '../../components/StatusMessage'

export default function AdminUsers() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const load = async (pageToLoad = 0) => {
    setError(null)
    try {
      const { data } = await getAllUsers({ page: pageToLoad, size: 10 })
      setResult(data)
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  useEffect(() => { load(0) }, [])

  const handleToggle = async (user) => {
    setError(null)
    setSuccess(null)
    try {
      await updateUserStatus(user.id, !user.enabled)
      setSuccess(`${user.email} is now ${!user.enabled ? 'enabled' : 'disabled'}.`)
      load(result?.pageNumber || 0)
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  return (
    <div className="page">
      <h2>Users</h2>
      <StatusMessage type="error" message={error} />
      <StatusMessage type="success" message={success} />

      {!result && !error && <p>Loading...</p>}
      {result && result.content.length === 0 && <p>No users found.</p>}

      {result && result.content.length > 0 && (
        <>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Enabled</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {result.content.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.enabled ? 'Yes' : 'No'}</td>
                  <td>{u.createdAt}</td>
                  <td>
                    <button className="btn btn-secondary" onClick={() => handleToggle(u)}>
                      {u.enabled ? 'Disable' : 'Enable'}
                    </button>
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
