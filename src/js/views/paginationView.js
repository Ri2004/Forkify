import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      // console.log(btn);
      // console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return `
          <button data-goto = "${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons} #icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }

    // Last Page
    if (this._data.page === numPages) {
      return `
          <button data-goto = "${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons} #icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
      `;
    }

    // Other Page
    if (this._data.page < numPages) {
      return `
          <button data-goto = "${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons} #icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>

          <button data-goto = "${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons} #icon-arrow-right"></use>
            </svg>
          </button>
          `;
    }

    // Page 1, and there are NO pages
    return ``;
  }
}

export default new PaginationView();
