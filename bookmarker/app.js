'use strict';

const form = document.getElementById('form');
const siteNameEl = document.getElementById('site-name');
const siteUrlEl = document.getElementById('site-url');

const saveBookmark = function (e) {
  e.preventDefault();

  const siteName = siteNameEl.value;
  const siteUrl = siteUrlEl.value;

  const bookmark = {
    name: siteName,
    url: siteUrl,
  };

  if (localStorage.getItem('bookmarks') === null) {
    const bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  if (localStorage.getItem('bookmarks') !== null) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
};

form.addEventListener('submit', saveBookmark);
