import { API_URL, APIKEY, RES_PER_PAGE } from './config.js';
import { AJAX } from './helpers.js';

export const modelState = {
  recipe: {},
  searchs: {
    query: '',
    page: 1,
    results: [],
    resultPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObj = function (recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    sourceUrl: recipe.source_url,
    imageUrl: recipe.image_url,
    cookingTime: recipe.cooking_time,
    ...(recipe.key && { key: recipe.key }),
  };
};

// When a search result is clicked
export const loadRecipe = async function (id) {
  ////////////////////////////////////////
  // Fetching a recipe
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${APIKEY}`);

    const { recipe } = data.data;

    // Updating the modelState
    modelState.recipe = createRecipeObj(recipe);

    if (
      modelState.bookmarks.some(
        bookmark => bookmark.id === modelState.recipe.id
      )
    )
      modelState.recipe.bookmarked = true;
    else {
      modelState.recipe.bookmarked = false;
    }
  } catch (error) {
    throw error;
  }
};

// For Search results
export const LoadSearchResults = async function (query) {
  try {
    modelState.searchs.query = query;

    // https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
    const { data } = await AJAX(`${API_URL}?search=${query}&key=${APIKEY}`);
    const { recipes } = data;

    modelState.searchs.results = recipes.map(rec => {
      return {
        id: rec.id,
        publisher: rec.publisher,
        title: rec.title,
        imageUrl: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (error) {
    throw error;
  }
};

// For pagination
export const getSearchResultPage = function (page = modelState.searchs.page) {
  modelState.searchs.page = page;

  const start = (page - 1) * modelState.searchs.resultPerPage;
  const end = page * modelState.searchs.resultPerPage;

  return modelState.searchs.results.slice(start, end);
};

// For increasing/decreasing servings
export const loadServings = function (newServings) {
  modelState.recipe.ingredients.forEach(ing => {
    // formula = Old quantity * newServings / old Servings
    ing.quantity = (ing.quantity * newServings) / modelState.recipe.servings;
  });

  modelState.recipe.servings = newServings;
};

////////////////////////////////////////////////
// Bookmark section

const addLocalStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(modelState.bookmarks));
};

export const addBookMark = function (bookrecipe) {
  // Adding a recipe to BookMarked
  modelState.bookmarks.push(bookrecipe);

  // Checking for bookmark
  if (bookrecipe.id === modelState.recipe.id)
    modelState.recipe.bookmarked = true;

  addLocalStorage();
};

export const removeBookMark = function (id) {
  const index = modelState.bookmarks.findIndex(el => el.id === id);
  modelState.bookmarks.splice(index, 1);

  // Checking for bookmark
  if (modelState.recipe.id === id) modelState.recipe.bookmarked = false;

  addLocalStorage();
};

const clearLocalStorage = function () {
  localStorage.clear('bookmarks');
};

const getLocalBookmarks = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) modelState.bookmarks = JSON.parse(storage);
};

getLocalBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    const recipeIngredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Expected 3 input with comma(,) seperated'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const sendrecipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients: recipeIngredients,
    };

    const response = await AJAX(`${API_URL}?key=${APIKEY}`, sendrecipe);
    const { recipe: createdRecipe } = response.data;

    modelState.recipe = createRecipeObj(createdRecipe);
    addBookMark(modelState.recipe);

    console.log(modelState.recipe);
  } catch (error) {
    throw error;
  }
};

// 8f621e6c-17a3-41d0-8f08-2f4113481e22
