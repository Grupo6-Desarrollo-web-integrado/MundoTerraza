package app.domain.valueobject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
/**
 *
 * @author inici4rsesi0n
 */
@DisplayName("Dinero - Value Object")
class DineroTest{
    @Nested
    @DisplayName("Construccion")
    class Construccion{
        @Test
        @DisplayName("Acepta monto positivo")
        void aceptaPositivo(){
            assertEquals(new BigDecimal("100.00"), Dinero.de(new BigDecimal("100")).getMonto());
        }
        @Test
        @DisplayName("Acepta cero")
        void aceptaCero(){
            assertEquals(new BigDecimal("0.00"), Dinero.cero().getMonto());
        }
        @Test
        @DisplayName("Redondea a 2 decimales con HALF_UP")
        void redondea(){
            assertEquals(new BigDecimal("10.13"), Dinero.de(new BigDecimal("10.125")).getMonto());
        }
        @Test
        @DisplayName("Rechaza null")
        void rechazaNull(){
            assertThrows(IllegalArgumentException.class, ()->Dinero.de((BigDecimal)null));
        }
        @Test
        @DisplayName("Rechaza negativo")
        void rechazaNegativo(){
            assertThrows(IllegalArgumentException.class, ()->Dinero.de(new BigDecimal("-1")));
        }
    }
    @Nested
    @DisplayName("Operaciones")
    class Operaciones{
        @Test
        @DisplayName("Sumar dos montos")
        void sumar(){
            Dinero resultado=Dinero.de(new BigDecimal("100.50")).sumar(Dinero.de(new BigDecimal("50.25")));
            assertEquals(new BigDecimal("150.75"), resultado.getMonto());
        }
        @Test
        @DisplayName("Restar dos montos")
        void restar(){
            Dinero resultado=Dinero.de(new BigDecimal("100.00")).restar(Dinero.de(new BigDecimal("40.00")));
            assertEquals(new BigDecimal("60.00"), resultado.getMonto());
        }
        @Test
        @DisplayName("Restar mayor a menor lanza excepcion")
        void restarNegativo(){
            assertThrows(IllegalArgumentException.class,
                    ()->Dinero.de(new BigDecimal("10")).restar(Dinero.de(new BigDecimal("20"))));
        }
        @Test
        @DisplayName("Multiplicar por entero")
        void multiplicar(){
            Dinero resultado=Dinero.de(new BigDecimal("250.00")).multiplicar(5);
            assertEquals(new BigDecimal("1250.00"), resultado.getMonto());
        }
        @Test
        @DisplayName("Multiplicar por cero da cero")
        void multiplicarCero(){
            assertEquals(new BigDecimal("0.00"),
                    Dinero.de(new BigDecimal("250.00")).multiplicar(0).getMonto());
        }
        @Test
        @DisplayName("Multiplicar por negativo lanza excepcion")
        void multiplicarNegativo(){
            assertThrows(IllegalArgumentException.class,
                    ()->Dinero.de(new BigDecimal("10")).multiplicar(-1));
        }
    }
    @Nested
    @DisplayName("Igualdad")
    class Igualdad{
        @Test
        @DisplayName("10.00 y 10.0 son iguales")
        void igualesPorValor(){
            assertEquals(Dinero.de(new BigDecimal("10.00")), Dinero.de(new BigDecimal("10.0")));
        }
    }
}
