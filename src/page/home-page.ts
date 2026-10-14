import "@awesome.me/webawesome/dist/components/card/card.js";
import "@awesome.me/webawesome/dist/components/carousel/carousel.js";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../components/common/home-page/home-card";
import "../components/common/home-page/home-filters";

@customElement("home-page")
export class HomePage extends LitElement {
  static styles = css`
    main {
      padding: var(--padding-page);
    }

    .container {
      display: grid;
      grid-template-columns: repeat(6, minmax(200px, 1fr));
      column-gap: 0.5rem;
    }

    @media (max-width: 992px) {
      .container {
        grid-template-columns: repeat(4, minmax(200px, 1fr));
      }
    }
    @media (max-width: 768px) {
      .container {
        grid-template-columns: repeat(2, minmax(200px, 1fr));
      }
    }
    @media (max-width: 576px) {
      .container {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
    }
  `;

  render() {
    return html`
      <home-filters></home-filters>
      <main>
        <div class="container">
          <home-card></home-card>
        </div>
      </main>
    `;
  }
}
