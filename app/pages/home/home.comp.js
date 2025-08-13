import sheetStr from "./index.css";

export class HomeComponent extends HTMLElement {
  constructor() {
    super();

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(sheetStr);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
  }

  render() {
    return `
      <div class="app-container">
        <app-header></app-header>
        <rps-game></rps-game>
        <button id="btn-rules">Rules</button>
      </div>
    `;
  }
}
