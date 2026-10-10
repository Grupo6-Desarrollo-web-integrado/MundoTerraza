/**
 * Página del catálogo (index.html).
 *
 * @author inici4rsesi0n
 */

import { renderNavbar } from '../components/navbar.js';
import { inicializarModales } from '../components/modal.js';
import { renderizarCards, estadoVacio, estadoCargando } from '../components/card.js';
import { listar } from '../services/propiedadService.js';
import { escaparHtml } from '../format.js';
import '../features/becomeHost.js';
import '../features/publishProperty.js';

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    inicializarModales();
    initSearch();
    cargarCatalogo();
});

function initSearch() {
    const form = document.getElementById('searchForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        cargarCatalogo();
    });
}

async function cargarCatalogo() {
    const contenedor = document.getElementById('catalogoGrid');
    const titulo     = document.getElementById('catalogoTitulo');
    const form       = document.getElementById('searchForm');
    if (!contenedor) return;

    const filtros = {};
    const texto = form?.searchTexto?.value.trim();
    const huespedes = form?.searchHuespedes?.value;

    if (texto) filtros.texto = texto;
    if (huespedes) filtros.huespedes = Number(huespedes);

    contenedor.innerHTML = estadoCargando();

    try {
        const data = await listar(filtros, 0, 20);
        const propiedades = data.contenido || [];

        if (titulo) {
            titulo.textContent = (texto || huespedes)
                ? `${data.total} alojamiento(s) encontrado(s)`
                : 'Alojamientos disponibles';
        }

        if (propiedades.length === 0) {
            contenedor.innerHTML = estadoVacio(
                '🏠',
                (texto || huespedes) ? 'Sin resultados' : 'Aún no hay alojamientos',
                (texto || huespedes)
                    ? 'Prueba con otra ubicación o menos huéspedes.'
                    : 'Sé el primero: hazte anfitrión y publica tu espacio.'
            );
            return;
        }

        renderizarCards(propiedades, contenedor);
    } catch (err) {
        contenedor.innerHTML = estadoVacio(
            '⚠',
            'No se pudo cargar el catálogo',
            err.message || 'Verifica que el servidor esté activo.'
        );
    }
}

// Expuesto para que publishProperty pueda refrescar el catálogo tras publicar
window.recargarCatalogo = cargarCatalogo;
