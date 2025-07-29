import 'core-js/stable';
import 'regenerator-runtime/runtime';
import icon from 'url:../img/icons.svg';

/////////////////////////////////////
// import { loadRecipe, modelState } from './models.js';
import * as model from './models.js';
import recipeview from './views/recipeview.js';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io
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

///////////////////////////////////////
// Fetching first recipe
const showRecipe = async function () {
  try {
    // Getting the hash
    const hashId = window.location.hash.slice(1);

    if (!hashId) return;

    // Render loading spinner
    spinner(recipeContainer);

    // Load recipe
    await model.loadRecipe(hashId);

    // Getting the recipe from modelState
    const RecipeObj = model.modelState.recipe;

    // Rendering the recipe
    recipeview.render(RecipeObj);
  } catch (error) {
    console.error(`You have ${error}`);
  }
};

//////////////////////////////////
// Loading the events with a loop

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
// window.addEventListener('hashchange', showRecipe);
