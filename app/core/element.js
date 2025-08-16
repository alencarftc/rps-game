export class BaseElement extends HTMLElement {
  constructor(sheetStr, mode = "open") {
    super();

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(sheetStr);

    this.attachShadow({ mode });
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }
}
