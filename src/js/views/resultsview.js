import icon from 'url:../../img/icons.svg';
import Views from './views';

const ResultsView = class extends Views {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! please try again :)';
  message;
  _generateHTml() {
    // console.log(this._data);

    return this._data.map(data => this._MarkupPreview(data)).join('');
  }

  _MarkupPreview(result) {
    return `
        <li class="preview">
            <a class="preview__link preview__link--active" href="#${result.id}">
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

export default new ResultsView();
