import { Game } from "../../classes/game";

import { BaseElement } from "../../core/element";
import { Component } from "../../constants/components.mjs";
import styles from "./index.css";

const TRANSITION_CONFIG = {
  userChoice: 1000,
  houseChoice: 1000,
  result: 1000,
  modeChange: 1000,
};

export class RpsGame extends BaseElement {
  constructor() {
    super(styles);

    this.state = {};
    this.state.inprogress = false;
    this.userChoice = undefined;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.$buttons = this.shadowRoot.querySelectorAll(
      `${Component.PlayerOptionBtn}[option]`
    );
    this.$polygon = this.shadowRoot.querySelector(
      Component.PlayerOptionPolygon
    );
    this.$gameHouseElements =
      this.shadowRoot.querySelector("#game-in-progress");
    this.$houseBtn = this.shadowRoot.querySelector(
      `${Component.PlayerOptionBtn}[house=true]`
    );
    this.$gameResult = this.shadowRoot.querySelector("#game-result");
    this.$gameResultTitle = this.shadowRoot.querySelector("#game-result-title");

    this.optionBtnEls = {};
    this.$buttons.forEach((button) => {
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

  updateHouse = (option, color) => {
    this.$houseBtn.setAttribute("option", option);
    this.$houseBtn.setAttribute("color", color);
  };

  animateUntilResult = async (result) => {
    for (const button of Array.from(this.$buttons)) {
      if (result && result.houseChoice == button.props.option) {
        const houseIdx = Game.instance.options.indexOf(result.houseChoice);
        this.updateHouse(
          Game.instance.options[houseIdx],
          Game.instance.colors[houseIdx]
        );
        return true;
      } else this.updateHouse(button.props.option, button.props.color);

      await Game.instance.sleep(TRANSITION_CONFIG.userChoice / 3);
    }
  };

  animateHouseChoiceWhile = async (promise) => {
    return await new Promise((resolve) => {
      let result = undefined;

      const interval = setInterval(async () => {
        if (await this.animateUntilResult(result)) {
          clearInterval(interval);
          resolve(result);
        }

        promise.then((res) => (result = res));
      }, TRANSITION_CONFIG.userChoice);
    });
  };

  reset = () => {
    this.state.inprogress = false;
    this.optionBtnEls[this.userChoice].removeAttribute("selected");
    this.optionBtnEls[this.userChoice].removeAttribute("winner");
    this.$houseBtn.removeAttribute("winner");
    this.userChoice = undefined;
    this.$polygon.setAttribute("lines", true);
    this.$gameResult.classList.remove("show-result");
    this.$gameHouseElements.classList.remove("show-house-pick");
    this.$buttons.forEach((button) => button.removeAttribute("selected"));
  };

  async handleOnClick(e) {
    if (this.state.inprogress) return;

    this.state.inprogress = true;
    this.userChoice = e.target.getAttribute("option");

    this.$buttons.forEach((btn) =>
      btn.setAttribute(
        "selected",
        btn.getAttribute("option") == this.userChoice
      )
    );
    this.$gameHouseElements.classList.add("show-house-pick");
    this.optionBtnEls[this.userChoice].setAttribute("selected", true);
    this.$polygon.setAttribute("lines", false);

    // consertar isso aqui
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
        <${Component.PlayerOptionPolygon} lines="true">
          <${Component.PlayerOptionBtn} color="blue" option="paper"></${Component.PlayerOptionBtn}>
          <${Component.PlayerOptionBtn}
            color="yellow"
            option="scissors"
          ></${Component.PlayerOptionBtn}>
          <${Component.PlayerOptionBtn} color="red" option="rock"></${Component.PlayerOptionBtn}>
        </${Component.PlayerOptionPolygon}>
        <div id="game-in-progress">
          <${Component.PlayerOptionBtn} house="true"></${Component.PlayerOptionBtn}>

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
