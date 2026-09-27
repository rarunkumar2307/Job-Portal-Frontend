import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createJob } from '../../api/recruiterApi'
import { extractErrorMessage } from '../../api/axiosClient'
import StatusMessage from '../../components/StatusMessage'

const EMPLOYMENT_TYPES = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP']

const emptyForm = {
  title: '', description: '', company: '', location: '',
  employmentType: 'FULL_TIME', experienceRequired: '', salaryMin: '', salaryMax: ''
}

// Field set matches CreateJobRequest exactly.
export default function PostJob() {
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const payload = {
        ...form,
        experienceRequired: form.experienceRequired === '' ? null : Number(form.experienceRequired),
        salaryMin: form.salaryMin === '' ? null : Number(form.salaryMin),
        salaryMax: form.salaryMax === '' ? null : Number(form.salaryMax)
      }
      const { data } = await createJob(payload)
      navigate(`/jobs/${data.id}`)
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page">
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required maxLength={150} />
        </label>
        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} required maxLength={3000} rows={5} />
        </label>
        <label>
          Company
          <input name="company" value={form.company} onChange={handleChange} required maxLength={150} />
        </label>
        <label>
          Location
          <input name="location" value={form.location} onChange={handleChange} required maxLength={100} />
        </label>
        <label>
          Employment Type
          <select name="employmentType" value={form.employmentType} onChange={handleChange}>
            {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label>
          Experience Required (years)
          <input type="number" min="0" name="experienceRequired" value={form.experienceRequired} onChange={handleChange} required />
        </label>
        <label>
          Salary Min
          <input type="number" min="0" name="salaryMin" value={form.salaryMin} onChange={handleChange} />
        </label>
        <label>
          Salary Max
          <input type="number" min="0" name="salaryMax" value={form.salaryMax} onChange={handleChange} />
        </label>

        <StatusMessage type="error" message={error} />

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  )
}
