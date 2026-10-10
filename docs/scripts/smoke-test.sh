#!/bin/bash
BASE=http://localhost:8080/api

# Login
TOKEN=$(curl -s -X POST $BASE/auth/login \
  -H "Content-Type: application/json" \
  -d '{"correo":"test@test.com","password":"secreto123"}' \
  | grep -oP '"accessToken":"\K[^"]+')

echo "=== PERFIL POST-BECOME-HOST ==="
curl -s $BASE/usuarios/me -H "Authorization: Bearer $TOKEN"
echo ""

echo "=== CREAR PROPIEDAD ==="
PROP=$(curl -s -X POST $BASE/propiedades \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo":"Departamento en Miraflores",
    "descripcion":"Hermoso departamento con vista al mar, totalmente amoblado",
    "ubicacion":"Miraflores, Lima",
    "latitud":-12.1191,
    "longitud":-77.0286,
    "tipoAlojamiento":"DEPARTAMENTO",
    "politicaCancelacion":"FLEXIBLE",
    "categoriaId":3,
    "servicioIds":[1,2,3,5]
  }')
echo "$PROP"
PROP_ID=$(echo "$PROP" | grep -oP '"id":\K[0-9]+' | head -1)
echo "Propiedad creada con ID=$PROP_ID"

echo ""
echo "=== CREAR HABITACION ==="
HAB=$(curl -s -X POST $BASE/propiedades/$PROP_ID/habitaciones \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre":"Suite principal",
    "descripcion":"Habitacion amplia con cama queen y vista al mar",
    "precioNoche":250.00,
    "maxAdultos":2,
    "maxNinos":1,
    "maxBebes":0,
    "maxMascotas":0,
    "cantidadDormitorios":1,
    "cantidadBanios":1,
    "metrosCuadrados":45.0,
    "stockTotal":1
  }')
echo "$HAB"
HAB_ID=$(echo "$HAB" | grep -oP '"id":\K[0-9]+' | head -1)
echo "Habitacion creada con ID=$HAB_ID"

echo ""
echo "=== PUBLICAR PROPIEDAD (debe fallar: falta imagen) ==="
curl -s -X POST $BASE/propiedades/$PROP_ID/publicar \
  -H "Authorization: Bearer $TOKEN"
echo ""

echo "=== SUBIR IMAGEN A LA PROPIEDAD ==="
# Crear imagen dummy
convert -size 100x100 xc:blue /tmp/test.jpg 2>/dev/null || \
  dd if=/dev/urandom of=/tmp/test.jpg bs=1024 count=10 2>/dev/null

curl -s -X POST $BASE/propiedades/$PROP_ID/imagenes \
  -H "Authorization: Bearer $TOKEN" \
  -F "archivo=@/tmp/test.jpg"
echo ""

echo "=== PUBLICAR PROPIEDAD (ahora debe funcionar) ==="
curl -s -X POST $BASE/propiedades/$PROP_ID/publicar \
  -H "Authorization: Bearer $TOKEN"
echo ""

echo "=== CREAR SEGUNDO USUARIO Y RESERVAR ==="
curl -s -X POST $BASE/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Huesped","correo":"huesped@test.com","password":"secreto123"}'
echo ""

HTOKEN=$(curl -s -X POST $BASE/auth/login \
  -H "Content-Type: application/json" \
  -d '{"correo":"huesped@test.com","password":"secreto123"}' \
  | grep -oP '"accessToken":"\K[^"]+')

echo "=== CONSULTAR DISPONIBILIDAD ==="
curl -s "$BASE/habitaciones/$HAB_ID/disponibilidad?desde=2027-01-10&hasta=2027-01-15"
echo ""

echo "=== CREAR RESERVA ==="
RES=$(curl -s -X POST $BASE/reservas \
  -H "Authorization: Bearer $HTOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"habitacionId\":$HAB_ID,
    \"cantidad\":1,
    \"fechaInicio\":\"2027-01-10\",
    \"fechaFin\":\"2027-01-15\"
  }")
echo "$RES"
RES_ID=$(echo "$RES" | grep -oP '"id":\K[0-9]+' | head -1)
echo "Reserva creada con ID=$RES_ID"

echo ""
echo "=== REGISTRAR PAGO ==="
PAGO=$(curl -s -X POST $BASE/pagos \
  -H "Authorization: Bearer $HTOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"reservaId\":$RES_ID,\"tipoPago\":\"TARJETA\",\"referencia\":\"TEST-001\"}")
echo "$PAGO"
PAGO_ID=$(echo "$PAGO" | grep -oP '"id":\K[0-9]+' | head -1)

echo ""
echo "=== APROBAR PAGO (debe confirmar reserva) ==="
curl -s -X PUT $BASE/pagos/$PAGO_ID/aprobar \
  -H "Authorization: Bearer $HTOKEN"
echo ""

echo ""
echo "=== MIS RESERVAS ==="
curl -s $BASE/reservas/mias -H "Authorization: Bearer $HTOKEN"
echo ""
