using Microsoft.AspNetCore.Mvc;
using BookApi.Models;

namespace BookApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private static List<Book> _books = new List<Book>
        {
            new Book { Id = 1, Title = "Clean Code", Author = "Robert C. Martin", Isbn = "978-0132350884", PublicationDate = new DateTime(2008, 8, 1) },
            new Book { Id = 2, Title = "The Pragmatic Programmer", Author = "David Thomas", Isbn = "978-0135957059", PublicationDate = new DateTime(2019, 9, 23) },
            new Book { Id = 3, Title = "Design Patterns", Author = "Gang of Four", Isbn = "978-0201633610", PublicationDate = new DateTime(1994, 11, 10) }
        };
        private static int _nextId = 4;

        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetAll()
        {
            return Ok(_books);
        }

        [HttpGet("{id}")]
        public ActionResult<Book> GetById(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) return NotFound();
            return Ok(book);
        }

        [HttpPost]
        public ActionResult<Book> Create([FromBody] Book book)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            book.Id = _nextId++;
            _books.Add(book);
            return CreatedAtAction(nameof(GetById), new { id = book.Id }, book);
        }

        [HttpPut("{id}")]
        public ActionResult<Book> Update(int id, [FromBody] Book updatedBook)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) return NotFound();

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.Isbn = updatedBook.Isbn;
            book.PublicationDate = updatedBook.PublicationDate;

            return Ok(book);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) return NotFound();
            _books.Remove(book);
            return NoContent();
        }
    }
}
