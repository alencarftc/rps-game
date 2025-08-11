"use strict";

customElements.define(
  "player-option-polygon",
  class PlayerOptionPolygon extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });

      this.points = [];
      this.rect = { width: 400, height: 400 };
      this.baseAngle = -1.05;
      this.radius = 105;
      this.canDrawLines = this.getAttribute("lines") || true;
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = this.render();

      requestAnimationFrame(() => {
        const points = this.updateLayout();

        if (this.canDrawLines) {
          this.drawLines(points);
        }
      });
    }

    updateLayout() {
      const buttons = Array.from(this.children);
      const count = buttons.length;
      return buttons.map((btn, index) => {
        const { x, y } = this.getPoint(count, index);

        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;

        return { x, y };
      });
    }

    drawLines(points) {
      const lines = points.map((p1, i) => {
        const p2 = points[(i + 1) % points.length];

        return `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#0f253d" stroke-width="16"></line>`;
      });

      this.shadowRoot.querySelector("#polygon").innerHTML = lines.join("");
    }

    getPoint(count, index) {
      const centerX = this.rect.width / 2;
      const centerY = this.rect.height / 2;

      const angle =
        (index / count) * (2 * Math.PI) - Math.PI / 2 + this.baseAngle;

      return {
        x: centerX + this.radius * Math.cos(angle),
        y: centerY + this.radius * Math.sin(angle),
      };
    }

    render() {
      return `
      <style>
        @import "./src/components/player-option-polygon/index.css";
      </style>
      <div
        class="polygon-container" style='width: ${this.rect.width}px
        ; height: ${this.rect.height}px' 
      >
        <slot></slot>
        <svg id="polygon" style="width: '100%'; height: '100%'"></svg>
      </div>
    `;
    }
  }
);
