import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getJobById } from '../../api/jobApi'
import { updateJob } from '../../api/recruiterApi'
import { extractErrorMessage } from '../../api/axiosClient'
import StatusMessage from '../../components/StatusMessage'

const EMPLOYMENT_TYPES = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP']
const JOB_STATUSES = ['ACTIVE', 'CLOSED', 'EXPIRED']

// Field set matches UpdateJobRequest - every field is optional on the
// backend, but we send the current values back so nothing is unintentionally
// cleared.
export default function EditJob() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getJobById(id)
      .then(({ data }) => setForm({
        title: data.title,
        description: data.description,
        company: data.company,
        location: data.location,
        employmentType: data.employmentType,
        experienceRequired: data.experienceRequired ?? '',
        salaryMin: data.salaryMin ?? '',
        salaryMax: data.salaryMax ?? '',
        status: data.status
      }))
      .catch((err) => setError(extractErrorMessage(err)))
  }, [id])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      const payload = {
        ...form,
        experienceRequired: form.experienceRequired === '' ? null : Number(form.experienceRequired),
        salaryMin: form.salaryMin === '' ? null : Number(form.salaryMin),
        salaryMax: form.salaryMax === '' ? null : Number(form.salaryMax)
      }
      await updateJob(id, payload)
      navigate('/recruiter/jobs')
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  if (!form) {
    return <div className="page"><StatusMessage type="error" message={error} />{!error && <p>Loading...</p>}</div>
  }

  return (
    <div className="page">
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} maxLength={150} />
        </label>
        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} maxLength={3000} rows={5} />
        </label>
        <label>
          Company
          <input name="company" value={form.company} onChange={handleChange} maxLength={150} />
        </label>
        <label>
          Location
          <input name="location" value={form.location} onChange={handleChange} maxLength={100} />
        </label>
        <label>
          Employment Type
          <select name="employmentType" value={form.employmentType} onChange={handleChange}>
            {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label>
          Experience Required (years)
          <input type="number" min="0" name="experienceRequired" value={form.experienceRequired} onChange={handleChange} />
        </label>
        <label>
          Salary Min
          <input type="number" min="0" name="salaryMin" value={form.salaryMin} onChange={handleChange} />
        </label>
        <label>
          Salary Max
          <input type="number" min="0" name="salaryMax" value={form.salaryMax} onChange={handleChange} />
        </label>
        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            {JOB_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>

        <StatusMessage type="error" message={error} />

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
