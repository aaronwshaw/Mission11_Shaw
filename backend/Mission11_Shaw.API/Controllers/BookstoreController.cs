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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1)
        { 
            var books = _Bookstorecontext.Books
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

            var totalNumBooks = _Bookstorecontext.Books.Count();

            var someObject = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);
        }

        [HttpGet("OrderedBooks")]
        public IEnumerable<Book> GetBooksOrdered()
        {
            return _Bookstorecontext.Books.OrderBy(b => b.Title).ToList();
        }

    }
}
