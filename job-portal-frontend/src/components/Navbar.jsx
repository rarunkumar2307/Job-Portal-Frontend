import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { auth, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand">Job Portal</Link>
      <nav className="nav-links">
        <Link to="/jobs">Find Jobs</Link>

        {!auth && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {auth && auth.role === 'CANDIDATE' && (
          <>
            <Link to="/candidate/profile">My Profile</Link>
            <Link to="/candidate/resume">Resume</Link>
            <Link to="/candidate/applications">My Applications</Link>
          </>
        )}

        {auth && auth.role === 'RECRUITER' && (
          <>
            <Link to="/recruiter/profile">Company Profile</Link>
            <Link to="/recruiter/jobs">My Jobs</Link>
            <Link to="/recruiter/jobs/new">Post a Job</Link>
          </>
        )}

        {auth && auth.role === 'ADMIN' && (
          <>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/jobs">Jobs</Link>
            <Link to="/admin/applications">Applications</Link>
          </>
        )}

        {auth && (
          <span className="nav-user">
            {auth.name} ({auth.role})
            <button className="link-button" onClick={handleLogout}>Logout</button>
          </span>
        )}
      </nav>
    </header>
  )
}
