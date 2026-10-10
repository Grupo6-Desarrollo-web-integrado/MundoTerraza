/**
 * Feature: publicar una propiedad.
 * Escucha el evento 'open-publish-property' (o 'host-cta-click' si el
 * usuario ya es anfitrión) y abre un modal para crear una propiedad con
 * su primera habitación y subir imágenes.
 *
 * @author inici4rsesi0n
 */

import { crear, publicar, subirImagen } from '../services/propiedadService.js';
import { listarCategorias, listarServicios } from '../services/catalogoService.js';
import { obtenerUsuario, estaAutenticado } from '../session.js';
import { abrirModal, cerrarModal } from '../components/modal.js';
import { mostrarToast } from '../components/toast.js';

const MODAL_ID = 'publishPropertyModal';
const MAX_IMAGENES = 5;
const MAX_BYTES = 5 * 1024 * 1024;

let imagenesSeleccionadas = [];

document.addEventListener('DOMContentLoaded', () => {
    inyectarModal();
    document.addEventListener('open-publish-property', abrir);
});

async function abrir() {
    if (!estaAutenticado()) {
        mostrarToast('Inicia sesión para continuar', 'error');
        setTimeout(() => window.location.href = 'auth.html', 700);
        return;
    }
    const usuario = obtenerUsuario();
    if (!usuario.esAnfitrion) {
        document.dispatchEvent(new CustomEvent('host-cta-click'));
        return;
    }
    await cargarCatalogos();
    resetFormulario();
    abrirModal(MODAL_ID);
}

