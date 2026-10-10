-- =====================================================================
--  MundoTerraza - Base de datos MySQL 8
--  Ejecutar en MySQL Workbench (o: mysql -u root -p < mundo_terraza_db.sql)
--
--  OJO: este script REINICIA las tablas (DROP). Úsalo la primera vez o
--  cuando quieras empezar de cero. Los nombres coinciden con las
--  entidades JPA (User, Propiedad), por lo que Spring Boot arranca
--  sin tocar nada con spring.jpa.hibernate.ddl-auto=update.
-- =====================================================================

CREATE DATABASE IF NOT EXISTS mundo_terraza_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mundo_terraza_db;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS imagenes_propiedad;
DROP TABLE IF EXISTS propiedades;
DROP TABLE IF EXISTS usuarios;
SET FOREIGN_KEY_CHECKS = 1;

-- ---------------------------------------------------------------------
-- USUARIOS (huéspedes y anfitriones)
-- Los campos telefono, dni, ciudad, biografia y fecha_anfitrion solo se
-- llenan cuando el usuario completa el formulario "Hazte Anfitrión".
-- ---------------------------------------------------------------------
CREATE TABLE usuarios (
  id               BIGINT        NOT NULL AUTO_INCREMENT,
  nombre           VARCHAR(100)  NOT NULL,
  correo           VARCHAR(150)  NOT NULL,
  password         VARCHAR(255)  NOT NULL,
  rol              VARCHAR(30)   NOT NULL DEFAULT 'HUESPED',   -- HUESPED | ANFITRION
  telefono         VARCHAR(20)   NULL,
  dni              VARCHAR(15)   NULL,
  ciudad           VARCHAR(100)  NULL,
  biografia        VARCHAR(500)  NULL,
  fecha_anfitrion  DATETIME(6)   NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_usuarios_correo (correo),
  CONSTRAINT chk_usuarios_rol CHECK (rol IN ('HUESPED', 'ANFITRION'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- PROPIEDADES (cada alojamiento publicado por un anfitrión)
-- ---------------------------------------------------------------------
CREATE TABLE propiedades (
  id_propiedad  BIGINT         NOT NULL AUTO_INCREMENT,
  titulo        VARCHAR(150)   NOT NULL,
  descripcion   VARCHAR(1000)  NULL,
  ubicacion     VARCHAR(150)   NOT NULL,
  precio_noche  DOUBLE         NOT NULL,
  capacidad     INT            NULL,
  id_anfitrion  BIGINT         NOT NULL,
  PRIMARY KEY (id_propiedad),
  KEY idx_propiedades_anfitrion (id_anfitrion),
  KEY idx_propiedades_ubicacion (ubicacion),
  CONSTRAINT fk_propiedades_anfitrion
    FOREIGN KEY (id_anfitrion) REFERENCES usuarios (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- IMAGENES_PROPIEDAD
-- La BD NO guarda la foto, solo su ruta relativa (ej: /uploads/ab12-...jpg).
-- El archivo físico queda en la carpeta "uploads/" del proyecto.
-- orden = 0 es la portada de la card.
-- ---------------------------------------------------------------------
CREATE TABLE imagenes_propiedad (
  id_propiedad  BIGINT        NOT NULL,
  orden         INT           NOT NULL,
  url_imagen    VARCHAR(255)  NOT NULL,
  PRIMARY KEY (id_propiedad, orden),
  CONSTRAINT fk_imagenes_propiedad
    FOREIGN KEY (id_propiedad) REFERENCES propiedades (id_propiedad)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- (Opcional) Consultas útiles para verificar
-- ---------------------------------------------------------------------
-- SELECT id, nombre, correo, rol, telefono, dni, ciudad, fecha_anfitrion FROM usuarios;
-- SELECT p.id_propiedad, p.titulo, p.ubicacion, p.precio_noche, u.nombre AS anfitrion,
--        (SELECT url_imagen FROM imagenes_propiedad i WHERE i.id_propiedad = p.id_propiedad AND i.orden = 0) AS portada
--   FROM propiedades p JOIN usuarios u ON u.id = p.id_anfitrion;
