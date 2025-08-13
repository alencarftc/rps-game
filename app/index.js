import "@webcomponents/webcomponentsjs/webcomponents-lite";
import { Core } from "./core";

class App {
  constructor() {
    new Core();
  }
}

if (
  "registerElement" in document &&
  "import" in document.createElement("link") &&
  "content" in document.createElement("template")
) {
  // platform is good!
  new App();
} else {
  setTimeout(() => {
    new App();
  });
}
