/**
 * Card de propiedad para el catálogo.
 *
 * @author inici4rsesi0n
 */

import { escaparHtml, formatearPrecio } from '../format.js';

const ICONO_CASA = '<svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 3 10v11h6v-6h6v6h6V10z"/></svg>';

export function cardHTML(p) {
    const imagen = p.imagenPrincipal
        ? `<img class="card__image" src="${escaparHtml(p.imagenPrincipal)}" alt="${escaparHtml(p.titulo)}" loading="lazy">`
        : '';
    const rating = p.totalReviews > 0
        ? `<span class="card__rating">★ ${p.ratingPromedio.toFixed(2)}</span>`
        : '';

    return `
    <a class="card" href="detalle.html?id=${p.id}">
      <div class="card__image-wrap">
        <div class="card__image-placeholder">${ICONO_CASA}</div>
        ${imagen}
      </div>
      <div class="card__body">
        <span class="card__location">${escaparHtml(p.ubicacion)}</span>
        <span class="card__title">${escaparHtml(p.titulo)}</span>
        <span class="card__host">Anfitrión: ${escaparHtml(p.nombreAnfitrion)} ${rating}</span>
        <span class="card__footer">
          <span class="card__price">${formatearPrecio(p.precioDesde)}</span>
          <span class="card__price-unit">/ noche</span>
        </span>
      </div>
    </a>`;
}

export function renderizarCards(propiedades, contenedor) {
    if (!contenedor) return;
    if (!propiedades || propiedades.length === 0) {
        contenedor.innerHTML = '';
        return;
    }
    contenedor.innerHTML = propiedades.map(cardHTML).join('');
}

export function estadoVacio(icono, titulo, texto) {
    return `
    <div class="empty-state">
      <div class="empty-state__icon">${icono}</div>
      <h3 class="empty-state__title">${escaparHtml(titulo)}</h3>
      <p class="empty-state__text">${escaparHtml(texto)}</p>
    </div>`;
}

export function estadoCargando() {
    return `<div class="loader"><div class="loader__circle"></div></div>`;
}
