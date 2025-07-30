import { API_URL } from './config.js';
import { getJson } from './helpers.js';

export const modelState = {
  recipe: {},
  searchs: {
    query: '',
    results: [],
  },
};

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
  } catch (error) {
    throw error;
  }
};

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
