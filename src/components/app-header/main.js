"use strict";

customElements.define(
  "app-header",
  class AppHeader extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });

      this.props = {};
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = this.render();
    }

    render() {
      return `
      <style>
        @import "./src/components/app-header/index.css";
      </style>
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
);
