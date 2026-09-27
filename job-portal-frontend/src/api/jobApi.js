import axiosClient from './axiosClient'

// GET /api/jobs?keyword&location&employmentType&experience&status&page&size&sort
export const searchJobs = (params) => axiosClient.get('/jobs', { params })

// GET /api/jobs/{id}
export const getJobById = (id) => axiosClient.get(`/jobs/${id}`)
