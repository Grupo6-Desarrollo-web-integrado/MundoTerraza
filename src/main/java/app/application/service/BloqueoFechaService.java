package app.application.service;
import app.application.dto.request.CrearBloqueoRequest;
import app.application.dto.response.BloqueoFechaResponse;
import app.application.mapper.BloqueoFechaMapper;
import app.domain.enums.EstadoReserva;
import app.domain.exception.BusinessException;
import app.domain.exception.ForbiddenException;
import app.domain.exception.NotFoundException;
import app.domain.model.BloqueoFecha;
import app.domain.model.Habitacion;
import app.domain.model.Reserva;
import app.infrastructure.repository.BloqueoFechaRepository;
import app.infrastructure.repository.HabitacionRepository;
import app.infrastructure.repository.ReservaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class BloqueoFechaService{
    private static final Logger log=LoggerFactory.getLogger(BloqueoFechaService.class);
    private static final List<EstadoReserva> ESTADOS_ACTIVOS=
            List.of(EstadoReserva.PENDIENTE, EstadoReserva.CONFIRMADA);
    private final BloqueoFechaRepository bloqueoRepository;
    private final HabitacionRepository habitacionRepository;
    private final ReservaRepository reservaRepository;
    private final BloqueoFechaMapper bloqueoMapper;
    public BloqueoFechaService(BloqueoFechaRepository bloqueoRepository,
                               HabitacionRepository habitacionRepository,
                               ReservaRepository reservaRepository,
                               BloqueoFechaMapper bloqueoMapper){
        this.bloqueoRepository=bloqueoRepository;
        this.habitacionRepository=habitacionRepository;
        this.reservaRepository=reservaRepository;
        this.bloqueoMapper=bloqueoMapper;
    }
    @Transactional(readOnly=true)
    public List<BloqueoFechaResponse> listar(Long habitacionId){
        return bloqueoMapper.aResponseLista(
                bloqueoRepository.findByHabitacionIdOrderByFechaInicioAsc(habitacionId));
    }
    @Transactional
    public BloqueoFechaResponse crear(Long usuarioId, CrearBloqueoRequest request){
        Habitacion h=habitacionRepository.findById(request.getHabitacionId())
                .orElseThrow(()->new NotFoundException("Habitacion no encontrada"));
        verificarPropietario(h, usuarioId);
        List<BloqueoFecha> solapados=bloqueoRepository.buscarSolapados(
                h.getId(), request.getFechaInicio(), request.getFechaFin());
        if(!solapados.isEmpty())
            throw new BusinessException("Ya existe un bloqueo en ese rango de fechas");
        List<Reserva> reservasSolapadas=reservaRepository.buscarSolapadas(
                h.getId(), request.getFechaInicio(), request.getFechaFin(), ESTADOS_ACTIVOS);
        if(!reservasSolapadas.isEmpty())
            throw new BusinessException("Existen reservas activas en ese rango de fechas");
        BloqueoFecha bloqueo=new BloqueoFecha(h, request.getFechaInicio(),
                request.getFechaFin(), request.getMotivo());
        bloqueoRepository.save(bloqueo);
        log.info("Bloqueo creado id={} habitacionId={} desde={} hasta={}",
                bloqueo.getId(), h.getId(), request.getFechaInicio(), request.getFechaFin());
        return bloqueoMapper.aResponse(bloqueo);
    }
    @Transactional
    public void eliminar(Long usuarioId, Long bloqueoId){
        BloqueoFecha bloqueo=bloqueoRepository.findById(bloqueoId)
                .orElseThrow(()->new NotFoundException("Bloqueo no encontrado"));
        verificarPropietario(bloqueo.getHabitacion(), usuarioId);
        bloqueoRepository.delete(bloqueo);
        log.info("Bloqueo eliminado id={} habitacionId={}",
                bloqueoId, bloqueo.getHabitacion().getId());
    }
    private void verificarPropietario(Habitacion h, Long usuarioId){
        if(!h.getPropiedad().getAnfitrion().getId().equals(usuarioId))
            throw new ForbiddenException("No eres el propietario de esta habitacion");
    }
}
