import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "@awesome.me/webawesome/dist/components/dialog/dialog.js";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/input/input.js";
import "../icons/i-airbnb";
import "./header-dialog-register";

@customElement("header-dialog-login")
export class HeaderDialogLogin extends LitElement {
  static styles = css`
    .dialog-logo {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dialog-title {
      text-align: center;
      margin-top: 0em;
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
      .dialog-form-submit {
        width: 100%;
        margin-top: 1rem;

        &::part(button) {
          background-color: #e7000b;
          color: white;
          font-size: 1rem;
          font-weight: bold;
          height: 3.25rem;
        }
      }
    }

    .dialog-text-register {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
      gap: 0.25rem;

      .dialog-text-register-parragraph {
        margin: 0;
      }

      .dialog-text-register-button::part(button) {
        padding: 0;
        height: fit-content;
        background-color: transparent;
        border: none;
        color: #e7000b;
        text-decoration: underline;
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

  @state()
  private isOpenRegister = false;

  private openRegister() {
    this.closeDialog();
    this.isOpenRegister = true;
  }

  private closeRegister() {
    this.isOpenRegister = false;
  }

  render() {
    return html`<wa-dialog
        label=""
        class="dialog-without-header"
        ?open=${this.open}
        @wa-after-hide=${this.closeDialog}
      >
        <span class="dialog-logo">
          <i-airbnb></i-airbnb>
        </span>
        <h2 class="dialog-title">Inicia sesión</h2>
        <form class="dialog-form">
          <wa-input
            size="s"
            placeholder="Numero de telefono o correo"
          ></wa-input>
          <wa-button class="dialog-form-submit" size="xs">Continuar</wa-button>
        </form>
        <div class="dialog-text-register">
          <p class="dialog-text-register-parragraph">No tienes una cuenta?</p>
          <wa-button
            class="dialog-text-register-button"
            @click=${this.openRegister}
            >registrate</wa-button
          >
        </div>
      </wa-dialog>
      <header-dialog-register
        ?open=${this.isOpenRegister}
        @onClose=${this.closeRegister}
      ></header-dialog-register> `;
  }
}
