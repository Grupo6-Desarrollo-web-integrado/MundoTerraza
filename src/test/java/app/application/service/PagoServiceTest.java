package app.application.service;
import app.application.dto.request.CrearPagoRequest;
import app.application.dto.response.PagoResponse;
import app.application.mapper.PagoMapper;
import app.domain.enums.EstadoPago;
import app.domain.enums.EstadoReserva;
import app.domain.enums.PoliticaCancelacion;
import app.domain.enums.TipoAlojamiento;
import app.domain.exception.BusinessException;
import app.domain.exception.ForbiddenException;
import app.domain.exception.NotFoundException;
import app.domain.model.Categoria;
import app.domain.model.Habitacion;
import app.domain.model.Pago;
import app.domain.model.Propiedad;
import app.domain.model.Reserva;
import app.domain.model.Usuario;
import app.domain.valueobject.Dinero;
import app.domain.valueobject.Dni;
import app.domain.valueobject.Email;
import app.domain.valueobject.Telefono;
import app.infrastructure.repository.HistorialEstadoReservaRepository;
import app.infrastructure.repository.PagoRepository;
import app.infrastructure.repository.ReservaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
/**
 *
 * @author inici4rsesi0n
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("PagoService - Orquestacion")
class PagoServiceTest{
    @Mock
    private PagoRepository pagoRepository;
    @Mock
    private ReservaRepository reservaRepository;
    @Mock
    private HistorialEstadoReservaRepository historialRepository;
    @Mock
    private NotificacionService notificacionService;
    @Mock
    private PagoMapper pagoMapper;
    private PagoService pagoService;
    private Reserva reserva;
    private Pago pago;
    @BeforeEach
    void setup(){
        pagoService=new PagoService(pagoRepository, reservaRepository,
                historialRepository, notificacionService, pagoMapper);
        Usuario anfitrion=new Usuario("Anf", Email.de("a@a.com"), "$2a$10$hash");
        anfitrion.setId(1L);
        anfitrion.convertirEnAnfitrion(Telefono.de("987654321"), Dni.de("12345678"),
                "Lima", "Biografia valida de anfitrion");
        Usuario huesped=new Usuario("Huesped", Email.de("h@h.com"), "$2a$10$hash");
        huesped.setId(2L);
        Categoria categoria=new Categoria("Urbano", "Desc");
        Propiedad propiedad=new Propiedad(anfitrion, categoria, "Titulo valido",
                "Descripcion valida de la propiedad", "Lima",
                -12.0, -77.0, TipoAlojamiento.DEPARTAMENTO, PoliticaCancelacion.FLEXIBLE);
        Habitacion habitacion=new Habitacion(propiedad, "Suite", "Descripcion",
                Dinero.de(new BigDecimal("250.00")), 2, 1, 0, 0, 1, 1, 45.0, 1);
        reserva=new Reserva(huesped, habitacion, 1,
                LocalDate.of(2027,1,10), LocalDate.of(2027,1,15));
        reserva.setId(1L);
        pago=new Pago(reserva, app.domain.enums.TipoPago.TARJETA, "REF-001");
        pago.setId(1L);
    }
    @Nested
    @DisplayName("Registrar pago")
    class Registrar{
        @Test
        @DisplayName("Registra pago en reserva PENDIENTE")
        void registraOk(){
            when(reservaRepository.buscarConRelaciones(anyLong())).thenReturn(reserva);
            when(pagoRepository.findByReservaId(anyLong())).thenReturn(Optional.empty());
            when(pagoRepository.save(any(Pago.class))).thenAnswer(i->i.getArgument(0));
            when(pagoMapper.aResponse(any(Pago.class))).thenReturn(mockResponse());

            CrearPagoRequest req=new CrearPagoRequest();
            req.setReservaId(1L);
            req.setTipoPago("TARJETA");
            req.setReferencia("REF-001");

            PagoResponse resp=pagoService.registrar(2L, req);
            assertEquals("PENDIENTE", resp.estado());
            verify(pagoRepository).save(any(Pago.class));
        }
        @Test
        @DisplayName("Falla si la reserva no existe")
        void fallaReservaNoExiste(){
            when(reservaRepository.buscarConRelaciones(anyLong())).thenReturn(null);

            CrearPagoRequest req=new CrearPagoRequest();
            req.setReservaId(99L);
            req.setTipoPago("TARJETA");

            assertThrows(NotFoundException.class, ()->pagoService.registrar(2L, req));
        }
        @Test
        @DisplayName("Falla si la reserva no pertenece al usuario")
        void fallaReservaAjena(){
            when(reservaRepository.buscarConRelaciones(anyLong())).thenReturn(reserva);

            CrearPagoRequest req=new CrearPagoRequest();
            req.setReservaId(1L);
            req.setTipoPago("TARJETA");

            assertThrows(ForbiddenException.class, ()->pagoService.registrar(99L, req));
        }
        @Test
        @DisplayName("Falla si la reserva no esta PENDIENTE")
        void fallaReservaNoPendiente(){
            reserva.confirmar();
            when(reservaRepository.buscarConRelaciones(anyLong())).thenReturn(reserva);

            CrearPagoRequest req=new CrearPagoRequest();
            req.setReservaId(1L);
            req.setTipoPago("TARJETA");

            assertThrows(BusinessException.class, ()->pagoService.registrar(2L, req));
        }
        @Test
        @DisplayName("Falla si la reserva ya tiene pago")
        void fallaPagoDuplicado(){
            when(reservaRepository.buscarConRelaciones(anyLong())).thenReturn(reserva);
            when(pagoRepository.findByReservaId(anyLong())).thenReturn(Optional.of(pago));

            CrearPagoRequest req=new CrearPagoRequest();
            req.setReservaId(1L);
            req.setTipoPago("TARJETA");

            assertThrows(BusinessException.class, ()->pagoService.registrar(2L, req));
            verify(pagoRepository, never()).save(any());
        }
    }
    @Nested
    @DisplayName("Aprobar pago")
    class Aprobar{
        @Test
        @DisplayName("Aprobar pago PENDIENTE confirma la reserva")
        void aprobarConfirma(){
            when(pagoRepository.findById(anyLong())).thenReturn(Optional.of(pago));
            when(pagoRepository.save(pago)).thenReturn(pago);
            when(reservaRepository.buscarConRelaciones(anyLong())).thenReturn(reserva);
            when(reservaRepository.save(reserva)).thenReturn(reserva);
            when(pagoMapper.aResponse(pago)).thenReturn(mockResponse());

            pagoService.aprobar(2L, 1L);

            assertEquals(EstadoPago.APROBADO, pago.getEstado());
            assertEquals(EstadoReserva.CONFIRMADA, reserva.getEstado());
            verify(historialRepository).save(any());
        }
        @Test
        @DisplayName("Aprobar pago de reserva ya confirmada no vuelve a confirmar")
        void aprobarReservaYaConfirmada(){
            reserva.confirmar();
            when(pagoRepository.findById(anyLong())).thenReturn(Optional.of(pago));
            when(pagoRepository.save(pago)).thenReturn(pago);
            when(reservaRepository.buscarConRelaciones(anyLong())).thenReturn(reserva);
            when(pagoMapper.aResponse(pago)).thenReturn(mockResponse());

            pagoService.aprobar(2L, 1L);

            verify(reservaRepository, never()).save(any());
            verify(historialRepository, never()).save(any());
        }
    }
    @Nested
    @DisplayName("Rechazar pago")
    class Rechazar{
        @Test
        @DisplayName("Rechazar cambia estado y notifica")
        void rechazarOk(){
            when(pagoRepository.findById(anyLong())).thenReturn(Optional.of(pago));
            when(pagoRepository.save(pago)).thenReturn(pago);
            when(reservaRepository.buscarConRelaciones(anyLong())).thenReturn(reserva);
            when(pagoMapper.aResponse(pago)).thenReturn(mockResponse());

            pagoService.rechazar(2L, 1L);

            assertEquals(EstadoPago.RECHAZADO, pago.getEstado());
            verify(notificacionService).crear(any(), any(), any(), any(), any());
        }
    }
    private PagoResponse mockResponse(){
        return new PagoResponse(1L, 1L, new BigDecimal("1250.00"),
                "TARJETA", "PENDIENTE", "REF-001", null);
    }
}
