import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "../icons/i-menu";
import "../icons/i-user";
import "./header-dialog-login";

@customElement("header-profile")
export class HeaderProfile extends LitElement {
  static styles = css`
    .header-stack {
      display: flex;
      align-items: center;
      column-gap: 0.75rem;

      .header-stack-action {
        font-size: 0.875rem;
        font-weight: bold;
        margin-right: 1rem;
      }

      wa-button::part(button) {
        padding: 0.35rem 0.5rem;
        height: fit-content;
        border-radius: 9999px;
        /* background-color: #dcfce7; */
        background-color: #f3f4f6;
      }

      /* .header-stack-menu {
        padding: 0.75rem;
        border-radius: 9999px;
        background-color: #f3f4f6;

        .header-stack-menu-icon {
          display: flex;
        }
      } */
    }
  `;

  @state()
  private dialogOpen = false;

  private openDialog() {
    this.dialogOpen = true;
  }

  private closeDialog() {
    this.dialogOpen = false;
  }

  render() {
    return html`<div class="header-stack">
        <span class="header-stack-action">Modo anfitrión</span>
        <!-- <span class="header-stack-profile">J</span> -->
        <wa-button
          size="xs"
          class="header-stack-profile"
          @click=${this.openDialog}
        >
          <i-user
            class="header-stack-profile-icon"
            width="20"
            height="20"
          ></i-user>
        </wa-button>
        <wa-button class="header-stack-menu">
          <i-menu
            class="header-stack-menu-icon"
            width="20"
            height="20"
          ></i-menu>
        </wa-button>
      </div>
      <header-dialog-login
        ?open=${this.dialogOpen}
        @onClose=${this.closeDialog}
      ></header-dialog-login> `;
  }
}
