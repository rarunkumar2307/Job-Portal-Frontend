import axiosClient from './axiosClient'

// GET /api/candidates/profile
export const getCandidateProfile = () => axiosClient.get('/candidates/profile')

// PUT /api/candidates/profile
export const updateCandidateProfile = (payload) => axiosClient.put('/candidates/profile', payload)

// POST /api/candidates/resume (multipart field "file")
export const uploadResume = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return axiosClient.post('/candidates/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// GET /api/candidates/resume
export const getResumeInfo = () => axiosClient.get('/candidates/resume')

// GET /api/candidates/resume/download -> PDF blob
export const downloadOwnResume = () =>
  axiosClient.get('/candidates/resume/download', { responseType: 'blob' })

// GET /api/candidates/applications?page&size&sort
export const getMyApplications = (params) => axiosClient.get('/candidates/applications', { params })
