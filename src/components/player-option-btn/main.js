customElements.define(
  "player-option-btn",
  class PlayerOptionBtn extends HTMLElement {
    constructor() {
      super();

      const option = this.getAttribute("option");
      if (!option) {
        console.error("Property 'id' is undefined");
        return;
      }

      const color = this.getAttribute("color");
      if (!color) {
        console.error("Property 'color' is undefined");
        return;
      }

      const wrapper = document.createElement("button");
      wrapper.classList.add("player-option");
      wrapper.classList.add(`player-option--${color}`);
      wrapper.setAttribute("id", option);

      const imageContainerEl = document.createElement("div");
      imageContainerEl.classList.add("player-option-image-container");

      const imageEl = document.createElement("img");
      imageEl.setAttribute("src", `./assets/images/icon-${option}.svg`);
      imageEl.setAttribute("alt", "Paper");

      imageContainerEl.appendChild(imageEl);
      wrapper.appendChild(imageContainerEl);
      const linkEl = document.createElement("link");
      linkEl.setAttribute("rel", "stylesheet");
      linkEl.setAttribute("type", "text/css");
      linkEl.setAttribute(
        "href",
        "./src/components/player-option-btn/index.css"
      );

      this.attachShadow({ mode: "open" }).append(linkEl, wrapper);
    }
  }
);
