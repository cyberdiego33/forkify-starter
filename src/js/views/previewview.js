import icon from 'url:../../img/icons.svg';
import Views from './views';

const PreviewView = class extends Views {
  _parentElement = '';

  _generateHTml() {
    const hashId = window.location.hash.slice(1);

    return `
        <li class="preview">
            <a class="preview__link ${
              hashId === this._data.id ? 'preview__link--active' : ''
            }" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.imageUrl}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
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

export default new PreviewView();
