import { ComponentRegistry } from "./component-registry";
import { HomeComponent } from "../pages/home/home.comp";
import { PlayerOptionPolygon } from "../components/player-option-polygon/index.mjs";
import { PlayerOptionBtn } from "../components/player-option-btn/index.mjs";
import { AppHeader } from "../components/app-header/index.mjs";
import { RpsGame } from "../components/rps-game/index.mjs";

import { Component } from "../constants/components.mjs";

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
    tagName: Component.PlayerOptionPolygon,
    component: PlayerOptionPolygon,
  },
  {
    tagName: Component.PlayerOptionBtn,
    component: PlayerOptionBtn,
  },
  {
    tagName: Component.AppHeader,
    component: AppHeader,
  },
  {
    tagName: Component.RpsGame,
    component: RpsGame,
  },
  {
    tagName: Component.HomeComponent,
    component: HomeComponent,
  },
];
