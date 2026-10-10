/**
 * Página de detalle de una propiedad.
 *
 * @author inici4rsesi0n
 */

import { renderNavbar } from '../components/navbar.js';
import { inicializarModales } from '../components/modal.js';
import { galeriaHTML } from '../components/gallery.js';
import { obtener } from '../services/propiedadService.js';
import { escaparHtml, formatearPrecio, inicial } from '../format.js';
import '../features/becomeHost.js';
import '../features/publishProperty.js';

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    inicializarModales();
    cargarDetalle();
});

async function cargarDetalle() {
    const cont = document.getElementById('detalleContenido');
    if (!cont) return;

    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const p = await obtener(id);
        document.title = `${p.titulo} - MundoTerraza`;
        cont.innerHTML = detalleHTML(p);
    } catch (err) {
        cont.innerHTML = errorHTML(err.message);
    }
}

function detalleHTML(p) {
    const inicialAnfitrion = inicial(p.nombreAnfitrion);

    return `
    <h1 class="detalle__title">${escaparHtml(p.titulo)}</h1>
    <p class="detalle__location">📍 ${escaparHtml(p.ubicacion)}</p>

    <div style="margin-top: var(--space-5);">
      ${galeriaHTML(p.imagenes, p.titulo)}
    </div>

    <div class="detalle__layout">
      <div class="detalle__main">

        <section class="detalle__section">
          <div class="host-block">
            <div class="avatar avatar--lg">${escaparHtml(inicialAnfitrion)}</div>
            <div>
              <div class="host-block__name">Anfitrión: ${escaparHtml(p.nombreAnfitrion)}</div>
              <div class="host-block__sub">${escaparHtml(p.tipoAlojamiento)} · ${escaparHtml(p.categoria)}</div>
            </div>
          </div>
        </section>

        <section class="detalle__section">
          <h2 class="detalle__section-title">Acerca de este espacio</h2>
          <p class="detalle__description">${escaparHtml(p.descripcion)}</p>
        </section>

        ${p.servicios && p.servicios.length > 0 ? `
        <section class="detalle__section">
          <h2 class="detalle__section-title">Lo que ofrece este lugar</h2>
          <ul style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-3);">
            ${p.servicios.map(s => `
              <li style="font-size:var(--fs-sm);display:flex;align-items:center;gap:var(--space-2);">
                <span class="badge badge--neutral">${escaparHtml(s.nombre)}</span>
              </li>
            `).join('')}
          </ul>
        </section>` : ''}

        ${p.habitaciones && p.habitaciones.length > 0 ? `
        <section class="detalle__section">
          <h2 class="detalle__section-title">Habitaciones disponibles</h2>
          ${p.habitaciones.map(h => `
            <div class="panel" style="margin-bottom:var(--space-3);">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:var(--space-4);">
                <div>
                  <div style="font-weight:var(--fw-semibold);">${escaparHtml(h.nombre)}</div>
                  <div style="font-size:var(--fs-sm);color:var(--color-text-muted);">
                    ${h.maxAdultos} adulto(s) · ${h.cantidadDormitorios} dorm · ${h.cantidadBanios} baño(s)
                  </div>
                </div>
                <div style="text-align:right;">
                  <div style="font-weight:var(--fw-bold);">${formatearPrecio(h.precioNoche)}</div>
                  <div style="font-size:var(--fs-xs);color:var(--color-text-muted);">por noche</div>
                </div>
              </div>
            </div>
          `).join('')}
        </section>` : ''}

        <section class="detalle__section">
          <h2 class="detalle__section-title">Conoce a tu anfitrión</h2>
          <p style="font-weight:var(--fw-semibold);">${escaparHtml(p.nombreAnfitrion)}</p>
          ${p.ciudadAnfitrion ? `<p class="text-muted" style="font-size:var(--fs-sm);">Vive en ${escaparHtml(p.ciudadAnfitrion)}</p>` : ''}
          ${p.biografiaAnfitrion ? `<p style="font-size:var(--fs-sm);white-space:pre-line;">${escaparHtml(p.biografiaAnfitrion)}</p>` : ''}
        </section>

      </div>

      <aside class="detalle__sidebar">
        <div class="panel panel--sticky">
          <div style="margin-bottom:var(--space-3);">
            <span style="font-size:var(--fs-xl);font-weight:var(--fw-bold);">${formatearPrecio(p.precioDesde)}</span>
            <span style="color:var(--color-text-muted);">/ noche</span>
          </div>
          <p style="font-size:var(--fs-sm);color:var(--color-text-muted);margin-bottom:var(--space-4);">
            Reserva próximamente
          </p>
          <button class="btn btn--primary btn--block" disabled>Reservar</button>
        </div>
      </aside>
    </div>`;
}

function errorHTML(mensaje) {
    return `
    <div class="empty-state">
      <div class="empty-state__icon">⚠</div>
      <h3 class="empty-state__title">${escaparHtml(mensaje || 'No se pudo cargar el alojamiento')}</h3>
      <a href="index.html" class="btn btn--primary" style="margin-top:var(--space-4);">Volver al inicio</a>
    </div>`;
}
