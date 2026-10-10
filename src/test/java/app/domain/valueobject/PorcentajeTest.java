package app.domain.valueobject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
/**
 *
 * @author inici4rsesi0n
 */
@DisplayName("Porcentaje - Value Object")
class PorcentajeTest{
    @Test
    @DisplayName("Acepta porcentaje valido")
    void aceptaValido(){
        assertEquals(new BigDecimal("15.00"), Porcentaje.de(15).getValor());
    }
    @Test
    @DisplayName("Acepta 0")
    void aceptaCero(){
        assertEquals(new BigDecimal("0.00"), Porcentaje.de(0).getValor());
    }
    @Test
    @DisplayName("Acepta 100")
    void aceptaCien(){
        assertEquals(new BigDecimal("100.00"), Porcentaje.de(100).getValor());
    }
    @Test
    @DisplayName("Rechaza negativo")
    void rechazaNegativo(){
        assertThrows(IllegalArgumentException.class, ()->Porcentaje.de(-1));
    }
    @Test
    @DisplayName("Rechaza mayor a 100")
    void rechazaMayor(){
        assertThrows(IllegalArgumentException.class, ()->Porcentaje.de(101));
    }
    @Test
    @DisplayName("Aplicar 15% a 1000 da 150")
    void aplicarPorcentaje(){
        Dinero base=Dinero.de(new BigDecimal("1000.00"));
        Dinero resultado=Porcentaje.de(15).aplicarA(base);
        assertEquals(new BigDecimal("150.00"), resultado.getMonto());
    }
    @Test
    @DisplayName("Aplicar 15% a 1250 da 187.50")
    void aplicarPorcentajeConDecimales(){
        Dinero base=Dinero.de(new BigDecimal("1250.00"));
        Dinero resultado=Porcentaje.de(15).aplicarA(base);
        assertEquals(new BigDecimal("187.50"), resultado.getMonto());
    }
}
