package app.infrastructure.repository;
import app.application.service.DisponibilidadService;
import app.domain.model.Propiedad;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.assertEquals;
/**
 *
 * @author inici4rsesi0n
 */
@DataJpaTest(properties="spring.jpa.hibernate.ddl-auto=validate")
@Testcontainers
@AutoConfigureTestDatabase(replace=AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
@DisplayName("Disponibilidad en catalogo + paridad con DisponibilidadService")
class PropiedadSpecificationDisponibilidadTest{
    private static final Logger log=LoggerFactory.getLogger(PropiedadSpecificationDisponibilidadTest.class);
    @Container
    static final MySQLContainer<?> MYSQL=new MySQLContainer<>("mysql:8.0")
            .withDatabaseName("mundo_terraza_test")
            .withUsername("terraza")
            .withPassword("terraza123");
    @DynamicPropertySource
    static void props(DynamicPropertyRegistry r){
        r.add("spring.datasource.url", MYSQL::getJdbcUrl);
        r.add("spring.datasource.username", MYSQL::getUsername);
        r.add("spring.datasource.password", MYSQL::getPassword);
    }
    @Autowired PropiedadRepository propiedadRepository;
    @Autowired HabitacionRepository habitacionRepository;
    @Autowired ReservaRepository reservaRepository;
    @Autowired BloqueoFechaRepository bloqueoFechaRepository;
    @Autowired JdbcTemplate jdbcTemplate;
    DisponibilidadService disponibilidadService;
    @BeforeEach
    void setup(){
        log.info("[TEST] setup inicio, estado-pre: {}", snapshot());
        limpiar();
        sembrar();
        log.info("[TEST] setup fin, estado-post: {}", snapshot());
        disponibilidadService=new DisponibilidadService(habitacionRepository, reservaRepository, bloqueoFechaRepository);
    }
    private void limpiar(){
        jdbcTemplate.update("DELETE FROM liquidaciones");
        jdbcTemplate.update("DELETE FROM pagos");
        jdbcTemplate.update("DELETE FROM historial_estados_reserva");
        jdbcTemplate.update("DELETE FROM notificaciones");
        jdbcTemplate.update("DELETE FROM reviews");
        jdbcTemplate.update("DELETE FROM favoritos");
        jdbcTemplate.update("DELETE FROM reservas");
        jdbcTemplate.update("DELETE FROM bloqueos_fecha");
        jdbcTemplate.update("DELETE FROM habitaciones");
        jdbcTemplate.update("DELETE FROM propiedades");
        jdbcTemplate.update("DELETE FROM usuarios");
    }
    private void sembrar(){
        Integer cats=jdbcTemplate.queryForObject("SELECT COUNT(*) FROM categorias", Integer.class);
        if(cats==null||cats==0)
            throw new IllegalStateException("categorias vacia: Flyway V2 no se aplico correctamente");
        jdbcTemplate.update("INSERT INTO usuarios (id, nombre, correo, password, es_anfitrion, estado, intentos_fallidos, fecha_creacion, fecha_actualizacion) VALUES (1, 'Anfitrion Test', 'anf@test.com', 'hash', TRUE, 'ACTIVA', 0, NOW(6), NOW(6))");
        jdbcTemplate.update("INSERT INTO usuarios (id, nombre, correo, password, estado, intentos_fallidos, fecha_creacion, fecha_actualizacion) VALUES (2, 'Huesped Test', 'hue@test.com', 'hash', 'ACTIVA', 0, NOW(6), NOW(6))");
        jdbcTemplate.update("INSERT INTO propiedades (id_propiedad, id_anfitrion, id_categoria, titulo, descripcion, ubicacion, latitud, longitud, tipo_alojamiento, politica_cancelacion, estado, rating_promedio, total_reviews, es_favorito_entre_huespedes, fecha_creacion, fecha_actualizacion, version) VALUES (1, 1, (SELECT id FROM categorias LIMIT 1), 'Depto Test', 'Descripcion de prueba lo suficientemente larga', 'Lima', -12.1, -77.0, 'DEPARTAMENTO', 'FLEXIBLE', 'ACTIVA', 0, 0, FALSE, NOW(6), NOW(6), 0)");
        jdbcTemplate.update("INSERT INTO habitaciones (id_habitacion, id_propiedad, nombre, descripcion, precio_noche, max_adultos, max_ninos, max_bebes, max_mascotas, cantidad_dormitorios, cantidad_banios, metros_cuadrados, stock_total, estado, fecha_creacion, fecha_actualizacion) VALUES (1, 1, 'Habitacion Test', 'Descripcion de la habitacion test', 100.00, 2, 0, 0, 0, 1, 1, 30.0, 2, 'DISPONIBLE', NOW(6), NOW(6))");
    }
    private String snapshot(){
        return String.format("usuarios=%d propiedades=%d habitaciones=%d reservas=%d bloqueos=%d",
                contar("usuarios"), contar("propiedades"), contar("habitaciones"),
                contar("reservas"), contar("bloqueos_fecha"));
    }
    private int contar(String tabla){
        Integer n=jdbcTemplate.queryForObject("SELECT COUNT(*) FROM "+tabla, Integer.class);
        return n==null?0:n;
    }
    private Specification<Propiedad> spec(LocalDate desde, LocalDate hasta, int cantidad){
        return PropiedadSpecification.combinadas(null, null, null, null, null, null, null, desde, hasta, cantidad);
    }
    private long total(Specification<Propiedad> spec){
        return propiedadRepository.findAll(spec, PageRequest.of(0, 10)).getTotalElements();
    }
    private void verificarParidad(LocalDate desde, LocalDate hasta, int cantidad){
        long total=total(spec(desde, hasta, cantidad));
        var disp=disponibilidadService.consultar(1L, desde, hasta);
        boolean esperado=disp.disponible()&&disp.unidadesDisponibles()>=cantidad;
        assertEquals(esperado, total>0, "Paridad rota para "+desde+".."+hasta+" cantidad="+cantidad);
    }
    private void insertarReserva(int id, int cantidad, String inicio, String fin, String estado){
        jdbcTemplate.update(
                "INSERT INTO reservas (id_reserva, id_usuario, id_habitacion, id_propiedad, cantidad, fecha_inicio, fecha_fin, precio_por_noche_al_crear, subtotal, comision_plataforma, monto_anfitrion, estado, fecha_creacion, fecha_actualizacion, version) VALUES (?, 2, 1, 1, ?, ?, ?, 100.00, 500.00, 75.00, 425.00, ?, NOW(6), NOW(6), 0)",
                id, cantidad, inicio, fin, estado);
    }
    private void insertarBloqueo(int id, String inicio, String fin){
        jdbcTemplate.update(
                "INSERT INTO bloqueos_fecha (id_bloqueo, id_habitacion, fecha_inicio, fecha_fin, motivo) VALUES (?, 1, ?, ?, 'Bloqueo test')",
                id, inicio, fin);
    }
    @Nested
    @DisplayName("Sin fechas")
    class SinFechas{
        @Test
        void listarSinFechasDevuelveTodasLasActivas(){
            assertEquals(1L, total(spec(null, null, 1)));
        }
    }
    @Nested
    @DisplayName("Con fechas")
    class ConFechas{
        @Test
        void rangoLibreDevuelvePropiedad(){
            LocalDate d=LocalDate.of(2026,12,1), h=LocalDate.of(2026,12,5);
            assertEquals(1L, total(spec(d, h, 1)));
            verificarParidad(d, h, 1);
        }
        @Test
        void reservaConfirmadaCantidadIgualStockBloquea(){
            insertarReserva(1, 2, "2027-01-10", "2027-01-15", "CONFIRMADA");
            LocalDate d=LocalDate.of(2027,1,10), h=LocalDate.of(2027,1,15);
            assertEquals(0L, total(spec(d, h, 1)));
            verificarParidad(d, h, 1);
        }
        @Test
        void reservaConfirmadaParcialPermiteCantidad1PeroNoCantidad2(){
            insertarReserva(1, 1, "2027-01-10", "2027-01-15", "CONFIRMADA");
            LocalDate d=LocalDate.of(2027,1,10), h=LocalDate.of(2027,1,15);
            assertEquals(1L, total(spec(d, h, 1)));
            verificarParidad(d, h, 1);
            assertEquals(0L, total(spec(d, h, 2)));
            verificarParidad(d, h, 2);
        }
        @Test
        void reservaCanceladaNoBloquea(){
            insertarReserva(1, 2, "2027-01-10", "2027-01-15", "CANCELADA");
            LocalDate d=LocalDate.of(2027,1,10), h=LocalDate.of(2027,1,15);
            assertEquals(1L, total(spec(d, h, 1)));
            verificarParidad(d, h, 1);
        }
        @Test
        void bloqueoSolapadoAnulaDisponibilidad(){
            insertarBloqueo(1, "2027-01-10", "2027-01-15");
            LocalDate d=LocalDate.of(2027,1,10), h=LocalDate.of(2027,1,15);
            assertEquals(0L, total(spec(d, h, 1)));
            verificarParidad(d, h, 1);
        }
        @Test
        void bloqueoNoSolapadoNoAfecta(){
            insertarBloqueo(1, "2027-02-01", "2027-02-05");
            LocalDate d=LocalDate.of(2027,1,10), h=LocalDate.of(2027,1,15);
            assertEquals(1L, total(spec(d, h, 1)));
            verificarParidad(d, h, 1);
        }
        @Test
        void bordeSemiabiertoHastaIgualInicioReservaNoBloquea(){
            insertarReserva(1, 1, "2027-01-10", "2027-01-15", "CONFIRMADA");
            LocalDate d=LocalDate.of(2027,1,1), h=LocalDate.of(2027,1,10);
            assertEquals(1L, total(spec(d, h, 1)));
            verificarParidad(d, h, 1);
        }
        @Test
        void bordeSemiabiertoDesdeIgualFinReservaNoBloquea(){
            insertarReserva(1, 1, "2027-01-10", "2027-01-15", "CONFIRMADA");
            LocalDate d=LocalDate.of(2027,1,15), h=LocalDate.of(2027,1,20);
            assertEquals(1L, total(spec(d, h, 1)));
            verificarParidad(d, h, 1);
        }
    }
}
