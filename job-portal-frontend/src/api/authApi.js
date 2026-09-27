import axiosClient from './axiosClient'

// POST /api/auth/register -> AuthResponse
export const register = (payload) => axiosClient.post('/auth/register', payload)

// POST /api/auth/login -> AuthResponse
export const login = (payload) => axiosClient.post('/auth/login', payload)
