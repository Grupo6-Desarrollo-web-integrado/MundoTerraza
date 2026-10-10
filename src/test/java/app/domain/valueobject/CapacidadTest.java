package app.domain.valueobject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
/**
 *
 * @author inici4rsesi0n
 */
@DisplayName("Capacidad - Value Object")
class CapacidadTest{
    @Test
    @DisplayName("Acepta capacidad en rango valido")
    void aceptaValido(){
        assertEquals(10, Capacidad.de(10).getValor());
    }
    @Test
    @DisplayName("Acepta limite inferior (1)")
    void aceptaLimiteInferior(){
        assertEquals(1, Capacidad.de(1).getValor());
    }
    @Test
    @DisplayName("Acepta limite superior (50)")
    void aceptaLimiteSuperior(){
        assertEquals(50, Capacidad.de(50).getValor());
    }
    @Test
    @DisplayName("Rechaza cero")
    void rechazaCero(){
        assertThrows(IllegalArgumentException.class, ()->Capacidad.de(0));
    }
    @Test
    @DisplayName("Rechaza negativo")
    void rechazaNegativo(){
        assertThrows(IllegalArgumentException.class, ()->Capacidad.de(-1));
    }
    @Test
    @DisplayName("Rechaza mayor a 50")
    void rechazaExcedido(){
        assertThrows(IllegalArgumentException.class, ()->Capacidad.de(51));
    }
}
