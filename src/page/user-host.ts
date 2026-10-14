import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("user-host")
export class UserHost extends LitElement {
  static styles = css`
    .container {
      padding: var(--padding-page);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .button-container {
      display: flex;
      justify-content: center;
      column-gap: 1rem;
      margin-bottom: 8rem;

      .button {
        &::part(base button) {
          border-radius: 2rem;
          font-size: 0.9rem;
          height: 3rem;
        }

        &.button-primary::part(base button) {
          background-color: #404040;
          color: white;
        }

        &.button-secondary::part(base button) {
          background-color: #f3f4f6;
          color: #404040;
        }
      }
    }

    .info-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      h2 {
        font-size: 2rem;
        width: 70%;
        text-align: center;
        line-height: 1.05;
        margin-bottom: 0;
      }

      p {
        color: var(--color-gray-light);
        font-size: 1.2rem;
        font-weight: 600;
        width: 60%;
        line-height: 1.25;
        margin-bottom: 3rem;
      }

      wa-button::part(base button) {
        justify-content: start;
        background-color: #f3f4f6;
        font-weight: bold;
        font-size: 0.9rem;
        height: 3rem;
        border-radius: 1rem;
      }
    }
  `;

  render() {
    return html` <main class="container">
      <div>
        <div class="button-container">
          <wa-button class="button button-primary" size="xs">Hoy</wa-button>
          <wa-button class="button button-secondary" size="xs"
            >Reservaciones programadas</wa-button
          >
        </div>
        <div class="info-container">
          <img src="/book-user.avif" alt="Imagen de libro" />
          <h2>No tienes </br> ninguna reservacion</h2>
          <p>
            Para recibir reservaciones, tienes que completar tu anuncio y
            publicarlo.
          </p>
          <wa-button>Completa tu anuncio</wa-button>
        </div>
      </div>
    </main>`;
  }
}
