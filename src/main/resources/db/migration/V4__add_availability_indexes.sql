-- =====================================================================
--  MundoTerraza - Índices para filtro de disponibilidad en catálogo
--  Autor: inici4rsesi0n
--  Fase 0.8 - disponibilidad por fechas (Punto 8)
-- =====================================================================

ALTER TABLE reservas
    ADD INDEX idx_reservas_hab_estado_fechas (id_habitacion, estado, fecha_inicio, fecha_fin);

ALTER TABLE bloqueos_fecha
    ADD INDEX idx_bloqueos_hab_fechas (id_habitacion, fecha_inicio, fecha_fin);

ALTER TABLE habitaciones
    ADD INDEX idx_habitaciones_prop_estado (id_propiedad, estado);
