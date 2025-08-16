import ScissorsIcon from "../../assets/images/icon-scissors.svg";
import PaperIcon from "../../assets/images/icon-paper.svg";
import RockIcon from "../../assets/images/icon-rock.svg";
import { BaseElement } from "../../core/element";
import styles from "./index.css";

const OPTIONS_ICONS = {
  scissors: ScissorsIcon,
  paper: PaperIcon,
  rock: RockIcon,
};

export class PlayerOptionBtn extends BaseElement {
  static observedAttributes = ["color", "option", "selected"];

  constructor() {
    super(styles);

    this.props = {
      selected: this.getAttribute("selected"),
      house: this.getAttribute("house") == "true",
      color: this.getAttribute("color"),
      option: this.getAttribute("option"),
    };
  }

  connectedCallback() {
    const { option, color } = this.props;
    const src = OPTIONS_ICONS[option];

    this.shadowRoot.innerHTML = this.render(option, color, src);

    this.button = this.shadowRoot.querySelector(
      this.props.option
        ? `#player-option-${this.props.option}`
        : `#player-house-option`
    );
    this.$buttonOptionImg = this.button.querySelector("img");
  }

  attributeChangedCallback(name, old, newv) {
    if (this.props.house) {
      ({
        color: () => {
          this.button.classList.remove(`player-option--${old}`);
          this.button.classList.add(`player-option--${newv}`);
        },
        option: () => {
          this.$buttonOptionImg.setAttribute("src", OPTIONS_ICONS[newv]);
          this.$buttonOptionImg.setAttribute("alt", newv);
        },
      })[name]();
    }
  }

  render(option, color, src) {
    return `
      <button
        id="${option ? `player-option-${option}` : "player-house-option"}"
        class="player-option ${color ?? `player-option--${color}`}"
      >
        <div class="player-option-image-container">
          <img
            src="${src}"
            alt="${option}"
            draggable="false"
          />
        </div>
      </button>
    `;
  }
}
