import axiosClient from './axiosClient'

// GET /api/recruiters/profile
export const getRecruiterProfile = () => axiosClient.get('/recruiters/profile')

// PUT /api/recruiters/profile
export const updateRecruiterProfile = (payload) => axiosClient.put('/recruiters/profile', payload)

// POST /api/recruiters/jobs
export const createJob = (payload) => axiosClient.post('/recruiters/jobs', payload)

// GET /api/recruiters/jobs?page&size&sort
export const getMyJobs = (params) => axiosClient.get('/recruiters/jobs', { params })

// PUT /api/recruiters/jobs/{id}
export const updateJob = (id, payload) => axiosClient.put(`/recruiters/jobs/${id}`, payload)

// DELETE /api/recruiters/jobs/{id}
export const deleteJob = (id) => axiosClient.delete(`/recruiters/jobs/${id}`)

// GET /api/recruiters/jobs/{jobId}/applications?page&size
export const getApplicationsForJob = (jobId, params) =>
  axiosClient.get(`/recruiters/jobs/${jobId}/applications`, { params })

// GET /api/recruiters/resumes/{resumeId}/download -> PDF blob
export const downloadCandidateResume = (resumeId) =>
  axiosClient.get(`/recruiters/resumes/${resumeId}/download`, { responseType: 'blob' })
