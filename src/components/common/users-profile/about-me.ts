import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("about-me")
export class AboutMe extends LitElement {
  static styles = css`
    .profile-main-title {
      font-size: 2rem;
      font-weight: bold;
      margin-top: 0;
    }

    .profile-main-card {
      width: 33%;
      height: 14rem;
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
      border-radius: 16px;

      .profile-main-card-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;

        .profile-main-card-content-icon {
          font-size: 2.2rem;
          font-weight: bold;
          margin-top: 0;
          border-radius: 9999px;
          background-color: #f3f4f6;
          padding: 1.5rem 2.75rem;
        }

        p {
          font-size: 2.2rem;
          font-weight: bold;
          margin: 0;
        }
      }
    }
  `;

  render() {
    return html`<main class="container">
      <section class="profile-main-section">
        <h2 class="profile-main-title">Información sobre mí</h2>
        <div class="profile-main-card">
          <div class="profile-main-card-content">
            <span class="profile-main-card-content-icon">J</span>
            <p class='' >José</p>
            <p>Lima, Peru</p>
          </div>
        </div>
      </section>
    </main>`;
  }
}
