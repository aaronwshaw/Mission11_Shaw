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
        public IEnumerable<Book> GetBooks()
        { 
            return _Bookstorecontext.Books.ToList();
        }

        [HttpGet("OrderedBooks")]
        public IEnumerable<Book> GetBooksOrdered()
        {
            return _Bookstorecontext.Books.OrderBy(b => b.Title).ToList();
        }

    }
}
