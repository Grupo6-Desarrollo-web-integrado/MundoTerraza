/**
 * Feature: convertirse en anfitrión.
 * Escucha el evento 'host-cta-click' del navbar, y si el usuario no es
 * anfitrión, abre un modal para completar los datos requeridos.
 *
 * @author inici4rsesi0n
 */

import { convertirEnAnfitrion } from '../services/authService.js';
import { obtenerUsuario, estaAutenticado } from '../session.js';
import { abrirModal, cerrarModal } from '../components/modal.js';
import { mostrarToast } from '../components/toast.js';
import { escaparHtml } from '../format.js';

const MODAL_ID = 'becomeHostModal';

document.addEventListener('DOMContentLoaded', () => {
    inyectarModal();
    document.addEventListener('host-cta-click', manejarClick);
});

async function manejarClick() {
    if (!estaAutenticado()) {
        mostrarToast('Inicia sesión para continuar', 'error');
        setTimeout(() => window.location.href = 'auth.html', 700);
        return;
    }

    const usuario = obtenerUsuario();
    if (usuario.esAnfitrion) {
        // No es nuestra responsabilidad: publishProperty se encarga
        document.dispatchEvent(new CustomEvent('open-publish-property'));
        return;
    }

    abrirModal(MODAL_ID);
}

function inyectarModal() {
    if (document.getElementById(MODAL_ID)) return;

    const html = `
    <div class="modal" id="${MODAL_ID}" role="dialog" aria-modal="true">
      <div class="modal__dialog">
        <form id="becomeHostForm" autocomplete="off" novalidate>
          <div class="modal__header">
            <div>
              <h2 class="modal__title">Hazte anfitrión</h2>
              <p class="modal__subtitle">Completa tus datos para empezar a publicar espacios.</p>
            </div>
            <button type="button" class="modal__close" data-modal-close aria-label="Cerrar">×</button>
          </div>

          <div class="modal__body">
            <div id="hostError" class="alert alert--danger is-hidden"></div>

            <div class="form-group">
              <label class="form-label" for="hostTelefono">Teléfono</label>
              <input type="tel" id="hostTelefono" name="telefono" class="form-input"
                     placeholder="987654321" inputmode="numeric" maxlength="9" required
                     pattern="9[0-9]{8}">
              <small class="form-hint">9 dígitos, empezando con 9.</small>
            </div>

            <div class="form-group">
              <label class="form-label" for="hostDni">DNI</label>
              <input type="text" id="hostDni" name="dni" class="form-input"
                     placeholder="12345678" inputmode="numeric" maxlength="8" required
                     pattern="[0-9]{8}">
              <small class="form-hint">8 dígitos.</small>
            </div>

            <div class="form-group">
              <label class="form-label" for="hostCiudad">Ciudad donde vives</label>
              <input type="text" id="hostCiudad" name="ciudad" class="form-input"
                     placeholder="Lima" minlength="2" maxlength="100" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="hostBiografia">Cuéntanos sobre ti</label>
              <textarea id="hostBiografia" name="biografia" class="form-textarea"
                        rows="3" minlength="20" maxlength="500" required
                        placeholder="Me encanta recibir viajeros y mostrarles lo mejor de mi ciudad..."></textarea>
              <small class="form-counter"><span id="hostBioCount">0</span>/500</small>
            </div>

            <div class="form-check">
              <input type="checkbox" id="hostTerminos" class="form-check__input" required>
              <label class="form-check__label" for="hostTerminos">
                Acepto los términos y condiciones para anfitriones.
              </label>
            </div>
          </div>

          <div class="modal__footer">
            <button type="button" class="btn btn--ghost" data-modal-close>Cancelar</button>
            <button type="submit" class="btn btn--primary" id="hostSubmitBtn">Guardar</button>
          </div>
        </form>
      </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', html);

    const modal = document.getElementById(MODAL_ID);
    modal.querySelectorAll('[data-modal-close]').forEach(btn => {
        btn.addEventListener('click', () => cerrarModal(MODAL_ID));
    });

    modal.addEventListener('click', e => {
        if (e.target === modal) cerrarModal(MODAL_ID);
    });

    initFormulario();
}

function initFormulario() {
    const form = document.getElementById('becomeHostForm');
    const bio  = document.getElementById('hostBiografia');
    const contador = document.getElementById('hostBioCount');

    bio.addEventListener('input', () => {
        contador.textContent = bio.value.length;
    });

    ['hostTelefono', 'hostDni'].forEach(id => {
        document.getElementById(id).addEventListener('input', e => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();
        ocultarError();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const btn = document.getElementById('hostSubmitBtn');
        btn.disabled = true;
        btn.textContent = 'Guardando...';

        try {
            await convertirEnAnfitrion({
                telefono: form.telefono.value.trim(),
                dni: form.dni.value.trim(),
                ciudad: form.ciudad.value.trim(),
                biografia: form.biografia.value.trim(),
                aceptaTerminos: document.getElementById('hostTerminos').checked
            });
            cerrarModal(MODAL_ID);
            mostrarToast('¡Listo! Ahora eres anfitrión');
            // Refrescar navbar para reflejar el nuevo rol
            setTimeout(() => window.location.reload(), 700);
        } catch (err) {
            mostrarError(err.message);
        } finally {
            btn.disabled = false;
            btn.textContent = 'Guardar';
        }
    });
}

function mostrarError(msg) {
    const el = document.getElementById('hostError');
    el.textContent = msg;
    el.classList.remove('is-hidden');
}

function ocultarError() {
    const el = document.getElementById('hostError');
    el.textContent = '';
    el.classList.add('is-hidden');
}
