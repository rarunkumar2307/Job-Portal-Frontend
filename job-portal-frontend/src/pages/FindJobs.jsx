import { useEffect, useState } from 'react'
import { searchJobs } from '../api/jobApi'
import { extractErrorMessage } from '../api/axiosClient'
import JobCard from '../components/JobCard'
import Pagination from '../components/Pagination'
import StatusMessage from '../components/StatusMessage'

// Filters map 1:1 to JobController's real @RequestParam list:
// keyword, location, employmentType, experience, page, size, sort.
// (status isn't exposed as a public filter here - GET /api/jobs defaults to
// ACTIVE jobs on the backend when status is omitted.)
const EMPLOYMENT_TYPES = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP']

export default function FindJobs() {
  const [filters, setFilters] = useState({ keyword: '', location: '', employmentType: '', experience: '' })
  const [page, setPage] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchJobs = async (pageToLoad = page) => {
    setLoading(true)
    setError(null)
    try {
      const params = { page: pageToLoad, size: 10 }
      if (filters.keyword) params.keyword = filters.keyword
      if (filters.location) params.location = filters.location
      if (filters.employmentType) params.employmentType = filters.employmentType
      if (filters.experience) params.experience = filters.experience

      const { data } = await searchJobs(params)
      setResult(data)
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value })

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(0)
    fetchJobs(0)
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    fetchJobs(newPage)
  }

  return (
    <div className="page">
      <h2>Find Jobs</h2>

      <form onSubmit={handleSearch} className="filter-form">
        <input
          name="keyword"
          placeholder="Keyword (title/company/description)"
          value={filters.keyword}
          onChange={handleFilterChange}
        />
        <input
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <select name="employmentType" value={filters.employmentType} onChange={handleFilterChange}>
          <option value="">Any employment type</option>
          {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <input
          name="experience"
          type="number"
          min="0"
          placeholder="Max experience (yrs)"
          value={filters.experience}
          onChange={handleFilterChange}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      <StatusMessage type="error" message={error} />

      {loading && <p>Loading jobs...</p>}

      {!loading && result && result.content.length === 0 && <p>No jobs available.</p>}

      {!loading && result && result.content.length > 0 && (
        <>
          <div className="job-list">
            {result.content.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
          <Pagination
            pageNumber={result.pageNumber}
            totalPages={result.totalPages}
            first={result.first}
            last={result.last}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}
