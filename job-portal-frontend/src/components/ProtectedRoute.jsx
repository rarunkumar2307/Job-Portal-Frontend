import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Wraps a role-specific page. If not logged in -> Login. If logged in as the
// wrong role -> Home. This mirrors the backend's own SecurityConfig role
// rules; it does not grant any access the backend wouldn't also enforce.
export default function ProtectedRoute({ role, children }) {
  const { auth } = useAuth()

  if (!auth) {
    return <Navigate to="/login" replace />
  }
  if (auth.role !== role) {
    return <Navigate to="/" replace />
  }
  return children
}
