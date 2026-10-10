# 🚢 Despliegue — MundoTerraza

> Guía de despliegue del backend y la base de datos de MundoTerraza en entornos de desarrollo, staging y producción.

---

## 📖 Tabla de contenidos

1. [Visión general](#-visión-general)
2. [Requisitos del entorno](#-requisitos-del-entorno)
3. [Variables de entorno](#-variables-de-entorno)
4. [Perfiles de Spring](#-perfiles-de-spring)
5. [Despliegue en desarrollo](#-despliegue-en-desarrollo)
6. [Despliegue con Docker](#-despliegue-con-docker)
7. [Despliegue en producción](#-despliegue-en-producción)
8. [Base de datos y Flyway](#-base-de-datos-y-flyway)
9. [Backups y restauración](#-backups-y-restauración)
10. [Logs y observabilidad](#-logs-y-observabilidad)
11. [Checklist de producción](#-checklist-de-producción)
12. [Troubleshooting](#-troubleshooting)

---

## 🎯 Visión general

MundoTerraza es una aplicación **monolítica** con dos componentes desplegables:

| Componente | Tecnología | Puerto |
|------------|------------|--------|
| **Backend + Frontend** | Spring Boot 3.3.5 (Tomcat embebido) | 8080 |
| **Base de datos** | MySQL 8.0 | 3306 |

En desarrollo, la base de datos se levanta en un contenedor Podman/Docker y el backend corre sobre el JDK local. En producción se recomienda empaquetar el backend en un contenedor e integrar ambos con un orquestador.

---

## ⚙️ Requisitos del entorno

| Componente | Versión mínima |
|------------|----------------|
| **Java JDK** | 21 |
| **Maven** | 3.9+ |
| **Docker Desktop** (Windows/macOS) | Última versión estable |
| **Podman** (Linux) | 4.9+ |
| **MySQL** (opcional, nativo) | 8.0 |
| **SO** | Linux, macOS o Windows con WSL2 |

**Espacio en disco:** ~1 GB para el proyecto + imagen MySQL.

---

## 🔑 Variables de entorno

Las variables de entorno sobrescriben las propiedades del archivo `application.properties`. Son útiles para inyectar secretos sin hardcodearlos.

| Variable | Descripción | Valor por defecto (dev) |
|----------|-------------|-------------------------|
| `SPRING_DATASOURCE_URL` | URL de conexión JDBC | `jdbc:mysql://localhost:3306/mundo_terraza_db?...` |
| `SPRING_DATASOURCE_USERNAME` | Usuario de MySQL | `terraza` |
| `SPRING_DATASOURCE_PASSWORD` | Contraseña de MySQL | `terraza123` |
| `JWT_SECRET` | Clave de firma de tokens (≥32 caracteres) | `dev-secret-change-me-mundoterraza-256bits-minimum` |
| `SERVER_PORT` | Puerto HTTP | `8080` |
| `APP_UPLOAD_DIR` | Directorio de imágenes subidas | `uploads` |
| `SPRING_PROFILES_ACTIVE` | Perfil activo | `default` |

> ⚠️ **En producción:** siempre sobrescribir `JWT_SECRET` con una clave aleatoria de al menos 32 bytes.

### Ejemplo de archivo `.env`

```bash
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/mundo_terraza_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Lima
SPRING_DATASOURCE_USERNAME=terraza
SPRING_DATASOURCE_PASSWORD=terraza123
JWT_SECRET=una-clave-super-secreta-de-al-menos-32-bytes
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod
```

Uso con Spring Boot:

```bash
export $(cat .env | xargs)
mvn spring-boot:run
```

O con Docker Compose, se leen automáticamente si el archivo está en la raíz del proyecto.

---

## 🎛 Perfiles de Spring

Spring Boot permite activar distintos perfiles para cambiar configuración según el entorno.

### Perfiles disponibles

| Perfil | Uso | Archivo |
|--------|-----|---------|
| `default` | Desarrollo local | `application.properties` |
| `dev` | Desarrollo con logs verbosos | `application-dev.properties` |
| `prod` | Producción con `ddl-auto=validate` | `application-prod.properties` |

### Activar un perfil

```bash
# Opción 1: variable de entorno
export SPRING_PROFILES_ACTIVE=prod
mvn spring-boot:run

# Opción 2: parámetro Maven
mvn spring-boot:run -Dspring-boot.run.profiles=prod

# Opción 3: al ejecutar el JAR
java -jar target/app-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

### `application-prod.properties` (ejemplo)

```properties
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
logging.level.root=INFO
logging.level.app=INFO
server.error.include-stacktrace=never
server.error.include-message=never
```

---

## 💻 Despliegue en desarrollo

### 1. Levantar MySQL

**Con Docker Desktop (Windows/macOS):**

```bash
docker compose up -d
```

**Con Podman (Linux):**

```bash
podman run -d --name mysql-terraza \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -e MYSQL_DATABASE=mundo_terraza_db \
  -e MYSQL_USER=terraza \
  -e MYSQL_PASSWORD=terraza123 \
  -p 3306:3306 \
  -v mysql-terraza-data:/var/lib/mysql \
  docker.io/library/mysql:8.0
```

### 2. Arrancar el backend

```bash
mvn clean spring-boot:run
```

Flyway aplica migraciones automáticamente. Los seeders cargan 7 categorías y 15 servicios base.

### 3. Verificar

- Frontend: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html
- Healthcheck de MySQL: `podman exec mysql-terraza mysqladmin ping -u root -proot123`

### 4. Detener el entorno

```bash
# Con Docker Compose
docker compose down

# Con Podman
podman stop mysql-terraza
```

---

## 🐳 Despliegue con Docker

### Dockerfile (backend)

Añadir un `Dockerfile` en la raíz del proyecto:

```dockerfile
# Etapa 1: build
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### `docker-compose.yml` completo (con backend)

```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: mysql-terraza
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: mundo_terraza_db
      MYSQL_USER: terraza
      MYSQL_PASSWORD: terraza123
    ports:
      - "3306:3306"
    volumes:
      - mysql-terraza-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-proot123"]
      interval: 5s
      timeout: 5s
      retries: 10

  backend:
    build: .
    container_name: mundo-terraza-backend
    depends_on:
      mysql:
        condition: service_healthy
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/mundo_terraza_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Lima
      SPRING_DATASOURCE_USERNAME: terraza
      SPRING_DATASOURCE_PASSWORD: terraza123
      JWT_SECRET: ${JWT_SECRET:-dev-secret-change-me-mundoterraza-256bits-minimum}
      SPRING_PROFILES_ACTIVE: prod
    ports:
      - "8080:8080"
    volumes:
      - ./uploads:/app/uploads

volumes:
  mysql-terraza-data:
```

### Construir y arrancar

```bash
docker compose build
docker compose up -d
docker compose logs -f backend
```

---

## 🌐 Despliegue en producción

### Consideraciones críticas

| Aspecto | Acción |
|---------|--------|
| **JWT_SECRET** | Generar clave aleatoria ≥32 bytes con `openssl rand -base64 48` |
| **Contraseñas MySQL** | Cambiar `terraza123` y `root123` por contraseñas robustas |
| **Perfil** | Activar `prod` para desactivar SQL verboso y stacktraces |
| **HTTPS** | Terminar TLS en un reverse proxy (Nginx, Caddy, Traefik) |
| **DDL-AUTO** | Mantener en `validate`; nunca `update` en producción |
| **Flyway** | Ejecutar migraciones antes de arrancar la app |
| **Backups** | Programar dumps diarios de MySQL |
| **Logs** | Rotación con retención ≥ 30 días |
| **Uploads** | Persistir en volumen externo o S3-compatible |

### Reverse proxy con Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name mundoterraza.example.com;

    ssl_certificate     /etc/letsencrypt/live/mundoterraza/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mundoterraza/privkey.pem;

    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Ejecutar el JAR como servicio systemd

`/etc/systemd/system/mundo-terraza.service`:

```ini
[Unit]
Description=MundoTerraza Spring Boot
After=network.target mysql.service

[Service]
User=mundo-terraza
WorkingDirectory=/opt/mundo-terraza
ExecStart=/usr/bin/java -jar app.jar --spring.profiles.active=prod
Restart=on-failure
RestartSec=10
StandardOutput=append:/var/log/mundo-terraza/stdout.log
StandardError=append:/var/log/mundo-terraza/stderr.log

[Install]
WantedBy=multi-user.target
```

Activar:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now mundo-terraza
sudo systemctl status mundo-terraza
```

---

## 🗄 Base de datos y Flyway

### Migraciones

Las migraciones viven en `src/main/resources/db/migration/`:

- `V1__init_schema.sql` — Crea las 15 tablas del dominio.
- `V2__seed_catalogo.sql` — Inserta 7 categorías y 15 servicios.

### Ciclo de Flyway

| Situación | Comportamiento |
|-----------|----------------|
| BD vacía | Aplica V1 y V2 automáticamente |
| BD con migraciones | Valida checksums; solo aplica las nuevas |
| Migración fallida | Se registra como fallida → bloquea siguientes arranques |
| Checksum distinto | Error de validación → requiere `flyway repair` |

### Crear una nueva migración

```bash
touch src/main/resources/db/migration/V3__add_column_x.sql
```

**Reglas:**

- Nunca modificar una migración ya aplicada.
- Nunca borrar una migración del repositorio.
- Cada migración debe ser **idempotente** o **acumulativa**.
- Probar siempre en una BD limpia antes de aplicar a producción.

### Reset en desarrollo

```bash
# Docker
docker compose down -v
docker compose up -d

# Podman
podman exec mysql-terraza mysql -h 127.0.0.1 -u terraza -pterraza123 \
  -e "DROP DATABASE IF EXISTS mundo_terraza_db; CREATE DATABASE mundo_terraza_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

---

## 💾 Backups y restauración

### Backup completo

```bash
podman exec mysql-terraza mysqldump -h 127.0.0.1 -u terraza -pterraza123 \
  --databases mundo_terraza_db --single-transaction --routines --triggers \
  > backup_$(date +%Y%m%d).sql
```

### Backup solo esquema

```bash
podman exec mysql-terraza mysqldump -h 127.0.0.1 -u terraza -pterraza123 \
  --no-data mundo_terraza_db > schema_$(date +%Y%m%d).sql
```

### Restaurar

```bash
podman exec -i mysql-terraza mysql -h 127.0.0.1 -u terraza -pterraza123 \
  mundo_terraza_db < backup_20260110.sql
```

### Cron de backups diarios

```bash
# /etc/cron.daily/mundoterraza-backup
#!/bin/bash
DATE=$(date +%Y%m%d)
DEST=/var/backups/mundoterraza
mkdir -p $DEST
podman exec mysql-terraza mysqldump -h 127.0.0.1 -u terraza -pterraza123 \
  --databases mundo_terraza_db --single-transaction > $DEST/db_$DATE.sql
find $DEST -name "db_*.sql" -mtime +30 -delete
```

---

## 📊 Logs y observabilidad

### Ubicación

| Log | Ruta |
|-----|------|
| Aplicación | `logs/mundo-terraza.log` |
| Archivo rotado | `logs/mundo-terraza-YYYY-MM-DD.log` |
| Consola | stdout |

### Configuración (`logback-spring.xml`)

- Rotación diaria.
- Retención 30 días.
- Tamaño máximo agregado: 500 MB.
- Patrón con `requestId` en MDC.

### Niveles por paquete

```xml
<logger name="app" level="DEBUG"/>
<logger name="app.infrastructure.security" level="INFO"/>
<logger name="org.springframework" level="INFO"/>
<logger name="org.hibernate" level="WARN"/>
```

### Cambiar nivel en caliente (futuro)

Activable con Spring Boot Actuator:

```properties
management.endpoints.web.exposure.include=loggers
management.endpoint.loggers.enabled=true
```

Luego:

```bash
curl -X POST http://localhost:8080/actuator/loggers/app \
  -H "Content-Type: application/json" \
  -d '{"configuredLevel":"DEBUG"}'
```

---

## ✅ Checklist de producción

- [ ] `JWT_SECRET` reemplazado por clave aleatoria ≥32 bytes.
- [ ] Contraseñas de MySQL cambiadas y robustas.
- [ ] Perfil `prod` activo (`SPRING_PROFILES_ACTIVE=prod`).
- [ ] `spring.jpa.hibernate.ddl-auto=validate`.
- [ ] `server.error.include-stacktrace=never`.
- [ ] HTTPS configurado con reverse proxy.
- [ ] Firewall: solo puertos 443 y 22 expuestos.
- [ ] Backups automáticos configurados y verificados.
- [ ] Rotación de logs activa.
- [ ] Migraciones Flyway aplicadas correctamente.
- [ ] Volumen de `uploads/` persistente.
- [ ] Healthcheck `/actuator/health` monitoreado.
- [ ] CORS configurado con dominios reales (no `*`).
- [ ] Rate limiting en `/api/auth/*` (recomendado).

---

## 🩺 Troubleshooting

| Síntoma | Causa | Solución |
|---------|-------|----------|
| `Communications link failure` | MySQL no responde | `docker compose up -d` o `podman start mysql-terraza` |
| `Access denied for user 'terraza'` | Credenciales incorrectas | Verificar `application.properties` vs contenedor |
| `Flyway detected failed migration` | Migración fallida previa | Reset de BD o `flyway repair` |
| `Schema-validation: missing table` | BD desincronizada | `mvn clean` + recompilar; verificar migraciones |
| `Puerto 8080 ya en uso` | Otro proceso ocupa el puerto | `ss -tlnp \| grep 8080` y detener el proceso |
| `JWT signature does not match` | Cambió `JWT_SECRET` | Los tokens viejos quedan inválidos; usuarios deben reautenticarse |
| Imágenes no se ven | `uploads/` no persistente | Montar volumen en Docker o crear directorio en producción |
| Logs gigantes | Nivel DEBUG en producción | Cambiar `logging.level.app=INFO` |
| `OutOfMemoryError` | Heap insuficiente | Ajustar `-Xmx` en el arranque del JAR |
| `Connection pool exhausted` | HikariCP mal dimensionado | Ajustar `spring.datasource.hikari.maximum-pool-size` |

### Comandos útiles

```bash
# Ver procesos Java activos
jps -l

# Ver uso de memoria
jcmd <pid> GC.heap_info

# Ver puertos en uso
ss -tlnp

# Ver contenedores
docker ps
podman ps

# Logs en tiempo real
docker compose logs -f backend
podman logs -f mysql-terraza

# Ejecutar SQL en el contenedor
docker exec -it mysql-terraza mysql -h 127.0.0.1 -u terraza -pterraza123
```

---

## 📚 Referencias

- [Spring Boot — Externalized Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config)
- [Flyway — Migrations](https://documentation.red-gate.com/flyway)
- [Docker Compose — File Reference](https://docs.docker.com/compose/compose-file/)
- [Podman — Rootless Tutorial](https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md)
- [Let's Encrypt — Certbot](https://certbot.eff.org/)
