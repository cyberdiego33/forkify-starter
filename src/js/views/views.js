import icon from 'url:../../img/icons.svg';

export default class Views {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.RenderErrorMes();

    this._data = data;

    // Get stringHTML
    const stringRecipe = this._generateHTml();

    /////////////////////////////////////////////
    // Inserting the stringRecipe
    this._clearParentEl();
    this._parentElement.insertAdjacentHTML('afterbegin', stringRecipe); // adding the recipe stringdiv
  }

  _clearParentEl() {
    this._parentElement.innerHTML = ''; // Removing the existing message
  }

  //////////////////////////////////////////
  // A spinner function
  spinner() {
    const stringSpinner = `
      <div class="spinner">
            <svg>
              <use href="${icon}#icon-loader"></use>
            </svg>
          </div>
    `;
    this._clearParentEl();
    this._parentElement.insertAdjacentHTML('afterbegin', stringSpinner);
  }

  RenderErrorMes(message = this._errorMessage) {
    const markup = `
            <div class="message">
              <div>
                <svg>
                  <use href="${icon}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;

    this._clearParentEl();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  showSuccess(message = this.message) {
    const markup = `
            <div class="error">
              <div>
                <svg>
                  <use href="src/img/icons.svg#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;

    this._clearParentEl();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
