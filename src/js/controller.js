import icon from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//////////////////////////////////////////
// A spinner function

const spinner = function (parent) {
  const stringSpinner = `
    <div class="spinner">
          <svg>
            <use href="${icon}#icon-loader"></use>
          </svg>
        </div>
  `;
  parent.innerHTML = '';
  parent.insertAdjacentHTML('afterbegin', stringSpinner);
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

// Fetching first recipe

const showRecipe = async function () {
  try {
    /////////////////////////////////
    // Getting the hash
    const hashId = window.location.hash.slice(1);

    if (!hashId) return;

    ///////////////////////////////
    // Render spinner
    spinner(recipeContainer);

    ////////////////////////////////////////
    // Fetching a recipe
    const response = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${hashId}`
    );
    const data = await response.json();
    // console.log(data);

    // Catching and throwing errors
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    const { recipe } = data.data;
    // console.log(recipe);
    // console.log('lets see');

    let RecipeObj = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      cookingTime: recipe.cooking_time,
    };

    // console.log(RecipeObj);

    ////////////////////////////////////
    // Rendering the recipe

    const stringRecipe = `

        <figure class="recipe__fig">
          <img src="${RecipeObj.imageUrl}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${RecipeObj.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icon}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              RecipeObj.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icon}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              RecipeObj.servings
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

            ${recipe.ingredients
              .map(ing => {
                return `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icon}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${ing.quantity}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit}</span>
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
              RecipeObj.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${RecipeObj.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
    /////////////////////////////////////////////
    // Inserting the stringRecipe

    recipeContainer.innerHTML = ''; // Removing the existing message

    recipeContainer.insertAdjacentHTML('afterbegin', stringRecipe); // adding the recipe stringdiv
  } catch (error) {
    console.error(`You have ${error}`);
  }
};

// showRecipe();

//////////////////////////////////
// Loading the events with a loop

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
// window.addEventListener('hashchange', showRecipe);
