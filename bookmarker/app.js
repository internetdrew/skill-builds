'use strict';

const form = document.getElementById('form');
const siteNameEl = document.getElementById('site-name');
const siteUrlEl = document.getElementById('site-url');

const saveBookmark = function (e) {
  e.preventDefault();

  const siteName = siteNameEl.value;
  const siteUrl = siteUrlEl.value;

  if (!siteName.trim() || !siteUrl.trim()) return;

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

const renderBookmarks = function (bookmarks) {
  bookmarks
    .map(bookmark => {
      const markup = `
       <div class="bookmark">
          <span class="bookmark-name">Google</span>
          <a href="#" class="bookmark--btn btn-visit">Visit</a>
          <button class="bookmark--btn btn-delete">Delete</button>
        </div>
  `;
    })
    .join();
};

form.addEventListener('submit', saveBookmark);
