/**
 * Control de modales sin dependencias externas.
 *
 * @author inici4rsesi0n
 */

export function abrirModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
    const primerInput = modal.querySelector('input:not([readonly]), textarea, select');
    if (primerInput) setTimeout(() => primerInput.focus(), 80);
}

export function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('modal--open');
    if (!document.querySelector('.modal--open')) {
        document.body.style.overflow = '';
    }
}

export function inicializarModales() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) cerrarModal(modal.id);
        });
        modal.querySelectorAll('[data-modal-close]').forEach(btn => {
            btn.addEventListener('click', () => cerrarModal(modal.id));
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal--open').forEach(m => cerrarModal(m.id));
        }
    });
}
