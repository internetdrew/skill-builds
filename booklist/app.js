'use strict';

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: 'Book One',
        author: 'John Doe',
        isbn: '632836',
      },
      {
        title: 'Book Two',
        author: 'Jane Doe',
        isbn: '028366',
      },
    ];

    const books = StoredBooks;

    books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const table = document.getElementById('table');
    const html = `
          <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>X</td>
          </tr>
    `;

    table.insertAdjacentHTML('beforeend', html);
  }
}

window.addEventListener('load', UI.displayBooks);
