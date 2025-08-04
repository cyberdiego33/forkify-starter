import icon from 'url:../../img/icons.svg';
import Views from './views';

const BookMarkView = class extends Views {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  message;
  _generateHTml() {
    // console.log(this._data);

    return this._data.map(data => this._MarkupPreview(data)).join('');
  }

  _MarkupPreview(result) {
    const hashId = window.location.hash.slice(1);

    return `
        <li class="preview">
            <a class="preview__link ${
              hashId === result.id ? 'preview__link--active' : ''
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.imageUrl}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icon}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
    `;
  }
};

export default new BookMarkView();
