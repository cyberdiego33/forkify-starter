export const modelState = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  ////////////////////////////////////////
  // Fetching a recipe
  try {
    const response = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`
    );
    const data = await response.json();

    // Catching and throwing errors
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

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
    alert(`${error}`);
  }
};
