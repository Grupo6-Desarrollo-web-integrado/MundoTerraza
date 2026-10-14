import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("i-filter")
export class IFilter extends LitElement {
  @property({ type: String })
  width = "24";

  @property({ type: String })
  height = "24";

  render() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width=${this.width}
      height=${this.height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-sliders-horizontal preview-icon ${this.className}"
    >
      <path d="M10 5H3" />
      <path d="M12 19H3" />
      <path d="M14 3v4" />
      <path d="M16 17v4" />
      <path d="M21 12h-9" />
      <path d="M21 19h-5" />
      <path d="M21 5h-7" />
      <path d="M8 10v4" />
      <path d="M8 12H3" />
    </svg>`;
  }
}
