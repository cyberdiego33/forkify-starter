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

  // For new changes
  updateMarkup(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.RenderErrorMes();

    this._data = data;

    // Get New stringHTML
    const NewStringRecipe = this._generateHTml();

    const newDom = document
      .createRange()
      .createContextualFragment(NewStringRecipe); // Coverting string to DOM elememts
    const newDomElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*')); // Getting them as an array

    newDomElements.forEach((newEl, index) => {
      const curEl = curElements[index];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
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
