import icon from 'url:../../img/icons.svg';
import Views from './views';

const PaginationView = class extends Views {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = 'No recipes found for your query! please try again :)';
  message;

  // Get html for the pagination buttons
  _generateHTml() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    const data = {
      query: this._data.query,
      page: this._data.page,
      results: this._data.results,
      resultPerPage: this._data.resultPerPage,
      numPages,
    };
    console.log(data);

    //////////////////////////////////////////////////////////
    // My Logic

    const presentPage = this._data.page;
    const one = presentPage === 1 ? true : false;

    // page 1 only
    if (one && presentPage === numPages) {
      return `page 1 only`;
    }

    // page 1 and next
    if (one && presentPage < numPages) {
      this._data.page += 1;
      return `
          <button class="btn--inline pagination__btn--next">
            <span>Page ${presentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
      // return `page 1 and more`
    }

    // page previous and next
    if (!one && presentPage < numPages) {
      this._data.page += 1;
      return `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${presentPage - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page ${presentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }

    // last page and previous
    if (!one && presentPage === numPages) {
      this._data.page -= 1;
      return `
          <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${presentPage - 1}</span>
          </button>
      `;
    }
  }
};

export default new PaginationView();
