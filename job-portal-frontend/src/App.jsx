import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import FindJobs from './pages/FindJobs'
import JobDetail from './pages/JobDetail'

import CandidateProfile from './pages/candidate/CandidateProfile'
import CandidateResume from './pages/candidate/CandidateResume'
import CandidateApplications from './pages/candidate/CandidateApplications'

import RecruiterProfile from './pages/recruiter/RecruiterProfile'
import PostJob from './pages/recruiter/PostJob'
import MyJobs from './pages/recruiter/MyJobs'
import EditJob from './pages/recruiter/EditJob'
import JobApplications from './pages/recruiter/JobApplications'

import AdminUsers from './pages/admin/AdminUsers'
import AdminJobs from './pages/admin/AdminJobs'
import AdminApplications from './pages/admin/AdminApplications'

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<FindJobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />

          <Route path="/candidate/profile" element={
            <ProtectedRoute role="CANDIDATE"><CandidateProfile /></ProtectedRoute>
          } />
          <Route path="/candidate/resume" element={
            <ProtectedRoute role="CANDIDATE"><CandidateResume /></ProtectedRoute>
          } />
          <Route path="/candidate/applications" element={
            <ProtectedRoute role="CANDIDATE"><CandidateApplications /></ProtectedRoute>
          } />

          <Route path="/recruiter/profile" element={
            <ProtectedRoute role="RECRUITER"><RecruiterProfile /></ProtectedRoute>
          } />
          <Route path="/recruiter/jobs" element={
            <ProtectedRoute role="RECRUITER"><MyJobs /></ProtectedRoute>
          } />
          <Route path="/recruiter/jobs/new" element={
            <ProtectedRoute role="RECRUITER"><PostJob /></ProtectedRoute>
          } />
          <Route path="/recruiter/jobs/:id/edit" element={
            <ProtectedRoute role="RECRUITER"><EditJob /></ProtectedRoute>
          } />
          <Route path="/recruiter/jobs/:jobId/applications" element={
            <ProtectedRoute role="RECRUITER"><JobApplications /></ProtectedRoute>
          } />

          <Route path="/admin/users" element={
            <ProtectedRoute role="ADMIN"><AdminUsers /></ProtectedRoute>
          } />
          <Route path="/admin/jobs" element={
            <ProtectedRoute role="ADMIN"><AdminJobs /></ProtectedRoute>
          } />
          <Route path="/admin/applications" element={
            <ProtectedRoute role="ADMIN"><AdminApplications /></ProtectedRoute>
          } />

          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}
