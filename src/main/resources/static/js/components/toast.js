/**
 * Notificaciones flotantes (toasts).
 *
 * @author inici4rsesi0n
 */

import { escaparHtml } from '../format.js';

let contenedor = null;

function obtenerContenedor() {
    if (contenedor && document.body.contains(contenedor)) return contenedor;
    contenedor = document.createElement('div');
    contenedor.className = 'toast-container';
    document.body.appendChild(contenedor);
    return contenedor;
}

export function mostrarToast(mensaje, tipo = 'success') {
    const cont = obtenerContenedor();
    const toast = document.createElement('div');
    toast.className = `toast${tipo === 'error' ? ' toast--error' : ''}`;
    toast.setAttribute('role', 'alert');

    const icono = tipo === 'error' ? '⚠' : '✓';
    toast.innerHTML = `
        <span>${icono}</span>
        <span>${escaparHtml(mensaje)}</span>
        <button type="button" class="toast__close" aria-label="Cerrar">×</button>
    `;

    const cerrar = () => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.2s ease';
        setTimeout(() => toast.remove(), 200);
    };

    toast.querySelector('.toast__close').addEventListener('click', cerrar);
    cont.appendChild(toast);
    setTimeout(cerrar, 4000);
}
