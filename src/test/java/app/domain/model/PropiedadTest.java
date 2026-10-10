package app.domain.model;
import app.domain.enums.EstadoPropiedad;
import app.domain.enums.PoliticaCancelacion;
import app.domain.enums.TipoAlojamiento;
import app.domain.valueobject.Dinero;
import app.domain.valueobject.Dni;
import app.domain.valueobject.Email;
import app.domain.valueobject.Telefono;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
/**
 *
 * @author inici4rsesi0n
 */
@DisplayName("Propiedad - Entidad")
class PropiedadTest{
    private Usuario anfitrion;
    private Categoria categoria;
    private Propiedad propiedad;
    @BeforeEach
    void setup(){
        anfitrion=new Usuario("Anfitrion", Email.de("anf@test.com"), "$2a$10$hash");
        anfitrion.convertirEnAnfitrion(Telefono.de("987654321"), Dni.de("12345678"),
                "Lima", "Biografia valida de anfitrion");
        categoria=new Categoria("Urbano", "Departamentos centricos");
        propiedad=new Propiedad(anfitrion, categoria, "Titulo valido",
                "Descripcion valida de la propiedad", "Miraflores",
                -12.1191, -77.0286, TipoAlojamiento.DEPARTAMENTO, PoliticaCancelacion.FLEXIBLE);
    }
    @Nested
    @DisplayName("Construccion")
    class Construccion{
        @Test
        @DisplayName("Crea en estado BORRADOR")
        void creaBorrador(){
            assertEquals(EstadoPropiedad.BORRADOR, propiedad.getEstado());
            assertEquals(0.0, propiedad.getRatingPromedio());
            assertEquals(0, propiedad.getTotalReviews());
            assertFalse(propiedad.isEsFavoritoEntreHuespedes());
        }
        @Test
        @DisplayName("Falla si anfitrion no esta habilitado")
        void fallaAnfitrionNoHabilitado(){
            Usuario comun=new Usuario("A", Email.de("a@a.com"), "hash");
            assertThrows(IllegalArgumentException.class,
                    ()->new Propiedad(comun, categoria, "Titulo",
                            "Descripcion valida", "Lima", 0, 0,
                            TipoAlojamiento.CASA, PoliticaCancelacion.FLEXIBLE));
        }
        @Test
        @DisplayName("Falla si latitud fuera de rango")
        void fallaLatitudFuera(){
            assertThrows(IllegalArgumentException.class,
                    ()->new Propiedad(anfitrion, categoria, "Titulo",
                            "Descripcion valida", "Lima", 91, 0,
                            TipoAlojamiento.CASA, PoliticaCancelacion.FLEXIBLE));
        }
        @Test
        @DisplayName("Falla si longitud fuera de rango")
        void fallaLongitudFuera(){
            assertThrows(IllegalArgumentException.class,
                    ()->new Propiedad(anfitrion, categoria, "Titulo",
                            "Descripcion valida", "Lima", 0, 181,
                            TipoAlojamiento.CASA, PoliticaCancelacion.FLEXIBLE));
        }
    }
    @Nested
    @DisplayName("Publicar")
    class Publicar{
        @Test
        @DisplayName("Falla sin habitaciones")
        void fallaSinHabitaciones(){
            propiedad.agregarImagen(Imagen.paraPropiedad(propiedad, "/uploads/a.jpg", 0));
            assertThrows(IllegalStateException.class, ()->propiedad.publicar());
        }
        @Test
        @DisplayName("Falla sin imagenes")
        void fallaSinImagenes(){
            propiedad.agregarHabitacion(crearHabitacion());
            assertThrows(IllegalStateException.class, ()->propiedad.publicar());
        }
        @Test
        @DisplayName("Publica con habitacion e imagen")
        void publicaCorrectamente(){
            propiedad.agregarHabitacion(crearHabitacion());
            propiedad.agregarImagen(Imagen.paraPropiedad(propiedad, "/uploads/a.jpg", 0));
            propiedad.publicar();
            assertEquals(EstadoPropiedad.ACTIVA, propiedad.getEstado());
        }
        @Test
        @DisplayName("Falla publicar dos veces")
        void fallaDoblePublicar(){
            propiedad.agregarHabitacion(crearHabitacion());
            propiedad.agregarImagen(Imagen.paraPropiedad(propiedad, "/uploads/a.jpg", 0));
            propiedad.publicar();
            assertThrows(IllegalStateException.class, ()->propiedad.publicar());
        }
    }
    @Nested
    @DisplayName("Estados")
    class Estados{
        @Test
        @DisplayName("Desactivar cambia estado")
        void desactiva(){
            propiedad.desactivar();
            assertEquals(EstadoPropiedad.INACTIVA, propiedad.getEstado());
        }
        @Test
        @DisplayName("Marcar eliminada asigna fecha")
        void marcaEliminada(){
            propiedad.marcarEliminada();
            assertEquals(EstadoPropiedad.ELIMINADA, propiedad.getEstado());
            assertNotNull(propiedad.getFechaEliminacion());
        }
    }
    @Nested
    @DisplayName("Rating")
    class Rating{
        @Test
        @DisplayName("Marcar como favorito entre huespedes con rating alto y reviews suficientes")
        void marcaFavorito(){
            propiedad.actualizarRating(4.9, 15);
            assertTrue(propiedad.isEsFavoritoEntreHuespedes());
        }
        @Test
        @DisplayName("No marcar favorito con rating bajo")
        void noMarcaRatingBajo(){
            propiedad.actualizarRating(4.5, 15);
            assertFalse(propiedad.isEsFavoritoEntreHuespedes());
        }
        @Test
        @DisplayName("No marcar favorito con pocas reviews")
        void noMarcaPocasReviews(){
            propiedad.actualizarRating(4.9, 5);
            assertFalse(propiedad.isEsFavoritoEntreHuespedes());
        }
    }
    private Habitacion crearHabitacion(){
        return new Habitacion(propiedad, "Suite", "Descripcion de la suite",
                Dinero.de(new BigDecimal("250.00")), 2, 1, 0, 0, 1, 1, 45.0, 1);
    }
}
