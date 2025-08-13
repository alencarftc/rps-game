import sheetStr from "./index.css";
import ScissorsIcon from "../../assets/images/icon-scissors.svg";
import PaperIcon from "../../assets/images/icon-paper.svg";
import RockIcon from "../../assets/images/icon-rock.svg";
import { EVENTS } from "../../classes/event-manager";

const OPTIONS_ICONS = {
  scissors: ScissorsIcon,
  paper: PaperIcon,
  rock: RockIcon,
};

export class PlayerOptionBtn extends HTMLElement {
  constructor() {
    super();

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(sheetStr);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [sheet];

    this.props = {};
    this.props.house = this.getAttribute("house") == "true";
    this.props.color = this.getAttribute("color");
    this.props.option = this.getAttribute("option");
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.selected = undefined;
    this.button = this.shadowRoot.querySelector(
      `#player-option-${this.props.option}`
    );
    this.parentNode.parentNode.parentNode.addEventListener(
      EVENTS.userChoiceEvent,
      (e) => {
        if (this.selected === false || this.props.house) return;
        this.selected = e.detail === this.props.option;
        this.button.setAttribute("selected", this.selected);
      }
    );
  }

  attributeChangedCallback(name, old, newv) {
    console.log(name, old, newv);
  }

  render() {
    return `
      <button
        id="${
          this.props.option
            ? `player-option-${this.props.option}`
            : "player-house-option"
        }"
        class="player-option ${
          this.props.color ? `player-option--${this.props.color}` : ""
        }"
      >
        <div class="player-option-image-container">
          <img
            src="${OPTIONS_ICONS[this.props.option]}"
            alt="${this.props.option}"
            draggable="false"
          />
        </div>
      </button>
    `;
  }
}
