// A tiny reusable banner for showing the real backend error/success message -
// never a generic made-up one.
export default function StatusMessage({ type = 'error', message }) {
  if (!message) return null
  return <div className={`status-message ${type}`}>{message}</div>
}
