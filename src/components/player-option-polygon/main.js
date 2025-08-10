customElements.define(
  "player-option-polygon",
  class PlayerOptionPolygon extends HTMLElement {
    _canShowLines = false;

    constructor() {
      super();

      this._canShowLines = this.getAttribute("canShowLines");

      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      const slot = document.createElement("slot");

      const wrapper = document.createElement("div");
      wrapper.classList.add("polygon-container");

      const linkEl = document.createElement("link");
      linkEl.setAttribute("rel", "stylesheet");
      linkEl.setAttribute("type", "text/css");
      linkEl.setAttribute(
        "href",
        "./src/components/player-option-polygon/index.css"
      );

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");

      wrapper.appendChild(slot);
      wrapper.appendChild(svg);
      this.shadowRoot.append(svg, linkEl, wrapper);

      requestAnimationFrame(() => this.updateLayout(svg));
    }

    updateLayout(svg) {
      const assignedNodes = this.shadowRoot
        .querySelector("slot")
        .assignedElements();

      const count = assignedNodes.length;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const radius = 105;

      let points = [];
      const baseAngle = -1.05;
      assignedNodes.forEach((btn, i) => {
        const angle = (i / count) * (2 * Math.PI) - Math.PI / 2 + baseAngle;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;

        points.push({ x, y });
      });

      while (svg.firstChild) svg.removeChild(svg.firstChild);

      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttribute("x1", p1.x);
        line.setAttribute("y1", p1.y);
        line.setAttribute("x2", p2.x);
        line.setAttribute("y2", p2.y);
        line.setAttribute("stroke", "#0f253d");
        line.setAttribute("stroke-width", "16");

        svg.appendChild(line);
      }
    }
  }
);
