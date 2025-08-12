"use strict";

customElements.define(
  "player-option-polygon",
  class PlayerOptionPolygon extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.canDrawLines = Boolean(this.getAttribute("lines"));
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = this.render();
    }

    render() {
      return `
      <style>
        @import "./src/components/player-option-polygon/index.css";
      </style>
      <div
        class="polygon-container"
      >
      ${
        !!this.canDrawLines
          ? `
          <svg class="polygon-svg" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="#000"
              stroke-width="21"
              fill="none"
              opacity=".2"
              d="M156.5 262 300 8H13z"
            />
          </svg>
        `
          : ""
      }
        <slot></slot>
      </div>
    `;
    }
  }
);
