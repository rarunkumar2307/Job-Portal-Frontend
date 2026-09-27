// Renders from the exact fields Spring's PageResponse gives us:
// pageNumber, totalPages, first, last - nothing computed or guessed.
export default function Pagination({ pageNumber, totalPages, first, last, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="pagination">
      <button disabled={first} onClick={() => onPageChange(pageNumber - 1)}>Previous</button>
      <span>Page {pageNumber + 1} of {totalPages}</span>
      <button disabled={last} onClick={() => onPageChange(pageNumber + 1)}>Next</button>
    </div>
  )
}
