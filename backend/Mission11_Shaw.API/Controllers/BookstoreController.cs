using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Shaw.API.Data;

namespace Mission11_Shaw.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {

        private BookstoreContext _Bookstorecontext;
        public BookstoreController(BookstoreContext temp) 
        { 
            _Bookstorecontext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? selectedCategories = null)
        { 
            var query = _Bookstorecontext.Books.AsQueryable();

            if (selectedCategories != null && selectedCategories.Any())
            {
                query = query.Where(b => selectedCategories.Contains(b.Category));
            }

            var totalNumBooks = query.Count();

            var books = query
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

            var someObject = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _Bookstorecontext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _Bookstorecontext.Books.Add(newBook);
            _Bookstorecontext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _Bookstorecontext.Books.Find(bookId);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.Isbn = updatedBook.Isbn;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _Bookstorecontext.Books.Update(existingBook);
            _Bookstorecontext.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var Book = _Bookstorecontext.Books.Find(bookId);

            if (Book == null)
            {
                return NotFound(new {message = "Book not found"});
            }

            _Bookstorecontext.Books.Remove(Book);
            _Bookstorecontext.SaveChanges();

            return NoContent();
        }

    }
}
