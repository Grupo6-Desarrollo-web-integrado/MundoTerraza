/**
 * Navbar dinámico según el estado de sesión.
 *
 * @author inici4rsesi0n
 */

import { obtenerUsuario, cerrarSesion, estaAutenticado } from '../session.js';
import { inicial, primerNombre, escaparHtml } from '../format.js';

const ICONO_MENU = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
const ICONO_USER = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-5 0-9 2.5-9 5.5V22h18v-2.5C21 16.5 17 14 12 14z"/></svg>';
const ICONO_CASA = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 3 10v11h6v-6h6v6h6V10z"/></svg>';

export function renderNavbar() {
    const cont = document.getElementById('app-navbar');
    if (!cont) return;
    cont.innerHTML = navbarHTML();
    activarListeners();
    actualizarEstado();
}

function navbarHTML() {
    return `
    <nav class="navbar">
      <div class="navbar__container">
        <a class="navbar__brand" href="index.html">
          ${ICONO_CASA}
          <span>MundoTerraza</span>
        </a>

        <ul class="navbar__links">
          <li><a class="navbar__link" href="index.html">Inicio</a></li>
          <li><a class="navbar__link" href="index.html#catalogo">Alojamientos</a></li>
        </ul>

        <div class="navbar__actions">
          <button type="button" class="btn btn--outline-primary btn--sm" id="hostCtaBtn">Hazte Anfitrión</button>

          <div style="position: relative;">
            <button type="button" class="user-menu" id="userMenuBtn" aria-expanded="false" aria-haspopup="true">
              <span class="user-menu__icon">${ICONO_MENU}</span>
              <span class="avatar avatar--guest" id="userAvatar">${ICONO_USER}</span>
              <span class="user-menu__name is-hidden" id="userNameNav"></span>
            </button>

            <div class="user-dropdown" id="userDropdown">
              <div id="menuGuest">
                <a class="user-dropdown__item" href="auth.html">Iniciar sesión</a>
                <a class="user-dropdown__item" href="auth.html#registro">Registrarse</a>
              </div>
              <div id="menuUser" class="is-hidden">
                <div class="user-dropdown__welcome" id="userWelcome">Hola</div>
                <a class="user-dropdown__item" href="#">Centro de ayuda</a>
                <a class="user-dropdown__item" href="#">Términos y condiciones</a>
                <hr class="user-dropdown__divider">
                <button type="button" class="user-dropdown__item user-dropdown__item--danger" id="logoutBtn">Cerrar sesión</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>`;
}

function activarListeners() {
    const menuBtn = document.getElementById('userMenuBtn');
    const dropdown = document.getElementById('userDropdown');

    if (menuBtn && dropdown) {
        menuBtn.addEventListener('click', e => {
            e.stopPropagation();
            const abierto = dropdown.classList.toggle('user-dropdown--open');
            menuBtn.setAttribute('aria-expanded', String(abierto));
        });

        document.addEventListener('click', () => {
            dropdown.classList.remove('user-dropdown--open');
            menuBtn.setAttribute('aria-expanded', 'false');
        });

        dropdown.addEventListener('click', e => e.stopPropagation());
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            cerrarSesion();
            window.location.href = 'index.html';
        });
    }

    const hostCta = document.getElementById('hostCtaBtn');
    if (hostCta) {
        hostCta.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('host-cta-click'));
        });
    }
}

function actualizarEstado() {
    const usuario = obtenerUsuario();
    const guest = document.getElementById('menuGuest');
    const user  = document.getElementById('menuUser');
    const nameNav = document.getElementById('userNameNav');
    const avatar  = document.getElementById('userAvatar');
    const welcome = document.getElementById('userWelcome');
    const cta     = document.getElementById('hostCtaBtn');

    if (!usuario) {
        guest?.classList.remove('is-hidden');
        user?.classList.add('is-hidden');
        nameNav?.classList.add('is-hidden');
        if (avatar) {
            avatar.className = 'avatar avatar--guest';
            avatar.innerHTML = ICONO_USER;
        }
        if (cta) cta.textContent = 'Hazte Anfitrión';
        return;
    }

    const nombre = primerNombre(usuario.nombre);

    guest?.classList.add('is-hidden');
    user?.classList.remove('is-hidden');
    if (nameNav) {
        nameNav.textContent = nombre;
        nameNav.classList.remove('is-hidden');
    }
    if (avatar) {
        avatar.className = 'avatar';
        avatar.textContent = inicial(usuario.nombre);
    }
    if (welcome) welcome.textContent = `Hola, ${nombre}`;
    if (cta) cta.textContent = usuario.esAnfitrion ? 'Publica tu Espacio' : 'Hazte Anfitrión';
}
