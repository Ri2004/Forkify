import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The datato be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns (undefined | string) A markup string is returned if render=false
   * @this (Object) View object
   * @author Rishabh Chatterjee
   * @todo Finish implementation
   * @returns 
   */

  render(data, render = true) {
    // console.log(data);
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if(!render) return markup;
    
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // console.log(curElements);
    // console.log(newElements);

    newElements.forEach((newElement, i) => {
      const curElement = curElements[i];
      // console.log(curElement);

      // updates changed text
      if (
        !newElement.isEqualNode(curElement) &&
        newElement.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('🎇🎇🎇🎇', newElement.firstChild.nodeValue.trim());
        curElement.textContent = newElement.textContent;
      }

      // updates changed attribute
      if (!newElement.isEqualNode(curElement)) {
        Array.from(newElement.attributes).forEach(attr =>
          curElement.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markUp = `
              <div class="spinner">
                <svg>
                  <use href="${icons} #icon-loader"></use>
                </svg>
              </div>
        `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markUp);
  }

  renderError(message = this._errorMsg) {
    const markUp = `
              <div class="error">
                <div>
                  <svg>
                    <use href="${icons} #icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
              `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markUp);
  }

  renderMessage(message = this._message) {
    const markUp = `
              <div class="message">
                <div>
                  <svg>
                    <use href="${icons} #icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
              `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markUp);
  }
}
