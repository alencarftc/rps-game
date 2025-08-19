import { OPTIONS_ICONS } from "../assets/options";

export const DEFAULT_OPTIONS = ["rock", "paper", "scissors"];
export const DEFAULT_OPTIONS_COLORS = ["red", "blue", "yellow"];
export const DEFAULT_RULES = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};
export const DEFAULT_OPTIONS_ICONS = {
  rock: OPTIONS_ICONS.RockIcon,
  scissors: OPTIONS_ICONS.ScissorsIcon,
  paper: OPTIONS_ICONS.PaperIcon,
};

export const BONUS_OPTIONS = ["rock", "paper", "scissors", "lizard", "spock"];
export const BONUS_OPTIONS_COLORS = ["red", "blue", "yellow", "cyan", "purple"];
export const BONUS_RULES = {
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  rock: ["lizard", "scissors"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};
export const BONUS_OPTIONS_ICONS = {
  paper: OPTIONS_ICONS.PaperIcon,
  scissors: OPTIONS_ICONS.ScissorsIcon,
  rock: OPTIONS_ICONS.RockIcon,
  lizard: OPTIONS_ICONS.LizardIcon,
  spock: OPTIONS_ICONS.SpockIcon,
};
