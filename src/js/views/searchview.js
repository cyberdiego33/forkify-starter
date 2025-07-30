const SearchView = class {
  #parentElement = document.querySelector('.search');
  #searchField = document.querySelector('.search__field');

  getQuery() {
    const query = this.#searchField.value;
    this.#clearInput();

    return query;
  }

  #clearInput() {
    this.#searchField.value = '';
    this.#searchField.blur();
  }

  addSearchListener(callback) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault();

      callback();
    });
  }
};

export default new SearchView();
