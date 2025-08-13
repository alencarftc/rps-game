import { ComponentRegistry } from "./component-registry";
import { HomeComponent } from "../pages/home/home.comp";
import { PlayerOptionPolygon } from "../components/player-option-polygon/index.mjs";
import { PlayerOptionBtn } from "../components/player-option-btn/index.mjs";
import { AppHeader } from "../components/app-header/index.mjs";
import { RpsGame } from "../components/rps-game/index.mjs";

import "../styles/modern-normalize.css";
import "../styles/theme.css";

export class Core {
  constructor() {
    if (!Core.inst) {
      Core.inst = this;
    } else {
      throw new Error("use instance");
    }

    ComponentRegistry.register(components);

    return Core.inst;
  }

  static get instance() {
    return Core.inst;
  }
}

Core.inst = null;

const components = [
  {
    tagName: "player-option-polygon",
    component: PlayerOptionPolygon,
  },
  {
    tagName: "player-option-btn",
    component: PlayerOptionBtn,
  },
  {
    tagName: "app-header",
    component: AppHeader,
  },
  {
    tagName: "rps-game",
    component: RpsGame,
  },
  {
    tagName: "rps-game-home",
    component: HomeComponent,
  },
];
