import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("i-menu")
export class IMenu extends LitElement {
  @property({ type: String })
  width = "24";

  @property({ type: String })
  height = "24";

  render() {
    return html`<svg
      class="${this.className}"
      xmlns="http://www.w3.org/2000/svg"
      width=${this.width}
      height=${this.height}
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
    </svg> `;
  }
}
