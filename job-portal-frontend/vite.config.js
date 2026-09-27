import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite dev server proxies /api to the Spring Boot backend on port 8080,
// so the frontend can just call relative paths like "/api/jobs" and never
// worry about CORS during development (SecurityConfig has CORS disabled).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
