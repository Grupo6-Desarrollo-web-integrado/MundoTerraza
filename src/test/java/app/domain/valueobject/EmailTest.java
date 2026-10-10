package app.domain.valueobject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
/**
 *
 * @author inici4rsesi0n
 */
@DisplayName("Email - Value Object")
class EmailTest{
    @Nested
    @DisplayName("Construccion valida")
    class ConstruccionValida{
        @Test
        @DisplayName("Acepta correo con formato valido")
        void aceptaCorreoValido(){
            Email email=Email.de("test@example.com");
            assertEquals("test@example.com", email.getValor());
        }
        @Test
        @DisplayName("Normaliza a minusculas")
        void normalizaAMinusculas(){
            Email email=Email.de("TEST@EXAMPLE.COM");
            assertEquals("test@example.com", email.getValor());
        }
        @Test
        @DisplayName("Elimina espacios alrededor")
        void eliminaEspacios(){
            Email email=Email.de("  test@example.com  ");
            assertEquals("test@example.com", email.getValor());
        }
    }
    @Nested
    @DisplayName("Construccion invalida")
    class ConstruccionInvalida{
        @Test
        @DisplayName("Rechaza null")
        void rechazaNull(){
            assertThrows(IllegalArgumentException.class, ()->Email.de(null));
        }
        @Test
        @DisplayName("Rechaza correo vacio")
        void rechazaVacio(){
            assertThrows(IllegalArgumentException.class, ()->Email.de("   "));
        }
        @Test
        @DisplayName("Rechaza correo sin arroba")
        void rechazaSinArroba(){
            assertThrows(IllegalArgumentException.class, ()->Email.de("testexample.com"));
        }
        @Test
        @DisplayName("Rechaza correo sin dominio")
        void rechazaSinDominio(){
            assertThrows(IllegalArgumentException.class, ()->Email.de("test@"));
        }
        @Test
        @DisplayName("Rechaza correo que excede longitud maxima")
        void rechazaMuyLargo(){
            String largo="a".repeat(145)+"@x.com";
            assertThrows(IllegalArgumentException.class, ()->Email.de(largo));
        }
    }
    @Nested
    @DisplayName("Igualdad")
    class Igualdad{
        @Test
        @DisplayName("Dos emails con mismo valor son iguales")
        void iguales(){
            assertEquals(Email.de("test@example.com"), Email.de("TEST@EXAMPLE.COM"));
        }
    }
}
