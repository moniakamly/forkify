import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resulstView from './views/resultsView.js';
import paginationtView from './views/paginationView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }


const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resulstView.update(model.getSearchResultsPage());

    // Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};


const controlSearchResults = async function () {
  try {

    resulstView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    //resulstView.render(model.state.search.results);
    resulstView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationtView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};


const controlPagination = function (goToPage) {

  // 1) Render new  results
  resulstView.render(model.getSearchResultsPage(goToPage));

  // Render new pagination buttons
  paginationtView.render(model.state.search);
};

const controlServings = function(newServings) {

  // Update the recipe servings ( in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationtView.addHandlerClick(controlPagination);
};
init();