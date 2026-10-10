# 🤝 Guía de Contribución — MundoTerraza

> Guía para contribuir al proyecto MundoTerraza. Describe el flujo de trabajo, convenciones y estándares que todo colaborador debe seguir.

---

## 📖 Tabla de contenidos

1. [Código de conducta](#-código-de-conducta)
2. [Cómo empezar](#-cómo-empezar)
3. [Flujo de trabajo con Git](#-flujo-de-trabajo-con-git)
4. [Convención de commits](#-convención-de-commits)
5. [Convención de ramas](#-convención-de-ramas)
6. [Estándares de código](#-estándares-de-código)
7. [Proceso de Pull Request](#-proceso-de-pull-request)
8. [Revisión de código](#-revisión-de-código)
9. [Reportar bugs](#-reportar-bugs)
10. [Proponer mejoras](#-proponer-mejoras)

---

## 📜 Código de conducta

Todo colaborador se compromete a:

- **Ser respetuoso** con los demás miembros del equipo.
- **Aceptar críticas constructivas** sobre su código.
- **Priorizar la calidad** sobre la velocidad.
- **Comunicar bloqueos** de forma temprana.
- **No subir credenciales** ni información sensible al repositorio.

Las conductas de acoso, discriminación o menosprecio no serán toleradas.

---

## 🚀 Cómo empezar

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd MundoTerrazaAPP
```

### 2. Instalar dependencias

| Herramienta | Versión |
|-------------|---------|
| Java JDK | 21 |
| Maven | 3.9+ |
| Docker Desktop / Podman | Última versión estable |

### 3. Levantar la base de datos

```bash
docker compose up -d
```

### 4. Arrancar el backend

```bash
mvn clean spring-boot:run
```

### 5. Verificar que compila y pasa los tests

```bash
mvn clean test
```

Debe terminar con **BUILD SUCCESS** y todos los tests en verde.

---

## 🔄 Flujo de trabajo con Git

El proyecto sigue un flujo basado en **ramas cortas** y **Pull Requests**:

```
main ← (producción, siempre estable)
  │
  ├── develop ← (integración, base para trabajar)
  │     │
  │     ├── feature/nombre-descriptivo
  │     ├── fix/nombre-del-bug
  │     ├── refactor/modulo
  │     └── docs/tema
  │
  └── hotfix/bug-critico ← (solo desde main, para fixes urgentes)
```

### Reglas

1. **Nunca trabajar directamente sobre `main` o `develop`.**
2. Crear una rama por cada tarea (`feature/`, `fix/`, `refactor/`, `docs/`).
3. Mantener las ramas cortas: menos de 3 días idealmente.
4. Hacer `git pull --rebase` antes de cada push.
5. Abrir Pull Request al terminar y esperar al menos 1 aprobación.

### Comandos básicos

```bash
# Actualizar develop
git checkout develop
git pull origin develop

# Crear rama de trabajo
git checkout -b feature/nombre-descriptivo

# Trabajar y commitear
git add .
git commit -m "feat: descripción breve"

# Subir la rama
git push -u origin feature/nombre-descriptivo
```

---

## 📝 Convención de commits

Se sigue [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<alcance opcional>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos permitidos

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `style` | Formato (espacios, comas, sin cambios funcionales) |
| `refactor` | Refactor sin cambio de comportamiento |
| `test` | Añadir o corregir tests |
| `chore` | Mantenimiento (dependencias, configs) |
| `perf` | Mejora de rendimiento |
| `build` | Cambios en el sistema de build |
| `ci` | Cambios en CI/CD |

### Ejemplos

```
feat(auth): agregar endpoint de refresh token
fix(reserva): corregir cálculo de comisión en reservas canceladas
docs(api): documentar endpoint de favoritos
refactor(service): extraer lógica de disponibilidad a servicio dedicado
test(domain): agregar tests para Dinero
chore(deps): actualizar Spring Boot a 3.3.5
```

### Reglas

- Descripción en **imperativo presente** ("agregar" no "agregado").
- Primera línea ≤ 72 caracteres.
- Sin punto final.
- Si el commit cierra un issue: `Closes #123` en el footer.

---

## 🌿 Convención de ramas

| Prefijo | Uso | Ejemplo |
|---------|-----|---------|
| `feature/` | Nueva funcionalidad | `feature/reservas-frontend` |
| `fix/` | Corrección de bug | `fix/validacion-dni` |
| `hotfix/` | Fix urgente en producción | `hotfix/jwt-expiracion` |
| `refactor/` | Refactor sin cambio funcional | `refactor/mappers` |
| `docs/` | Solo documentación | `docs/adr-comision` |
| `test/` | Solo tests | `test/cobertura-servicios` |
| `chore/` | Mantenimiento | `chore/actualizar-mysql` |

**Formato:** `prefijo/nombre-en-kebab-case`.

**Ejemplos válidos:**

- `feature/panel-anfitrion`
- `fix/calculo-solape`
- `docs/readme-instalacion`

**Ejemplos inválidos:**

- `MiRama` (sin prefijo)
- `feature_nueva` (guion bajo)
- `feature/nueva funcionalidad` (espacios)

---

## 📐 Estándares de código

### Java

- **Autoría:** cada archivo incluye Javadoc con `@author`.
- **Formato:** llaves en la misma línea, `if` de una línea sin llaves.
- **Validaciones:** en constructores de entidades y VOs, no en setters.
- **Nombres:**
  - Clases: `PascalCase`.
  - Métodos y variables: `camelCase`.
  - Constantes: `UPPER_SNAKE_CASE`.
  - Paquetes: minúsculas, sin guiones.
- **Imports:** sin `*`, ordenados alfabéticamente.
- **Longitud de línea:** ≤ 120 caracteres.
- **Sin `System.out.println`** — usar SLF4J.

**Ejemplo de estilo:**

```java
package app.domain.model;

import java.util.Objects;

/**
 * Representa un usuario del sistema.
 *
 * @author autor
 */
public class Usuario{
    private Long id;
    private String nombre;

    public Usuario(String nombre){
        if(nombre==null||nombre.isBlank())
            throw new IllegalArgumentException("Nombre no puede ser nulo");
        this.nombre=nombre.trim();
    }

    public Long getId(){return id;}
    public String getNombre(){return nombre;}

    @Override
    public boolean equals(Object o){
        if(this==o)return true;
        if(!(o instanceof Usuario usuario))return false;
        return Objects.equals(id, usuario.id);
    }

    @Override
    public int hashCode(){return Objects.hash(id);}
}
```

### SQL / Migraciones

- Nombres de tablas: `snake_case` en plural (`usuarios`, `propiedades`).
- Nombres de columnas: `snake_case` (`fecha_creacion`, `id_propiedad`).
- Cada migración es un archivo `V<n>__descripcion.sql`.
- **Nunca modificar una migración ya aplicada.**
- **Nunca borrar una migración del repositorio.**

### JavaScript

- **ES Modules** con `import` / `export`.
- **Sin `var`** — solo `const` y `let`.
- **Async/await** en lugar de promesas anidadas.
- **Sin `fetch` directo** — usar `api.js`.
- **camelCase** para variables y funciones.
- **UPPER_SNAKE_CASE** para constantes globales.
- **Un archivo = una responsabilidad.**

### CSS

- **BEM estricto** para clases: `.bloque__elemento--modificador`.
- **Design tokens** en `:root` (`--color-primary`).
- **Sin `!important`** salvo en utilidades explícitas.
- **Sin estilos inline** en HTML.
- **Un archivo por componente** en `css/components/`.

### HTML

- HTML5 semántico (`<header>`, `<main>`, `<section>`, etc.).
- Un solo `<link>` de CSS por página: `css/style.css`.
- Un solo `<script type="module">` por página: `js/pages/*.js`.
- IDs en `camelCase`, clases en `kebab-case`.

---

## 🔃 Proceso de Pull Request

### Antes de abrir el PR

1. **Actualizar la rama** con `develop`:

   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/mi-rama
   git rebase develop
   ```

2. **Verificar que compila:**

   ```bash
   mvn clean compile
   ```

3. **Verificar que pasan los tests:**

   ```bash
   mvn test
   ```

4. **Verificar que no hay archivos sensibles:**

   ```bash
   git diff --stat develop
   ```

5. **Verificar que el `.gitignore` sigue vigente** (no subir `target/`, `logs/`, `uploads/*`).

### Plantilla de PR

```markdown
## Descripción

Breve descripción de qué hace este PR y por qué es necesario.

## Tipo de cambio

- [ ] Nueva funcionalidad (feature)
- [ ] Corrección de bug (fix)
- [ ] Refactor
- [ ] Documentación
- [ ] Tests
- [ ] Mantenimiento

## ¿Cómo se probó?

Descripción de los pasos para verificar el cambio.

## Checklist

- [ ] El código compila sin warnings nuevos.
- [ ] Todos los tests pasan.
- [ ] Se agregaron tests para la nueva funcionalidad.
- [ ] La documentación se actualizó si aplica.
- [ ] No se subieron credenciales ni archivos sensibles.
- [ ] El commit sigue Conventional Commits.

## Issues relacionados

Closes #123
```

### Después de abrir el PR

1. Esperar al menos **1 aprobación** de otro colaborador.
2. Atender los comentarios de revisión.
3. Hacer `rebase` si la rama `develop` avanzó.
4. **Squash and merge** al aprobar.

---

## 👀 Revisión de código

Al revisar el código de otro colaborador, verificar:

### Correctitud

- [ ] El código hace lo que dice hacer.
- [ ] Maneja casos borde (null, vacío, límites).
- [ ] No hay bugs obvios.

### Diseño

- [ ] Sigue la arquitectura del proyecto (hexagonal pragmática).
- [ ] Respeta la regla de dependencias.
- [ ] No hay duplicación innecesaria.
- [ ] Nombres claros y descriptivos.

### Calidad

- [ ] Pasa los tests existentes.
- [ ] Incluye tests nuevos para lógica nueva.
- [ ] Sin `System.out.println`.
- [ ] Sin código comentado.
- [ ] Sin `TODO` sin issue asociado.

### Seguridad

- [ ] Sin credenciales hardcodeadas.
- [ ] Sin datos sensibles en logs.
- [ ] Valida entradas del usuario.
- [ ] El `id` del usuario no viene del body/URL.

### Comentarios en revisiones

- **Bloqueante:** algo que impide el merge.
- **Sugerencia:** mejora opcional.
- **Pregunta:** aclaración necesaria.
- **Elogio:** reconocer buen trabajo.

**Ejemplos:**

```
[BLOQUEANTE] Falta validar que el usuario sea el dueño de la propiedad antes de eliminarla.

[SUGERENCIA] Podrías extraer esta lógica a un método privado para mejorar la legibilidad.

[PREGUNTA] ¿Por qué se hace commit dentro del try? ¿No debería estar fuera?

[ELOGIO] Excelente manejo de casos borde en la validación de fechas.
```

---

## 🐛 Reportar bugs

Al reportar un bug, incluir:

### Plantilla de issue

```markdown
## Descripción

Descripción clara del bug.

## Pasos para reproducir

1. Ir a ...
2. Hacer click en ...
3. Observar el error

## Comportamiento esperado

Lo que debería pasar.

## Comportamiento actual

Lo que pasa en realidad.

## Entorno

- SO: [Linux Mint 22.1 / Windows 11 / macOS 14]
- Java: [21.0.12]
- Navegador: [Firefox 128]

## Logs / Capturas

Adjuntar logs relevantes o capturas de pantalla.

## Contexto adicional

Cualquier otra información útil.
```

### Buenos reportes de bugs

- **Reproducibles** — otra persona puede reproducirlo con los pasos.
- **Específicos** — un bug, un issue.
- **Con evidencia** — logs, capturas, código.
- **Sin duplicados** — buscar en issues existentes antes.

### Malos reportes de bugs

- "No funciona".
- "Está roto".
- "Hay un error".

---

## 💡 Proponer mejoras

Para proponer una mejora:

### 1. Verificar que no existe

Buscar en issues y PRs abiertos.

### 2. Abrir un issue con:

```markdown
## Problema

Descripción del problema actual.

## Propuesta

Descripción de la mejora propuesta.

## Alternativas consideradas

Otras soluciones que se evaluaron.

## Contexto

Información adicional que ayude a entender la propuesta.
```

### 3. Esperar discusión

Antes de empezar a codear, discutir la propuesta con el equipo.

### 4. Si se aprueba, abrir PR

Con la implementación acorde a lo discutido.

---

## 📌 Resumen rápido

```bash
# 1. Actualizar y crear rama
git checkout develop
git pull
git checkout -b feature/mi-feature

# 2. Trabajar y commitear
git add .
git commit -m "feat(scope): descripción"

# 3. Verificar antes de subir
mvn clean test

# 4. Subir y abrir PR
git push -u origin feature/mi-feature

# 5. Después de aprobación, squash and merge
```

**Reglas de oro:**

1. **Nunca** trabajar sobre `main` o `develop` directamente.
2. **Nunca** subir credenciales ni archivos sensibles.
3. **Siempre** hacer PR pequeño y enfocado.
4. **Siempre** incluir tests para nueva lógica.
5. **Siempre** actualizar la documentación si aplica.

---

## 📚 Referencias

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
