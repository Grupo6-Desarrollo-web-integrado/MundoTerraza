-- =====================================================================
--  MundoTerraza - Seed inicial de catálogos
--  Autor: inici4rsesi0n
--  Categorías y servicios fijos. No se eliminan; solo se desactivan
--  desde código.
-- =====================================================================

INSERT INTO categorias (nombre, descripcion, activa) VALUES
    ('Playa',        'Alojamientos frente al mar o cerca de la costa',       TRUE),
    ('Montaña',      'Alojamientos en zonas altas o de sierra',              TRUE),
    ('Urbano',       'Departamentos y casas en zonas céntricas de la ciudad',TRUE),
    ('Campo',        'Alojamientos en zonas rurales o de naturaleza',        TRUE),
    ('Lago',         'Alojamientos frente a lagos o lagunas',                TRUE),
    ('Desierto',     'Alojamientos en zonas áridas o de dunas',              TRUE),
    ('Selva',        'Alojamientos en zonas amazónicas o tropicales',        TRUE);

INSERT INTO servicios (nombre, icono, activo) VALUES
    ('WiFi',              'wifi',         TRUE),
    ('TV',                'tv',           TRUE),
    ('Cocina',            'cocina',       TRUE),
    ('Lavadora',          'lavadora',     TRUE),
    ('Aire acondicionado','aire',         TRUE),
    ('Calefacción',       'calefaccion',  TRUE),
    ('Gimnasio',          'gimnasio',     TRUE),
    ('Piscina',           'piscina',      TRUE),
    ('Ascensor',          'ascensor',     TRUE),
    ('Estacionamiento',   'estacionamiento', TRUE),
    ('Jacuzzi',           'jacuzzi',      TRUE),
    ('Balcón',            'balcon',       TRUE),
    ('Terraza',           'terraza',      TRUE),
    ('Zona de trabajo',   'trabajo',      TRUE),
    ('Desayuno incluido', 'desayuno',     TRUE);
