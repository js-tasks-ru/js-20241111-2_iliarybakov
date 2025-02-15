export default class SortableTable {
  subElements = {};
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplate());
    this.setSubElements();
  }

  createHeaderTemplate() {
    return this.headerConfig.map((columnConfig) => {
      return (`
        <div class="sortable-table__cell" data-id="${columnConfig.id}" data-sortable="${columnConfig.sortable}">
          <span>${columnConfig.title}</span>
        </div>
      `);
    }).join('');
  }

  createElement(template) {
    const element = document.createElement('div');

    element.innerHTML = template;

    return element.firstElementChild;
  }

  createBodyRowTemplate(product) {
    return (`
      <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
      ${this.headerConfig.map((columnConfig) => 
        this.createBodyCellTemplate(product, columnConfig)
      ).join('')}
      </a>
    `);
  }

  createTableBodyTemplate() {
    return this.data.map((product) => {
      return this.createBodyRowTemplate(product);
    }).join('');
  }

  createBodyCellTemplate(product, columnConfig) {
    if (columnConfig.id === 'images') {
      return (`
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="${product.images[Math.floor(Math.random() * product.images.length)].url}">
        </div> 
      `);
    }

    return (`
      <div class="sortable-table__cell">${product[columnConfig.id]}</div> 
    `);
  }

  createTemplate() {
    return (`
    <div class="sortable-table">

    <div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.createHeaderTemplate()}
    </div>

    <div data-element="body" class="sortable-table__body">
      ${this.createTableBodyTemplate()}
    </div>

    <div data-element="loading" class="loading-line sortable-table__loading-line"></div>

    <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
      <div>
        <p>No products satisfies your filter criteria</p>
        <button type="button" class="button-primary-outline">Reset all filters</button>
      </div>
    </div>

  </div>
    `);
}

setSubElements() {
  this.element.querySelectorAll('[data-element]').forEach(element => {
    this.subElements[element.dataset.element] = element;
  });
}

sort(field, order) {
  const { sortable, sortType } = this.headerConfig.find(({ id }) => id === field);
  if(!sortable) {
    return
  }
  console.log(this.sortData(sortType, field, order))
  this.data = this.sortData(sortType, field, order);
  this.subElements.body.innerHTML = this.createTableBodyTemplate();
}

sortData(sortType, field, order) {
  if(sortType === 'number') {
    return this.sortNumbers(field, order);
  } else {
    return this.sortStrings(field, order);
  }
}

sortNumbers(field, order) {
  switch (order) {
    case "asc":
      return [...this.data].sort((a, b) => a[field] - b[field]);
    case "desc":
      return [...this.data].sort((a, b) => b[field] - a[field]);
    default:
      return [...this.data];
  }
}

sortStrings(field, order) {
  switch (order) {
    case "asc":
      return [...this.data].sort((a, b) =>
        a[field].localeCompare(b[field], "ru", { caseFirst: "upper" })
      );
    case "desc":
      return [...this.data].sort((a, b) =>
        b[field].localeCompare(a[field], "ru", { caseFirst: "upper" })
      );
    default:
      return [...this.data];
  }
}

destroy() {
  this.element.remove();
}

}

