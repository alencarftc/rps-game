import { BaseElement } from "../../core/element";
import styles from "./index.css";

export class AppHeader extends BaseElement {
  constructor() {
    super(styles);
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
