import { Game } from "../../classes/game";
import { EventManager } from "../../classes/event-manager";

import { BaseElement } from "../../core/element";

import styles from "./index.css";

const RESET_ANIMATING = {
  userChoice: 0,
  houseChoice: 0,
  result: 0,
  modeChange: 0,
};

export class RpsGame extends BaseElement {
  constructor() {
    super(styles);

    this.game = {
      inprogress: false,
    };
    this.animating = RESET_ANIMATING;
    this.userChoice = undefined;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.$buttons = this.shadowRoot.querySelectorAll(
      "player-option-btn[option]"
    );
    this.$polygon = this.shadowRoot.querySelector("player-option-polygon");
    this.$gameHouseElements =
      this.shadowRoot.querySelector("#game-in-progress");
    this.$houseBtn = this.shadowRoot.querySelector(
      "player-option-btn[house=true]"
    );
    this.$gameResult = this.shadowRoot.querySelector("#game-result");
    this.$gameResultTitle = this.shadowRoot.querySelector("#game-result-title");

    this.optionBtnEls = {};
    Array.from(this.$buttons).map((button) => {
      button.addEventListener("click", (e) => this.handleOnClick(e));
      this.optionBtnEls[button.getAttribute("option")] = button;
    });

    this.$gameResultPlay = this.shadowRoot.querySelector("#game-play-again");
    this.$gameResultPlay.addEventListener("click", this.reset);
  }

  disconnectedCallback() {
    this.$buttons.forEach((button) => {
      button.removeEventListener("click", (e) => this.handleOnClick(e));
    });
    this.$gameResultPlay.removeEventListener("click", this.reset);
  }

  emitUserChoice = (userChoice) => {
    this.shadowRoot.dispatchEvent(EventManager.getUserChoiceEvent(userChoice));
  };
  emitUserPlayAgain = () => {
    this.shadowRoot.dispatchEvent(EventManager.getUserPlayAgainEvent());
  };

  updateHouse = (option, color) => {
    this.$houseBtn.setAttribute("option", option);
    this.$houseBtn.setAttribute("color", color);
  };

  animateUntilResult = async (intervalTimeMs, result) => {
    for (const button of Array.from(this.$buttons)) {
      if (result && result.houseChoice == button.props.option) {
        const houseIdx = Game.instance.options.indexOf(result.houseChoice);
        this.updateHouse(
          Game.instance.options[houseIdx],
          Game.instance.colors[houseIdx]
        );
        return true;
      } else this.updateHouse(button.props.option, button.props.color);

      await Game.instance.sleep(intervalTimeMs / 3);
    }
  };

  animateHouseChoiceWhile = async (promise) => {
    return await new Promise((resolve) => {
      let result = undefined;

      const interval = setInterval(async () => {
        if (await this.animateUntilResult(this.animating.userChoice, result)) {
          clearInterval(interval);
          resolve(result);
        }

        promise.then((res) => (result = res));
      }, this.animating.userChoice);
    });
  };

  reset = () => {
    this.game.inprogress = false;
    this.animating = RESET_ANIMATING;
    this.optionBtnEls[this.userChoice].removeAttribute("selected");
    this.optionBtnEls[this.userChoice].removeAttribute("winner");
    this.$houseBtn.removeAttribute("winner");
    this.userChoice = undefined;
    this.$polygon.setAttribute("lines", true);
    this.emitUserPlayAgain();
    this.$gameResult.classList.remove("show-result");
    this.$gameHouseElements.classList.remove("show-house-pick");
    this.$buttons.forEach((button) => button.removeAttribute("selected"));
  };

  async handleOnClick(e) {
    if (this.game.inprogress) return;

    this.game.inprogress = true;
    this.userChoice = e.target.getAttribute("option");
    this.animating.userChoice = 1000;

    this.$buttons.forEach((btn) =>
      btn.setAttribute(
        "selected",
        btn.getAttribute("option") == this.userChoice
      )
    );
    this.$gameHouseElements.classList.add("show-house-pick");
    this.optionBtnEls[this.userChoice].setAttribute("selected", true);
    this.$polygon.setAttribute("lines", false);

    this.animating.houseChoice = 1000;
    const result = await this.animateHouseChoiceWhile(
      Game.default.play(this.userChoice)
    );
    if (result.winner === 1) {
      this.optionBtnEls[this.userChoice].setAttribute("winner", "true");
      this.$gameResultTitle.innerHTML = "You win";
    } else if (result.winner === -1) {
      this.$houseBtn.setAttribute("winner", "true");
      this.$gameResultTitle.innerHTML = "You lose";
    } else {
      this.$gameResultTitle.innerHTML = "Draw";
    }
    this.$gameResult.classList.add("show-result");
  }

  render() {
    return `
      <div class="game-area">
        <player-option-polygon lines="${!this.animating.userChoice > 0}">
          <player-option-btn color="blue" option="paper"></player-option-btn>
          <player-option-btn
            color="yellow"
            option="scissors"
          ></player-option-btn>
          <player-option-btn color="red" option="rock"></player-option-btn>
        </player-option-polygon>
        <div id="game-in-progress">
          <player-option-btn house="true"></player-option-btn>

          <div class="game-labels">
            <span class="user-label">YOU PICKED</span>
            <span class="house-label">THE HOUSE PICKED</span>
          </div>
        </div>
        <div id="game-result">
          <h2 id="game-result-title">You Lose</h2>

          <button id="game-play-again">Play again</button>
        </div>
      </div>
    `;
  }
}
