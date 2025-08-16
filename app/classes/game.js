const DEFAULT_OPTIONS = ["rock", "paper", "scissors"];
const DEFAULT_OPTIONS_COLORS = ["red", "blue", "yellow"];
const DEFAULT_RULES = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};

const BONUS_OPTIONS = ["rock", "paper", "scissors", "lizard", "spock"];
const BONUS_OPTIONS_COLORS = ["red", "blue", "yellow", "cyan", "purple"];

const BONUS_RULES = {
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  rock: ["lizard", "scissors"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};

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
    return this.mode === GameMode.Default ? DEFAULT_OPTIONS : BONUS_OPTIONS;
  }
  get rules() {
    return this.mode === GameMode.Default ? DEFAULT_RULES : BONUS_RULES;
  }
  get colors() {
    return this.mode === GameMode.Default
      ? DEFAULT_OPTIONS_COLORS
      : BONUS_OPTIONS_COLORS;
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

  generateHouseChoice() {
    return this.options[Math.floor(Math.random() * this.options.length)];
  }

  checkWinner(userChoice, houseChoice) {
    let winner = 0;
    const calculation =
      this.mode === GameMode.Default
        ? this.rules[userChoice] == houseChoice
        : this.rules[userChoice].includes(houseChoice);

    if (calculation) {
      winner = 1;
    } else if (userChoice === houseChoice) {
      winner = 0;
    } else {
      winner = -1;
    }

    return { winner, houseChoice };
  }
}
