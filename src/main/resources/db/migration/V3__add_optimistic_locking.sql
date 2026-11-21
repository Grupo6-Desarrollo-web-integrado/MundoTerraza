-- =====================================================================
--  MundoTerraza - Optimistic locking en agregados mutables
--  Autor: inici4rsesi0n
--  Añade columna version para control de concurrencia optimista en
--  reservas y propiedades (Fase 0.4 - control de concurrencia).
-- =====================================================================

ALTER TABLE reservas
    ADD COLUMN version BIGINT NOT NULL DEFAULT 0;

ALTER TABLE propiedades
    ADD COLUMN version BIGINT NOT NULL DEFAULT 0;
