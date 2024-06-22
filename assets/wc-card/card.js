class CardComponent extends HTMLElement {
  __wcname = 'card';
  get imgCover() {
    return this.getAttribute('data-img-cover');
  }
  get imgScreen() {
    return this.getAttribute('data-img-screen');
  }
  get imgTitle() {
    return this.getAttribute('data-img-title');
  }
  get title() {
    return this.getAttribute('data-title');
  }
  get regole() {
    return this.querySelector('regole').innerHTML;
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div class="card">
        <div class="ratio cover" style="--r: 4/3;">
          <img
            onerror="this.style.display = 'none';"
            loading="lazy"
            src="${this.imgTitle}"
            alt="${this.title} logo">
        </div>
        <header>${this.title}</header>
        <p>${this.regole}</p>
      </div>

      <style>
        @import '${webcomponent_base_path}${this.__wcname}/${this.__wcname}.css';
      </style>
    `;
  }
}
customElements.define('card-component', CardComponent);
