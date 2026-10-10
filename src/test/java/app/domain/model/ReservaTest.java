package app.domain.model;
import app.domain.enums.EstadoReserva;
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
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
/**
 *
 * @author inici4rsesi0n
 */
@DisplayName("Reserva - Entidad")
class ReservaTest{
    private Usuario huesped;
    private Habitacion habitacion;
    private LocalDate inicio;
    private LocalDate fin;
    @BeforeEach
    void setup(){
        Usuario anfitrion=new Usuario("Anfitrion", Email.de("anf@test.com"), "$2a$10$hash");
        anfitrion.convertirEnAnfitrion(Telefono.de("987654321"), Dni.de("12345678"),
                "Lima", "Biografia valida de anfitrion");
        Categoria categoria=new Categoria("Urbano", "Desc");
        Propiedad propiedad=new Propiedad(anfitrion, categoria, "Titulo valido",
                "Descripcion valida de la propiedad", "Lima",
                -12.0, -77.0, TipoAlojamiento.DEPARTAMENTO, PoliticaCancelacion.FLEXIBLE);
        habitacion=new Habitacion(propiedad, "Suite", "Descripcion de la suite",
                Dinero.de(new BigDecimal("250.00")), 2, 1, 0, 0, 1, 1, 45.0, 1);
        huesped=new Usuario("Huesped", Email.de("huesped@test.com"), "$2a$10$hash");
        inicio=LocalDate.of(2027,1,10);
        fin=LocalDate.of(2027,1,15);
    }
    @Nested
    @DisplayName("Construccion y calculos")
    class Construccion{
        @Test
        @DisplayName("Crea reserva PENDIENTE")
        void creaPendiente(){
            Reserva r=new Reserva(huesped, habitacion, 1, inicio, fin);
            assertEquals(EstadoReserva.PENDIENTE, r.getEstado());
            assertEquals(habitacion.getPropiedad(), r.getPropiedad());
        }
        @Test
        @DisplayName("Calcula noches correctamente")
        void calculaNoches(){
            Reserva r=new Reserva(huesped, habitacion, 1, inicio, fin);
            assertEquals(5, r.getNoches());
        }
        @Test
        @DisplayName("Subtotal = precioNoche * noches * cantidad")
        void calculaSubtotal(){
            Reserva r=new Reserva(huesped, habitacion, 1, inicio, fin);
            assertEquals(new BigDecimal("1250.00"), r.getSubtotal().getMonto());
        }
        @Test
        @DisplayName("Comision plataforma = 15% del subtotal")
        void calculaComision(){
            Reserva r=new Reserva(huesped, habitacion, 1, inicio, fin);
            assertEquals(new BigDecimal("187.50"), r.getComisionPlataforma().getMonto());
        }
        @Test
        @DisplayName("Monto anfitrion = subtotal - comision")
        void calculaMontoAnfitrion(){
            Reserva r=new Reserva(huesped, habitacion, 1, inicio, fin);
            assertEquals(new BigDecimal("1062.50"), r.getMontoAnfitrion().getMonto());
        }
    }
    @Nested
    @DisplayName("Validaciones")
    class Validaciones{
        @Test
        @DisplayName("Falla si cantidad mayor a stock")
        void fallaCantidadExcedida(){
            assertThrows(IllegalArgumentException.class,
                    ()->new Reserva(huesped, habitacion, 2, inicio, fin));
        }
        @Test
        @DisplayName("Falla si cantidad menor a 1")
        void fallaCantidadCero(){
            assertThrows(IllegalArgumentException.class,
                    ()->new Reserva(huesped, habitacion, 0, inicio, fin));
        }
        @Test
        @DisplayName("Falla si fecha fin no es posterior a inicio")
        void fallaFechasInvalidas(){
            assertThrows(IllegalArgumentException.class,
                    ()->new Reserva(huesped, habitacion, 1, fin, inicio));
        }
        @Test
        @DisplayName("Falla si fecha fin es igual a inicio")
        void fallaFechasIguales(){
            assertThrows(IllegalArgumentException.class,
                    ()->new Reserva(huesped, habitacion, 1, inicio, inicio));
        }
    }
    @Nested
    @DisplayName("Transiciones de estado")
    class Transiciones{
        @Test
        @DisplayName("Confirmar desde PENDIENTE funciona")
        void confirmarOk(){
            Reserva r=new Reserva(huesped, habitacion, 1, inicio, fin);
            r.confirmar();
            assertEquals(EstadoReserva.CONFIRMADA, r.getEstado());
        }
        @Test
        @DisplayName("Confirmar desde CONFIRMADA falla")
        void confirmarFalla(){
            Reserva r=new Reserva(huesped, habitacion, 1, inicio, fin);
            r.confirmar();
            assertThrows(IllegalStateException.class, r::confirmar);
        }
        @Test
        @DisplayName("Cancelar desde PENDIENTE funciona")
        void cancelarPendiente(){
            Reserva r=new Reserva(huesped, habitacion, 1, inicio, fin);
            r.cancelar();
            assertEquals(EstadoReserva.CANCELADA, r.getEstado());
        }
        @Test
        @DisplayName("Cancelar desde COMPLETADA falla")
        void cancelarCompletada(){
            Reserva r=new Reserva(huesped, habitacion, 1, inicio, fin);
            r.confirmar();
            r.completar();
            assertThrows(IllegalStateException.class, r::cancelar);
        }
        @Test
        @DisplayName("Completar desde CONFIRMADA funciona")
        void completarOk(){
            Reserva r=new Reserva(huesped, habitacion, 1, inicio, fin);
            r.confirmar();
            r.completar();
            assertEquals(EstadoReserva.COMPLETADA, r.getEstado());
        }
        @Test
        @DisplayName("Completar desde PENDIENTE falla")
        void completarFalla(){
            Reserva r=new Reserva(huesped, habitacion, 1, inicio, fin);
            assertThrows(IllegalStateException.class, r::completar);
        }
    }
}
