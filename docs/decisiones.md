# 🧭 Decisiones Arquitectónicas (ADRs) — MundoTerraza

> Registro de las decisiones arquitectónicas más relevantes tomadas durante el diseño y desarrollo de MundoTerraza.
>
> Formato basado en [Michael Nygard's ADR](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).

---

## 📖 Índice

| ADR | Título | Estado |
|-----|--------|--------|
| [ADR-001](#adr-001--arquitectura-hexagonal-pragmática) | Arquitectura hexagonal pragmática | ✅ Aceptada |
| [ADR-002](#adr-002--ddd-aplicado-sin-eventos-de-dominio) | DDD aplicado sin eventos de dominio | ✅ Aceptada |
| [ADR-003](#adr-003--jwt-stateless-con-access-y-refresh) | JWT stateless con access y refresh | ✅ Aceptada |
| [ADR-004](#adr-004--flyway-en-lugar-de-ddl-autoupdate) | Flyway en lugar de `ddl-auto=update` | ✅ Aceptada |
| [ADR-005](#adr-005--mapstruct-en-lugar-de-mappers-manuales) | MapStruct en lugar de mappers manuales | ✅ Aceptada |
| [ADR-006](#adr-006--bem--tokens-sin-frameworks-css) | BEM + tokens sin frameworks CSS | ✅ Aceptada |
| [ADR-007](#adr-007--es-modules-nativos-sin-bundler) | ES Modules nativos sin bundler | ✅ Aceptada |
| [ADR-008](#adr-008--comisión-del-15-en-el-dominio) | Comisión del 15% en el dominio | ✅ Aceptada |
| [ADR-009](#adr-009--reserva-sobre-habitación-no-sobre-propiedad) | Reserva sobre habitación, no sobre propiedad | ✅ Aceptada |
| [ADR-010](#adr-010--rating-denenormalizado-en-propiedad) | Rating denormalizado en Propiedad | ✅ Aceptada |
| [ADR-011](#adr-011--soft-delete-híbrido) | Soft delete híbrido | ✅ Aceptada |
| [ADR-012](#adr-012--sin-lombok-en-value-objects) | Sin Lombok en Value Objects | ✅ Aceptada |
| [ADR-013](#adr-013--bloqueo-de-cuenta-tras-5-intentos-fallidos) | Bloqueo de cuenta tras 5 intentos fallidos | ✅ Aceptada |
| [ADR-014](#adr-014--sin-verificación-de-email-en-v1) | Sin verificación de email en v1 | ✅ Aceptada |
| [ADR-015](#adr-015--sin-roles-admin-y-agente) | Sin roles ADMIN y AGENTE | ✅ Aceptada |
| [ADR-016](#adr-016--instant-booking-con-pasarela-simulada) | Instant booking con pasarela simulada | ✅ Aceptada |

---

## ADR-001 — Arquitectura hexagonal pragmática

**Fecha:** 2026-10-09
**Estado:** ✅ Aceptada

### Contexto

El proyecto requiere una arquitectura que:

- Mantenga el dominio aislado de la infraestructura.
- Facilite el testing sin dependencia de frameworks.
- Sea comprensible para un equipo pequeño con plazos académicos.
- No introduzca sobre-ingeniería.

La arquitectura hexagonal **estricta** separa el modelo de dominio del modelo JPA, requiriendo dos clases paralelas y mappers entre ambas. Esto añade ~30% de código boilerplate.

### Decisión

Se adopta **arquitectura hexagonal pragmática**: las entidades JPA actúan simultáneamente como entidades de dominio. La regla de dependencias se mantiene (controller → service → repository → domain), pero no se duplican entidades.

### Consecuencias

**Positivas:**

- Menos clases, menos mappers, menos superficie de bugs.
- Curva de aprendizaje baja para el equipo.
- Testing de dominio sin necesidad de base de datos.
- Migrable a hexagonal estricto si el proyecto lo requiere.

**Negativas:**

- El dominio arrastra anotaciones JPA (`@Entity`, `@Column`, `@PrePersist`).
- Acoplamiento a Hibernate: cambiar de ORM implicaría reescribir el dominio.
- Lazy loading filtra al dominio (mitigado con DTOs en los bordes).

### Alternativas consideradas

1. **Hexagonal estricto** — descartado por sobre-ingeniería para el alcance.
2. **MVC clásico sin capa de dominio** — descartado por pobreza en reglas de negocio.
3. **Arquitectura limpia (Clean Architecture)** — descartado por complejidad de mappers.

---

## ADR-002 — DDD aplicado sin eventos de dominio

**Fecha:** 2026-10-09
**Estado:** ✅ Aceptada

### Contexto

DDD aporta valor cuando hay **reglas de negocio ricas**. En MundoTerraza las reglas incluyen:

- Cálculo de comisión (15%).
- Validación de solapes de reserva.
- Plazos de edición de review (30 días).
- Transiciones de estado de reservas.

DDD completo (eventos de dominio, anti-corruption layers, agregados con event sourcing) sería excesivo.

### Decisión

Se aplican de DDD: **entidades ricas, Value Objects, agregados y excepciones de dominio**. No se aplican: eventos de dominio, event sourcing, sagas ni anti-corruption layers.

### Consecuencias

**Positivas:**

- Dominio rico y testeable.
- Sin ceremonia innecesaria.
- Reglas de negocio centralizadas en las entidades.

**Negativas:**

- Sin eventos de dominio no hay desacoplamiento reactivo.
- Si mañana se integra con un bus de eventos, habría que refactorizar.

### Alternativas consideradas

1. **DDD completo** — descartado por complejidad sin retorno claro.
2. **Modelo anémico** — descartado porque las reglas terminarían en servicios procedurales.

---

## ADR-003 — JWT stateless con access y refresh

**Fecha:** 2026-10-09
**Estado:** ✅ Aceptada

### Contexto

La autenticación puede ser **stateful** (sesiones en servidor) o **stateless** (JWT). El frontend es una MPA con `fetch`, sin cookies de sesión.

Opciones:

1. Sesiones con `JSESSIONID` y cookie.
2. JWT con un solo token de larga duración.
3. JWT con access + refresh.

### Decisión

Se adopta **JWT con access token (15 min) y refresh token (7 días)**. El access vive en `sessionStorage`, el refresh en `localStorage`.

En v1, el endpoint `POST /api/auth/refresh` **emite un nuevo par de tokens pero no invalida el refresh anterior**. No hay blacklist ni rotación real. Es coherente con el enfoque stateless sin estado compartido: si más adelante se necesita rotación, se añadirá una tabla de refresh tokens revocados o un cache distribuido.

### Consecuencias

**Positivas:**

- Escalabilidad horizontal trivial (sin sesiones compartidas).
- Portable a móvil y a SPAs.
- El access corto limita el daño en caso de robo.
- El refresh largo mantiene buena UX.

**Negativas:**

- No se puede invalidar un access token antes de que expire.
- Requiere lógica de refresh transparente en el frontend.
- Si alguien roba el refresh, el daño dura hasta su expiración.
- Sin rotación real, un refresh robado sigue siendo válido hasta su expiración natural (7 días).

### Alternativas consideradas

1. **Sesión con cookie** — descartado por fricción con SPA y CORS.
2. **JWT único de larga duración** — descartado por seguridad.
3. **JWT con blacklist en Redis** — descartado por añadir infraestructura.

---

## ADR-004 — Flyway en lugar de `ddl-auto=update`

**Fecha:** 2026-10-09
**Estado:** ✅ Aceptada

### Contexto

Hibernate puede generar y actualizar el esquema automáticamente con `spring.jpa.hibernate.ddl-auto=update`. Sin embargo, esto:

- No versiona los cambios.
- No es auditable.
- No permite rollback controlado.
- Puede borrar columnas silenciosamente.

### Decisión

Se adopta **Flyway** con migraciones SQL versionadas en `src/main/resources/db/migration/`. `ddl-auto` se establece en `validate` para producción y `none` en desarrollo (Flyway hace el trabajo).

### Consecuencias

**Positivas:**

- Esquema versionado y auditable.
- Rollback reproducible.
- Mismo esquema en dev, staging y prod.
- Colaboración: cada cambio de BD es un archivo.

**Negativas:**

- Dos fuentes de verdad: entidades JPA y migraciones SQL.
- Cambios en entidades requieren migración manual.
- `mvn clean` no basta: hay que resetear la BD al cambiar migraciones en dev.

### Alternativas consideradas

1. **Liquibase** — más expresivo (XML/YAML) pero más verboso.
2. **`ddl-auto=update`** — descartado por falta de control.
3. **Migraciones manuales sin herramienta** — descartado por falta de historial.

---

## ADR-005 — MapStruct en lugar de mappers manuales

**Fecha:** 2026-10-09
**Estado:** ✅ Aceptada

### Contexto

Convertir entre entidades JPA y DTOs es trabajo repetitivo. Opciones:

1. Mappers manuales (getters y setters a mano).
2. MapStruct (genera código en build).
3. ModelMapper (reflexión en runtime).

### Decisión

Se adopta **MapStruct 1.6.3** con `componentModel = "spring"`. Los mappers se generan en tiempo de compilación y se inyectan como beans.

### Consecuencias

**Positivas:**

- Cero reflexión en runtime → más rápido.
- Errores de mapeo detectados en build.
- Mappers legibles (`@Mapping(target="x", source="y")`).
- Fácil testear (los mappers son interfaces generadas).

**Negativas:**

- Requiere configuración del annotation processor.
- Conflictos ocasionales con Lombok (`lombok-mapstruct-binding`).
- Curva de aprendizaje para casos complejos (expresiones, `@AfterMapping`).

### Alternativas consideradas

1. **Mappers manuales** — descartado por verbosidad.
2. **ModelMapper** — descartado por reflexión y bajo rendimiento.
3. **Sin DTOs (exponer entidades)** — descartado por acoplamiento HTTP ↔ dominio.

---

## ADR-006 — BEM + tokens sin frameworks CSS

**Fecha:** 2026-10-10
**Estado:** ✅ Aceptada

### Contexto

El frontend necesita un sistema de diseño que:

- Sea mantenible por varias personas.
- No dependa de Bootstrap, Tailwind ni CDNs.
- Se vea profesional (estilo Airbnb).
- Escale sin conflictos de nombres.

### Decisión

Se adopta:

- **BEM** para nomenclatura (`.card__title--destacada`).
- **Design tokens** en `:root` (`--color-primary`, `--space-4`).
- **ITCSS** para orden de carga: base → componentes → utilidades → páginas.
- **SMACSS ligero** para estados (`is-`) y utilidades.

### Consecuencias

**Positivas:**

- Nombres autoexplicativos y sin conflictos.
- Cambio de tema (color, espaciado) toca un solo archivo.
- Sin dependencias externas ni CDN.
- Migrable a Tailwind o SCSS sin reescribir HTML.

**Negativas:**

- Nombres largos en HTML.
- Duplicación ocasional de reglas entre componentes.
- Curva de aprendizaje para quien no conoce BEM.

### Alternativas consideradas

1. **Bootstrap** — descartado por peso y estilo genérico.
2. **Tailwind** — descartado por requerir bundler.
3. **CSS Modules** — descartado por requerir bundler.

---

## ADR-007 — ES Modules nativos sin bundler

**Fecha:** 2026-10-10
**Estado:** ✅ Aceptada

### Contexto

El frontend necesita organización modular sin añadir complejidad de build. Opciones:

1. Bundler (Vite, Webpack, esbuild).
2. Scripts clásicos con `<script src>` en orden.
3. ES Modules nativos.

### Decisión

Se adoptan **ES Modules nativos** (`<script type="module">`). Los archivos se sirven tal cual desde Spring Boot en `/static`. Sin `node_modules`, sin `package.json`, sin build step.

### Consecuencias

**Positivas:**

- Cero instalación de Node.js ni npm.
- `import`/`export` estándar.
- Migrable a Vite sin cambiar el código fuente.
- Encapsulamiento real: nada contamina `window`.

**Negativas:**

- HTTP waterfall: cada `import` es una petición.
- Sin minificación ni tree-shaking.
- Requiere navegadores modernos (todos desde 2017).
- Los módulos no funcionan abriendo el HTML con `file://` — requieren servidor.

### Alternativas consideradas

1. **Vite** — descartado por añadir toolchain sin retorno claro.
2. **Webpack** — descartado por complejidad de configuración.
3. **Scripts clásicos** — descartado por contaminar `window` y orden frágil.

---

## ADR-008 — Comisión del 15% en el dominio

**Fecha:** 2026-10-09
**Estado:** ✅ Aceptada

### Contexto

La plataforma retiene una comisión del 15% sobre el subtotal de cada reserva. ¿Dónde debe vivir este cálculo?

### Decisión

La comisión vive como **constante estática** en la entidad `Reserva` (`COMISION_PLATAFORMA = Porcentaje.de(15.00)`) y se calcula en el constructor. No es configurable por usuario.

### Consecuencias

**Positivas:**

- Regla de negocio centralizada.
- Cálculo consistente en todos los flujos.
- Testeable sin infraestructura.

**Negativas:**

- Cambiar la comisión requiere recompilar y desplegar.
- Si se necesita comisión variable por anfitrión, habría que refactorizar.

### Alternativas consideradas

1. **Comisión en `application.properties`** — descartada por ser regla, no configuración.
2. **Comisión por anfitrión** — fuera de alcance en v1.
3. **Comisión variable por categoría** — fuera de alcance en v1.

---

## ADR-009 — Reserva sobre habitación, no sobre propiedad

**Fecha:** 2026-10-09
**Estado:** ✅ Aceptada

### Contexto

Airbnb reserva por **unidad específica** (habitación, departamento concreto), no por "edificio". Un hotel tiene 50 habitaciones idénticas; un hostal tiene habitaciones distintas; una casa tiene una sola unidad.

Opciones:

1. Reservar la propiedad completa.
2. Reservar por habitación (fiel a Airbnb).
3. Híbrido.

### Decisión

Se adopta **reserva por habitación**. Una propiedad contiene una o más habitaciones; cada habitación tiene su propio precio, capacidad y stock.

### Consecuencias

**Positivas:**

- Modelo fiel al negocio real.
- Permite hoteles, hostales y casas con la misma estructura.
- Precios diferenciados por habitación.
- Disponibilidad granular.

**Negativas:**

- Más entidades y relaciones.
- Más complejidad en el catálogo (mostrar "precio desde").
- El frontend debe gestionar selección de habitación.

### Alternativas consideradas

1. **Reservar por propiedad** — descartado por inflexibilidad.
2. **Habitación como variante de propiedad** — descartado por perder identidad propia.

---

## ADR-010 — Rating denormalizado en Propiedad

**Fecha:** 2026-10-09
**Estado:** ✅ Aceptada

### Contexto

El catálogo necesita mostrar `ratingPromedio` y `totalReviews` en cada card. Calcular esto con `AVG` en cada consulta es costoso con muchas reviews.

Opciones:

1. Calcular `AVG` y `COUNT` on-the-fly en cada query.
2. Denormalizar en `Propiedad` (`ratingPromedio`, `totalReviews`).
3. Cache externo (Redis).

### Decisión

Se **denormaliza** en la entidad `Propiedad`. Los campos se actualizan al crear, editar o eliminar una review. Un job nocturno (`ReconciliacionRatingJob`) recalcula por si hay desajustes.

### Consecuencias

**Positivas:**

- Consultas del catálogo rápidas.
- Menos carga en la BD.
- Posibilidad de ordenar por rating.

**Negativas:**

- Duplicación de datos (hay que mantener consistencia).
- Si el job falla, puede haber desajustes temporales.
- Más lógica en `ReviewService`.

### Alternativas consideradas

1. **On-the-fly con `AVG`** — descartado por coste.
2. **Vista materializada** — descartado por no soportarse bien en MySQL 8.
3. **Cache Redis** — descartado por añadir infraestructura.

---

## ADR-011 — Soft delete híbrido

**Fecha:** 2026-10-09
**Estado:** ✅ Aceptada

### Contexto

"Eliminar" una entidad puede significar:

1. **Hard delete** — borrar físicamente de la BD.
2. **Soft delete** — marcar como `ELIMINADA` y filtrar.

Hard delete rompe integridad referencial cuando hay historial. Soft delete acumula basura.

### Decisión

Se adopta un **modelo híbrido**:

| Entidad | Estrategia |
|---------|------------|
| `Propiedad` con reservas/reviews | Soft delete (`ELIMINADA`) + habitaciones → `INACTIVA` |
| `Propiedad` sin historial | Hard delete |
| `Usuario` | Soft delete + anonimización |
| `Review` | Soft delete (`ELIMINADA`) |
| `Habitacion` con reservas | Soft delete (`INACTIVA`) |
| `Reserva`, `Pago`, `Liquidacion`, `HistorialEstadoReserva` | Nunca se borran |
| `Favorito`, `Notificacion` leída | Hard delete |

### Consecuencias

**Positivas:**

- Integridad referencial garantizada.
- Historial auditable.
- Reversible en algunos casos.
- Al hacer soft delete de una Propiedad, sus Habitaciones pasan a `INACTIVA`, evitando que sigan reservándose por error.

**Negativas:**

- BD crece con el tiempo.
- Las consultas deben filtrar por `estado != ELIMINADA`.
- Los `UNIQUE` deben cuidarse con registros eliminados.

### Alternativas consideradas

1. **Hard delete siempre** — descartado por romper integridad.
2. **Soft delete siempre** — descartado por acumular basura innecesaria.
3. **Tabla de historial aparte** — descartado por complejidad.

---

## ADR-012 — Sin Lombok en Value Objects

**Fecha:** 2026-10-09
**Estado:** ✅ Aceptada

### Contexto

Lombok se usa en el proyecto para reducir boilerplate (`@Getter`, `@Setter`, `@NoArgsConstructor`). Pero los **Value Objects** tienen lógica de validación en su constructor y son inmutables.

### Decisión

Se usa Lombok **en entidades JPA y DTOs**, pero **no en Value Objects**. Los VOs se escriben a mano:

- Constructor privado.
- Factory method `de(valor)`.
- Getters sin setters.
- `equals` y `hashCode` explícitos.
- `toString` seguro (no expone datos sensibles en `Password`).

### Consecuencias

**Positivas:**

- Control total sobre el VO.
- `toString` seguro (ej: `Password[hash]` no expone el hash).
- Sin sorpresas de Lombok en clases con invariantes.
- Legibilidad: toda la lógica está visible.

**Negativas:**

- Más código a mano.
- Duplicación de patrón en cada VO.

### Alternativas consideradas

1. **Lombok en VOs** — descartado por riesgo de exponer datos.
2. **Records** — descartado por no permitir constructores privados + factory.
3. **Clases sin factory** — descartado por verbosidad de constructores.

---

## ADR-013 — Bloqueo de cuenta tras 5 intentos fallidos

**Fecha:** 2026-10-09
**Estado:** ✅ Aceptada

### Contexto

La autenticación es vulnerable a fuerza bruta. Opciones:

1. Sin protección (solo rate limiting en proxy).
2. CAPTCHA tras N intentos.
3. Bloqueo temporal por cuenta.
4. Bloqueo por IP.

### Decisión

Se implementa **bloqueo temporal de la cuenta** tras **5 intentos fallidos**, durante **15 minutos**. La lógica vive en `Usuario.registrarIntentoFallido(maxIntentos, minutosBloqueo)` y los valores se configuran en `application.properties`.

### Consecuencias

**Positivas:**

- Mitigación real contra fuerza bruta por cuenta.
- Sin infraestructura extra (todo en BD).
- Configurable sin recompilar.

**Negativas:**

- Un atacante puede bloquear cuentas ajenas (DoS de bajo nivel).
- No protege contra ataque distribuido.
- Sin desbloqueo manual por admin.

### Alternativas consideradas

1. **CAPTCHA** — descartado por requerir integración con Google.
2. **Bloqueo por IP** — descartado por complejidad de proxy.
3. **Sin bloqueo** — descartado por inseguro.

---

## ADR-014 — Sin verificación de email en v1

**Fecha:** 2026-10-09
**Estado:** ✅ Aceptada

### Contexto

La verificación de email requiere:

- SMTP configurado.
- Tokens de verificación con expiración.
- Plantillas HTML de email.
- Endpoint de verificación.
- Reenvío de correo.

### Decisión

**No se implementa verificación de email en v1.** El registro crea la cuenta directamente. El backend está preparado para añadirlo más adelante (campo `estado` en `Usuario`).

### Consecuencias

**Positivas:**

- Sin dependencia externa (SMTP).
- Sin fricción de UX en el registro.
- Alcance más acotado.

**Negativas:**

- Se pueden registrar correos falsos.
- Sin forma de recuperar contraseña por email.
- No se puede banear por correo real.

### Alternativas consideradas

1. **Verificación inmediata** — descartado por alcance.
2. **Verificación opcional** — descartado por UX confuso.
3. **Magic link** — descartado por complejidad.

---

## ADR-015 — Sin roles ADMIN y AGENTE

**Fecha:** 2026-10-09
**Estado:** ✅ Aceptada

### Contexto

Inicialmente se consideró un sistema con tres roles:

- `HUESPED` — reserva y reseña.
- `ANFITRION` — publica y gestiona propiedades.
- `AGENTE` — modera contenido y resuelve reportes.
- `ADMIN` — gestiona usuarios y configuración.

Añadir `ADMIN` y `AGENTE` implicaría:

- Endpoints de moderación.
- Sistema de reportes.
- Panel administrativo.
- Bootstrap inicial de admin.

### Decisión

**Se descartan `ADMIN` y `AGENTE`.** El sistema tiene solo dos roles efectivos: `HUESPED` (default) y `ANFITRION` (habilitación). No hay moderación externa de contenido. Los catálogos se cargan por seeders. Las reviews las elimina solo su autor dentro de los 30 días.

### Consecuencias

**Positivas:**

- Modelo mucho más simple.
- Sin panel administrativo que mantener.
- Sin bootstrap de admin.
- Menos superficie de ataque.

**Negativas:**

- Sin moderación de reviews abusivas.
- Sin gestión centralizada de usuarios.
- Los catálogos no se pueden editar en caliente.

### Alternativas consideradas

1. **Solo AGENTE** — descartado por falta de moderación externa en v1.
2. **AGENTE y ADMIN** — descartado por complejidad de bootstrap.
3. **Sistema de reportes sin rol específico** — descartado por no tener quién resuelva.

---

## ADR-016 — Instant booking con pasarela simulada

**Fecha:** 2026-10-10
**Estado:** ✅ Aceptada

### Contexto

El flujo de reserva original (v3.0) planteaba tres pasos explícitos:

1. Huésped crea la reserva (`PENDIENTE`).
2. Huésped registra el pago (`PENDIENTE`).
3. Huésped aprueba el pago (`APROBADO`) → la reserva pasa a `CONFIRMADA`.

Además, existía un endpoint paralelo `PUT /api/reservas/{id}/confirmar` que permitía al anfitrión confirmar una reserva **sin pago**.

Esto generaba tres problemas:

- **Duplicidad de caminos a `CONFIRMADA`**: uno por pago y otro manual por el anfitrión.
- **Roles inconsistentes**: el huésped "aprobaba" su propio pago, un rol que en una pasarela real ejecutaría un sistema externo.
- **Estado atrapado**: si un pago era rechazado, la reserva quedaba en `PENDIENTE` con un pago `RECHAZADO` y no había forma de reintentar.

Además, como el método `ReservaService.completar()` no tenía endpoint, ninguna reserva llegaba a `COMPLETADA` en runtime, lo cual bloqueaba los flujos de liquidación y reviews.

### Decisión

Se adopta **instant booking** con **pasarela simulada**:

- **Un solo endpoint público:** `POST /api/pagos`.
- **Un solo camino a `CONFIRMADA`:** la aprobación del pago.
- **Se elimina** `PUT /api/reservas/{id}/confirmar`.
- **Se eliminan** `PUT /api/pagos/{id}/aprobar` y `PUT /api/pagos/{id}/rechazar`.
- **Se añade** `PUT /api/reservas/{id}/completar` (solo anfitrión) para cerrar el ciclo.

**Simulación de pasarela:** el endpoint `POST /api/pagos` decide la respuesta según el campo `referencia`:

- Si empieza con `FAIL-` (case-insensitive) → pago `RECHAZADO`. La reserva sigue `PENDIENTE`.
- Cualquier otra referencia (o `null`) → pago `APROBADO`. La reserva pasa a `CONFIRMADA` automáticamente.

**Reintento:** si existe un pago `RECHAZADO` previo, se reutiliza la instancia y se vuelve a simular. Si ya existe un pago `APROBADO`, el request devuelve `400`.

**Disparadores del ciclo de vida:**

```
PENDIENTE   → al crear la reserva
CONFIRMADA  → al aprobar el pago (automático)
COMPLETADA  → al completar la reserva (acción del anfitrión)
CANCELADA   → al cancelar la reserva (huésped o anfitrión)
```

### Consecuencias

**Positivas:**

- Un solo flujo de confirmación, sin caminos paralelos.
- El rol del huésped es coherente: paga, no "aprueba".
- Los flujos de liquidación y reviews quedan alcanzables en runtime.
- Los tests end-to-end pueden simular rechazo con `referencia = "FAIL-001"`, sin pasarela real.
- El frontend solo necesita un endpoint para completar la reserva.

**Negativas:**

- Se pierde el modelo "request-to-book" (aprobación del anfitrión antes del pago). Si el negocio lo requiere en v2, se añadirá un estado `PENDIENTE_APROBACION` y un endpoint adicional.
- El nombre del método `simularPasarela()` en `PagoService` expone que es un stub. Es intencional: cuando se integre una pasarela real, se reemplaza su cuerpo sin tocar el resto del flujo.
- El prefijo `FAIL-` es una convención ad-hoc. Documentada en `docs/api.md`.
- El prefijo `FAIL-` se decidió por simplicidad: se documenta en `docs/api.md` y en la tabla "Modelo de reserva: instant booking". Alternativas como un campo booleano `simularFallo` en el DTO se descartaron por añadir ruido al contrato HTTP.

### Alternativas consideradas

1. **Request-to-Book con aprobación previa del anfitrión.** Descartada: introducía un estado extra `PENDIENTE_APROBACION`, un endpoint nuevo (`PUT /api/reservas/{id}/aceptar`) y ~5–7 horas de refactorización. Además, con pasarela simulada, la aprobación del anfitrión no aporta valor funcional (no hay "hold" real sobre la tarjeta).
2. **Mantener el flujo original con tres pasos.** Descartada: perpetuaba los tres problemas de contexto (duplicidad, roles inconsistentes, estado atrapado).
3. **Mantener `aprobar`/`rechazar` como endpoints manuales para la demo.** Descartada: el huésped no debería "aprobar" su propio pago, ni siquiera para la demo. La simulación con `FAIL-` cumple el mismo objetivo didáctico sin la ambigüedad de roles.

---

## 📝 Convenciones para futuros ADRs

Al añadir un nuevo ADR:

1. **Numeración secuencial** — `ADR-017`, `ADR-018`, etc.
2. **No se editan los ADRs existentes** — si una decisión cambia, se crea uno nuevo que **supersede** al anterior.
3. **Secciones obligatorias:**
   - Fecha
   - Estado (Propuesta / Aceptada / Rechazada / Deprecada / Superseded)
   - Contexto
   - Decisión
   - Consecuencias (Positivas / Negativas)
   - Alternativas consideradas
4. **Ubicación:** `docs/decisiones.md` (todo en un archivo) o `docs/adr/NNN-titulo.md` (un archivo por ADR).
