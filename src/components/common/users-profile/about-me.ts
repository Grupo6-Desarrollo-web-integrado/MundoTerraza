import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "@awesome.me/webawesome/dist/components/button/button.js";

@customElement("about-me")
export class AboutMe extends LitElement {
  static styles = css`
    .container {
      padding-bottom: 1.75rem;
    }
    .profile-main-title-container {
      display: flex;
      align-items: center;
      column-gap: 1rem;
      margin-bottom: 1rem;

      .profile-main-title {
        font-size: 2rem;
        font-weight: bold;
        margin: 0;
      }

      .profile-main-button::part(base button) {
        justify-content: start;
        background-color: #f3f4f6;
        font-weight: bold;
        display: flex;
        align-items: center;
        height: 2rem;
      }
    }

    .profile-main-body {
      display: flex;
      align-items: center;
      column-gap: 3rem;

      .profile-main-card {
        width: 60%;
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
            background-color: #dcfce7;
            padding: 1.5rem 2.75rem;
            color: #5c886c;
          }

          .profile-main-card-content-name {
            font-size: 2.2rem;
            font-weight: bold;
            margin: 0;
          }

          .profile-main-card-content-mode {
            color: #6a7282;
            font-size: 0.8rem;
            margin-top: -0.5rem;
          }
        }
      }

      .profile-complete-section {
        h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
        }

        p {
          line-height: 1.25;
          color: #6a7282;
          font-size: 0.9rem;
          width: 70%;
        }

        wa-button::part(base button) {
          justify-content: start;
          background-color: var(--color-primary);
          font-weight: bold;
          font-size: 0.9rem;
          height: 3rem;
          border-radius: 1rem;
          color: white;
        }
      }
    }
  `;

  render() {
    return html`<main class="container">
      <section class="profile-main-section">
        <div class="profile-main-title-container">
          <h2 class="profile-main-title">Información sobre mí</h2>
          <wa-button class="profile-main-button" size="xs">Editar</wa-button>
        </div>

        <div class="profile-main-body">
          <div class="profile-main-card">
            <div class="profile-main-card-content">
              <span class="profile-main-card-content-icon">J</span>
              <p class="profile-main-card-content-name">José</p>
              <p class="profile-main-card-content-mode">Huesped</p>
            </div>
          </div>
          <div class="profile-complete-section">
            <h3>Completa tu perfil</h3>
            <p>
              Tu perfil en Airbnb es una parte importante de todas las
              reservaciones. Completa el tuyo para que los demás anfitriones y
              huéspedes te conozcan mejor.
            </p>
            <wa-button class="profile-complete-button" size="xs"
              >Comencemos</wa-button
            >
          </div>
        </div>
      </section>
    </main>`;
  }
}
