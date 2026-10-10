package app.domain.valueobject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
/**
 *
 * @author inici4rsesi0n
 */
@DisplayName("Password - Value Object")
class PasswordTest{
    @Nested
    @DisplayName("Construccion en texto plano")
    class TextoPlano{
        @Test
        @DisplayName("Acepta contrasena valida")
        void aceptaValida(){
            Password p=Password.plano("secreto123");
            assertEquals("secreto123", p.getValor());
            assertFalse(p.estaHasheado());
        }
        @Test
        @DisplayName("Rechaza null")
        void rechazaNull(){
            assertThrows(IllegalArgumentException.class, ()->Password.plano(null));
        }
        @Test
        @DisplayName("Rechaza menor a 6 caracteres")
        void rechazaCorta(){
            assertThrows(IllegalArgumentException.class, ()->Password.plano("abc12"));
        }
        @Test
        @DisplayName("Rechaza mayor a 72 caracteres")
        void rechazaLarga(){
            assertThrows(IllegalArgumentException.class, ()->Password.plano("a".repeat(73)));
        }
    }
    @Nested
    @DisplayName("Construccion desde hash")
    class DesdeHash{
        @Test
        @DisplayName("Acepta hash no vacio")
        void aceptaHash(){
            Password p=Password.hash("$2a$10$abcdef");
            assertEquals("$2a$10$abcdef", p.getValor());
            assertTrue(p.estaHasheado());
        }
        @Test
        @DisplayName("Rechaza hash vacio")
        void rechazaVacio(){
            assertThrows(IllegalArgumentException.class, ()->Password.hash(""));
        }
        @Test
        @DisplayName("Rechaza hash null")
        void rechazaNull(){
            assertThrows(IllegalArgumentException.class, ()->Password.hash(null));
        }
    }
    @Test
    @DisplayName("toString no expone el valor")
    void toStringNoExpone(){
        assertEquals("Password[plano]", Password.plano("secreto123").toString());
        assertEquals("Password[hash]", Password.hash("$2a$10$x").toString());
    }
}
