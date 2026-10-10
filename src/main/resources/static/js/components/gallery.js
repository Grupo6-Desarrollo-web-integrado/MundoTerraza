/**
 * Galería de imágenes para la página de detalle.
 *
 * @author inici4rsesi0n
 */

import { escaparHtml } from '../format.js';

const ICONO_CASA = '<svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 3 10v11h6v-6h6v6h6V10z"/></svg>';

export function galeriaHTML(imagenes, titulo) {
    if (!imagenes || imagenes.length === 0) {
        return `<div class="gallery gallery--empty">${ICONO_CASA}</div>`;
    }

    const n = Math.min(imagenes.length, 5);
    const imgs = imagenes
        .slice(0, n)
        .map(img => {
            const url = typeof img === 'string' ? img : img.url;
            return `<img class="gallery__img" src="${escaparHtml(url)}" alt="${escaparHtml(titulo)}">`;
        })
        .join('');

    return `<div class="gallery gallery--n${n}">${imgs}</div>`;
}
