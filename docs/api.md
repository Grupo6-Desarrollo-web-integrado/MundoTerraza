# 📡 API REST — MundoTerraza

> Documentación de referencia de todos los endpoints HTTP del backend de MundoTerraza.

**Base URL:** `http://localhost:8080/api`
**Autenticación:** JWT Bearer Token
**Formato:** JSON (UTF-8)
**Documentación interactiva:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

## 📖 Tabla de contenidos

1. [Convenciones](#-convenciones)
2. [Autenticación](#-autenticación)
3. [Códigos HTTP](#-códigos-http)
4. [Formato de errores](#-formato-de-errores)
5. [Modelo de reserva: instant booking](#-modelo-de-reserva-instant-booking)
6. [Endpoints](#-endpoints)
   - [Auth](#auth)
   - [Usuarios](#usuarios)
   - [Catálogo](#catálogo)
   - [Propiedades](#propiedades)
   - [Habitaciones](#habitaciones)
   - [Disponibilidad](#disponibilidad)
   - [Bloqueos de fecha](#bloqueos-de-fecha)
   - [Reservas](#reservas)
   - [Pagos](#pagos)
   - [Reviews](#reviews)
   - [Favoritos](#favoritos)
   - [Notificaciones](#notificaciones)
   - [Liquidaciones](#liquidaciones)
7. [Ejemplo de flujo completo](#-ejemplo-de-flujo-completo)

---

## 🧭 Convenciones

- **Recursos en plural**: `/api/propiedades`, `/api/reservas`.
- **Sub-recursos anidados**: `/api/propiedades/{id}/habitaciones`.
- **Acciones de negocio como sub-recurso**: `/api/reservas/{id}/cancelar`.
- **Sin verbos en la URL** salvo en acciones de negocio explícitas.
- **Fechas** en formato ISO-8601: `YYYY-MM-DD` (fechas) o `YYYY-MM-DDTHH:mm:ss` (timestamps).
- **Paginación**: `?pagina=0&tamanio=10` (base 0).
- **Ordenamiento**: por defecto `id DESC` en listados.

### Encabezados

| Header | Valor | Cuándo |
|--------|-------|--------|
| `Content-Type` | `application/json` | Requests con body JSON |
| `Content-Type` | `multipart/form-data` | Requests con archivos |
| `Authorization` | `Bearer <accessToken>` | Endpoints autenticados |

---

## 🔐 Autenticación

MundoTerraza usa **JWT stateless** con dos tokens:

| Token | Vida | Almacenamiento sugerido |
|-------|------|-------------------------|
| **Access** | 15 minutos | `sessionStorage` (frontend) |
| **Refresh** | 7 días | `localStorage` o cookie HttpOnly |

### Flujo

```
1. Cliente → POST /api/auth/login
2. Servidor → devuelve { accessToken, refreshToken, usuario }
3. Cliente adjunta "Authorization: Bearer <accessToken>" en cada request
4. Al expirar el access (401), el cliente → POST /api/auth/refresh
5. Servidor → nuevos tokens
6. Si el refresh también expira → redirigir a /auth.html
```

### Restricciones

- Los endpoints públicos no requieren token.
- Los endpoints protegidos devuelven **401** si falta o expira el token.
- Los endpoints restringidos devuelven **403** si el usuario no tiene permisos.
- El `id` del usuario **nunca** se recibe del body ni la URL. Se obtiene del token.

---

## 📊 Códigos HTTP

| Código | Significado | Cuándo |
|--------|-------------|--------|
| `200 OK` | Éxito | GET, PUT exitosos |
| `201 Created` | Recurso creado | POST exitosos |
| `204 No Content` | Éxito sin body | DELETE exitosos |
| `400 Bad Request` | Error de validación o regla de negocio | Datos inválidos, `BusinessException` |
| `401 Unauthorized` | Falta o expira autenticación | Sin token, token inválido |
| `403 Forbidden` | Autenticado sin permisos | Acceder a recurso ajeno |
| `404 Not Found` | Recurso inexistente | `NotFoundException` |
| `409 Conflict` | Conflicto de estado | `ConflictoException` (ej: review duplicada) |
| `413 Payload Too Large` | Archivo excede el tamaño | Imagen > 5 MB |
| `423 Locked` | Cuenta bloqueada | `AccountLockedException` |
| `500 Internal Server Error` | Error no controlado | Excepción no capturada |

---

## 🧯 Formato de errores

Todas las excepciones se traducen a un `ErrorResponse` uniforme:

```json
{
  "timestamp": "2026-10-10T11:16:19.261",
  "status": 400,
  "error": "Bad Request",
  "mensaje": "La contrasena debe tener al menos 6 caracteres",
  "path": "/api/auth/register",
  "detalles": null
}
```

**Errores de validación** incluyen `detalles` con los campos fallidos:

```json
{
  "timestamp": "2026-10-10T11:16:19.261",
  "status": 400,
  "error": "Bad Request",
  "mensaje": "Datos invalidos en la peticion",
  "path": "/api/auth/register",
  "detalles": {
    "correo": "must be a well-formed email address",
    "password": "size must be between 6 and 72"
  }
}
```

---

## 🎯 Modelo de reserva: instant booking

MundoTerraza implementa **instant booking**: el huésped reserva y paga en un solo paso. La pasarela de pago (simulada en v1) aprueba o rechaza el pago, y al aprobar confirma automáticamente la reserva.

### Flujo

```
1. Huésped → POST /api/reservas            → Reserva PENDIENTE
2. Huésped → POST /api/pagos               → Sistema simula pasarela:
                                                ├─ APROBADO  → Pago APROBADO
                                                │              Reserva CONFIRMADA
                                                │              Historial registrado
                                                │              Notif al huésped y al anfitrión
                                                └─ RECHAZADO → Pago RECHAZADO
                                                               Reserva sigue PENDIENTE
                                                               Notif al huésped
                                                               (puede reintentar POST /api/pagos)
3. (Futuro) Anfitrión → PUT /api/reservas/{id}/completar
                                            → Reserva COMPLETADA
                                            → Liquidación generada
```

### Simulación de pasarela

El endpoint `POST /api/pagos` simula la respuesta de la pasarela según la `referencia` enviada:

| Referencia | Resultado simulado |
|------------|--------------------|
| `null` o vacía | **APROBADO** |
| `"OK-001"`, `"REF-123"`, cualquier referencia que **no** empiece con `FAIL-` | **APROBADO** |
| `"FAIL-001"`, `"fail-002"`, cualquier `FAIL-*` | **RECHAZADO** |

**Reintento:** si existe un pago en estado `RECHAZADO` para esa reserva, el huésped puede volver a llamar `POST /api/pagos` con una nueva referencia. El pago se reutiliza y se vuelve a simular.

**Bloqueo:** si ya existe un pago en estado `APROBADO`, el request devuelve `400`.

---

## 🌐 Endpoints

### Auth

#### Registro

```http
POST /api/auth/register
```

**Público** · Crea una cuenta nueva. Por defecto asigna rol `HUESPED`.

**Request:**
```json
{
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "password": "secreto123"
}
```

**Response `201`:**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "rol": "HUESPED",
  "esAnfitrion": false,
  "accessToken": "eyJhbGciOiJIUzM4NCJ9...",
  "refreshToken": "eyJhbGciOiJIUzM4NCJ9..."
}
```

**Errores:**
- `400` — correo ya registrado, formato de correo inválido, contraseña < 6 caracteres.

---

#### Login

```http
POST /api/auth/login
```

**Público** · Autentica un usuario existente.

**Request:**
```json
{
  "correo": "juan@example.com",
  "password": "secreto123"
}
```

**Response `200`:**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "rol": "HUESPED",
  "esAnfitrion": false,
  "accessToken": "eyJhbGciOiJIUzM4NCJ9...",
  "refreshToken": "eyJhbGciOiJIUzM4NCJ9..."
}
```

**Errores:**
- `401` — credenciales incorrectas.
- `423` — cuenta bloqueada tras 5 intentos fallidos (15 minutos).

---

#### Refresh

```http
POST /api/auth/refresh
```

**Público** · Renueva los tokens a partir del refresh token.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzM4NCJ9..."
}
```

**Response `200`:** mismo formato que login.

**Errores:**
- `401` — refresh token inválido o expirado.

---

#### Logout

```http
POST /api/auth/logout
```

**Autenticado** · Endpoint simbólico; el cliente debe eliminar sus tokens localmente.

**Response `204`** sin body.

---

#### Become Host

```http
PUT /api/auth/become-host
```

**Autenticado** · Habilita al usuario como anfitrión. **Irreversible.**

**Request:**
```json
{
  "telefono": "987654321",
  "dni": "12345678",
  "ciudad": "Lima",
  "biografia": "Me encanta recibir viajeros y mostrarles lo mejor de mi ciudad.",
  "aceptaTerminos": true
}
```

**Response `200`:**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "rol": "ANFITRION",
  "esAnfitrion": true,
  "accessToken": "eyJhbGciOiJIUzM4NCJ9...",
  "refreshToken": "eyJhbGciOiJIUzM4NCJ9..."
}
```

**Errores:**
- `400` — ya es anfitrión, DNI o teléfono inválidos, biografía < 20 caracteres.

---

### Usuarios

#### Obtener perfil

```http
GET /api/usuarios/me
Authorization: Bearer <accessToken>
```

**Response `200`:**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "telefono": "987654321",
  "dni": "12345678",
  "ciudad": "Lima",
  "biografia": "Me encanta recibir viajeros...",
  "esAnfitrion": true,
  "fechaAnfitrion": "2026-10-10T11:20:00",
  "fechaCreacion": "2026-10-10T11:16:16"
}
```

---

#### Actualizar perfil

```http
PUT /api/usuarios/me
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "nombre": "Juan Pérez Actualizado",
  "ciudad": "Arequipa",
  "biografia": "Nueva biografía con al menos 20 caracteres."
}
```

**Response `200`:** igual al perfil actualizado.

---

### Catálogo

#### Listar categorías

```http
GET /api/categorias
```

**Público** · Devuelve las categorías activas.

**Response `200`:**
```json
[
  { "id": 1, "nombre": "Playa", "descripcion": "Alojamientos frente al mar", "activa": true },
  { "id": 2, "nombre": "Montaña", "descripcion": "Alojamientos de sierra", "activa": true }
]
```

---

#### Listar servicios

```http
GET /api/servicios
```

**Público** · Devuelve los servicios activos.

**Response `200`:**
```json
[
  { "id": 1, "nombre": "WiFi", "icono": "wifi", "activo": true },
  { "id": 2, "nombre": "TV", "icono": "tv", "activo": true }
]
```

---

### Propiedades

#### Listar propiedades

```http
GET /api/propiedades?pagina=0&tamanio=10&texto=lima&huespedes=2&categoriaId=3&precioMin=100&precioMax=500&servicioIds=1&servicioIds=2
```

**Público** · Devuelve las propiedades activas con filtros opcionales.

**Query params:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `texto` | `String` | Búsqueda en título y ubicación (case-insensitive) |
| `categoriaId` | `Long` | Filtra por categoría |
| `tipoAlojamiento` | `String` | HOTEL, CASA, etc. |
| `precioMin` | `Double` | Precio mínimo por noche |
| `precioMax` | `Double` | Precio máximo por noche |
| `huespedes` | `Integer` | Capacidad mínima de adultos |
| `servicioIds` | `Long[]` | IDs de servicios requeridos |
| `pagina` | `int` | Número de página (base 0) |
| `tamanio` | `int` | Tamaño de página (default 10) |

**Response `200`:**
```json
{
  "contenido": [
    {
      "id": 1,
      "titulo": "Departamento en Miraflores",
      "ubicacion": "Miraflores, Lima",
      "tipoAlojamiento": "DEPARTAMENTO",
      "precioDesde": 250.00,
      "categoria": "Urbano",
      "nombreAnfitrion": "Juan Pérez",
      "imagenPrincipal": "/uploads/abc123.jpg",
      "ratingPromedio": 4.8,
      "totalReviews": 12,
      "esFavoritoEntreHuespedes": true
    }
  ],
  "pagina": 0,
  "tamanio": 10,
  "total": 1,
  "totalPaginas": 1,
  "esUltima": true
}
```

---

#### Detalle de propiedad

```http
GET /api/propiedades/{id}
```

**Público** · Devuelve el detalle completo con habitaciones, imágenes y servicios.

**Response `200`:**
```json
{
  "id": 1,
  "titulo": "Departamento en Miraflores",
  "descripcion": "Hermoso departamento con vista al mar...",
  "ubicacion": "Miraflores, Lima",
  "latitud": -12.1191,
  "longitud": -77.0286,
  "tipoAlojamiento": "DEPARTAMENTO",
  "politicaCancelacion": "FLEXIBLE",
  "estado": "ACTIVA",
  "categoria": "Urbano",
  "categoriaId": 3,
  "anfitrionId": 1,
  "nombreAnfitrion": "Juan Pérez",
  "ciudadAnfitrion": "Lima",
  "biografiaAnfitrion": "Me encanta recibir viajeros...",
  "precioDesde": 250.00,
  "ratingPromedio": 4.8,
  "totalReviews": 12,
  "esFavoritoEntreHuespedes": true,
  "imagenes": [
    { "id": 1, "url": "/uploads/abc123.jpg", "orden": 0 }
  ],
  "servicios": [
    { "id": 1, "nombre": "WiFi", "icono": "wifi", "activo": true }
  ],
  "habitaciones": [
    {
      "id": 1,
      "nombre": "Suite principal",
      "descripcion": "Habitación amplia...",
      "precioNoche": 250.00,
      "maxAdultos": 2,
      "maxNinos": 1,
      "maxBebes": 0,
      "maxMascotas": 0,
      "cantidadDormitorios": 1,
      "cantidadBanios": 1,
      "metrosCuadrados": 45.0,
      "stockTotal": 1,
      "estado": "DISPONIBLE",
      "imagenes": []
    }
  ]
}
```

---

#### Crear propiedad

```http
POST /api/propiedades
Authorization: Bearer <accessToken>
```

**Autenticado + Anfitrión** · Crea una propiedad en estado `BORRADOR`.

**Request:**
```json
{
  "titulo": "Departamento en Miraflores",
  "descripcion": "Hermoso departamento con vista al mar, totalmente amoblado",
  "ubicacion": "Miraflores, Lima",
  "latitud": -12.1191,
  "longitud": -77.0286,
  "tipoAlojamiento": "DEPARTAMENTO",
  "politicaCancelacion": "FLEXIBLE",
  "categoriaId": 3,
  "servicioIds": [1, 2, 3]
}
```

**Response `201`:** `PropiedadDetalleResponse`.

**Errores:**
- `403` — usuario no es anfitrión.
- `400` — categoría no activa, servicio inactivo, coordenadas fuera de rango.

---

#### Actualizar propiedad

```http
PUT /api/propiedades/{id}
Authorization: Bearer <accessToken>
```

**Autenticado + Dueño** · Actualiza los datos de la propiedad.

**Request:** mismo formato que `POST`.

**Errores:**
- `403` — el usuario no es el dueño de la propiedad.

---

#### Eliminar propiedad

```http
DELETE /api/propiedades/{id}
Authorization: Bearer <accessToken>
```

**Autenticado + Dueño** · Hard delete si no tiene historial. Soft delete (`ELIMINADA`) si tiene reservas o reviews, y sus habitaciones pasan a `INACTIVA`.

**Response `204`** sin body.

---

#### Publicar propiedad

```http
POST /api/propiedades/{id}/publicar
Authorization: Bearer <accessToken>
```

**Autenticado + Dueño** · Cambia estado a `ACTIVA`.

**Reglas:**
- Debe tener al menos 1 habitación.
- Debe tener al menos 1 imagen.
- Debe tener al menos 1 habitación en estado `DISPONIBLE`.

**Errores:**
- `409` — no cumple los requisitos.

---

#### Desactivar propiedad

```http
POST /api/propiedades/{id}/desactivar
Authorization: Bearer <accessToken>
```

**Autenticado + Dueño** · Cambia estado a `INACTIVA`.

---

#### Subir imagen

```http
POST /api/propiedades/{id}/imagenes
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data

archivo=<binary>
```

**Autenticado + Dueño** · Sube una imagen (.jpg/.jpeg/.png, máximo 5 MB).

**Response `201`** sin body.

**Errores:**
- `400` — formato inválido, peso excedido, ya hay 5 imágenes.
- `413` — archivo > 5 MB.

---

#### Eliminar imagen

```http
DELETE /api/propiedades/{id}/imagenes/{imagenId}
Authorization: Bearer <accessToken>
```

**Autenticado + Dueño** · Elimina la imagen de BD y disco. Reordena las restantes.

**Response `204`** sin body.

---

#### Reordenar imágenes

```http
PUT /api/propiedades/{id}/imagenes/orden
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "imagenIds": [3, 1, 2]
}
```

El primer ID de la lista pasa a ser portada (orden 0).

**Response `204`** sin body.

---

### Habitaciones

#### Listar habitaciones

```http
GET /api/propiedades/{propiedadId}/habitaciones
```

**Público** · Lista las habitaciones no eliminadas.

---

#### Crear habitación

```http
POST /api/propiedades/{propiedadId}/habitaciones
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "nombre": "Suite principal",
  "descripcion": "Habitación amplia con cama queen y vista al mar",
  "precioNoche": 250.00,
  "maxAdultos": 2,
  "maxNinos": 1,
  "maxBebes": 0,
  "maxMascotas": 0,
  "cantidadDormitorios": 1,
  "cantidadBanios": 1,
  "metrosCuadrados": 45.0,
  "stockTotal": 1
}
```

**Response `201`:** `HabitacionResponse`.

---

#### Actualizar habitación

```http
PUT /api/habitaciones/{id}
Authorization: Bearer <accessToken>
```

**Request:** mismo formato que `POST`.

---

#### Eliminar habitación

```http
DELETE /api/habitaciones/{id}
Authorization: Bearer <accessToken>
```

**Soft delete** → estado `INACTIVA`.

---

#### Subir imagen de habitación

```http
POST /api/habitaciones/{id}/imagenes
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data

archivo=<binary>
```

---

#### Eliminar imagen de habitación

```http
DELETE /api/habitaciones/{id}/imagenes/{imagenId}
Authorization: Bearer <accessToken>
```

---

### Disponibilidad

#### Consultar disponibilidad

```http
GET /api/habitaciones/{id}/disponibilidad?desde=2027-01-10&hasta=2027-01-15
```

**Público** · Devuelve las unidades disponibles en el rango.

**Response `200`:**
```json
{
  "habitacionId": 1,
  "fechaInicio": "2027-01-10",
  "fechaFin": "2027-01-15",
  "stockTotal": 1,
  "unidadesOcupadas": 0,
  "unidadesDisponibles": 1,
  "disponible": true
}
```

---

### Bloqueos de fecha

#### Listar bloqueos

```http
GET /api/habitaciones/{id}/bloqueos
```

**Público** · Lista los bloqueos de una habitación.

---

#### Crear bloqueo

```http
POST /api/habitaciones/{id}/bloqueos
Authorization: Bearer <accessToken>
```

**Autenticado + Dueño de la habitación** · Bloquea un rango de fechas.

**Request:**
```json
{
  "habitacionId": 1,
  "fechaInicio": "2027-02-01",
  "fechaFin": "2027-02-10",
  "motivo": "Mantenimiento programado"
}
```

**Response `201`:** `BloqueoFechaResponse`.

**Errores:**
- `400` — ya existe un bloqueo en ese rango, o existen reservas activas en ese rango.

---

#### Eliminar bloqueo

```http
DELETE /api/bloqueos/{id}
Authorization: Bearer <accessToken>
```

**Response `204`** sin body.

---

### Reservas

#### Crear reserva

```http
POST /api/reservas
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "habitacionId": 1,
  "cantidad": 1,
  "fechaInicio": "2027-01-10",
  "fechaFin": "2027-01-15"
}
```

**Response `201`:**
```json
{
  "id": 1,
  "usuarioId": 2,
  "nombreUsuario": "Juan Pérez",
  "habitacionId": 1,
  "nombreHabitacion": "Suite principal",
  "propiedadId": 1,
  "tituloPropiedad": "Departamento en Miraflores",
  "nombreAnfitrion": "María López",
  "cantidad": 1,
  "fechaInicio": "2027-01-10",
  "fechaFin": "2027-01-15",
  "noches": 5,
  "precioPorNocheAlCrear": 250.00,
  "subtotal": 1250.00,
  "comisionPlataforma": 187.50,
  "montoAnfitrion": 1062.50,
  "estado": "PENDIENTE",
  "fechaCreacion": "2026-10-10T11:16:20"
}
```

**Errores:**
- `400` — reservar la propia propiedad, propiedad no `ACTIVA`, sin disponibilidad.

---

#### Mis reservas

```http
GET /api/reservas/mias
Authorization: Bearer <accessToken>
```

Reservas realizadas por el usuario autenticado.

---

#### Reservas recibidas

```http
GET /api/reservas/recibidas
Authorization: Bearer <accessToken>
```

Reservas sobre propiedades del anfitrión autenticado.

---

#### Detalle de reserva

```http
GET /api/reservas/{id}
Authorization: Bearer <accessToken>
```

Accesible solo al huésped o al anfitrión.

---

#### Completar reserva

```http
PUT /api/reservas/{id}/completar
Authorization: Bearer <accessToken>
```

**Anfitrión únicamente**. Cambia la reserva a `COMPLETADA` y genera automáticamente la liquidación correspondiente.

**Errores:**
- `403` — no es el anfitrión de la reserva.
- `409` — la reserva no está en estado `CONFIRMADA`.

---

#### Cancelar reserva

```http
PUT /api/reservas/{id}/cancelar
Authorization: Bearer <accessToken>
```

**Huésped o anfitrión**. No se puede cancelar una reserva COMPLETADA.

---

#### Historial de la reserva

```http
GET /api/reservas/{id}/historial
Authorization: Bearer <accessToken>
```

**Response `200`:**
```json
[
  { "id": 1, "estadoAnterior": null, "estadoNuevo": "PENDIENTE", "motivo": "Reserva creada", "fecha": "2026-10-10T11:16:20" },
  { "id": 2, "estadoAnterior": "PENDIENTE", "estadoNuevo": "CONFIRMADA", "motivo": "Pago aprobado", "fecha": "2026-10-10T11:17:00" }
]
```

---

### Pagos

#### Registrar pago (instant booking)

```http
POST /api/pagos
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "reservaId": 1,
  "tipoPago": "TARJETA",
  "referencia": "OK-001"
}
```

**Response `201`:** `PagoResponse` con estado `APROBADO` o `RECHAZADO` según la simulación.

**Comportamiento:**
- Si `referencia` empieza con `FAIL-` → `Pago RECHAZADO`, reserva sigue `PENDIENTE`.
- Cualquier otra referencia (o `null`) → `Pago APROBADO`, reserva pasa a `CONFIRMADA`.
- Si existe pago previo `RECHAZADO`, se reutiliza y se vuelve a simular.
- Si existe pago previo `APROBADO`, devuelve `400`.

**Errores:**
- `400` — reserva no `PENDIENTE`, ya tiene pago aprobado.
- `403` — la reserva no te pertenece.
- `404` — reserva no encontrada.

---

#### Consultar pago por reserva

```http
GET /api/pagos/reserva/{reservaId}
Authorization: Bearer <accessToken>
```

Accesible solo al huésped o al anfitrión de la reserva.

**Response `200`:** `PagoResponse`.

**Errores:**
- `403` — no sos huésped ni anfitrión de esa reserva.
- `404` — reserva no encontrada o sin pago registrado.

---

### Reviews

#### Listar reviews de una propiedad

```http
GET /api/propiedades/{propiedadId}/reviews
```

**Público** · Solo devuelve reviews en estado `ACTIVA`.

---

#### Crear review

```http
POST /api/reviews
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "propiedadId": 1,
  "rating": 5,
  "comentario": "Excelente experiencia, muy recomendado.",
  "habitacionMencionada": "Suite principal"
}
```

**Response `201`:** `ReviewResponse`.

**Errores:**
- `400` — no tiene reserva COMPLETADA previa, rating inválido.
- `409` — ya existe una review del usuario sobre la propiedad.

---

#### Editar review

```http
PUT /api/reviews/{id}
Authorization: Bearer <accessToken>
```

**Solo el autor** dentro de los 30 días posteriores.

**Request:**
```json
{
  "rating": 4,
  "comentario": "Comentario editado con nueva opinión."
}
```

**Errores:**
- `403` — no es el autor.
- `409` — el plazo de edición venció.

---

#### Eliminar review

```http
DELETE /api/reviews/{id}
Authorization: Bearer <accessToken>
```

**Solo el autor** dentro de los 30 días. Soft delete (`ELIMINADA`).

---

#### Responder review

```http
POST /api/reviews/{id}/respuesta
Authorization: Bearer <accessToken>
```

**Solo el anfitrión de la propiedad**. Una única respuesta por review.

**Request:**
```json
{
  "respuesta": "Gracias por tu comentario, vuelve pronto."
}
```

---

### Favoritos

#### Listar favoritos

```http
GET /api/favoritos
Authorization: Bearer <accessToken>
```

**Response `200`:**
```json
[
  {
    "id": 1,
    "propiedad": { "...PropiedadCardResponse..." },
    "fecha": "2026-10-10T11:20:00"
  }
]
```

---

#### Agregar favorito

```http
POST /api/favoritos/{propiedadId}
Authorization: Bearer <accessToken>
```

**Response `201`** sin body.

**Errores:**
- `409` — la propiedad ya está en favoritos.

---

#### Quitar favorito

```http
DELETE /api/favoritos/{propiedadId}
Authorization: Bearer <accessToken>
```

**Response `204`** sin body.

---

### Notificaciones

#### Listar notificaciones

```http
GET /api/notificaciones
Authorization: Bearer <accessToken>
```

---

#### Notificaciones no leídas

```http
GET /api/notificaciones/no-leidas
Authorization: Bearer <accessToken>
```

---

#### Contador de no leídas

```http
GET /api/notificaciones/contador
Authorization: Bearer <accessToken>
```

**Response `200`:**
```json
{ "noLeidas": 3 }
```

---

#### Marcar como leída

```http
PUT /api/notificaciones/{id}/leida
Authorization: Bearer <accessToken>
```

---

#### Marcar todas como leídas

```http
PUT /api/notificaciones/leidas-todas
Authorization: Bearer <accessToken>
```

**Response `204`** sin body.

---

### Liquidaciones

#### Listar mis liquidaciones

```http
GET /api/liquidaciones
Authorization: Bearer <accessToken>
```

**Anfitrión** · Lista todas sus liquidaciones ordenadas por fecha desc.

---

#### Liquidaciones pendientes

```http
GET /api/liquidaciones/pendientes
Authorization: Bearer <accessToken>
```

Filtra solo las de estado `PENDIENTE`.

---

#### Detalle de liquidación

```http
GET /api/liquidaciones/{id}
Authorization: Bearer <accessToken>
```

**Errores:**
- `403` — la liquidación no pertenece al anfitrión autenticado.

---

## 🔄 Ejemplo de flujo completo

Registrar → convertirse en anfitrión → publicar propiedad → crear habitación → subir imagen → publicar → reservar como otro usuario → pagar → completar → reseñar.

```bash
BASE=http://localhost:8080/api

# 1. Registrar anfitrión
ANF=$(curl -s -X POST $BASE/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"María","correo":"maria@test.com","password":"secreto123"}')
ANF_TOKEN=$(echo "$ANF" | grep -oP '"accessToken":"\K[^"]+')

# 2. Convertirse en anfitrión
curl -s -X PUT $BASE/auth/become-host \
  -H "Authorization: Bearer $ANF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"telefono":"987654321","dni":"12345678","ciudad":"Lima","biografia":"Biografia valida de anfitrion","aceptaTerminos":true}'

# 3. Crear propiedad
PROP=$(curl -s -X POST $BASE/propiedades \
  -H "Authorization: Bearer $ANF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Departamento en Miraflores","descripcion":"Hermoso departamento con vista al mar","ubicacion":"Miraflores, Lima","latitud":-12.1191,"longitud":-77.0286,"tipoAlojamiento":"DEPARTAMENTO","politicaCancelacion":"FLEXIBLE","categoriaId":3,"servicioIds":[1,2]}')
PROP_ID=$(echo "$PROP" | grep -oP '"id":\K[0-9]+' | head -1)

# 4. Crear habitación
HAB=$(curl -s -X POST $BASE/propiedades/$PROP_ID/habitaciones \
  -H "Authorization: Bearer $ANF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Suite","descripcion":"Habitacion amplia con vista","precioNoche":250,"maxAdultos":2,"maxNinos":1,"maxBebes":0,"maxMascotas":0,"cantidadDormitorios":1,"cantidadBanios":1,"metrosCuadrados":45,"stockTotal":1}')
HAB_ID=$(echo "$HAB" | grep -oP '"id":\K[0-9]+' | head -1)

# 5. Subir imagen y publicar
curl -s -X POST $BASE/propiedades/$PROP_ID/imagenes \
  -H "Authorization: Bearer $ANF_TOKEN" \
  -F "archivo=@/ruta/a/imagen.jpg"

curl -s -X POST $BASE/propiedades/$PROP_ID/publicar \
  -H "Authorization: Bearer $ANF_TOKEN"

# 6. Registrar huésped
HUE=$(curl -s -X POST $BASE/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan","correo":"juan@test.com","password":"secreto123"}')
HUE_TOKEN=$(echo "$HUE" | grep -oP '"accessToken":"\K[^"]+')

# 7. Reservar
RES=$(curl -s -X POST $BASE/reservas \
  -H "Authorization: Bearer $HUE_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"habitacionId\":$HAB_ID,\"cantidad\":1,\"fechaInicio\":\"2027-01-10\",\"fechaFin\":\"2027-01-15\"}")
RES_ID=$(echo "$RES" | grep -oP '"id":\K[0-9]+' | head -1)

# 8. Pagar (instant booking — pasarela simulada aprueba)
curl -s -X POST $BASE/pagos \
  -H "Authorization: Bearer $HUE_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"reservaId\":$RES_ID,\"tipoPago\":\"TARJETA\",\"referencia\":\"OK-001\"}"

# La reserva ahora está CONFIRMADA
curl -s $BASE/reservas/$RES_ID -H "Authorization: Bearer $HUE_TOKEN"

# 9. Anfitrión completa la reserva (genera liquidación)
curl -s -X PUT $BASE/reservas/$RES_ID/completar \
  -H "Authorization: Bearer $ANF_TOKEN"

# 10. Huésped deja review
curl -s -X POST $BASE/reviews \
  -H "Authorization: Bearer $HUE_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"propiedadId\":$PROP_ID,\"rating\":5,\"comentario\":\"Excelente experiencia, muy recomendado.\"}"

# 11. Anfitrión consulta sus liquidaciones
curl -s $BASE/liquidaciones -H "Authorization: Bearer $ANF_TOKEN"
```
