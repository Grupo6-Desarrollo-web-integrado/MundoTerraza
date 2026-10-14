import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "../../icons/i-weaves";
import "../../icons/i-beach";
import "../../icons/i-camping";
import "../../icons/i-filter";

@customElement("home-filters")
export class HomeFilters extends LitElement {
  static styles = css`
    .container {
      padding: var(--padding-page);

      .filter-content {
        display: flex;
        justify-content: center;
        align-items: center;

        .filter-list {
          display: flex;
          align-items: center;
          gap: 3rem;
          margin: 0;
          padding: 0;

          .filter-list-item {
            list-style: none;
            font-size: 0.875rem;
            font-weight: bold;

            span {
              display: block;
              text-align: center;
            }
          }
        }

        wa-button {
          align-self: right;
        }

        wa-button::part(button) {
          color: #26314f;
          font-size: 0.875rem;
          font-weight: bold;
          border-width: 1px;
          border-color: #d1d5dc;
          height: 2.75rem;
        }
      }
    }
  `;

  render() {
    return html`
      <section class="container">
        <div class="filter-content">
          <ul class="filter-list">
            ${nav.map(
              (item) =>
                html`<li class="filter-list-item">
                  <span>${item.icon} </span>
                  ${item.name}
                </li>`,
            )}
          </ul>
          <!-- <span> </span> -->
          <!-- <wa-button size="xs" appearance="outlined">
            <i-filter width="14" height="14"></i-filter>
            Filtros
          </wa-button> -->
        </div>
      </section>
    `;
  }
}

const nav = [
  { name: "Frente al lago", icon: html`<i-weaves></i-weaves>` },
  { name: "Playa", icon: html`<i-beach></i-beach>` },
  { name: "Cabañas", icon: html`<i-camping></i-camping>` },
  { name: "OMG!", icon: html`<i-beach></i-beach>` },
  { name: "Acampar", icon: html`<i-camping></i-camping>` },
  { name: "Minicasa", icon: html`<i-camping></i-camping>` },
];
