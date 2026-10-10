# 🎨 Frontend — MundoTerraza

> Documentación técnica del frontend: estructura, convenciones, capas y patrones de la aplicación web de MundoTerraza.

---

## 📖 Tabla de contenidos

1. [Visión general](#-visión-general)
2. [Filosofía de diseño](#-filosofía-de-diseño)
3. [Estructura de archivos](#-estructura-de-archivos)
4. [Sistema de diseño CSS](#-sistema-de-diseño-css)
5. [Arquitectura JavaScript](#-arquitectura-javascript)
6. [Flujo de una petición](#-flujo-de-una-petición)
7. [Componentes](#-componentes)
8. [Features](#-features)
9. [Gestión de sesión](#-gestión-de-sesión)
10. [Convenciones](#-convenciones)
11. [Páginas](#-páginas)

---

## 🎯 Visión general

El frontend de MundoTerraza es una **MPA (Multi-Page Application)** construida con:

- **HTML5 semántico** — sin frameworks.
- **CSS3 nativo** — con design tokens, BEM y metodología ITCSS.
- **JavaScript vanilla** — con **ES Modules nativos** del navegador.
- **Cero dependencias externas** — sin Bootstrap, sin jQuery, sin Tailwind, sin CDN.

| Aspecto | Decisión |
|---------|----------|
| Tipo de aplicación | MPA (una página HTML por vista) |
| Módulos JS | ES Modules nativos (`<script type="module">`) |
| Estilos | CSS nativo modular con `@import` |
| Bundler | Ninguno (migrable a Vite sin cambiar código) |
| Autenticación | JWT en `sessionStorage` (access) + `localStorage` (refresh) |
| Comunicación | `fetch` centralizado en `api.js` |

---

## 🎨 Filosofía de diseño

El frontend sigue tres principios:

### 1. Sin dependencias externas

No se usan librerías de UI, frameworks, ni CDNs. Todo el código es propio, lo que garantiza:

- Control total sobre el comportamiento.
- Sin sorpresas de versiones.
- Migrable a un bundler sin reescribir código.

### 2. Separación estricta de responsabilidades

Cada archivo tiene una única razón para existir:

- **`api.js`** solo habla HTTP.
- **`session.js`** solo gestiona tokens.
- **`services/`** solo mapean endpoints.
- **`components/`** solo renderizan UI.
- **`pages/`** solo orquestan una vista.

### 3. Progresividad

La aplicación funciona sin build step. En desarrollo se sirve directamente desde Spring Boot en `/static`. Si mañana se migra a Vite o Webpack, los archivos fuente no cambian.

---

## 📂 Estructura de archivos

```
static/
├── index.html                    Catálogo
├── auth.html                     Login / Registro
├── detalle.html                  Detalle + reserva
├── favicon.svg                   Icono del navegador
│
├── css/                          Sistema de diseño
│   ├── style.css                 Entry point (solo @imports)
│   ├── base/
│   │   ├── _tokens.css           Variables CSS (colores, espaciado, radios)
│   │   ├── _reset.css            Reset mínimo
│   │   └── _typography.css       Tipografía base
│   ├── components/
│   │   ├── _navbar.css
│   │   ├── _buttons.css
│   │   ├── _inputs.css
│   │   ├── _cards.css
│   │   ├── _modals.css
│   │   ├── _search.css
│   │   ├── _gallery.css
│   │   ├── _preview.css
│   │   ├── _badges.css
│   │   └── _alerts.css
│   ├── utilities/
│   │   └── _helpers.css          Utilidades de un solo propósito
│   └── pages/
│       ├── _index.css
│       ├── _auth.css
│       └── _detalle.css
│
└── js/                           Módulos ES
    ├── api.js                    Cliente HTTP con JWT + refresh
    ├── session.js                Tokens y usuario
    ├── format.js                 Formateo (precios, fechas, escape HTML)
    ├── services/                 Wrappers de endpoints
    │   ├── authService.js
    │   ├── catalogoService.js
    │   ├── propiedadService.js
    │   ├── habitacionService.js
    │   ├── reservaService.js
    │   ├── pagoService.js
    │   ├── reviewService.js
    │   ├── favoritoService.js
    │   └── notificacionService.js
    ├── components/               UI reutilizable
    │   ├── navbar.js
    │   ├── searchBar.js
    │   ├── card.js
    │   ├── gallery.js
    │   ├── amenities.js
    │   ├── reviews.js
    │   ├── modal.js
    │   └── toast.js
    ├── features/                 Features complejas
    │   ├── becomeHost.js
    │   └── publishProperty.js
    └── pages/                    Entry points
        ├── index.js
        ├── auth.js
        └── detalle.js
```

---

## 🎨 Sistema de diseño CSS

### Metodología

Se combinan tres metodologías:

- **ITCSS** — orden de carga: tokens → base → componentes → utilidades → páginas.
- **BEM** — nomenclatura de clases: `.bloque__elemento--modificador`.
- **SMACSS ligero** — prefijos para estados (`is-`) y utilidades (`u-`).

### Design tokens

Todos los valores visuales viven en `css/base/_tokens.css` como variables CSS en `:root`:

```css
:root {
  /* Colores */
  --color-primary:       #FF385C;
  --color-primary-hover: #E31C5F;
  --color-text:          #222222;
  --color-text-muted:    #717171;
  --color-border:        #DDDDDD;
  --color-bg:            #FFFFFF;
  --color-bg-soft:       #F7F7F7;

  /* Espaciado (escala 4px) */
  --space-1:  4px;
  --space-2:  8px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;

  /* Radios */
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-pill: 999px;

  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.10);

  /* Tipografía */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --fs-sm:   14px;
  --fs-base: 16px;
  --fs-lg:   22px;

  /* Z-index */
  --z-navbar: 100;
  --z-modal:  1000;
  --z-toast:  2000;
}
```

**Regla:** ningún CSS component usa valores literales. Todo va por tokens.

### Orden de carga

`style.css` es el único archivo linkeado en HTML. Solo contiene `@import`:

```css
/* 1. Tokens y reset */
@import url("base/_tokens.css");
@import url("base/_reset.css");
@import url("base/_typography.css");

/* 2. Componentes */
@import url("components/_navbar.css");
@import url("components/_buttons.css");
/* ... */

/* 3. Utilidades */
@import url("utilities/_helpers.css");

/* 4. Específicos por página (últimos) */
@import url("pages/_index.css");
@import url("pages/_auth.css");
@import url("pages/_detalle.css");
```

La regla es: **de lo más genérico a lo más específico**. Igual que la cascada CSS: lo último gana.

### Nomenclatura BEM

```css
/* Bloque */
.card { }

/* Elemento */
.card__title { }
.card__image { }
.card__price { }

/* Modificador */
.card--destacada { }
.card__price--rebajado { }
```

**Estados** con prefijo `is-`:

```css
.is-hidden { display: none; }
.is-active { color: var(--color-primary); }
.is-loading { opacity: 0.6; pointer-events: none; }
```

**Utilidades** con prefijo `u-` o nombres directos:

```css
.d-flex { display: flex; }
.mt-4   { margin-top: var(--space-4); }
.text-muted { color: var(--color-text-muted); }
```

### Breakpoints

Sin sistema formal de breakpoints. Cada componente define los suyos:

| Breakpoint | Uso |
|------------|-----|
| `@media (max-width: 767px)` | Mobile |
| `@media (max-width: 991px)` | Tablet |
| `@media (max-width: 1199px)` | Desktop pequeño |

---

## ⚙️ Arquitectura JavaScript

### Capas

```
pages/           ← Entry points de cada HTML
    ↓
features/        ← Features complejas multi-componente
    ↓
components/      ← UI reutilizable
    ↓
services/        ← Wrappers de endpoints
    ↓
api.js           ← Cliente HTTP centralizado
    ↓
session.js       ← Tokens y usuario
```

**Reglas:**

- **Ningún** `fetch` directo fuera de `api.js`.
- **Ningún** componente accede a `localStorage` directamente; todo pasa por `session.js`.
- **Ninguna** página renderiza HTML sin escapar los datos del usuario (usar `escaparHtml`).
- **Ninguna** variable global en `window` salvo casos justificados.

### `api.js` — Cliente HTTP

Centraliza todas las peticiones. Se encarga de:

1. Adjuntar el `accessToken` como `Authorization: Bearer`.
2. Detectar `401` y renovar el token automáticamente con el `refreshToken`.
3. Reintentar la petición original con el nuevo access token.
4. Si el refresh también falla, cerrar sesión y redirigir a `auth.html`.
5. Parsear errores del backend y lanzar `Error` con el mensaje.

```js
import { api } from './api.js';

const propiedades = await api.get('/propiedades?pagina=0&tamanio=10');
const nueva = await api.post('/reservas', { habitacionId: 1, cantidad: 1, ... });
await api.del('/favoritos/5');
```

| Método | Uso |
|--------|-----|
| `api.get(path)` | GET con token |
| `api.post(path, body)` | POST JSON |
| `api.put(path, body)` | PUT JSON |
| `api.del(path)` | DELETE |
| `api.upload(path, formData)` | POST multipart/form-data |

### `session.js` — Gestión de tokens

| Función | Propósito |
|---------|-----------|
| `guardarSesion({...})` | Guarda tokens y datos del usuario |
| `obtenerAccessToken()` | Devuelve el access token actual |
| `obtenerRefreshToken()` | Devuelve el refresh token |
| `obtenerUsuario()` | Devuelve el objeto usuario |
| `estaAutenticado()` | `true` si hay token válido |
| `esAnfitrion()` | `true` si el usuario es anfitrión |
| `actualizarUsuario(parcial)` | Actualiza datos del usuario |
| `cerrarSesion()` | Elimina todos los tokens y datos |

**Almacenamiento:**

| Token | Storage | Vida |
|-------|---------|------|
| Access | `sessionStorage` | Se borra al cerrar pestaña |
| Refresh | `localStorage` | Persiste entre sesiones |
| Usuario | `sessionStorage` | Datos básicos (id, nombre, correo, rol) |

### `format.js` — Utilidades

| Función | Uso |
|---------|-----|
| `formatearPrecio(valor)` | `250 → "S/ 250"` |
| `formatearFecha(fecha)` | `2027-01-10 → "10 de enero de 2027"` |
| `formatearFechaCorta(fecha)` | `2027-01-10 → "10 ene 2027"` |
| `calcularNoches(inicio, fin)` | Número de noches entre dos fechas |
| `aISO(fecha)` | Date → string `YYYY-MM-DD` |
| `inicial(nombre)` | `"Juan Pérez" → "J"` |
| `primerNombre(nombre)` | `"Juan Pérez" → "Juan"` |
| `escaparHtml(texto)` | Escapa `& < > " '` |
| `truncar(texto, max)` | Trunca con elipsis |

---

## 🔄 Flujo de una petición

Ejemplo: crear una reserva desde `detalle.html`.

```
1. Usuario presiona "Reservar"
   ↓
2. pages/detalle.js captura el click
   → Valida que esté autenticado con session.js
   → Construye payload { habitacionId, cantidad, fechaInicio, fechaFin }
   ↓
3. pages/detalle.js llama a services/reservaService.js → crear(payload)
   ↓
4. services/reservaService.js llama a api.post('/reservas', payload)
   ↓
5. api.js adjunta "Authorization: Bearer <accessToken>"
   → fetch('http://localhost:8080/api/reservas', { method: 'POST', ... })
   ↓
6. Backend responde 201 con ReservaResponse
   ↓
7. api.js devuelve el JSON
   ↓
8. services/reservaService.js devuelve el objeto
   ↓
9. pages/detalle.js:
   → Muestra toast "Reserva creada"
   → Abre modal para pagar
   → Redirige o actualiza la UI
```

Si en el paso 6 el backend responde **401**:

```
6a. api.js detecta 401
6b. api.js llama a /api/auth/refresh con el refreshToken
6c. Si el refresh es exitoso → guarda nuevos tokens → reintenta la petición original
6d. Si el refresh falla → cerrarSesion() → redirigir a auth.html
```

---

## 🧩 Componentes

Componentes en `js/components/` con responsabilidad única:

| Componente | Propósito |
|------------|-----------|
| `navbar.js` | Renderiza el navbar según la sesión; emite eventos `host-cta-click` |
| `modal.js` | Control genérico de modales (abrir, cerrar, cerrar con click fuera / Escape) |
| `toast.js` | Notificaciones flotantes temporales |
| `card.js` | Renderiza cards de propiedad + estados vacío/cargando |
| `gallery.js` | Galería de imágenes 1-5 en grid CSS |
| `searchBar.js` | Barra de búsqueda estilo Airbnb (placeholder) |
| `amenities.js` | Lista de servicios con iconos (placeholder) |
| `reviews.js` | Lista de reviews con rating (placeholder) |

### Patrón de componente

Los componentes son **funciones puras que devuelven HTML** o **funciones que manipulan el DOM**:

```js
// Componente puro → devuelve string HTML
export function cardHTML(propiedad) {
  return `<a class="card" href="detalle.html?id=${propiedad.id}">...</a>`;
}

// Componente con side-effect → manipula el DOM
export function renderizarCards(propiedades, contenedor) {
  contenedor.innerHTML = propiedades.map(cardHTML).join('');
}
```

**Nunca** acceden a `localStorage` ni a `fetch` directamente.

---

## 🎯 Features

Features en `js/features/` agrupan lógica compleja que involucra múltiples componentes y servicios:

| Feature | Propósito |
|---------|-----------|
| `becomeHost.js` | Modal + formulario + llamada a `/auth/become-host` |
| `publishProperty.js` | Modal + formulario + subida de imágenes + llamada a `/propiedades` |

### Patrón de feature

Los features se autoinstalan al importarse y escuchan eventos globales:

```js
// Al importar, registra listeners
document.addEventListener('DOMContentLoaded', () => {
  inyectarModal();
  document.addEventListener('host-cta-click', manejarClick);
});
```

El navbar **no conoce** a los features. Solo emite eventos:

```js
// En navbar.js
document.dispatchEvent(new CustomEvent('host-cta-click'));

// En becomeHost.js
document.addEventListener('host-cta-click', manejarClick);
```

**Inversión de dependencias:** el emisor no conoce a los receptores.

---

## 🔐 Gestión de sesión

### Flujo de login

```
1. Usuario ingresa credenciales en auth.html
2. pages/auth.js llama a authService.iniciarSesion({ correo, password })
3. authService llama a api.post('/auth/login', payload)
4. Si OK → guardarSesion({ accessToken, refreshToken, id, nombre, correo, rol })
5. Redirige a index.html
```

### Flujo de logout

```
1. Usuario presiona "Cerrar sesión" en navbar
2. navbar.js llama a cerrarSesion()
3. session.js elimina access, refresh y usuario
4. Redirige a index.html
```

### Refresh automático

El refresh es **transparente** para el resto del código. Solo `api.js` sabe que existe:

```js
// Cualquier service hace esto:
const datos = await api.get('/reservas/mias');

// Y api.js internamente:
// 1. Adjunta access token
// 2. Si recibe 401 → intenta refresh
// 3. Si refresh OK → reintenta con nuevo token
// 4. Devuelve los datos sin que el service se entere
```

---

## 📐 Convenciones

### JavaScript

- **ES Modules** con `import` / `export`.
- **Sin `var`** — solo `const` y `let`.
- **Funciones declarativas** para lógica, **arrow functions** para callbacks.
- **Async/await** en lugar de promesas anidadas.
- **Sin dependencias externas**.
- **Un archivo = un concern**.
- **camelCase** para variables y funciones.
- **PascalCase** para clases (si las hubiera).
- **UPPER_SNAKE_CASE** para constantes globales.

### CSS

- **BEM estricto** para clases.
- **Tokens en `:root`** para todos los valores.
- **Sin `!important`** salvo en utilidades explícitas.
- **Sin estilos inline** en HTML.
- **Sin anidamiento profundo** — máximo 2 niveles de especificidad.
- **Un archivo por componente** en `css/components/`.

### HTML

- **HTML5 semántico**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- **Un solo `<link>` de CSS** por página: `css/style.css`.
- **Un solo `<script type="module">`** por página: `js/pages/*.js`.
- **Sin `<script>` inline**.
- **Sin estilos inline**.
- **IDs** con `camelCase`.
- **Clases** con `kebab-case` o BEM.

---

## 📄 Páginas

### `index.html` — Catálogo

**Propósito:** mostrar el catálogo de propiedades con búsqueda.

**Estructura:**

```html
<body>
  <div id="app-navbar"></div>              <!-- Inyectado por navbar.js -->
  <form id="searchForm" class="search">...</form>
  <main class="index__catalog">
    <h1 class="index__title" id="catalogoTitulo">Alojamientos disponibles</h1>
    <div class="catalog" id="catalogoGrid"></div>
  </main>
  <script type="module" src="js/pages/index.js"></script>
</body>
```

**Responsabilidad del JS:**

- Renderiza el navbar con `renderNavbar()`.
- Inicializa modales con `inicializarModales()`.
- Carga el catálogo con `cargarCatalogo()`.
- Escucha el submit del search y vuelve a cargar.

### `auth.html` — Login / Registro

**Propósito:** autenticación de usuarios.

**Estructura:**

```html
<main class="auth">
  <div class="auth__card">
    <a href="index.html" class="auth__brand">MundoTerraza</a>
    <div class="tabs">
      <button class="tabs__item tabs__item--active" data-tab="loginPanel">Ingresar</button>
      <button class="tabs__item" data-tab="registerPanel">Registrarse</button>
    </div>
    <div id="loginPanel" class="tab-pane tab-pane--active">...</div>
    <div id="registerPanel" class="tab-pane">...</div>
  </div>
</main>
```

**Responsabilidad del JS:**

- Maneja los tabs.
- Envía login y registro.
- Guarda la sesión con `authService`.
- Redirige a `index.html` tras éxito.

### `detalle.html` — Detalle + Reserva

**Propósito:** mostrar el detalle de una propiedad y permitir reservar.

**Estructura:**

```html
<body>
  <div id="app-navbar"></div>
  <main class="detalle">
    <a href="index.html" class="detalle__back">← Volver</a>
    <div id="detalleContenido">
      <div class="loader"><div class="loader__circle"></div></div>
    </div>
  </main>
  <script type="module" src="js/pages/detalle.js"></script>
</body>
```

**Responsabilidad del JS:**

- Lee el `?id=` de la URL.
- Carga el detalle con `propiedadService.obtener(id)`.
- Renderiza galería, info, servicios, habitaciones, reviews.
- Prepara el flujo de reserva (a completar por el equipo de features).

---

## 📊 Resumen ejecutivo

| Aspecto | Decisión |
|---------|----------|
| Tipo de app | MPA con ES Modules |
| Framework | Ninguno (vanilla JS) |
| Estilos | CSS nativo modular con tokens + BEM |
| Bundler | Ninguno en dev |
| Autenticación | JWT en sessionStorage + localStorage |
| Comunicación HTTP | `api.js` centralizado |
| Componentes | Funciones puras de render |
| Features | Autoinstalables vía eventos del DOM |
| Cobertura | 3 páginas, 8 componentes, 2 features |
| Deuda pendiente | Reservas, pagos, reviews, favoritos en frontend |
