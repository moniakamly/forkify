import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resulstView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}


const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return; 
    recipeView.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
    
  } catch (err) {
    recipeView.renderError();
  }
};


const controlSearchResults = async function() {
  try {

    resulstView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query ) return; 

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    resulstView.render(model.state.search.results);
  } catch(err) {
    console.log(err);
  }
};


const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();