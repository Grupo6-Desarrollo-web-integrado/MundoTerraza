/**
 * Servicio de catálogos maestros (categorías y servicios).
 *
 * @author inici4rsesi0n
 */

import { api } from '../api.js';

export function listarCategorias() {
    return api.get('/categorias');
}

export function listarServicios() {
    return api.get('/servicios');
}
