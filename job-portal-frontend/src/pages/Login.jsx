import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login as loginApi } from '../api/authApi'
import { extractErrorMessage } from '../api/axiosClient'
import { useAuth } from '../context/AuthContext'
import StatusMessage from '../components/StatusMessage'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const { data } = await loginApi(form)
      login(data) // data = AuthResponse { token, userId, name, email, role }
      if (data.role === 'CANDIDATE') navigate('/candidate/profile')
      else if (data.role === 'RECRUITER') navigate('/recruiter/profile')
      else if (data.role === 'ADMIN') navigate('/admin/users')
      else navigate('/')
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>

        <StatusMessage type="error" message={error} />

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>No account yet? <Link to="/register">Register</Link></p>
    </div>
  )
}
