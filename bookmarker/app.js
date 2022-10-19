'use strict';

const form = document.getElementById('form');
const siteNameEl = document.getElementById('site-name');
const siteUrlEl = document.getElementById('site-url');
const bookmarksEl = document.getElementById('bookmarks');

const clearChildEls = function (parentEl) {
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild);
  }
};

const clearValues = function (...elArray) {
  elArray.forEach(el => (el.value = ''));
};

const renderBookmarks = function (bookmarks) {
  bookmarks
    .map(bookmark => {
      const html = `
       <div class="bookmark" data-name="${bookmark.name}">
          <span class="bookmark-name">${bookmark.name}</span>
          <div class="bookmark-btns">
            <a href="${bookmark.url}" target="_blank" class="bookmark--btn btn-visit">Visit</a>
            <button class="bookmark--btn btn-delete">Delete</button>
          </div>
        </div>
  `;

      bookmarksEl.insertAdjacentHTML('beforeend', html);
    })
    .join();
};

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
    renderBookmarks(bookmarks);
    return;
  }

  if (localStorage.getItem('bookmarks') !== null) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    clearChildEls(bookmarksEl);
    clearValues(siteNameEl, siteUrlEl);
    renderBookmarks(bookmarks);
  }
};

const loadSavedBookmarks = function () {
  if (localStorage.getItem('bookmarks') === null) return;

  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  clearChildEls(bookmarksEl);
  renderBookmarks(bookmarks);
};

const deleteBookmark = function (e) {
  if (e.target.classList.contains('btn-delete')) {
    const bookmarkEl = e.target.closest('.bookmark');
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    const index = bookmarks.findIndex(
      bookmark => bookmark.name === `${bookmarkEl.dataset.name}`
    );

    if (index > -1) {
      bookmarks.splice(index, 1);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      clearChildEls(bookmarksEl);
      renderBookmarks(bookmarks);
    }
  }
};

window.addEventListener('load', loadSavedBookmarks);
form.addEventListener('submit', saveBookmark);
bookmarksEl.addEventListener('click', deleteBookmark);
