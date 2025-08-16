import { BaseElement } from "../../core/element";
import styles from "./index.css";

export class PlayerOptionPolygon extends BaseElement {
  static observedAttributes = ["lines"];

  constructor() {
    super(styles);

    this.props = {};
    this.props.lines = this.getAttribute("lines") == "true";
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.svg = this.shadowRoot.querySelector("#polygon-svg");
  }

  attributeChangedCallback(name, old, newv) {
    if (this.svg == undefined) return;
    ({
      lines: () => {
        if (newv == "true") {
          this.svg.classList.remove("fade-hide");
        } else {
          this.svg.classList.add("fade-hide");
        }
      },
    })[name]();
  }

  render() {
    return `
      <div
        class="polygon-container"
      >
        <svg width="313" height="278" id="polygon-svg" xmlns="http://www.w3.org/2000/svg">
          <path
            stroke="#000"
            stroke-width="21"
            fill="none"
            opacity=".2"
            d="M156.5 262 300 8H13z"
          />
        </svg>
        <slot></slot>
      </div>
    `;
  }
}
