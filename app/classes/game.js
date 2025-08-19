import * as Config from "../constants/game.mjs";

const GameMode = {
  Default: "default",
  Bonus: "bonus",
};

export class Game {
  instance;

  constructor(mode) {
    this.loading = false;
    this.mode = mode;
  }

  static get default() {
    if (!Game.instance) {
      this.instance = new Game(GameMode.Default);
    }

    return this.instance;
  }

  static get bonus() {
    if (!Game.instance) {
      this.instance = new Game(GameMode.Bonus);
    }

    return this.instance;
  }

  get options() {
    return {
      [GameMode.Default]: Config.DEFAULT_OPTIONS,
      [GameMode.Bonus]: Config.BONUS_OPTIONS,
    }[this.mode];
  }

  get rules() {
    return {
      [GameMode.Default]: Config.DEFAULT_RULES,
      [GameMode.Bonus]: Config.BONUS_RULES,
    }[this.mode];
  }

  get colors() {
    return {
      [GameMode.Default]: Config.DEFAULT_OPTIONS_COLORS,
      [GameMode.Bonus]: Config.BONUS_OPTIONS_COLORS,
    }[this.mode];
  }

  get icons() {
    return {
      [GameMode.Default]: Config.DEFAULT_OPTIONS_ICONS,
      [GameMode.Bonus]: Config.BONUS_OPTIONS_ICONS,
    }[this.mode];
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async play(userChoice) {
    this.loading = true;
    await this.sleep(3000);

    const houseChoice = this.generateHouseChoice();
    let result = this.checkWinner(userChoice, houseChoice);

    this.loading = false;

    return result;
  }

  isUserWinner(userChoice, houseChoice) {
    return this.mode === GameMode.Default
      ? this.rules[userChoice] == houseChoice
      : this.rules[userChoice].includes(houseChoice);
  }

  generateHouseChoice() {
    return this.options[Math.floor(Math.random() * this.options.length)];
  }

  checkWinner(userChoice, houseChoice) {
    if (userChoice === houseChoice) {
      return { winner: 0, houseChoice };
    }

    const userWins = this.isUserWinner(userChoice, houseChoice);
    const winner = userWins ? 1 : -1;
    return { winner, houseChoice };
  }
}
