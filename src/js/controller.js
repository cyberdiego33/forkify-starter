import 'core-js/stable';
import 'regenerator-runtime/runtime';

/////////////////////////////////////
// import { loadRecipe, modelState } from './models.js';
import * as model from './models.js';
import recipeview from './views/recipeview.js';
import SearchView from './views/searchview.js';
import resultsview from './views/resultsview.js';
import bookmarkedview from './views/bookmarkedview.js';
import paginationview from './views/paginationview.js';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

//////////////////////////////////////
const GetRecipeObj = function () {
  return model.modelState.recipe;
};

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

    // Rendering the recipe
    recipeview.render(GetRecipeObj());

    // Update active recipe
    resultsview.updateMarkup(model.getSearchResultPage());
    bookmarkedview.updateMarkup(model.modelState.bookmarks);
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

  // recipeview.render(RecipeObj);
  recipeview.updateMarkup(GetRecipeObj());
};

// BookMark Handler
const handleBookmark = function () {
  // Add/Remove Bookmark
  if (!GetRecipeObj().bookmarked) model.addBookMark(GetRecipeObj());
  else model.removeBookMark(GetRecipeObj().id);

  // console.log(model.modelState.recipe);

  // Update the View
  recipeview.updateMarkup(GetRecipeObj());

  // Render into bookmark UI
  bookmarkedview.render(model.modelState.bookmarks);
};

//////////////////////////////////////////
// Initializing the app

const init = function () {
  recipeview.addhandlerEvent(showRecipe);
  recipeview.updateServing(handleServings);
  recipeview.addBookMarks(handleBookmark);
  SearchView.addSearchListener(controlLoadSearch);
  paginationview.addPageHandler(controlPagination);
};

init();
