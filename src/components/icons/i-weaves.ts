import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("i-weaves")
export class IWeaves extends LitElement {
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
      class="lucide lucide-waves-horizontal preview-icon ${this.className}"
    >
      <path d="M2 12q2.5 2 5 0t5 0 5 0 5 0" />
      <path d="M2 19q2.5 2 5 0t5 0 5 0 5 0" />
      <path d="M2 5q2.5 2 5 0t5 0 5 0 5 0" />
    </svg>`;
  }
}
