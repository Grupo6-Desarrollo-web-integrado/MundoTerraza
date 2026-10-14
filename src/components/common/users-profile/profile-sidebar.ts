import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("profile-sidebar")
export class ProfileSidebar extends LitElement {
  static styles = css`
    :host {
      width: 35%;
    }

    .profile-sidebar {
      padding: 1.75rem 8rem;
      height: 100%;
      border-top: 1px solid #d1d5dc;
      border-right: 1px solid #d1d5dc;

      .profile-sidebar-title {
        font-size: 2rem;
        font-weight: bold;
        margin-top: 0;
      }

      .profile-sidebar-list {
        padding: 0;

        .profile-sidebar-list-item {
          font-weight: bold;
          list-style: none;
          border-radius: 16px;  
          background-color: #f3f4f6;
          padding: 0.5rem 1.5rem;
        }
      }
    }
  `;

  render() {
    return html`<section class="profile-sidebar">
      <h2 class="profile-sidebar-title">Perfil</h2>
      <ul class="profile-sidebar-list">
        <li class="profile-sidebar-list-item">Información sobre mi</li>
      </ul>
    </section>`;
  }
}
