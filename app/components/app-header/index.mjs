import sheetStr from "./index.css";

export class AppHeader extends HTMLElement {
  constructor() {
    super();

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(sheetStr);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [sheet];

    this.props = {};
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
  }

  render() {
    return `
      <header class="app-header">
        <h2 class="app-title">
          <span>ROCK</span>
          <span>PAPER</span>
          <span>SCISSORS</span>
        </h2>
        <div class="app-score-container">
          <span class="app-score-title">SCORE</span>
          <span class="app-score-value">12</span>
        </div>
      </header>
    `;
  }
}
