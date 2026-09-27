import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../api/authApi'
import { extractErrorMessage } from '../api/axiosClient'
import StatusMessage from '../components/StatusMessage'

// Fields match RegisterRequest exactly: name, email, password, role.
// Role is CANDIDATE or RECRUITER only - ADMIN is never self-registerable
// (there is no backend support for it).
export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'CANDIDATE' })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSubmitting(true)
    try {
      const { data } = await register(form)
      setSuccess(`Account created for ${data.email}. Redirecting to login...`)
      setTimeout(() => navigate('/login'), 1200)
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page auth-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required minLength={2} maxLength={100} />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} maxLength={50} />
        </label>
        <label>
          Role
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="CANDIDATE">Candidate</option>
            <option value="RECRUITER">Recruiter</option>
          </select>
        </label>

        <StatusMessage type="error" message={error} />
        <StatusMessage type="success" message={success} />

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}
