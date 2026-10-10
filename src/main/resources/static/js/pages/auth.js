/**
 * Página de autenticación: login y registro.
 *
 * @author inici4rsesi0n
 */

import { iniciarSesion, registrar } from '../services/authService.js';
import { mostrarToast } from '../components/toast.js';

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initLoginForm();
    initRegisterForm();
});

function initTabs() {
    const tabs   = document.querySelectorAll('.tabs__item');
    const paneles = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const destino = tab.dataset.tab;

            tabs.forEach(t => t.classList.toggle('tabs__item--active', t === tab));
            paneles.forEach(p => p.classList.toggle('tab-pane--active', p.id === destino));
        });
    });
}

function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();
        ocultarError('loginError');
        const btn = form.querySelector('button[type="submit"]');
        bloquear(btn, true);

        try {
            await iniciarSesion({
                correo: form.loginCorreo.value.trim(),
                password: form.loginPassword.value
            });
            mostrarToast('Sesión iniciada correctamente');
            setTimeout(() => window.location.href = 'index.html', 600);
        } catch (err) {
            mostrarError('loginError', err.message);
        } finally {
            bloquear(btn, false);
        }
    });
}

function initRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();
        ocultarError('registerError');
        const btn = form.querySelector('button[type="submit"]');
        bloquear(btn, true);

        try {
            await registrar({
                nombre: form.regNombre.value.trim(),
                correo: form.regCorreo.value.trim(),
                password: form.regPassword.value
            });
            mostrarToast('Cuenta creada. Bienvenido a MundoTerraza');
            setTimeout(() => window.location.href = 'index.html', 600);
        } catch (err) {
            mostrarError('registerError', err.message);
        } finally {
            bloquear(btn, false);
        }
    });
}

function mostrarError(id, mensaje) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = mensaje;
    el.classList.remove('is-hidden');
}

function ocultarError(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = '';
    el.classList.add('is-hidden');
}

function bloquear(btn, bloquear) {
    if (!btn) return;
    btn.disabled = bloquear;
    btn.classList.toggle('is-loading', bloquear);
}
