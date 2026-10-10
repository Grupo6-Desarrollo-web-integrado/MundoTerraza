package app.domain.model;
import app.domain.enums.EstadoUsuario;
import app.domain.valueobject.Dni;
import app.domain.valueobject.Email;
import app.domain.valueobject.Telefono;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
/**
 *
 * @author inici4rsesi0n
 */
@DisplayName("Usuario - Entidad")
class UsuarioTest{
    private Usuario usuario;
    @BeforeEach
    void setup(){
        usuario=new Usuario("Test", Email.de("test@test.com"), "$2a$10$hash");
    }
    @Nested
    @DisplayName("Construccion")
    class Construccion{
        @Test
        @DisplayName("Crea usuario huesped por defecto")
        void creaHuespedPorDefecto(){
            assertEquals("Test", usuario.getNombre());
            assertEquals("test@test.com", usuario.getCorreo().getValor());
            assertFalse(usuario.isEsAnfitrion());
            assertEquals(EstadoUsuario.ACTIVA, usuario.getEstado());
            assertEquals(0, usuario.getIntentosFallidos());
            assertNull(usuario.getFechaAnfitrion());
        }
        @Test
        @DisplayName("Rechaza nombre nulo")
        void rechazaNombreNulo(){
            assertThrows(IllegalArgumentException.class,
                    ()->new Usuario(null, Email.de("x@x.com"), "hash"));
        }
        @Test
        @DisplayName("Rechaza correo nulo")
        void rechazaCorreoNulo(){
            assertThrows(IllegalArgumentException.class,
                    ()->new Usuario("A", null, "hash"));
        }
        @Test
        @DisplayName("Rechaza hash nulo")
        void rechazaHashNulo(){
            assertThrows(IllegalArgumentException.class,
                    ()->new Usuario("A", Email.de("x@x.com"), null));
        }
    }
    @Nested
    @DisplayName("Convertir en anfitrion")
    class Convertir{
        @Test
        @DisplayName("Convierte con datos validos")
        void convierteValido(){
            usuario.convertirEnAnfitrion(Telefono.de("987654321"), Dni.de("12345678"),
                    "Lima", "Biografia valida de anfitrion");
            assertTrue(usuario.isEsAnfitrion());
            assertEquals("Lima", usuario.getCiudad());
            assertNotNull(usuario.getFechaAnfitrion());
        }
        @Test
        @DisplayName("Falla si ya es anfitrion")
        void fallaSiYaEsAnfitrion(){
            usuario.convertirEnAnfitrion(Telefono.de("987654321"), Dni.de("12345678"),
                    "Lima", "Biografia valida de anfitrion");
            assertThrows(IllegalStateException.class,
                    ()->usuario.convertirEnAnfitrion(Telefono.de("987654321"), Dni.de("12345678"),
                            "Lima", "Biografia valida de anfitrion"));
        }
        @Test
        @DisplayName("Falla si telefono es nulo")
        void fallaTelefonoNulo(){
            assertThrows(IllegalArgumentException.class,
                    ()->usuario.convertirEnAnfitrion(null, Dni.de("12345678"),
                            "Lima", "Biografia valida"));
        }
        @Test
        @DisplayName("Falla si ciudad esta vacia")
        void fallaCiudadVacia(){
            assertThrows(IllegalArgumentException.class,
                    ()->usuario.convertirEnAnfitrion(Telefono.de("987654321"), Dni.de("12345678"),
                            "  ", "Biografia valida"));
        }
    }
    @Nested
    @DisplayName("Intentos fallidos")
    class IntentosFallidos{
        @Test
        @DisplayName("Incrementa contador")
        void incrementa(){
            usuario.registrarIntentoFallido(5, 15);
            assertEquals(1, usuario.getIntentosFallidos());
            assertFalse(usuario.estaBloqueado());
        }
        @Test
        @DisplayName("Bloquea al alcanzar maximo")
        void bloqueaAlMaximo(){
            for(int i=0;i<5;i++)
                usuario.registrarIntentoFallido(5, 15);
            assertEquals(5, usuario.getIntentosFallidos());
            assertTrue(usuario.estaBloqueado());
            assertNotNull(usuario.getBloqueadoHasta());
        }
        @Test
        @DisplayName("Reiniciar limpia contador y bloqueo")
        void reiniciarLimpia(){
            for(int i=0;i<5;i++)
                usuario.registrarIntentoFallido(5, 15);
            usuario.reiniciarIntentos();
            assertEquals(0, usuario.getIntentosFallidos());
            assertNull(usuario.getBloqueadoHasta());
            assertFalse(usuario.estaBloqueado());
        }
    }
}
