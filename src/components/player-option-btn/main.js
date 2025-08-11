"use strict";

customElements.define(
  "player-option-btn",
  class PlayerOptionBtn extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });

      this.props = {
        color:
          this.getAttribute("color") ||
          console.error("Property 'color' is undefined"),
        option:
          this.getAttribute("option") ||
          console.error("Property 'id' is undefined"),
      };
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = this.render();
    }

    render() {
      return `
      <style>
        @import "./src/components/player-option-btn/index.css";
      </style>
      <button
        id="player-option-${this.props.option}"
        class="player-option player-option--${this.props.color}"
      >
        <div class="player-option-image-container">
          <img
            src="./assets/images/icon-${this.props.option}.svg"
            alt="${this.props.option}"
          />
        </div>
      </button>
    `;
    }
  }
);
