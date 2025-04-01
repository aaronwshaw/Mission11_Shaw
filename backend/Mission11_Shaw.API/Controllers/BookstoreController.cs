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

    }
}
