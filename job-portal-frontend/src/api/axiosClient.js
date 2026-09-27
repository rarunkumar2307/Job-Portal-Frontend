import axios from 'axios'

// Single axios instance used everywhere. The interceptor attaches the JWT
// (if we have one) to every request, and unwraps backend error messages so
// every page can show the *actual* message the Spring Boot ErrorResponse sent.
const axiosClient = axios.create({
  baseURL: '/api'
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jp_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// The backend's GlobalExceptionHandler / JwtAuthenticationEntryPoint always
// return an ErrorResponse shaped like:
// { timestamp, status, error, message, path, validationErrors? }
// This helper pulls out the most useful message so components don't repeat
// this logic everywhere.
export function extractErrorMessage(error) {
  const data = error?.response?.data
  if (!data) return error.message || 'Something went wrong. Please try again.'
  if (data.validationErrors && Object.keys(data.validationErrors).length > 0) {
    return Object.entries(data.validationErrors)
      .map(([field, msg]) => `${field}: ${msg}`)
      .join(' | ')
  }
  return data.message || 'Something went wrong. Please try again.'
}

export default axiosClient
