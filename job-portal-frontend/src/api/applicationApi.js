import axiosClient from './axiosClient'

// POST /api/applications/job/{jobId}  body: { candidateNote? } (optional)
export const applyForJob = (jobId, candidateNote) =>
  axiosClient.post(`/applications/job/${jobId}`, candidateNote ? { candidateNote } : {})

// PUT /api/applications/{id}/status  body: { status, recruiterRemarks? }
export const updateApplicationStatus = (id, payload) =>
  axiosClient.put(`/applications/${id}/status`, payload)
