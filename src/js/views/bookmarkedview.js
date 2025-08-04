import previewview from './previewview';
import Views from './views';

const BookMarkView = class extends Views {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  message;

  addBookMarksHandler(handler) {
    window.addEventListener('load', handler);
  }

  _generateHTml() {
    // console.log(this._data);

    return this._data
      .map(bookmark => previewview.render(bookmark, false))
      .join('');
  }
};

export default new BookMarkView();
