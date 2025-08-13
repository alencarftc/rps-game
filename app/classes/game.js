const DEFAULT_OPTIONS = ["rock", "paper", "scissors"];
const DEFAULT_RULES = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};

const BONUS_OPTIONS = ["rock", "paper", "scissors", "lizard", "spock"];
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

  play(userChoice) {
    this.loading = true;

    const houseChoice = this.generateHouseChoice();
    let result = this.checkWinner(userChoice, houseChoice);
    // show winner here

    let timeout = setTimeout(() => {
      this.loading = false;

      console.log(result);
      clearTimeout(timeout);
    }, 2000);
  }

  generateHouseChoice() {
    return this.options[Math.floor(Math.random() * this.options.length)];
  }

  checkWinner(userChoice, houseChoice) {
    const calculation =
      this.mode === GameMode.Default
        ? this.rules[userChoice] == houseChoice
        : this.rules[userChoice].includes(houseChoice);

    if (calculation) {
      return 1;
    } else if (userChoice === houseChoice) {
      return 0;
    } else {
      return -1;
    }
  }
}
