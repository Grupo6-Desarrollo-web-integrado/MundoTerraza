import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./header-search";
import "./header-profile";

@customElement("header-layout")
export class HeaderLayout extends LitElement {
  static styles = css`
    header {
      padding: var(--padding-page);

      .header-stack {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-title {
        /* width: 300px;
      height: 300px; */
        margin: 0;

        .header-title-image {
          width: 6.5rem;
          height: 2rem;
          object-fit: center;
          aspect-ratio: 1;
        }
      }
    }
  `;

  @property({ type: Boolean })
  hideProfile = false;

  render() {
    return html`<header>
      <div class="header-stack">
        <div class="header-title">
          <img
            class="header-title-image"
            src="/airbnb_logo.webp"
            alt="Airbnb logo"
          />
        </div>
        ${this.hideProfile ? "" : html`<header-search></header-search>`}
        <header-profile></header-profile>
      </div>
    </header>`;
  }
}
