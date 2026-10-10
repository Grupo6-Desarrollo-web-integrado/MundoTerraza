package app.domain.valueobject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
/**
 *
 * @author inici4rsesi0n
 */
@DisplayName("Coordenada - Value Object")
class CoordenadaTest{
    @Test
    @DisplayName("Acepta coordenadas validas")
    void aceptaValidas(){
        Coordenada c=Coordenada.de(-12.1191, -77.0286);
        assertEquals(-12.1191, c.getLatitud());
        assertEquals(-77.0286, c.getLongitud());
    }
    @Test
    @DisplayName("Rechaza latitud mayor a 90")
    void rechazaLatitudMayor(){
        assertThrows(IllegalArgumentException.class, ()->Coordenada.de(91, 0));
    }
    @Test
    @DisplayName("Rechaza latitud menor a -90")
    void rechazaLatitudMenor(){
        assertThrows(IllegalArgumentException.class, ()->Coordenada.de(-91, 0));
    }
    @Test
    @DisplayName("Rechaza longitud mayor a 180")
    void rechazaLongitudMayor(){
        assertThrows(IllegalArgumentException.class, ()->Coordenada.de(0, 181));
    }
    @Test
    @DisplayName("Rechaza longitud menor a -180")
    void rechazaLongitudMenor(){
        assertThrows(IllegalArgumentException.class, ()->Coordenada.de(0, -181));
    }
}
