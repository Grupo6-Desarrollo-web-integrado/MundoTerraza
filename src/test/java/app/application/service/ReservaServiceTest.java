package app.application.service;
import app.application.dto.request.CrearReservaRequest;
import app.application.dto.response.ReservaResponse;
import app.application.mapper.HistorialEstadoReservaMapper;
import app.application.mapper.ReservaMapper;
import app.domain.enums.PoliticaCancelacion;
import app.domain.enums.TipoAlojamiento;
import app.domain.exception.BusinessException;
import app.domain.exception.ForbiddenException;
import app.domain.exception.NotFoundException;
import app.domain.model.Categoria;
import app.domain.model.Habitacion;
import app.domain.model.Propiedad;
import app.domain.model.Reserva;
import app.domain.model.Usuario;
import app.domain.valueobject.Dinero;
import app.domain.valueobject.Dni;
import app.domain.valueobject.Email;
import app.domain.valueobject.Telefono;
import app.infrastructure.repository.HabitacionRepository;
import app.infrastructure.repository.HistorialEstadoReservaRepository;
import app.infrastructure.repository.ReservaRepository;
import app.infrastructure.repository.UsuarioRepository;
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
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
/**
 *
 * @author inici4rsesi0n
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("ReservaService - Orquestacion")
class ReservaServiceTest{
    @Mock
    private ReservaRepository reservaRepository;
    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private HabitacionRepository habitacionRepository;
    @Mock
    private HistorialEstadoReservaRepository historialRepository;
    @Mock
    private DisponibilidadService disponibilidadService;
    @Mock
    private NotificacionService notificacionService;
    @Mock
    private LiquidacionService liquidacionService;
    @Mock
    private ReservaMapper reservaMapper;
    @Mock
    private HistorialEstadoReservaMapper historialMapper;
    private ReservaService reservaService;
    private Usuario anfitrion;
    private Usuario huesped;
    private Habitacion habitacion;
    private Reserva reserva;
    private static final LocalDate INICIO=LocalDate.of(2027,1,10);
    private static final LocalDate FIN=LocalDate.of(2027,1,15);
    @BeforeEach
    void setup(){
        reservaService=new ReservaService(reservaRepository, usuarioRepository,
                habitacionRepository, historialRepository, disponibilidadService,
                notificacionService, liquidacionService, reservaMapper, historialMapper);
        anfitrion=nuevoUsuario(1L, "Anfitrion", "anf@test.com");
        anfitrion.convertirEnAnfitrion(Telefono.de("987654321"), Dni.de("12345678"),
                "Lima", "Biografia valida de anfitrion");
        huesped=nuevoUsuario(2L, "Huesped", "huesped@test.com");
        Categoria categoria=new Categoria("Urbano", "Desc");
        Propiedad propiedad=new Propiedad(anfitrion, categoria, "Titulo valido",
                "Descripcion valida de la propiedad", "Lima",
                -12.0, -77.0, TipoAlojamiento.DEPARTAMENTO, PoliticaCancelacion.FLEXIBLE);
        habitacion=new Habitacion(propiedad, "Suite", "Descripcion",
                Dinero.de(new BigDecimal("250.00")), 2, 1, 0, 0, 1, 1, 45.0, 1);
        reserva=new Reserva(huesped, habitacion, 1, INICIO, FIN);
    }
    @Nested
    @DisplayName("Crear reserva")
    class Crear{
        @Test
        @DisplayName("Crea reserva verificando disponibilidad y notificando a ambos")
        void creaOk(){
            when(usuarioRepository.findById(2L)).thenReturn(Optional.of(huesped));
            when(habitacionRepository.findById(1L)).thenReturn(Optional.of(habitacion));
            doNothing().when(disponibilidadService).verificarDisponibilidad(any(), any(), any(), anyInt());
            when(reservaRepository.save(any(Reserva.class))).thenAnswer(i->i.getArgument(0));
            when(reservaMapper.aResponse(any(Reserva.class))).thenReturn(mockResponse());

            ReservaResponse resp=reservaService.crear(2L, crearRequest(1L, 1, INICIO, FIN));

            assertEquals("PENDIENTE", resp.estado());
            verify(disponibilidadService).verificarDisponibilidad(any(), any(), any(), anyInt());
            verify(reservaRepository).save(any(Reserva.class));
            verify(notificacionService, times(2)).crear(any(), any(), any(), any(), any());
        }
        @Test
        @DisplayName("Falla si el usuario no existe")
        void fallaUsuarioInexistente(){
            when(usuarioRepository.findById(2L)).thenReturn(Optional.empty());

            assertThrows(NotFoundException.class,
                    ()->reservaService.crear(2L, crearRequest(1L, 1, INICIO, FIN)));
            verify(reservaRepository, never()).save(any());
        }
        @Test
        @DisplayName("Falla si la habitacion no existe")
        void fallaHabitacionInexistente(){
            when(usuarioRepository.findById(2L)).thenReturn(Optional.of(huesped));
            when(habitacionRepository.findById(1L)).thenReturn(Optional.empty());

            assertThrows(NotFoundException.class,
                    ()->reservaService.crear(2L, crearRequest(1L, 1, INICIO, FIN)));
        }
        @Test
        @DisplayName("Falla si el usuario reserva su propia propiedad")
        void fallaReservaPropia(){
            when(usuarioRepository.findById(1L)).thenReturn(Optional.of(anfitrion));
            when(habitacionRepository.findById(1L)).thenReturn(Optional.of(habitacion));

            assertThrows(BusinessException.class,
                    ()->reservaService.crear(1L, crearRequest(1L, 1, INICIO, FIN)));
            verify(disponibilidadService, never()).verificarDisponibilidad(any(), any(), any(), anyInt());
        }
        @Test
        @DisplayName("Falla si no hay disponibilidad")
        void fallaSinDisponibilidad(){
            when(usuarioRepository.findById(2L)).thenReturn(Optional.of(huesped));
            when(habitacionRepository.findById(1L)).thenReturn(Optional.of(habitacion));
            doThrow(new BusinessException("Sin disponibilidad"))
                    .when(disponibilidadService).verificarDisponibilidad(any(), any(), any(), anyInt());

            assertThrows(BusinessException.class,
                    ()->reservaService.crear(2L, crearRequest(1L, 1, INICIO, FIN)));
            verify(reservaRepository, never()).save(any());
        }
    }
    @Nested
    @DisplayName("Confirmar reserva")
    class Confirmar{
        @Test
        @DisplayName("Confirma la reserva y notifica al huesped")
        void confirmaOk(){
            when(reservaRepository.buscarConRelaciones(anyLong())).thenReturn(reserva);
            when(reservaRepository.save(reserva)).thenReturn(reserva);
            when(reservaMapper.aResponse(reserva)).thenReturn(mockResponse());

            reservaService.confirmar(1L, 10L);

            assertEquals("CONFIRMADA", reserva.getEstado().name());
            verify(historialRepository).save(any());
            verify(notificacionService).crear(any(), any(), any(), any(), any());
        }
        @Test
        @DisplayName("Falla si no es el anfitrion")
        void fallaNoAnfitrion(){
            when(reservaRepository.buscarConRelaciones(anyLong())).thenReturn(reserva);

            assertThrows(ForbiddenException.class, ()->reservaService.confirmar(99L, 10L));
        }
    }
    @Nested
    @DisplayName("Cancelar reserva")
    class Cancelar{
        @Test
        @DisplayName("Huesped cancela y notifica al anfitrion")
        void huespedCancela(){
            when(reservaRepository.buscarConRelaciones(anyLong())).thenReturn(reserva);
            when(reservaRepository.save(reserva)).thenReturn(reserva);
            when(reservaMapper.aResponse(reserva)).thenReturn(mockResponse());

            reservaService.cancelar(2L, 10L);

            assertEquals("CANCELADA", reserva.getEstado().name());
        }
        @Test
        @DisplayName("Usuario externo no puede cancelar")
        void usuarioExternoFalla(){
            when(reservaRepository.buscarConRelaciones(anyLong())).thenReturn(reserva);

            assertThrows(ForbiddenException.class, ()->reservaService.cancelar(99L, 10L));
        }
    }
    @Nested
    @DisplayName("Completar reserva")
    class Completar{
        @Test
        @DisplayName("Completar genera liquidacion y notifica")
        void completarOk(){
            reserva.confirmar();
            when(reservaRepository.buscarConRelaciones(anyLong())).thenReturn(reserva);
            when(reservaRepository.save(reserva)).thenReturn(reserva);
            when(reservaMapper.aResponse(reserva)).thenReturn(mockResponse());
            when(liquidacionService.generarPara(reserva)).thenReturn(null);

            reservaService.completar(10L);

            assertEquals("COMPLETADA", reserva.getEstado().name());
            verify(liquidacionService).generarPara(reserva);
            verify(notificacionService).crear(any(), any(), any(), any(), any());
        }
    }
    private Usuario nuevoUsuario(Long id, String nombre, String correo){
        Usuario u=new Usuario(nombre, Email.de(correo), "$2a$10$hash");
        u.setId(id);
        return u;
    }
    private CrearReservaRequest crearRequest(Long habitacionId, int cantidad,
                                             LocalDate inicio, LocalDate fin){
        CrearReservaRequest req=new CrearReservaRequest();
        req.setHabitacionId(habitacionId);
        req.setCantidad(cantidad);
        req.setFechaInicio(inicio);
        req.setFechaFin(fin);
        return req;
    }
    private ReservaResponse mockResponse(){
        return new ReservaResponse(1L, 2L, "Huesped", 1L, "Suite", 1L,
                "Propiedad", "Anfitrion", 1, INICIO, FIN, 5,
                new BigDecimal("250.00"), new BigDecimal("1250.00"),
                new BigDecimal("187.50"), new BigDecimal("1062.50"),
                "PENDIENTE", null);
    }
}
