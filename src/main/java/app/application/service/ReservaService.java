package app.application.service;
import app.application.dto.request.CrearReservaRequest;
import app.application.dto.response.HistorialEstadoReservaResponse;
import app.application.dto.response.ReservaResponse;
import app.application.mapper.HistorialEstadoReservaMapper;
import app.application.mapper.ReservaMapper;
import app.domain.enums.EstadoReserva;
import app.domain.enums.TipoNotificacion;
import app.domain.exception.BusinessException;
import app.domain.exception.ForbiddenException;
import app.domain.exception.NotFoundException;
import app.domain.model.Habitacion;
import app.domain.model.HistorialEstadoReserva;
import app.domain.model.Reserva;
import app.domain.model.Usuario;
import app.infrastructure.repository.HabitacionRepository;
import app.infrastructure.repository.HistorialEstadoReservaRepository;
import app.infrastructure.repository.ReservaRepository;
import app.infrastructure.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class ReservaService{
    private final ReservaRepository reservaRepository;
    private final UsuarioRepository usuarioRepository;
    private final HabitacionRepository habitacionRepository;
    private final HistorialEstadoReservaRepository historialRepository;
    private final DisponibilidadService disponibilidadService;
    private final NotificacionService notificacionService;
    private final LiquidacionService liquidacionService;
    private final ReservaMapper reservaMapper;
    private final HistorialEstadoReservaMapper historialMapper;
    public ReservaService(ReservaRepository reservaRepository,
                          UsuarioRepository usuarioRepository,
                          HabitacionRepository habitacionRepository,
                          HistorialEstadoReservaRepository historialRepository,
                          DisponibilidadService disponibilidadService,
                          NotificacionService notificacionService,
                          LiquidacionService liquidacionService,
                          ReservaMapper reservaMapper,
                          HistorialEstadoReservaMapper historialMapper){
        this.reservaRepository=reservaRepository;
        this.usuarioRepository=usuarioRepository;
        this.habitacionRepository=habitacionRepository;
        this.historialRepository=historialRepository;
        this.disponibilidadService=disponibilidadService;
        this.notificacionService=notificacionService;
        this.liquidacionService=liquidacionService;
        this.reservaMapper=reservaMapper;
        this.historialMapper=historialMapper;
    }
    @Transactional
    public ReservaResponse crear(Long usuarioId, CrearReservaRequest request){
        Usuario usuario=usuarioRepository.findById(usuarioId)
                .orElseThrow(()->new NotFoundException("Usuario no encontrado"));
        Habitacion habitacion=habitacionRepository.findById(request.getHabitacionId())
                .orElseThrow(()->new NotFoundException("Habitacion no encontrada"));
        if(habitacion.getPropiedad().getAnfitrion().getId().equals(usuarioId))
            throw new BusinessException("No puedes reservar tu propia propiedad");
        disponibilidadService.verificarDisponibilidad(habitacion, request.getFechaInicio(),
                request.getFechaFin(), request.getCantidad());
        Reserva reserva=new Reserva(usuario, habitacion, request.getCantidad(),
                request.getFechaInicio(), request.getFechaFin());
        reservaRepository.save(reserva);
        registrarHistorial(reserva, null, EstadoReserva.PENDIENTE, "Reserva creada");
        notificacionService.crear(usuario, TipoNotificacion.RESERVA_CREADA,
                "Reserva registrada",
                "Tu reserva en "+habitacion.getPropiedad().getTitulo()+" fue registrada",
                reserva.getId());
        notificacionService.crear(habitacion.getPropiedad().getAnfitrion(),
                TipoNotificacion.RESERVA_CREADA,
                "Nueva reserva recibida",
                "Recibiste una nueva reserva en "+habitacion.getPropiedad().getTitulo(),
                reserva.getId());
        return reservaMapper.aResponse(reserva);
    }
    @Transactional
    public ReservaResponse confirmar(Long usuarioId, Long reservaId){
        Reserva reserva=reservaRepository.buscarConRelaciones(reservaId);
        if(reserva==null)
            throw new NotFoundException("Reserva no encontrada");
        if(!reserva.getPropiedad().getAnfitrion().getId().equals(usuarioId))
            throw new ForbiddenException("No eres el anfitrion de esta reserva");
        EstadoReserva anterior=reserva.getEstado();
        reserva.confirmar();
        reservaRepository.save(reserva);
        registrarHistorial(reserva, anterior, EstadoReserva.CONFIRMADA, "Reserva confirmada");
        notificacionService.crear(reserva.getUsuario(), TipoNotificacion.RESERVA_CONFIRMADA,
                "Reserva confirmada",
                "Tu reserva en "+reserva.getPropiedad().getTitulo()+" fue confirmada",
                reserva.getId());
        return reservaMapper.aResponse(reserva);
    }
    @Transactional
    public ReservaResponse cancelar(Long usuarioId, Long reservaId){
        Reserva reserva=reservaRepository.buscarConRelaciones(reservaId);
        if(reserva==null)
            throw new NotFoundException("Reserva no encontrada");
        boolean esHuesped=reserva.getUsuario().getId().equals(usuarioId);
        boolean esAnfitrion=reserva.getPropiedad().getAnfitrion().getId().equals(usuarioId);
        if(!esHuesped&&!esAnfitrion)
            throw new ForbiddenException("No puedes cancelar esta reserva");
        EstadoReserva anterior=reserva.getEstado();
        reserva.cancelar();
        reservaRepository.save(reserva);
        String motivo=esHuesped?"Cancelada por el huesped":"Cancelada por el anfitrion";
        registrarHistorial(reserva, anterior, EstadoReserva.CANCELADA, motivo);
        Usuario destinatario=esHuesped?reserva.getPropiedad().getAnfitrion():reserva.getUsuario();
        notificacionService.crear(destinatario, TipoNotificacion.RESERVA_CANCELADA,
                "Reserva cancelada",
                "La reserva en "+reserva.getPropiedad().getTitulo()+" fue cancelada",
                reserva.getId());
        return reservaMapper.aResponse(reserva);
    }
    @Transactional
    public ReservaResponse completar(Long reservaId){
        Reserva reserva=reservaRepository.buscarConRelaciones(reservaId);
        if(reserva==null)
            throw new NotFoundException("Reserva no encontrada");
        EstadoReserva anterior=reserva.getEstado();
        reserva.completar();
        reservaRepository.save(reserva);
        registrarHistorial(reserva, anterior, EstadoReserva.COMPLETADA, "Reserva completada");
        liquidacionService.generarPara(reserva);
        notificacionService.crear(reserva.getUsuario(), TipoNotificacion.RESERVA_COMPLETADA,
                "Reserva completada",
                "Tu estadia en "+reserva.getPropiedad().getTitulo()+" ha finalizado",
                reserva.getId());
        return reservaMapper.aResponse(reserva);
    }
    @Transactional(readOnly=true)
    public List<ReservaResponse> listarMisReservas(Long usuarioId){
        return reservaMapper.aResponseLista(
                reservaRepository.findByUsuarioIdOrderByFechaCreacionDesc(usuarioId));
    }
    @Transactional(readOnly=true)
    public List<ReservaResponse> listarRecibidas(Long anfitrionId){
        return reservaMapper.aResponseLista(
                reservaRepository.findByPropiedadAnfitrionIdOrderByFechaCreacionDesc(anfitrionId));
    }
    @Transactional(readOnly=true)
    public ReservaResponse obtener(Long usuarioId, Long reservaId){
        Reserva reserva=reservaRepository.buscarConRelaciones(reservaId);
        if(reserva==null)
            throw new NotFoundException("Reserva no encontrada");
        boolean esHuesped=reserva.getUsuario().getId().equals(usuarioId);
        boolean esAnfitrion=reserva.getPropiedad().getAnfitrion().getId().equals(usuarioId);
        if(!esHuesped&&!esAnfitrion)
            throw new ForbiddenException("No puedes ver esta reserva");
        return reservaMapper.aResponse(reserva);
    }
    @Transactional(readOnly=true)
    public List<HistorialEstadoReservaResponse> obtenerHistorial(Long usuarioId, Long reservaId){
        Reserva reserva=reservaRepository.buscarConRelaciones(reservaId);
        if(reserva==null)
            throw new NotFoundException("Reserva no encontrada");
        boolean esHuesped=reserva.getUsuario().getId().equals(usuarioId);
        boolean esAnfitrion=reserva.getPropiedad().getAnfitrion().getId().equals(usuarioId);
        if(!esHuesped&&!esAnfitrion)
            throw new ForbiddenException("No puedes ver este historial");
        return historialMapper.aResponseLista(
                historialRepository.findByReservaIdOrderByFechaAsc(reservaId));
    }
    private void registrarHistorial(Reserva reserva, EstadoReserva anterior,
                                    EstadoReserva nuevo, String motivo){
        historialRepository.save(new HistorialEstadoReserva(reserva, anterior, nuevo, motivo));
    }
}
