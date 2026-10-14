import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "../../icons/i-messages";

@customElement("my-reviews")
export class MyReviews extends LitElement {
  static styles = css`
    .container {
      border-top: 1px solid #d1d5dc;
      padding-top: 1.75rem;

      .button-show-reviews {
        width: 100%;
      }
      .button-show-reviews::part(base button) {
        justify-content: start;
        background-color: transparent;
        font-weight: 600;
        color: #1e2939;
        display: flex;
        align-items: center;
      }
      .button-show-reviews::part(label) {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .button-show-reviews::part(base button):hover {
        background-color: #f3f4f6;
      }
    }
  `;

  render() {
    return html`
      <aside class="container">
        <wa-button class="button-show-reviews">
          <i-messages width="20" height="20"></i-messages>
          Mostrar resenas escritas por mi</wa-button
        >
      </aside>
    `;
  }
}
