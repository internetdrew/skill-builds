'use strict';
const form = document.querySelector('.form');

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static displayBooks() {
    const storedBooks =
      localStorage.getItem('books') === null
        ? []
        : JSON.parse(localStorage.getItem('books'));

    if (storedBooks.length > 0)
      storedBooks.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const table = document.getElementById('table');
    const html = `
          <tr class="book">
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td class="delete-btn">X</td>
          </tr>
    `;
    table.insertAdjacentHTML('beforeend', html);
  }
}

class Storage {
  static addBook(e) {
    e.preventDefault();
    const titleEl = document.getElementById('title');
    const authorEl = document.getElementById('author');
    const isbnEl = document.getElementById('isbn');

    const inputs = [titleEl, authorEl];

    if (inputs.some(input => input.value.trim() === '')) return;

    const books =
      localStorage.getItem('books') === null
        ? []
        : JSON.parse(localStorage.getItem('books'));

    const book = {
      title: titleEl.value.trim(),
      author: authorEl.value.trim(),
      isbn: isbnEl.value.trim(),
    };

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
    UI.displayBooks();
    form.reset();
  }
}

window.addEventListener('load', UI.displayBooks);
form.addEventListener('submit', Storage.addBook);
