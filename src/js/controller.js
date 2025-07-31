import 'core-js/stable';
import 'regenerator-runtime/runtime';
import icon from 'url:../img/icons.svg';

/////////////////////////////////////
// import { loadRecipe, modelState } from './models.js';
import * as model from './models.js';
import recipeview from './views/recipeview.js';
import SearchView from './views/searchview.js';
import resultsview from './views/resultsview.js';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
// Fetching first recipe
const showRecipe = async function () {
  try {
    // Getting the hash
    const hashId = window.location.hash.slice(1);

    if (!hashId) return;

    // Render loading spinner
    recipeview.spinner();

    // Load recipe
    await model.loadRecipe(hashId);

    // Getting the recipe from modelState
    const RecipeObj = model.modelState.recipe;
    // console.log(RecipeObj);

    // Rendering the recipe
    recipeview.render(RecipeObj);
  } catch (error) {
    console.error(`You have ${error}`);
    recipeview.RenderErrorMes();
  }
};

//////////////////////////////////////////
// Handling the search results events
const controlLoadSearch = async function () {
  try {
    resultsview.spinner();

    // Getting the query from search input
    const query = SearchView.getQuery(); // The search input is returned from searchView method
    if (!query) return;

    const response = await model.LoadSearchResults(query);
    // if (!response) throw new Error(`your search is ${response}`);

    // console.log(model.modelState.searchs.results[0]);
    resultsview.render(model.modelState.searchs.results);
  } catch (error) {
    console.log(`Error from load results ${error}`);
  }
};

// controlLoadSearch('pizza');

//////////////////////////////////////////
// Initializing the app

const init = function () {
  console.log('started');
  recipeview.addhandlerEvent(showRecipe);
  SearchView.addSearchListener(controlLoadSearch);
  console.log('ended');
};

init();
