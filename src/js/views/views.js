import icon from 'url:../../img/icons.svg';

export default class Views {
  _data;

  render(data) {
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
}
