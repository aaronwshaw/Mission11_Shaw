import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalNumBooks, setTotalNumBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Sorting state

  // This makes it so it only requests from the server when needed(changes)
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/bookstore/allbooks?pageSize=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();

      setBooks(data.books);
      setTotalNumBooks(data.totalNumBooks);
      setTotalPages(Math.ceil(totalNumBooks / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNum, totalNumBooks]);

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
      <h1>List of Books</h1>
      <br />

      <button onClick={sortBooksByTitle}>
        Sort by Title ({sortOrder === 'asc' ? 'A → Z' : 'Z → A'})
      </button>

      {/* Book cards */}
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookId}>
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
          </div>
        </div>
      ))}

      {/* Buttons to change pages */}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
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
    </>
  );
}

export default BookList;
