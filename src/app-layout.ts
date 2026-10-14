import "@awesome.me/webawesome/dist/styles/webawesome.css";
import "@awesome.me/webawesome/dist/styles/themes/awesome.css";
import "@awesome.me/webawesome/dist/styles/native.css";
import "@awesome.me/webawesome/dist/styles/utilities.css";

import { Router } from "@lit-labs/router";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./components/layout/header-layout";
import "./page/home-page";
import "./page/user-profile";

@customElement("app-layout")
export class AppLoyout extends LitElement {
  @state()
  private isProfilePage = false;

  private router = new Router(this, [
    {
      path: "/",
      enter: (params) => {
        this.isProfilePage = false;
      },
      render: () => html`<home-page></home-page>`,
    },
    {
      path: "/users/profile",
      enter: (params) => {
        this.isProfilePage = true;
      },
      render: () => html`<user-profile></user-profile>`,
    },
  ]);

  render() {
    return html`
      <header-layout .hideProfile=${this.isProfilePage}></header-layout>
      ${this.router.outlet()}
    `;
  }
}
