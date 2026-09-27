import { Link } from 'react-router-dom'

export default function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3><Link to={`/jobs/${job.id}`}>{job.title}</Link></h3>
      <p className="job-meta">{job.company} &middot; {job.location} &middot; {job.employmentType}</p>
      <p className="job-meta">
        Experience required: {job.experienceRequired ?? 'N/A'} yrs
        {job.salaryMin != null && job.salaryMax != null && (
          <> &middot; Salary: {job.salaryMin} - {job.salaryMax}</>
        )}
      </p>
      <p className="job-status">Status: {job.status}</p>
    </div>
  )
}