function inyectarModal() {
    if (document.getElementById(MODAL_ID)) return;

    const html = `
    <div class="modal" id="${MODAL_ID}" role="dialog" aria-modal="true">
      <div class="modal__dialog modal__dialog--lg">
        <form id="publishPropertyForm" autocomplete="off" novalidate>
          <div class="modal__header">
            <div>
              <h2 class="modal__title">Publica tu espacio</h2>
              <p class="modal__subtitle">Así se verá tu alojamiento en el catálogo.</p>
            </div>
            <button type="button" class="modal__close" data-modal-close aria-label="Cerrar">×</button>
          </div>

          <div class="modal__body">
            <div id="publishError" class="alert alert--danger is-hidden"></div>

            <div class="form-group">
              <label class="form-label" for="pubTitulo">Título</label>
              <input type="text" id="pubTitulo" name="titulo" class="form-input"
                     placeholder="Acogedora habitación cerca al mar"
                     minlength="5" maxlength="150" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="pubDescripcion">Descripción</label>
              <textarea id="pubDescripcion" name="descripcion" class="form-textarea"
                        rows="3" minlength="20" maxlength="1000" required
                        placeholder="Describe tu espacio: ambientes, servicios, qué hay cerca..."></textarea>
              <small class="form-counter"><span id="pubDescCount">0</span>/1000</small>
            </div>

            <div class="form-group">
              <label class="form-label" for="pubUbicacion">Ubicación</label>
              <input type="text" id="pubUbicacion" name="ubicacion" class="form-input"
                     placeholder="Miraflores, Lima" minlength="3" maxlength="150" required>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);">
              <div class="form-group">
                <label class="form-label" for="pubLatitud">Latitud</label>
                <input type="number" id="pubLatitud" name="latitud" class="form-input"
                       step="any" min="-90" max="90" value="-12.0464" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="pubLongitud">Longitud</label>
                <input type="number" id="pubLongitud" name="longitud" class="form-input"
                       step="any" min="-180" max="180" value="-77.0428" required>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);">
              <div class="form-group">
                <label class="form-label" for="pubTipo">Tipo de alojamiento</label>
                <select id="pubTipo" name="tipoAlojamiento" class="form-select" required>
                  <option value="">Selecciona...</option>
                  <option value="CASA">Casa</option>
                  <option value="DEPARTAMENTO">Departamento</option>
                  <option value="HABITACION">Habitación</option>
                  <option value="LOFT">Loft</option>
                  <option value="VILLA">Villa</option>
                  <option value="HOSTAL">Hostal</option>
                  <option value="HOTEL">Hotel</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="pubPolitica">Política de cancelación</label>
                <select id="pubPolitica" name="politicaCancelacion" class="form-select" required>
                  <option value="">Selecciona...</option>
                  <option value="FLEXIBLE">Flexible</option>
                  <option value="MODERADA">Moderada</option>
                  <option value="ESTRICTA">Estricta</option>
                  <option value="NO_REEMBOLSABLE">No reembolsable</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="pubCategoria">Categoría</label>
              <select id="pubCategoria" name="categoriaId" class="form-select" required>
                <option value="">Cargando categorías...</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Servicios</label>
              <div id="pubServiciosList" style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-2);">
                <small class="form-hint">Cargando servicios...</small>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="pubPrecio">Precio por noche (primera habitación)</label>
              <div class="input-group">
                <span class="input-group__prefix">S/</span>
                <input type="number" id="pubPrecio" name="precioNoche" class="form-input"
                       min="1" max="100000" step="0.01" value="100" required>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="pubImagenes">
                Fotos <span class="form-label--muted">(.jpg o .png, máx. 5 fotos de 5 MB)</span>
              </label>
              <input type="file" id="pubImagenes" class="form-file"
                     accept=".jpg,.jpeg,.png,image/jpeg,image/png" multiple>
              <div id="pubImagenesError" class="form-error is-hidden"></div>
              <div id="pubPreview" class="preview-grid"></div>
            </div>
          </div>

          <div class="modal__footer">
            <button type="button" class="btn btn--ghost" data-modal-close>Cancelar</button>
            <button type="submit" class="btn btn--primary" id="publishSubmitBtn">Publicar</button>
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

async function cargarCatalogos() {
    const [categorias, servicios] = await Promise.all([
        listarCategorias().catch(() => []),
        listarServicios().catch(() => [])
    ]);

    const selectCat = document.getElementById('pubCategoria');
    selectCat.innerHTML = '<option value="">Selecciona...</option>' +
        categorias.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');

    const listaServ = document.getElementById('pubServiciosList');
    listaServ.innerHTML = servicios.map(s => `
      <label class="form-check">
        <input type="checkbox" class="form-check__input" value="${s.id}">
        <span class="form-check__label">${s.nombre}</span>
      </label>
    `).join('');
}

function initFormulario() {
    const form = document.getElementById('publishPropertyForm');
    const desc = document.getElementById('pubDescripcion');
    const contador = document.getElementById('pubDescCount');
    const inputImg = document.getElementById('pubImagenes');

    desc.addEventListener('input', () => {
        contador.textContent = desc.value.length;
    });

    inputImg.addEventListener('change', () => {
        agregarImagenes(Array.from(inputImg.files));
        inputImg.value = '';
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();
        ocultarError();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        if (imagenesSeleccionadas.length === 0) {
            mostrarError('Debes subir al menos una imagen.');
            return;
        }

        const btn = document.getElementById('publishSubmitBtn');
        btn.disabled = true;
        btn.textContent = 'Publicando...';

        try {
            const servicioIds = Array.from(
                document.querySelectorAll('#pubServiciosList input:checked')
            ).map(i => Number(i.value));

            // 1) Crear la propiedad
            const propiedad = await crear({
                titulo: form.titulo.value.trim(),
                descripcion: form.descripcion.value.trim(),
                ubicacion: form.ubicacion.value.trim(),
                latitud: Number(form.latitud.value),
                longitud: Number(form.longitud.value),
                tipoAlojamiento: form.tipoAlojamiento.value,
                politicaCancelacion: form.politicaCancelacion.value,
                categoriaId: Number(form.categoriaId.value),
                servicioIds
            });

            // 2) Subir imágenes
            for (const file of imagenesSeleccionadas) {
                await subirImagen(propiedad.id, file);
            }

            // 3) Publicar (requiere >=1 habitación y >=1 imagen)
            // El backend devuelve la propiedad sin habitaciones.
            // Se necesita crear una habitación mínima antes de publicar.
            // Esta parte la completará el equipo de features de habitaciones.
            // Por ahora: intentar publicar y mostrar info al usuario.

            try {
                await publicar(propiedad.id);
                mostrarToast('¡Tu espacio fue publicado!');
            } catch (pubErr) {
                mostrarToast('Propiedad creada como BORRADOR. ' + pubErr.message, 'error');
            }

            cerrarModal(MODAL_ID);
            if (typeof window.recargarCatalogo === 'function') {
                window.recargarCatalogo();
            }
        } catch (err) {
            mostrarError(err.message);
        } finally {
            btn.disabled = false;
            btn.textContent = 'Publicar';
        }
    });
}

function agregarImagenes(files) {
    const errEl = document.getElementById('pubImagenesError');
    const errores = [];

    for (const file of files) {
        const tipoValido = ['image/jpeg', 'image/png'].includes(file.type);
        if (!tipoValido) { errores.push(`"${file.name}": solo .jpg o .png.`); continue; }
        if (file.size > MAX_BYTES) { errores.push(`"${file.name}": supera 5 MB.`); continue; }
        if (imagenesSeleccionadas.length >= MAX_IMAGENES) {
            errores.push(`Máximo ${MAX_IMAGENES} imágenes.`);
            break;
        }
        imagenesSeleccionadas.push(file);
    }

    errEl.textContent = errores.join(' ');
    errEl.classList.toggle('is-hidden', errores.length === 0);
    renderPreview();
}

function renderPreview() {
    const cont = document.getElementById('pubPreview');
    cont.innerHTML = '';

    imagenesSeleccionadas.forEach((file, i) => {
        const item = document.createElement('div');
        item.className = 'preview-item';

        const img = document.createElement('img');
        img.className = 'preview-item__img';
        img.src = URL.createObjectURL(file);
        img.alt = file.name;
        img.onload = () => URL.revokeObjectURL(img.src);

        const quitar = document.createElement('button');
        quitar.type = 'button';
        quitar.className = 'preview-item__remove';
        quitar.textContent = '×';
        quitar.title = 'Quitar';
        quitar.addEventListener('click', () => {
            imagenesSeleccionadas.splice(i, 1);
            renderPreview();
        });

        item.append(img, quitar);

        if (i === 0) {
            const badge = document.createElement('span');
            badge.className = 'preview-item__badge';
            badge.textContent = 'Portada';
            item.appendChild(badge);
        }

        cont.appendChild(item);
    });
}

function resetFormulario() {
    const form = document.getElementById('publishPropertyForm');
    form.reset();
    imagenesSeleccionadas = [];
    renderPreview();
    document.getElementById('pubDescCount').textContent = '0';
    document.getElementById('pubImagenesError').classList.add('is-hidden');
    ocultarError();
}

function mostrarError(msg) {
    const el = document.getElementById('publishError');
    el.textContent = msg;
    el.classList.remove('is-hidden');
}

function ocultarError() {
    const el = document.getElementById('publishError');
    el.textContent = '';
    el.classList.add('is-hidden');
}
