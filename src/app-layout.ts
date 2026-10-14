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
import "./page/user-host";

@customElement("app-layout")
export class AppLoyout extends LitElement {
  @state()
  private isProfilePage = false;
  private isUserHost = false;

  private router = new Router(this, [
    {
      path: "/",
      enter: (params) => {
        this.isProfilePage = false;
        this.isUserHost = false;
      },
      render: () => html`<home-page></home-page>`,
    },
    {
      path: "/users/profile",
      enter: (params) => {
        this.isProfilePage = true;
        this.isUserHost = false;
      },
      render: () => html`<user-profile></user-profile>`,
    },
    {
      path: "/hosting",
      enter: (params) => {
        this.isProfilePage = true;
        this.isUserHost = true;
      },
      render: () => html`<user-host></user-host>`,
    },
  ]);

  render() {
    return html`
      <header-layout
        .hideProfile=${this.isProfilePage}
        .hideHost=${this.isUserHost}
      ></header-layout>
      ${this.router.outlet()}
    `;
  }
}
