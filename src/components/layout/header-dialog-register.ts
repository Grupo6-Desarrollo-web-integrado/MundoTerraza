import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@awesome.me/webawesome/dist/components/dialog/dialog.js";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/input/input.js";
import "../icons/i-airbnb";

@customElement("header-dialog-register")
export class HeaderDialogRegister extends LitElement {
  static styles = css`
    .dialog-title {
      text-align: center;
      margin: 0em;
    }

    .dialog-description {
      margin-top: 0.5rem;
      font-weight: 600;
      color:#6a7282;
      line-height: 1.25;
      text-align: center;
    }

    wa-dialog::part(close-button__base) {
      height: fit-content;
      width: 2rem;
      padding: 0;
      border-radius: 9999px;
      margin-right: 1rem;
      margin-top: 0.5rem;
    }

    .dialog-form {
      .dialog-form-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;

        .dialog-form-label {
          font-weight: bold;
        }

        .dialog-form-input-name::part(base input-wrapper) {
          border-radius: 10px 10px 0 0;
          bottom: -1px;
        }
        .dialog-form-input-lastname::part(base input-wrapper) {
          border-radius: 0 0 10px 10px;
          top: -1px;
        }
      }

      .dialog-form-submit {
        width: 100%;
        margin-top: 1rem;

        &::part(base button) {
          background-color: #1b1b1b;
          color: white;
          font-size: 1rem;
          font-weight: bold;
          height: 3.25rem;
        }
      }
    }
  `;

  @property({ type: Boolean })
  open = false;

  @property({ attribute: false })
  onClose = () => {};

  private closeDialog() {
    this.dispatchEvent(
      new CustomEvent("onClose", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`<wa-dialog
      label=""
      class="dialog-without-header"
      ?open=${this.open}
      @wa-after-hide=${this.closeDialog}
    >
      <h2 class="dialog-title">Ahora creemos tu cuenta</h2>
      <p class="dialog-description">
        Esta informacion es obligatoria para reservar o anfitrionar
      </p>
      <form class="dialog-form">
        <div class="dialog-form-container">
          <span class="dialog-form-label">Nombre legal</span>
          <div>
            <wa-input
              class="dialog-form-input-name"
              size="s"
              placeholder="Nombre"
            ></wa-input>
            <wa-input
              class="dialog-form-input-lastname"
              size="s"
              placeholder="Apellido"
            ></wa-input>
          </div>
        </div>
        <div class="dialog-form-container">
          <span class="dialog-form-label">Fecha de nacimiento</span>
          <wa-input
            class="dialog-form-input-date"
            size="s"
            placeholder="Selecciona una fecha"
          ></wa-input>
        </div>
        <div class="dialog-form-container">
          <span class="dialog-form-label">Contraseña</span>
          <wa-input
            class="dialog-form-input-password"
            size="s"
            placeholder="Contraseña"
          ></wa-input>
        </div>
        <wa-button class="dialog-form-submit" size="xs">Continuar</wa-button>
      </form>
    </wa-dialog> `;
  }
}
