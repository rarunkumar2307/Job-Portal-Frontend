import axiosClient from './axiosClient'

// GET /api/admin/users?page&size&sort
export const getAllUsers = (params) => axiosClient.get('/admin/users', { params })

// PUT /api/admin/users/{id}/status  body: { enabled }
export const updateUserStatus = (id, enabled) =>
  axiosClient.put(`/admin/users/${id}/status`, { enabled })

// GET /api/admin/jobs?page&size&sort
export const getAllJobsAdmin = (params) => axiosClient.get('/admin/jobs', { params })

// DELETE /api/admin/jobs/{id}
export const deleteJobAdmin = (id) => axiosClient.delete(`/admin/jobs/${id}`)

// GET /api/admin/applications?page&size
export const getAllApplicationsAdmin = (params) => axiosClient.get('/admin/applications', { params })
