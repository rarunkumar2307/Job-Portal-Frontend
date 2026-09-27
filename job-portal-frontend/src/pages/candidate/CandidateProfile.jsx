import { useEffect, useState } from 'react'
import { getCandidateProfile, updateCandidateProfile } from '../../api/candidateApi'
import { extractErrorMessage } from '../../api/axiosClient'
import StatusMessage from '../../components/StatusMessage'

// Only fields CandidateProfileRequest accepts are editable:
// phone, location, experience, skills, education, profileSummary.
// name/email come from the User account and aren't part of this API.
export default function CandidateProfile() {
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [saving, setSaving] = useState(false)

  const loadProfile = async () => {
    setError(null)
    try {
      const { data } = await getCandidateProfile()
      setProfile(data)
      setForm({
        phone: data.phone || '',
        location: data.location || '',
        experience: data.experience ?? '',
        skills: data.skills || '',
        education: data.education || '',
        profileSummary: data.profileSummary || ''
      })
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  useEffect(() => { loadProfile() }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSaving(true)
    try {
      const payload = { ...form, experience: form.experience === '' ? null : Number(form.experience) }
      const { data } = await updateCandidateProfile(payload)
      setProfile(data)
      setSuccess('Profile updated.')
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
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} maxLength={20} />
        </label>
        <label>
          Location
          <input name="location" value={form.location} onChange={handleChange} maxLength={100} />
        </label>
        <label>
          Experience (years)
          <input type="number" min="0" name="experience" value={form.experience} onChange={handleChange} />
        </label>
        <label>
          Skills
          <input name="skills" value={form.skills} onChange={handleChange} maxLength={500} />
        </label>
        <label>
          Education
          <input name="education" value={form.education} onChange={handleChange} maxLength={255} />
        </label>
        <label>
          Profile Summary
          <textarea name="profileSummary" value={form.profileSummary} onChange={handleChange} maxLength={2000} rows={4} />
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
