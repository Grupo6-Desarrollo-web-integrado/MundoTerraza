import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("i-user")
export class IUser extends LitElement {
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
      class="lucide lucide-circle-user-round preview-icon ${this.className}"
    >
      <path d="M17.925 20.056a6 6 0 0 0-11.851.001" />
      <circle cx="12" cy="11" r="4" />
      <circle cx="12" cy="12" r="10" />
    </svg>`;
  }
}
