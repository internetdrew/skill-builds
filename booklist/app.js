'use strict';
const form = document.querySelector('.form');
const table = document.querySelector('.table');

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static displayBooks() {
    const books = document.querySelectorAll('.book');
    books.forEach(book => book.remove());
    const storedBooks = Storage.getStoredBooks();

    if (storedBooks.length > 0)
      storedBooks.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const table = document.getElementById('table');
    const html = `
          <tr class="book" data-title="${book.title}">
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

    Storage.storeBooks(books);
    UI.displayBooks();
    form.reset();
  }

  static deleteBook(e) {
    if (!e.target.classList.contains('delete-btn')) return;

    const bookEl = e.target.closest('.book');
    console.log(bookEl.dataset.title);

    const books = Storage.getStoredBooks();

    const index = books.findIndex(book => book.title === bookEl.dataset.title);

    if (index > -1) books.splice(index, 1);
    Storage.storeBooks(books);
    UI.displayBooks();
  }

  static getStoredBooks() {
    return localStorage.getItem('books') === null
      ? []
      : JSON.parse(localStorage.getItem('books'));
  }

  static storeBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }
}

window.addEventListener('load', UI.displayBooks);
form.addEventListener('submit', Storage.addBook);
table.addEventListener('click', Storage.deleteBook);
