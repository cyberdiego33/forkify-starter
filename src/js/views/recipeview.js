import icon from 'url:../../img/icons.svg';

function decimalToFraction(decimal) {
  if (decimal == null || decimal === '') return '';
  if (Number.isInteger(decimal)) return decimal;

  const tolerance = 1.0e-6;
  let h1 = 1,
    h2 = 0,
    k1 = 0,
    k2 = 1,
    b = decimal;
  do {
    let a = Math.floor(b);
    let aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    aux = k1;
    k1 = a * k1 + k2;
    k2 = aux;
    b = 1 / (b - a);
  } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);

  return `${h1}/${k1}`;
}

const RecipeView = class {
  // Private Fields
  #parentElement = document.querySelector('.recipe');
  #data;
  #errorMessage = 'We could not find that recipe. Please try another one';
  #message;

  // No constructor

  render(data) {
    this.#data = data;

    // Get stringHTML
    const stringRecipe = this.#generateHTml();

    /////////////////////////////////////////////
    // Inserting the stringRecipe
    this.#clearParentEl();
    this.#parentElement.insertAdjacentHTML('afterbegin', stringRecipe); // adding the recipe stringdiv
  }

  addhandlerEvent(callback) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, callback));
  }

  #clearParentEl() {
    this.#parentElement.innerHTML = ''; // Removing the existing message
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
    this.#clearParentEl();
    this.#parentElement.insertAdjacentHTML('afterbegin', stringSpinner);
  }

  RenderErrorMes(message = this.#errorMessage) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;

    this.#clearParentEl();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  showSuccess(message = this.#message) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;

    this.#clearParentEl();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #generateHTml() {
    return `

        <figure class="recipe__fig">
          <img src="${this.#data.imageUrl}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icon}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.#data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icon}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this.#data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icon}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icon}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icon}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icon}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">


            ${this.#data.ingredients
              .map(ing => {
                return `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icon}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${decimalToFraction(
                    ing.quantity
                  )}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${
                      ing.unit ? ing.unit : ''
                    }</span>
                    ${ing.description}
                  </div>
                </li>
                `;
              })
              .join('')}

          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.#data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }
};

export default new RecipeView();
