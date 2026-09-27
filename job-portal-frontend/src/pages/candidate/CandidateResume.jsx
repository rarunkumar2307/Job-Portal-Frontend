import { useEffect, useState } from 'react'
import { getResumeInfo, uploadResume, downloadOwnResume } from '../../api/candidateApi'
import { extractErrorMessage } from '../../api/axiosClient'
import StatusMessage from '../../components/StatusMessage'

export default function CandidateResume() {
  const [resume, setResume] = useState(null)
  const [hasResume, setHasResume] = useState(false)
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [uploading, setUploading] = useState(false)

  const loadResume = async () => {
    setError(null)
    try {
      const { data } = await getResumeInfo()
      setResume(data)
      setHasResume(true)
    } catch (err) {
      // Backend returns 404 (ResourceNotFoundException) when no resume exists yet.
      if (err.response && err.response.status === 404) {
        setHasResume(false)
        setResume(null)
      } else {
        setError(extractErrorMessage(err))
      }
    }
  }

  useEffect(() => { loadResume() }, [])

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please choose a PDF file first.')
      return
    }
    setError(null)
    setSuccess(null)
    setUploading(true)
    try {
      const { data } = await uploadResume(file)
      setResume(data)
      setHasResume(true)
      setSuccess('Resume uploaded successfully.')
      setFile(null)
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setUploading(false)
    }
  }

  const handleDownload = async () => {
    setError(null)
    try {
      const response = await downloadOwnResume()
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.download = resume?.fileName || 'resume.pdf'
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  return (
    <div className="page">
      <h2>My Resume</h2>

      {hasResume && resume && (
        <div className="resume-info">
          <p><strong>File:</strong> {resume.fileName}</p>
          <p><strong>Uploaded:</strong> {resume.uploadedAt}</p>
          <button className="btn btn-secondary" onClick={handleDownload}>Download Resume</button>
        </div>
      )}
      {!hasResume && <p>No resume uploaded yet.</p>}

      <form onSubmit={handleUpload} className="form">
        <label>
          Upload PDF resume (max 5MB)
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0] || null)}
          />
        </label>
        <StatusMessage type="error" message={error} />
        <StatusMessage type="success" message={success} />
        <button type="submit" className="btn btn-primary" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Resume'}
        </button>
      </form>
    </div>
  )
}
