import 'core-js/stable';
import 'regenerator-runtime/runtime';

/////////////////////////////////////
// import { loadRecipe, modelState } from './models.js';
import * as model from './models.js';
import recipeview from './views/recipeview.js';
import SearchView from './views/searchview.js';
import resultsview from './views/resultsview.js';
import paginationview from './views/paginationview.js';

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

    // Load the search results
    await model.LoadSearchResults(query);

    // Render Initial or First page
    resultsview.render(model.getSearchResultPage(1));

    // Render initial pagination buttons
    paginationview.render(model.modelState.searchs);
  } catch (error) {
    console.log(`Error from load results ${error}`);
  }
};

const controlPagination = function (goto) {
  console.log('Pagination clicked', goto);
  // Render New or Current page
  resultsview.render(model.getSearchResultPage(goto));

  // Render New pagination buttons
  paginationview.render(model.modelState.searchs);
};

//////////////////////////////////////////
// Updating servings

const handleServings = function (newServings) {
  // Update the ModelState data
  model.loadServings(newServings);

  // Update the recipeView ingredients
  const RecipeObj = model.modelState.recipe;

  // recipeview.render(RecipeObj);
  recipeview.updateMarkup(RecipeObj);
};

//////////////////////////////////////////
// Initializing the app

const init = function () {
  recipeview.addhandlerEvent(showRecipe);
  SearchView.addSearchListener(controlLoadSearch);
  paginationview.addPageHandler(controlPagination);
  recipeview.updateServing(handleServings);
};

init();

// New message
