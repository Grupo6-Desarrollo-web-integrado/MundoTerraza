package app.domain.valueobject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
/**
 *
 * @author inici4rsesi0n
 */
@DisplayName("Telefono - Value Object")
class TelefonoTest{
    @Test
    @DisplayName("Acepta telefono que inicia con 9")
    void aceptaValido(){
        assertEquals("987654321", Telefono.de("987654321").getValor());
    }
    @Test
    @DisplayName("Rechaza null")
    void rechazaNull(){
        assertThrows(IllegalArgumentException.class, ()->Telefono.de(null));
    }
    @Test
    @DisplayName("Rechaza telefono que no inicia con 9")
    void rechazaSinNueve(){
        assertThrows(IllegalArgumentException.class, ()->Telefono.de("123456789"));
    }
    @Test
    @DisplayName("Rechaza longitud distinta a 9")
    void rechazaLongitud(){
        assertThrows(IllegalArgumentException.class, ()->Telefono.de("98765432"));
    }
    @Test
    @DisplayName("Rechaza caracteres no numericos")
    void rechazaNoNumerico(){
        assertThrows(IllegalArgumentException.class, ()->Telefono.de("98765432a"));
    }
}
