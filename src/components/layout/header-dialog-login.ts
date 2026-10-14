import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@awesome.me/webawesome/dist/components/dialog/dialog.js";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/input/input.js";
import "../icons/i-airbnb";

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

    wa-dialog::part(base button) {
      padding: 0;
      height: fit-content;
      border-radius: 9999px;
      width: fit-content;
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
  `;

  @property({ type: Boolean })
  open = false;

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
      <span class="dialog-logo">
        <i-airbnb></i-airbnb>
      </span>
      <h2 class="dialog-title">Inicia sesión o registrate</h2>
      <form class="dialog-form">
        <wa-input
          size="s"
          placeholder="Numero de telefono registrado"
        ></wa-input>
        <wa-button class="dialog-form-submit" size="xs">Continuar</wa-button>
      </form>
      <!-- <wa-button
        slot="footer"
        variant="brand"
        data-dialog="close"
        @click=${this.closeDialog}
        >Close</wa-button
      > -->
    </wa-dialog>`;
  }
}
