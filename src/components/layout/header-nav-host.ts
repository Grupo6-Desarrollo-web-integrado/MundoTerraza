import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("header-nav-host")
export class HeaderNavHost extends LitElement {
  static styles = css`
    .header-nav-host {
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 1rem;

      .header-nav-host-list {
        display: flex;
        column-gap: 2rem;
        align-items: center;
        list-style: none;

        .list-item {
          font-size: 0.875rem;
          font-weight: bold;

          a {
            color: #6a7282;
            text-decoration: none;
            cursor: pointer;
          }

          .active {
            color: #030712;
            border-bottom: 1px solid #030712;
          }
        }
      }
    }
  `;

  render() {
    const current_path = window.location.pathname;

    return html`<nav class="header-nav-host">
      <ul class="header-nav-host-list">
        <li class="list-item"><a class="active" href="#">Hoy</a></li>
        <li class="list-item"><a href="#">Calendario</a></li>
        <li class="list-item"><a href="#">Anuncios</a></li>
        <li class="list-item"><a href="#">Mensajes</a></li>
      </ul>
    </nav>`;
  }
}
