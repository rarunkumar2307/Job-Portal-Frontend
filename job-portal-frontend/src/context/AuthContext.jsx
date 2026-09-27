import { createContext, useContext, useState } from 'react'

// Holds exactly what AuthResponse gives us at login/register time:
// { token, userId, name, email, role }. Nothing invented, nothing fetched
// from a "profile" or "me" endpoint that doesn't exist.
const AuthContext = createContext(null)

function loadStoredAuth() {
  const token = localStorage.getItem('jp_token')
  const raw = localStorage.getItem('jp_user')
  if (!token || !raw) return null
  try {
    return { token, ...JSON.parse(raw) }
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(loadStoredAuth)

  const login = (authResponse) => {
    const { token, userId, name, email, role } = authResponse
    localStorage.setItem('jp_token', token)
    localStorage.setItem('jp_user', JSON.stringify({ userId, name, email, role }))
    setAuth({ token, userId, name, email, role })
  }

  const logout = () => {
    localStorage.removeItem('jp_token')
    localStorage.removeItem('jp_user')
    setAuth(null)
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
