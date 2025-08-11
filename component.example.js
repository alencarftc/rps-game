"use strict";

customElements.define(
  "my-component",
  class MyComponent extends HTMLElement {
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
        @import "./src/components/my-component/index.css";
      </style>
      <div>
      
      </div>
    `;
    }
  }
);
