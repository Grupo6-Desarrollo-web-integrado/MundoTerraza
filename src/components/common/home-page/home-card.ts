import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("home-card")
export class HomeCard extends LitElement {
  static styles = css`
    ::part(body) {
      padding: 0rem;
    }

    .wa-c {
      position: relative;

      .block {
        display: block;
      }

      img {
        width: 100%;
        height: max-content;
        object-fit: contain;
      }

      .bold-title {
        font-weight: var(--wa-font-weight-bold);
      }
    }

    wa-carousel {
      margin: -1rem;
    }

    wa-carousel::part(pagination) {
      position: absolute;
      top: -2.5rem;
      left: 50%;
      transform: translateX(-50%);
      gap: 0.5rem;
    }

    wa-carousel::part(pagination-item) {
      width: 0.5rem;
      height: 0.5rem;
    }

    wa-carousel-item {
      height: fit-content;
      width: 100%;
    }
  `;

  render() {
    return html` <wa-card class="wa-c" appearance="plain">
      <!-- <div class="mouse-dragging"> -->
      <wa-carousel pagination style="--aspect-ratio: 3/2;">
        <wa-carousel-item>
          <img
            slot="media"
            src="https://a0.muscache.com/im/pictures/hosting/Hosting-1729153232530544937/original/31ec7628-ecc7-42f8-86e4-97b7090ae1ae.jpeg?im_w=320"
            alt="A kitten sits patiently between a terracotta pot and decorative grasses."
          />
        </wa-carousel-item>
        <wa-carousel-item>
          <img
            slot="media"
            src="https://a0.muscache.com/im/pictures/hosting/Hosting-1729153232530544937/original/31ec7628-ecc7-42f8-86e4-97b7090ae1ae.jpeg?im_w=320"
            alt="A kitten sits patiently between a terracotta pot and decorative grasses."
          />
        </wa-carousel-item>
        <wa-carousel-item>
          <img
            slot="media"
            src="https://a0.muscache.com/im/pictures/hosting/Hosting-1729153232530544937/original/31ec7628-ecc7-42f8-86e4-97b7090ae1ae.jpeg?im_w=320"
            alt="A kitten sits patiently between a terracotta pot and decorative grasses."
          />
        </wa-carousel-item>
        <wa-carousel-item>
          <img
            slot="media"
            src="https://a0.muscache.com/im/pictures/hosting/Hosting-1729153232530544937/original/31ec7628-ecc7-42f8-86e4-97b7090ae1ae.jpeg?im_w=320"
            alt="A kitten sits patiently between a terracotta pot and decorative grasses."
          />
        </wa-carousel-item>
      </wa-carousel>
      <span class="bold-title">Knox, Indiana</span>
      <span class="wa-c_distance block">70 miles away</span>
      <span class="wa-c_days block">Aug 21 - 26</span>
      <span class="wa-c_price block"><span>$449</span> night</span>
      <!-- </div> -->
    </wa-card>`;
  }
}
