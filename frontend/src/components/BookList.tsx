import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Sorting state
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // This makes it so it only requests from the server when needed(changes)
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Sorting function
  const sortBooksByTitle = () => {
    const sortedBooks = [...books].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setBooks(sortedBooks);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle order
  };

  return (
    <>
      {/* Book cards */}
      {books.map((b) => (
        <div
          id="bookCard"
          className="card shadow-lg p-3 mb-3 bg-light border-0 rounded-4 hover-effect"
          key={b.bookId}
        >
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification/Category: </strong>
                {b.classification}/{b.category}
              </li>
              <li>
                <strong>Number of Pages: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>${b.price}
              </li>
            </ul>

            <button
              className="btn btn-success"
              onClick={() => navigate(`/buy/${b.title}/${b.bookId}/${b.price}`)}
            >
              Buy
            </button>
          </div>
        </div>
      ))}

      {/* Buttons to change pages */}
      <button
        className="btn btn-outline-primary mx-1"
        disabled={pageNum === 1}
        onClick={() => setPageNum(pageNum - 1)}
      >
        <i className="bi bi-chevron-left"></i> Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          className={`btn ${pageNum === i + 1 ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
          onClick={() => setPageNum(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="btn btn-outline-primary mx-1"
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next <i className="bi bi-chevron-right"></i>
      </button>

      <br />

      {/* Button to change the number of results per page */}
      <label>Results per page: </label>
      <select
        value={pageSize}
        onChange={(p) => {
          setPageSize(Number(p.target.value));
          setPageNum(1);
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>

      <br />
      <button onClick={sortBooksByTitle}>
        Sort by Title ({sortOrder === 'asc' ? 'A → Z' : 'Z → A'})
      </button>
    </>
  );
}

export default BookList;
