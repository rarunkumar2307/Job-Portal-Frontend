import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="page home-page">
      <h1>Job Portal</h1>
      <p className="tagline">
        A simple recruitment platform connecting candidates and recruiters -
        search jobs, apply with your resume, and manage postings, all backed
        by a real Spring Boot + Oracle backend.
      </p>
      <div className="home-actions">
        <Link to="/jobs" className="btn btn-primary">Find Jobs</Link>
        <Link to="/login" className="btn btn-secondary">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
      </div>
    </div>
  )
}
