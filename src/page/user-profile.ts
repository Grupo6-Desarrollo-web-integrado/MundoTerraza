import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../components/common/users-profile/profile-sidebar";
import "../components/common/users-profile/about-me";

@customElement("user-profile")
export class UserProfile extends LitElement {
  static styles = css`
    .container {
      display: flex;
      height: 55rem;

      .second-content {
        width: 70%;
        border-top: 1px solid #d1d5dc;
        padding: 1.75rem 10rem 0;
      }
    }
  `;

  render() {
    return html`
      <div class="container">
        <profile-sidebar></profile-sidebar>
        <div class="second-content">
          <about-me></about-me>
          <aside></aside>
        </div>
      </div>
    `;
  }
}
