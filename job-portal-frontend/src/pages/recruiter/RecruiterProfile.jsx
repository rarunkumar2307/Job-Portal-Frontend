import { useEffect, useState } from 'react'
import { getRecruiterProfile, updateRecruiterProfile } from '../../api/recruiterApi'
import { extractErrorMessage } from '../../api/axiosClient'
import StatusMessage from '../../components/StatusMessage'

export default function RecruiterProfile() {
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setError(null)
    try {
      const { data } = await getRecruiterProfile()
      setProfile(data)
      setForm({
        companyName: data.companyName || '',
        companyDescription: data.companyDescription || '',
        companyLocation: data.companyLocation || ''
      })
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  useEffect(() => { load() }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSaving(true)
    try {
      const { data } = await updateRecruiterProfile(form)
      setProfile(data)
      setSuccess('Company profile updated.')
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  if (!profile || !form) {
    return <div className="page"><StatusMessage type="error" message={error} />{!error && <p>Loading...</p>}</div>
  }

  return (
    <div className="page">
      <h2>Company Profile</h2>
      <p><strong>Recruiter:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Company Name
          <input name="companyName" value={form.companyName} onChange={handleChange} required maxLength={150} />
        </label>
        <label>
          Company Description
          <textarea name="companyDescription" value={form.companyDescription} onChange={handleChange} maxLength={2000} rows={4} />
        </label>
        <label>
          Company Location
          <input name="companyLocation" value={form.companyLocation} onChange={handleChange} maxLength={150} />
        </label>

        <StatusMessage type="error" message={error} />
        <StatusMessage type="success" message={success} />

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  )
}
