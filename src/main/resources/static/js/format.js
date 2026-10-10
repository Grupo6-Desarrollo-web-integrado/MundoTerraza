/**
 * Utilidades de formato: precios, fechas, textos.
 *
 * @author inici4rsesi0n
 */

export function formatearPrecio(valor) {
    const numero = Number(valor) || 0;
    return 'S/ ' + numero.toLocaleString('es-PE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

export function formatearFecha(fecha) {
    if (!fecha) return '';
    const d = (fecha instanceof Date) ? fecha : new Date(fecha);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

export function formatearFechaCorta(fecha) {
    if (!fecha) return '';
    const d = (fecha instanceof Date) ? fecha : new Date(fecha);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

export function calcularNoches(fechaInicio, fechaFin) {
    if (!fechaInicio || !fechaFin) return 0;
    const a = new Date(fechaInicio);
    const b = new Date(fechaFin);
    const ms = b.getTime() - a.getTime();
    return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export function aISO(fecha) {
    const d = (fecha instanceof Date) ? fecha : new Date(fecha);
    if (isNaN(d.getTime())) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dia}`;
}

export function inicial(nombre) {
    return (nombre || '?').trim().charAt(0).toUpperCase();
}

export function primerNombre(nombreCompleto) {
    return (nombreCompleto || 'Usuario').trim().split(/\s+/)[0];
}

export function escaparHtml(valor) {
    return String(valor ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));
}

export function truncar(texto, max = 60) {
    const t = String(texto ?? '');
    return t.length > max ? t.slice(0, max - 1) + '…' : t;
}
