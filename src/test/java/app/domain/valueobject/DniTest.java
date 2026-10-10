package app.domain.valueobject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
/**
 *
 * @author inici4rsesi0n
 */
@DisplayName("Dni - Value Object")
class DniTest{
    @Test
    @DisplayName("Acepta DNI de 8 digitos")
    void aceptaValido(){
        assertEquals("12345678", Dni.de("12345678").getValor());
    }
    @Test
    @DisplayName("Elimina espacios")
    void eliminaEspacios(){
        assertEquals("12345678", Dni.de("  12345678  ").getValor());
    }
    @Test
    @DisplayName("Rechaza null")
    void rechazaNull(){
        assertThrows(IllegalArgumentException.class, ()->Dni.de(null));
    }
    @Test
    @DisplayName("Rechaza longitud menor a 8")
    void rechazaCorto(){
        assertThrows(IllegalArgumentException.class, ()->Dni.de("1234567"));
    }
    @Test
    @DisplayName("Rechaza longitud mayor a 8")
    void rechazaLargo(){
        assertThrows(IllegalArgumentException.class, ()->Dni.de("123456789"));
    }
    @Test
    @DisplayName("Rechaza caracteres no numericos")
    void rechazaNoNumerico(){
        assertThrows(IllegalArgumentException.class, ()->Dni.de("1234567a"));
    }
}
