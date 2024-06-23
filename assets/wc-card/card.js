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
    return this.querySelector('regole').innerHTML.trim();
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${webcomponent_base_path}${this.__wcname}/${this.__wcname}.css">
      <div class="card">
        <div class="ratio cover" style="--r: 4/3;">
          <img
            onerror="this.style.display = 'none';"
            loading="lazy"
            src="${this.imgTitle}"
            alt="${this.title} logo">
        </div>
        <header>${this.title}</header>
        <main style="background-image: url(${this.imgScreen});">
          <p>
            ${this.regole ? this.regole : '' }
          </p>
        </main>
      </div>
    `;
  }
}
customElements.define('card-component', CardComponent);
