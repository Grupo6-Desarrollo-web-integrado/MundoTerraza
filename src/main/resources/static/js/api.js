/**
 * Cliente HTTP centralizado.
 * - Adjunta el access token en cada petición.
 * - Renueva el token automáticamente al recibir 401.
 * - Lanza Error con el mensaje del backend.
 *
 * @author inici4rsesi0n
 */

import {
    obtenerAccessToken,
    obtenerRefreshToken,
    guardarSesion,
    cerrarSesion
} from './session.js';

const BASE_URL = '/api';

let refrescando = null;

async function fetchConAuth(url, opciones = {}) {
    const token = obtenerAccessToken();
    const headers = { ...(opciones.headers || {}) };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    let respuesta = await fetch(url, { ...opciones, headers });

    if (respuesta.status === 401 && obtenerRefreshToken()) {
        const nuevo = await intentarRefresh();
        if (nuevo) {
            headers['Authorization'] = `Bearer ${nuevo}`;
            respuesta = await fetch(url, { ...opciones, headers });
        } else {
            cerrarSesion();
            if (!url.includes('/auth/')) {
                window.location.href = 'auth.html';
            }
            throw new Error('Sesión expirada');
        }
    }

    return respuesta;
}

async function intentarRefresh() {
    if (refrescando) return refrescando;
    refrescando = (async () => {
        try {
            const refreshToken = obtenerRefreshToken();
            const res = await fetch(`${BASE_URL}/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken })
            });
            if (!res.ok) return null;
            const data = await res.json();
            guardarSesion(data);
            return data.accessToken;
        } catch {
            return null;
        } finally {
            refrescando = null;
        }
    })();
    return refrescando;
}

async function parsearRespuesta(res) {
    if (res.status === 204) return null;
    const texto = await res.text();
    if (!texto) return null;
    try {
        return JSON.parse(texto);
    } catch {
        return texto;
    }
}

async function manejarError(res) {
    const data = await parsearRespuesta(res);
    if (data && typeof data === 'object') {
        if (data.detalles && typeof data.detalles === 'object') {
            const primero = Object.values(data.detalles)[0];
            if (primero) throw new Error(primero);
        }
        if (data.message) throw new Error(data.message);
        if (data.mensaje) throw new Error(data.mensaje);
        if (data.error)   throw new Error(data.error);
    }
    throw new Error(`Error ${res.status}`);
}

async function get(path) {
    const res = await fetchConAuth(`${BASE_URL}${path}`);
    if (!res.ok) await manejarError(res);
    return parsearRespuesta(res);
}

async function post(path, body) {
    const res = await fetchConAuth(`${BASE_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) await manejarError(res);
    return parsearRespuesta(res);
}

async function put(path, body) {
    const res = await fetchConAuth(`${BASE_URL}${path}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) await manejarError(res);
    return parsearRespuesta(res);
}

async function del(path) {
    const res = await fetchConAuth(`${BASE_URL}${path}`, { method: 'DELETE' });
    if (!res.ok) await manejarError(res);
    return parsearRespuesta(res);
}

async function upload(path, formData) {
    const res = await fetchConAuth(`${BASE_URL}${path}`, {
        method: 'POST',
        body: formData
    });
    if (!res.ok) await manejarError(res);
    return parsearRespuesta(res);
}

export const api = { get, post, put, del, upload };
