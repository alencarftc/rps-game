import { Component } from "../../constants/components.mjs";
import { BaseElement } from "../../core/element";
import styles from "./index.css";

export class HomeComponent extends BaseElement {
  constructor() {
    super(styles);
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
  }

  render() {
    return `
      <div class="app-container">
        <${Component.AppHeader}></${Component.AppHeader}>
        <${Component.RpsGame}></${Component.RpsGame}>
        <button id="btn-rules">Rules</button>
      </div>
    `;
  }
}
