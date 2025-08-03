import { API_URL, RES_PER_PAGE } from './config.js';
import { getJson } from './helpers.js';

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

// When a search result is clicked
export const loadRecipe = async function (id) {
  ////////////////////////////////////////
  // Fetching a recipe
  try {
    const data = await getJson(`${API_URL}/${id}`);

    const { recipe } = data.data;

    // Updating the modelState
    modelState.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      cookingTime: recipe.cooking_time,
    };

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
    const { data } = await getJson(`${API_URL}?search=${query}`);
    const { recipes } = data;

    modelState.searchs.results = recipes.map(rec => {
      return {
        id: rec.id,
        publisher: rec.publisher,
        title: rec.title,
        imageUrl: rec.image_url,
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

export const addBookMark = function (bookrecipe) {
  // console.log('recieved', bookrecipe);

  // Adding a recipe to BookMarked
  modelState.bookmarks.push(bookrecipe);

  // Checking for bookmark
  if (bookrecipe.id === modelState.recipe.id)
    modelState.recipe.bookmarked = true;
};

export const removeBookMark = function (id) {
  const index = modelState.bookmarks.findIndex(el => el.id === id);
  modelState.bookmarks.slice(index, 1);

  // Checking for bookmark
  if (modelState.recipe.id === id) modelState.recipe.bookmarked = false;
};
