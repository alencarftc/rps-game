import { EVENTS } from "../../classes/event-manager";
import sheetStr from "./index.css";

export class PlayerOptionPolygon extends HTMLElement {
  constructor() {
    super();

    this.canDrawLines = this.getAttribute("lines") == "true";

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(sheetStr);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.svg = this.shadowRoot.querySelector(".polygon-svg");

    this.parentNode.parentNode.addEventListener(EVENTS.userChoiceEvent, () => {
      this.canDrawLines = false;
      this.svg.classList.add("fade-hide");
    });
  }

  render() {
    return `
      <div
        class="polygon-container"
      >
      ${
        !!this.canDrawLines
          ? `
          <svg width="313" height="278" class="polygon-svg" xmlns="http://www.w3.org/2000/svg">
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
