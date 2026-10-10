/**
 * Servicio de autenticación.
 * Envuelve las llamadas a /api/auth y guarda la sesión.
 *
 * @author inici4rsesi0n
 */

import { api } from '../api.js';
import { guardarSesion, cerrarSesion } from '../session.js';

export async function registrar({ nombre, correo, password }) {
    const data = await api.post('/auth/register', { nombre, correo, password });
    guardarSesion(data);
    return data;
}

export async function iniciarSesion({ correo, password }) {
    const data = await api.post('/auth/login', { correo, password });
    guardarSesion(data);
    return data;
}

export async function convertirEnAnfitrion({ telefono, dni, ciudad, biografia, aceptaTerminos }) {
    const data = await api.put('/auth/become-host', {
        telefono,
        dni,
        ciudad,
        biografia,
        aceptaTerminos
    });
    guardarSesion(data);
    return data;
}

export function cerrarSesionLocal() {
    cerrarSesion();
}
