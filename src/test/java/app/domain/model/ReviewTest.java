package app.domain.model;
import app.domain.enums.EstadoReview;
import app.domain.enums.PoliticaCancelacion;
import app.domain.enums.TipoAlojamiento;
import app.domain.valueobject.Dni;
import app.domain.valueobject.Email;
import app.domain.valueobject.Telefono;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
/**
 *
 * @author inici4rsesi0n
 */
@DisplayName("Review - Entidad")
class ReviewTest{
    private Usuario usuario;
    private Propiedad propiedad;
    private Review review;
    private static final String COMENTARIO_VALIDO="Comentario valido de la review";
    @BeforeEach
    void setup(){
        usuario=new Usuario("Huesped", Email.de("h@test.com"), "$2a$10$hash");
        Usuario anfitrion=new Usuario("Anf", Email.de("a@a.com"), "$2a$10$hash");
        anfitrion.convertirEnAnfitrion(Telefono.de("987654321"), Dni.de("12345678"),
                "Lima", "Biografia valida");
        Categoria categoria=new Categoria("Urbano", "Desc");
        propiedad=new Propiedad(anfitrion, categoria, "Titulo valido",
                "Descripcion valida de la propiedad", "Lima",
                -12.0, -77.0, TipoAlojamiento.DEPARTAMENTO, PoliticaCancelacion.FLEXIBLE);
        review=new Review(usuario, propiedad, 5, COMENTARIO_VALIDO, "Suite 1");
        ReflectionTestUtils.setField(review, "fechaCreacion", LocalDateTime.now());
    }
    @Nested
    @DisplayName("Construccion")
    class Construccion{
        @Test
        @DisplayName("Crea review activa")
        void creaActiva(){
            assertEquals(EstadoReview.ACTIVA, review.getEstado());
            assertEquals(5, review.getRating());
            assertEquals("Suite 1", review.getHabitacionMencionada());
        }
        @Test
        @DisplayName("Rechaza rating 0")
        void rechazaRatingCero(){
            assertThrows(IllegalArgumentException.class,
                    ()->new Review(usuario, propiedad, 0, COMENTARIO_VALIDO, null));
        }
        @Test
        @DisplayName("Rechaza rating 6")
        void rechazaRatingSeis(){
            assertThrows(IllegalArgumentException.class,
                    ()->new Review(usuario, propiedad, 6, COMENTARIO_VALIDO, null));
        }
        @Test
        @DisplayName("Rechaza comentario menor a 10 caracteres")
        void rechazaComentarioCorto(){
            assertThrows(IllegalArgumentException.class,
                    ()->new Review(usuario, propiedad, 5, "Corto", null));
        }
        @Test
        @DisplayName("Rechaza comentario mayor a 500 caracteres")
        void rechazaComentarioLargo(){
            assertThrows(IllegalArgumentException.class,
                    ()->new Review(usuario, propiedad, 5, "a".repeat(501), null));
        }
    }
    @Nested
    @DisplayName("Edicion")
    class Edicion{
        @Test
        @DisplayName("Editar dentro de 30 dias funciona")
        void editarOk(){
            review.editar(4, "Comentario editado con contenido valido");
            assertEquals(4, review.getRating());
            assertNotNull(review.getFechaEdicion());
        }
        @Test
        @DisplayName("Editar fuera de plazo falla")
        void editarFueraPlazo(){
            ReflectionTestUtils.setField(review, "fechaCreacion", LocalDateTime.now().minusDays(31));
            assertThrows(IllegalStateException.class,
                    ()->review.editar(4, "Comentario editado con contenido valido"));
        }
        @Test
        @DisplayName("Editar con rating invalido falla")
        void editarRatingInvalido(){
            assertThrows(IllegalArgumentException.class,
                    ()->review.editar(10, "Comentario editado con contenido valido"));
        }
    }
    @Nested
    @DisplayName("Respuesta")
    class Respuesta{
        @Test
        @DisplayName("Responder primera vez funciona")
        void responderOk(){
            review.responder("Gracias por tu comentario, vuelve pronto");
            assertNotNull(review.getRespuestaAnfitrion());
            assertNotNull(review.getFechaRespuesta());
        }
        @Test
        @DisplayName("Responder segunda vez falla")
        void responderDoble(){
            review.responder("Gracias por tu comentario, vuelve pronto");
            assertThrows(IllegalStateException.class,
                    ()->review.responder("Otra respuesta diferente"));
        }
        @Test
        @DisplayName("Responder con texto corto falla")
        void responderCorto(){
            assertThrows(IllegalArgumentException.class, ()->review.responder("Corto"));
        }
    }
    @Nested
    @DisplayName("Eliminacion")
    class Eliminacion{
        @Test
        @DisplayName("Eliminar dentro de 30 dias funciona")
        void eliminarOk(){
            review.eliminar();
            assertEquals(EstadoReview.ELIMINADA, review.getEstado());
            assertNotNull(review.getFechaEliminacion());
        }
        @Test
        @DisplayName("Eliminar fuera de plazo falla")
        void eliminarFueraPlazo(){
            ReflectionTestUtils.setField(review, "fechaCreacion", LocalDateTime.now().minusDays(31));
            assertThrows(IllegalStateException.class, review::eliminar);
        }
    }
}
