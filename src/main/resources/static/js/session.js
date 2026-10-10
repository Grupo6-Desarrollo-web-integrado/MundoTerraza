/**
 * Gestión de sesión del usuario.
 * Almacena tokens (access + refresh) y datos básicos del usuario.
 *
 * @author inici4rsesi0n
 */

const ACCESS_KEY  = 'mt_access_token';
const REFRESH_KEY = 'mt_refresh_token';
const USER_KEY    = 'mt_usuario';

export function guardarSesion({ accessToken, refreshToken, id, nombre, correo, rol, esAnfitrion }) {
    if (accessToken)  sessionStorage.setItem(ACCESS_KEY, accessToken);
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
    const usuario = { id, nombre, correo, rol, esAnfitrion };
    sessionStorage.setItem(USER_KEY, JSON.stringify(usuario));
}

export function obtenerAccessToken() {
    return sessionStorage.getItem(ACCESS_KEY);
}

export function obtenerRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

export function obtenerUsuario() {
    try {
        return JSON.parse(sessionStorage.getItem(USER_KEY));
    } catch {
        return null;
    }
}

export function estaAutenticado() {
    return !!obtenerAccessToken() && !!obtenerUsuario();
}

export function esAnfitrion() {
    const u = obtenerUsuario();
    return !!(u && u.esAnfitrion);
}

export function actualizarUsuario(datosParciales) {
    const actual = obtenerUsuario() || {};
    const nuevo  = { ...actual, ...datosParciales };
    sessionStorage.setItem(USER_KEY, JSON.stringify(nuevo));
    return nuevo;
}

export function cerrarSesion() {
    sessionStorage.removeItem(ACCESS_KEY);
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(REFRESH_KEY);
}
