import previewview from './previewview';
import Views from './views';

const ResultsView = class extends Views {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! please try again :)';
  message;
  _generateHTml() {
    // console.log(this._data);

    return this._data.map(result => previewview.render(result, false)).join('');
  }
};

export default new ResultsView();
