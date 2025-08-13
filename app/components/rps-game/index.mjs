import sheetStr from "./index.css";
import { Game } from "../../classes/game";
import { EventManager } from "../../classes/event-manager";

export class RpsGame extends HTMLElement {
  constructor() {
    super();

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(sheetStr);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [sheet];

    this.game = {
      inprogress: false,
      userWinner: false,
      houseWinner: false,
      draw: false,
    };
    this.animating = {
      userChoice: false,
      houseChoice: false,
      result: false,
      modeChange: false,
    };
    this.userChoice = undefined;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.buttons = this.shadowRoot.querySelectorAll(
      "player-option-btn[option]"
    );
    this.gameHouseElements = this.shadowRoot.querySelector(".game-in-progress");
    this.houseBtn = this.shadowRoot.querySelector(
      "player-option-btn[house=true]"
    );

    this.optionBtnEls = {};
    Array.from(this.buttons).map((button) => {
      button.addEventListener("click", (e) => this.handleOnClick(e));
      this.optionBtnEls[button.getAttribute("option")] = button;
    });
  }

  disconnectedCallback() {
    this.buttons.forEach((button) => {
      button.removeEventListener("click", (e) => this.handleOnClick(e));
    });
  }

  emitUserChoice = (userChoice) => {
    this.shadowRoot.dispatchEvent(EventManager.getUserChoiceEvent(userChoice));
  };

  handleOnClick(e) {
    if (this.game.inprogress) return;

    this.game.inprogress = true;
    this.userChoice = e.target.getAttribute("option");
    this.animating.userChoice = true;

    this.emitUserChoice(this.userChoice);
    this.gameHouseElements.classList.add("show-house-pick");
    this.optionBtnEls[this.userChoice].setAttribute("selected", true);

    this.animating.houseChoice = true;
    const houseChoiceAnimationInterval = setInterval(() => {
      this.buttons.forEach((button) => {
        const timeout = setTimeout(() => {
          console.log({ ...button });
          this.houseBtn.setAttribute("option", button.props.option);
        }, 300);

        clearTimeout(timeout);
      });
    }, 1000);

    const userChoiceAnimationTimeout = setTimeout(() => {
      this.animating.houseChoice = true;

      clearTimeout(userChoiceAnimationTimeout);
      clearInterval(houseChoiceAnimationInterval);
    }, 3000);
    Game.default.play(this.userChoice);
  }

  render() {
    return `
      <div class="game-area">
        <player-option-polygon lines="${!this.animating.userChoice}">
          <player-option-btn color="blue" option="paper"></player-option-btn>
          <player-option-btn
            color="yellow"
            option="scissors"
          ></player-option-btn>
          <player-option-btn color="red" option="rock"></player-option-btn>
        </player-option-polygon>
        <div class="game-in-progress">
          <player-option-btn house="true"></player-option-btn>

          <div class="game-labels">
            <span class="user-label">YOU PICKED</span>
            <span class="house-label">THE HOUSE PICKED</span>
          </div>
        </div>
      </div>
    `;
  }
}
