-- =====================================================================
--  MundoTerraza - Esquema inicial
--  Autor: inici4rsesi0n
--  Motor: MySQL 8 (utf8mb4_unicode_ci)
-- =====================================================================

-- ---------------------------------------------------------------------
-- USUARIOS
-- Todos se registran como HUESPED. es_anfitrion es la habilitación
-- permanente. estado = ELIMINADA permite soft delete.
-- ---------------------------------------------------------------------
CREATE TABLE usuarios (
    id                  BIGINT        NOT NULL AUTO_INCREMENT,
    nombre              VARCHAR(100)  NOT NULL,
    correo              VARCHAR(150)  NOT NULL,
    password            VARCHAR(255)  NOT NULL,
    telefono            VARCHAR(20)   NULL,
    dni                 VARCHAR(15)   NULL,
    ciudad              VARCHAR(100)  NULL,
    biografia           VARCHAR(500)  NULL,
    es_anfitrion        BOOLEAN       NOT NULL DEFAULT FALSE,
    fecha_anfitrion     DATETIME(6)   NULL,
    estado              VARCHAR(30)   NOT NULL DEFAULT 'ACTIVA',
    intentos_fallidos   INT           NOT NULL DEFAULT 0,
    bloqueado_hasta     DATETIME(6)   NULL,
    fecha_creacion      DATETIME(6)   NOT NULL,
    fecha_actualizacion DATETIME(6)   NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_usuarios_correo (correo),
    KEY idx_usuarios_estado (estado),
    CONSTRAINT chk_usuarios_estado CHECK (estado IN ('ACTIVA','ELIMINADA'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- CATEGORIAS (catálogo fijo, seed)
-- ---------------------------------------------------------------------
CREATE TABLE categorias (
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NULL,
    activa      BOOLEAN      NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id),
    UNIQUE KEY uk_categorias_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- SERVICIOS (catálogo fijo, seed)
-- ---------------------------------------------------------------------
CREATE TABLE servicios (
    id     BIGINT       NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    icono  VARCHAR(50)  NULL,
    activo BOOLEAN      NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id),
    UNIQUE KEY uk_servicios_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- PROPIEDADES
-- ---------------------------------------------------------------------
CREATE TABLE propiedades (
    id_propiedad             BIGINT         NOT NULL AUTO_INCREMENT,
    id_anfitrion             BIGINT         NOT NULL,
    id_categoria             BIGINT         NOT NULL,
    titulo                   VARCHAR(150)   NOT NULL,
    descripcion              VARCHAR(1000)  NOT NULL,
    ubicacion                VARCHAR(150)   NOT NULL,
    latitud                  DOUBLE         NOT NULL,
    longitud                 DOUBLE         NOT NULL,
    tipo_alojamiento         VARCHAR(30)    NOT NULL,
    politica_cancelacion     VARCHAR(30)    NOT NULL,
    estado                   VARCHAR(30)    NOT NULL DEFAULT 'BORRADOR',
    rating_promedio          DOUBLE         NOT NULL DEFAULT 0,
    total_reviews            INT            NOT NULL DEFAULT 0,
    es_favorito_entre_huespedes BOOLEAN     NOT NULL DEFAULT FALSE,
    fecha_creacion           DATETIME(6)    NOT NULL,
    fecha_actualizacion      DATETIME(6)    NOT NULL,
    fecha_eliminacion        DATETIME(6)    NULL,
    PRIMARY KEY (id_propiedad),
    KEY idx_propiedades_anfitrion (id_anfitrion),
    KEY idx_propiedades_categoria (id_categoria),
    KEY idx_propiedades_estado (estado),
    KEY idx_propiedades_ubicacion (ubicacion),
    CONSTRAINT fk_propiedades_anfitrion
        FOREIGN KEY (id_anfitrion) REFERENCES usuarios (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_propiedades_categoria
        FOREIGN KEY (id_categoria) REFERENCES categorias (id)
        ON DELETE RESTRICT,
    CONSTRAINT chk_propiedades_estado
        CHECK (estado IN ('BORRADOR','ACTIVA','INACTIVA','ELIMINADA')),
    CONSTRAINT chk_propiedades_tipo
        CHECK (tipo_alojamiento IN ('HOTEL','CASA','DEPARTAMENTO','HABITACION','LOFT','VILLA','HOSTAL')),
    CONSTRAINT chk_propiedades_politica
        CHECK (politica_cancelacion IN ('FLEXIBLE','MODERADA','ESTRICTA','NO_REEMBOLSABLE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- SERVICIOS_PROPIEDAD (N:M vía entidad puente)
-- ---------------------------------------------------------------------
CREATE TABLE servicios_propiedad (
    id_propiedad     BIGINT      NOT NULL,
    id_servicio      BIGINT      NOT NULL,
    fecha_asociacion DATETIME(6) NOT NULL,
    PRIMARY KEY (id_propiedad, id_servicio),
    KEY idx_sp_servicio (id_servicio),
    CONSTRAINT fk_sp_propiedad
        FOREIGN KEY (id_propiedad) REFERENCES propiedades (id_propiedad)
        ON DELETE CASCADE,
    CONSTRAINT fk_sp_servicio
        FOREIGN KEY (id_servicio) REFERENCES servicios (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- HABITACIONES (unidad reservable)
-- ---------------------------------------------------------------------
CREATE TABLE habitaciones (
    id_habitacion          BIGINT         NOT NULL AUTO_INCREMENT,
    id_propiedad           BIGINT         NOT NULL,
    nombre                 VARCHAR(100)   NOT NULL,
    descripcion            VARCHAR(500)   NOT NULL,
    precio_noche           DECIMAL(10,2)  NOT NULL,
    max_adultos            INT            NOT NULL,
    max_ninos              INT            NOT NULL DEFAULT 0,
    max_bebes              INT            NOT NULL DEFAULT 0,
    max_mascotas           INT            NOT NULL DEFAULT 0,
    cantidad_dormitorios   INT            NOT NULL,
    cantidad_banios        INT            NOT NULL,
    metros_cuadrados       DOUBLE         NOT NULL,
    stock_total            INT            NOT NULL,
    estado                 VARCHAR(30)    NOT NULL DEFAULT 'DISPONIBLE',
    fecha_creacion         DATETIME(6)    NOT NULL,
    fecha_actualizacion    DATETIME(6)    NOT NULL,
    PRIMARY KEY (id_habitacion),
    KEY idx_habitaciones_propiedad (id_propiedad),
    KEY idx_habitaciones_estado (estado),
    CONSTRAINT fk_habitaciones_propiedad
        FOREIGN KEY (id_propiedad) REFERENCES propiedades (id_propiedad)
        ON DELETE CASCADE,
    CONSTRAINT chk_habitaciones_estado
        CHECK (estado IN ('DISPONIBLE','MANTENIMIENTO','INACTIVA')),
    CONSTRAINT chk_habitaciones_precio       CHECK (precio_noche >= 0),
    CONSTRAINT chk_habitaciones_max_adultos  CHECK (max_adultos >= 1),
    CONSTRAINT chk_habitaciones_stock        CHECK (stock_total >= 1),
    CONSTRAINT chk_habitaciones_metros       CHECK (metros_cuadrados > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- IMAGENES (de Propiedad o de Habitación)
-- Exactamente una de las dos FK debe estar poblada (CHECK).
-- orden único dentro de su propietario.
-- ---------------------------------------------------------------------
CREATE TABLE imagenes (
    id_imagen      BIGINT       NOT NULL AUTO_INCREMENT,
    url            VARCHAR(255) NOT NULL,
    orden          INT          NOT NULL,
    id_propiedad   BIGINT       NULL,
    id_habitacion  BIGINT       NULL,
    fecha_subida   DATETIME(6)  NOT NULL,
    PRIMARY KEY (id_imagen),
    UNIQUE KEY uk_imagen_propiedad_orden (id_propiedad, orden),
    UNIQUE KEY uk_imagen_habitacion_orden (id_habitacion, orden),
    KEY idx_imagenes_habitacion (id_habitacion),
    CONSTRAINT fk_imagenes_propiedad
        FOREIGN KEY (id_propiedad) REFERENCES propiedades (id_propiedad)
        ON DELETE CASCADE,
    CONSTRAINT fk_imagenes_habitacion
        FOREIGN KEY (id_habitacion) REFERENCES habitaciones (id_habitacion)
        ON DELETE CASCADE,
    CONSTRAINT chk_imagenes_propietario CHECK (
        (id_propiedad IS NOT NULL AND id_habitacion IS NULL) OR
        (id_propiedad IS NULL AND id_habitacion IS NOT NULL)
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- RESERVAS
-- ---------------------------------------------------------------------
CREATE TABLE reservas (
    id_reserva                BIGINT         NOT NULL AUTO_INCREMENT,
    id_usuario                BIGINT         NOT NULL,
    id_habitacion             BIGINT         NOT NULL,
    id_propiedad              BIGINT         NOT NULL,
    cantidad                  INT            NOT NULL DEFAULT 1,
    fecha_inicio              DATE           NOT NULL,
    fecha_fin                 DATE           NOT NULL,
    precio_por_noche_al_crear DECIMAL(10,2)  NOT NULL,
    subtotal                  DECIMAL(10,2)  NOT NULL,
    comision_plataforma       DECIMAL(10,2)  NOT NULL,
    monto_anfitrion           DECIMAL(10,2)  NOT NULL,
    estado                    VARCHAR(30)    NOT NULL DEFAULT 'PENDIENTE',
    fecha_creacion            DATETIME(6)    NOT NULL,
    fecha_actualizacion       DATETIME(6)    NOT NULL,
    PRIMARY KEY (id_reserva),
    KEY idx_reservas_usuario (id_usuario),
    KEY idx_reservas_habitacion (id_habitacion),
    KEY idx_reservas_propiedad (id_propiedad),
    KEY idx_reservas_estado (estado),
    KEY idx_reservas_rango (fecha_inicio, fecha_fin),
    CONSTRAINT fk_reservas_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_reservas_habitacion
        FOREIGN KEY (id_habitacion) REFERENCES habitaciones (id_habitacion)
        ON DELETE RESTRICT,
    CONSTRAINT fk_reservas_propiedad
        FOREIGN KEY (id_propiedad) REFERENCES propiedades (id_propiedad)
        ON DELETE RESTRICT,
    CONSTRAINT chk_reservas_estado
        CHECK (estado IN ('PENDIENTE','CONFIRMADA','CANCELADA','COMPLETADA')),
    CONSTRAINT chk_reservas_fechas CHECK (fecha_fin > fecha_inicio),
    CONSTRAINT chk_reservas_cantidad CHECK (cantidad >= 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- HISTORIAL_ESTADOS_RESERVA (inmutable)
-- ---------------------------------------------------------------------
CREATE TABLE historial_estados_reserva (
    id              BIGINT       NOT NULL AUTO_INCREMENT,
    id_reserva      BIGINT       NOT NULL,
    estado_anterior VARCHAR(30)  NULL,
    estado_nuevo    VARCHAR(30)  NOT NULL,
    motivo          VARCHAR(255) NULL,
    fecha           DATETIME(6)  NOT NULL,
    PRIMARY KEY (id),
    KEY idx_historial_reserva (id_reserva),
    CONSTRAINT fk_historial_reserva
        FOREIGN KEY (id_reserva) REFERENCES reservas (id_reserva)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- PAGOS (1:1 con reserva)
-- ---------------------------------------------------------------------
CREATE TABLE pagos (
    id_pago    BIGINT         NOT NULL AUTO_INCREMENT,
    id_reserva BIGINT         NOT NULL,
    monto      DECIMAL(10,2)  NOT NULL,
    tipo_pago  VARCHAR(30)    NOT NULL,
    estado     VARCHAR(30)    NOT NULL DEFAULT 'PENDIENTE',
    referencia VARCHAR(100)   NULL,
    fecha      DATETIME(6)    NOT NULL,
    PRIMARY KEY (id_pago),
    UNIQUE KEY uk_pagos_reserva (id_reserva),
    CONSTRAINT fk_pagos_reserva
        FOREIGN KEY (id_reserva) REFERENCES reservas (id_reserva)
        ON DELETE RESTRICT,
    CONSTRAINT chk_pagos_tipo
        CHECK (tipo_pago IN ('EFECTIVO','TARJETA','YAPE','PLIN','TRANSFERENCIA')),
    CONSTRAINT chk_pagos_estado
        CHECK (estado IN ('PENDIENTE','APROBADO','RECHAZADO','REEMBOLSADO'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- LIQUIDACIONES (1:1 con reserva completada)
-- ---------------------------------------------------------------------
CREATE TABLE liquidaciones (
    id_liquidacion       BIGINT         NOT NULL AUTO_INCREMENT,
    id_reserva           BIGINT         NOT NULL,
    id_anfitrion         BIGINT         NOT NULL,
    subtotal             DECIMAL(10,2)  NOT NULL,
    porcentaje_comision  DECIMAL(5,2)   NOT NULL,
    monto_comision       DECIMAL(10,2)  NOT NULL,
    monto_neto           DECIMAL(10,2)  NOT NULL,
    estado               VARCHAR(30)    NOT NULL DEFAULT 'PENDIENTE',
    fecha_generacion     DATETIME(6)    NOT NULL,
    PRIMARY KEY (id_liquidacion),
    UNIQUE KEY uk_liquidaciones_reserva (id_reserva),
    KEY idx_liquidaciones_anfitrion (id_anfitrion),
    CONSTRAINT fk_liquidaciones_reserva
        FOREIGN KEY (id_reserva) REFERENCES reservas (id_reserva)
        ON DELETE RESTRICT,
    CONSTRAINT fk_liquidaciones_anfitrion
        FOREIGN KEY (id_anfitrion) REFERENCES usuarios (id)
        ON DELETE RESTRICT,
    CONSTRAINT chk_liquidaciones_estado
        CHECK (estado IN ('PENDIENTE','PAGADA'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- REVIEWS
-- ---------------------------------------------------------------------
CREATE TABLE reviews (
    id_review             BIGINT        NOT NULL AUTO_INCREMENT,
    id_usuario            BIGINT        NOT NULL,
    id_propiedad          BIGINT        NOT NULL,
    rating                INT           NOT NULL,
    comentario            VARCHAR(500)  NOT NULL,
    habitacion_mencionada VARCHAR(150)  NULL,
    respuesta_anfitrion   VARCHAR(500)  NULL,
    fecha_respuesta       DATETIME(6)   NULL,
    estado                VARCHAR(30)   NOT NULL DEFAULT 'ACTIVA',
    fecha_creacion        DATETIME(6)   NOT NULL,
    fecha_edicion         DATETIME(6)   NULL,
    fecha_eliminacion     DATETIME(6)   NULL,
    PRIMARY KEY (id_review),
    UNIQUE KEY uk_reviews_usuario_propiedad (id_usuario, id_propiedad),
    KEY idx_reviews_propiedad (id_propiedad),
    KEY idx_reviews_estado (estado),
    CONSTRAINT fk_reviews_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_reviews_propiedad
        FOREIGN KEY (id_propiedad) REFERENCES propiedades (id_propiedad)
        ON DELETE RESTRICT,
    CONSTRAINT chk_reviews_estado
        CHECK (estado IN ('ACTIVA','ELIMINADA')),
    CONSTRAINT chk_reviews_rating
        CHECK (rating BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- FAVORITOS
-- ---------------------------------------------------------------------
CREATE TABLE favoritos (
    id_favorito  BIGINT      NOT NULL AUTO_INCREMENT,
    id_usuario   BIGINT      NOT NULL,
    id_propiedad BIGINT      NOT NULL,
    fecha        DATETIME(6) NOT NULL,
    PRIMARY KEY (id_favorito),
    UNIQUE KEY uk_favoritos_usuario_propiedad (id_usuario, id_propiedad),
    KEY idx_favoritos_propiedad (id_propiedad),
    CONSTRAINT fk_favoritos_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_favoritos_propiedad
        FOREIGN KEY (id_propiedad) REFERENCES propiedades (id_propiedad)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- NOTIFICACIONES
-- ---------------------------------------------------------------------
CREATE TABLE notificaciones (
    id_notificacion BIGINT        NOT NULL AUTO_INCREMENT,
    id_usuario      BIGINT        NOT NULL,
    tipo            VARCHAR(50)   NOT NULL,
    titulo          VARCHAR(150)  NOT NULL,
    mensaje         VARCHAR(500)  NOT NULL,
    referencia_id   BIGINT        NULL,
    leida           BOOLEAN       NOT NULL DEFAULT FALSE,
    fecha_creacion  DATETIME(6)   NOT NULL,
    PRIMARY KEY (id_notificacion),
    KEY idx_notificaciones_usuario_leida (id_usuario, leida),
    CONSTRAINT fk_notificaciones_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- BLOQUEOS_FECHA (anfitrión bloquea fechas sin reserva)
-- ---------------------------------------------------------------------
CREATE TABLE bloqueos_fecha (
    id_bloqueo    BIGINT       NOT NULL AUTO_INCREMENT,
    id_habitacion BIGINT       NOT NULL,
    fecha_inicio  DATE         NOT NULL,
    fecha_fin     DATE         NOT NULL,
    motivo        VARCHAR(255) NULL,
    PRIMARY KEY (id_bloqueo),
    KEY idx_bloqueos_habitacion (id_habitacion),
    KEY idx_bloqueos_rango (fecha_inicio, fecha_fin),
    CONSTRAINT fk_bloqueos_habitacion
        FOREIGN KEY (id_habitacion) REFERENCES habitaciones (id_habitacion)
        ON DELETE CASCADE,
    CONSTRAINT chk_bloqueos_fechas CHECK (fecha_fin > fecha_inicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
