/**
 * Servicio de propiedades.
 * Cubre el catálogo público y la gestión del anfitrión.
 *
 * @author inici4rsesi0n
 */

import { api } from '../api.js';

export function listar(filtros = {}, pagina = 0, tamanio = 12) {
    const params = new URLSearchParams();
    if (filtros.texto)        params.set('texto', filtros.texto);
    if (filtros.categoriaId)  params.set('categoriaId', filtros.categoriaId);
    if (filtros.tipoAlojamiento) params.set('tipoAlojamiento', filtros.tipoAlojamiento);
    if (filtros.precioMin != null) params.set('precioMin', filtros.precioMin);
    if (filtros.precioMax != null) params.set('precioMax', filtros.precioMax);
    if (filtros.huespedes)    params.set('huespedes', filtros.huespedes);
    if (Array.isArray(filtros.servicioIds)) {
        filtros.servicioIds.forEach(id => params.append('servicioIds', id));
    }
    params.set('pagina', pagina);
    params.set('tamanio', tamanio);
    return api.get(`/propiedades?${params.toString()}`);
}

export function obtener(id) {
    return api.get(`/propiedades/${id}`);
}

export function crear(datos) {
    return api.post('/propiedades', datos);
}

export function actualizar(id, datos) {
    return api.put(`/propiedades/${id}`, datos);
}

export function eliminar(id) {
    return api.del(`/propiedades/${id}`);
}

export function publicar(id) {
    return api.post(`/propiedades/${id}/publicar`);
}

export function desactivar(id) {
    return api.post(`/propiedades/${id}/desactivar`);
}

export function subirImagen(propiedadId, archivo) {
    const fd = new FormData();
    fd.append('archivo', archivo);
    return api.upload(`/propiedades/${propiedadId}/imagenes`, fd);
}

export function eliminarImagen(propiedadId, imagenId) {
    return api.del(`/propiedades/${propiedadId}/imagenes/${imagenId}`);
}
