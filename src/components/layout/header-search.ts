import { LitElement, css, html, type CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import "./../icons/i-search";

@customElement("header-search")
export class HeaderSearch extends LitElement {
  static styles = css`
    .header-stack {
      border-radius: 2rem;
      border: 1px solid #d1d5dc;
      padding: 0 0.5rem;

      .header-stack-content {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        font-weight: 700;

        div span {
          border-right: 1px solid #d1d5dc;
          padding: 0 1rem;
        }

        & > div:first-child span {
          padding-left: 0;
        }

        & > div:last-child span {
          border-right: none;
          padding-right: 0;
        }
        .header-stack-destiny {
          display: flex;
          align-items: center;

          .header-stack-destiny-image {
            width: 2.5rem;
            height: 2.5rem;
            object-fit: cover;
            aspect-ratio: 1;
            flex-shrink: 0;
          }

          span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        .header-stack-quantity {
          display: flex;
          column-gap: 1rem; 
          align-items: center;

          .header-stack-quantity-icon {
            text-align: center;
            height: 100%;
            border-radius: 9999px;
            background-color: #e7000b;
            padding: 0.5rem;

            .header-stack-quantity-icon-content {
              display: flex;
              color: white;
            }
          }
        }
      }
    }
  `;

  render() {
    return html`<div class="header-stack">
      <div class="header-stack-content">
        <div class="header-stack-destiny">
          <img
            class="header-stack-destiny-image"
            src="/casa-airbnb-layout.avif"
            alt="Imagen de destino"
          />
          <span>En cualquier lugar del mundo</span>
        </div>
        <div class="header-stack-date">
          <span>Cualquier fecha</span>
        </div>
        <div class="header-stack-quantity">
          <span>Cuantos ?</span>
          <span class="header-stack-quantity-icon">
            <i-search class="header-stack-quantity-icon-content" width="20" height="20"></i-search>
          </span>
        </div>
      </div>
    </div>`;
  }
}
