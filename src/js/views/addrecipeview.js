import icon from 'url:../../img/icons.svg';
import Views from './views';

const AddRecipeView = class extends Views {
  _parentElement = document.querySelector('.upload');
  message = 'Reipe was successfully uploaded :)';

  _recipeWindow = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _recipeOpen = document.querySelector('.nav__btn--add-recipe');
  _recipeClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addModelHandler();
    this._removeModelHandler();
  }

  toggleOverlay() {
    this._overlay.classList.toggle('hidden');
    this._recipeWindow.classList.toggle('hidden');
  }

  _addModelHandler() {
    this._recipeOpen.addEventListener('click', this.toggleOverlay.bind(this));
  }

  _removeModelHandler() {
    this._recipeClose.addEventListener('click', this.toggleOverlay.bind(this));
    this._overlay.addEventListener('click', this.toggleOverlay.bind(this));
  }

  handleSubmit(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();

      const DataArr = [...new FormData(this._parentElement)]; // To get the data as an array
      const Data = Object.fromEntries(DataArr);
      handler(Data);
    });
  }

  _generateHTml() {}
};

export default new AddRecipeView();
