package app.application.service;
import app.application.dto.request.CrearPagoRequest;
import app.application.dto.response.PagoResponse;
import app.application.mapper.PagoMapper;
import app.domain.enums.EstadoPago;
import app.domain.enums.EstadoReserva;
import app.domain.enums.TipoNotificacion;
import app.domain.enums.TipoPago;
import app.domain.exception.BusinessException;
import app.domain.exception.ForbiddenException;
import app.domain.exception.NotFoundException;
import app.domain.model.HistorialEstadoReserva;
import app.domain.model.Pago;
import app.domain.model.Reserva;
import app.infrastructure.repository.HistorialEstadoReservaRepository;
import app.infrastructure.repository.PagoRepository;
import app.infrastructure.repository.ReservaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class PagoService{
    private final PagoRepository pagoRepository;
    private final ReservaRepository reservaRepository;
    private final HistorialEstadoReservaRepository historialRepository;
    private final NotificacionService notificacionService;
    private final PagoMapper pagoMapper;
    public PagoService(PagoRepository pagoRepository,
                       ReservaRepository reservaRepository,
                       HistorialEstadoReservaRepository historialRepository,
                       NotificacionService notificacionService,
                       PagoMapper pagoMapper){
        this.pagoRepository=pagoRepository;
        this.reservaRepository=reservaRepository;
        this.historialRepository=historialRepository;
        this.notificacionService=notificacionService;
        this.pagoMapper=pagoMapper;
    }
    @Transactional
    public PagoResponse registrar(Long usuarioId, CrearPagoRequest request){
        Reserva reserva=reservaRepository.buscarConRelaciones(request.getReservaId());
        if(reserva==null)
            throw new NotFoundException("Reserva no encontrada");
        if(!reserva.getUsuario().getId().equals(usuarioId))
            throw new ForbiddenException("La reserva no te pertenece");
        if(reserva.getEstado()!=EstadoReserva.PENDIENTE)
            throw new BusinessException("La reserva no esta pendiente de pago");
        if(pagoRepository.findByReservaId(reserva.getId()).isPresent())
            throw new BusinessException("La reserva ya tiene un pago registrado");
        TipoPago tipo=parsearTipo(request.getTipoPago());
        Pago pago=new Pago(reserva, tipo, request.getReferencia());
        pagoRepository.save(pago);
        return pagoMapper.aResponse(pago);
    }
    @Transactional
    public PagoResponse aprobar(Long usuarioId, Long pagoId){
        Pago pago=pagoRepository.findById(pagoId)
                .orElseThrow(()->new NotFoundException("Pago no encontrado"));
        Reserva reserva=reservaRepository.buscarConRelaciones(pago.getReserva().getId());
        if(!reserva.getUsuario().getId().equals(usuarioId))
            throw new ForbiddenException("El pago no te pertenece");
        pago.aprobar();
        pagoRepository.save(pago);
        if(reserva.getEstado()==EstadoReserva.PENDIENTE){
            reserva.confirmar();
            reservaRepository.save(reserva);
            historialRepository.save(new HistorialEstadoReserva(reserva, EstadoReserva.PENDIENTE,
                    EstadoReserva.CONFIRMADA, "Pago aprobado"));
            notificacionService.crear(reserva.getUsuario(), TipoNotificacion.PAGO_APROBADO,
                    "Pago aprobado",
                    "Tu pago para "+reserva.getPropiedad().getTitulo()+" fue aprobado",
                    reserva.getId());
            notificacionService.crear(reserva.getPropiedad().getAnfitrion(),
                    TipoNotificacion.RESERVA_CONFIRMADA,
                    "Nueva reserva confirmada",
                    "Se confirmo una reserva en "+reserva.getPropiedad().getTitulo(),
                    reserva.getId());
        }
        return pagoMapper.aResponse(pago);
    }
    @Transactional
    public PagoResponse rechazar(Long usuarioId, Long pagoId){
        Pago pago=pagoRepository.findById(pagoId)
                .orElseThrow(()->new NotFoundException("Pago no encontrado"));
        Reserva reserva=reservaRepository.buscarConRelaciones(pago.getReserva().getId());
        if(!reserva.getUsuario().getId().equals(usuarioId))
            throw new ForbiddenException("El pago no te pertenece");
        pago.rechazar();
        pagoRepository.save(pago);
        notificacionService.crear(reserva.getUsuario(), TipoNotificacion.PAGO_RECHAZADO,
                "Pago rechazado",
                "Tu pago para "+reserva.getPropiedad().getTitulo()+" fue rechazado",
                reserva.getId());
        return pagoMapper.aResponse(pago);
    }
    @Transactional(readOnly=true)
    public PagoResponse obtener(Long usuarioId, Long reservaId){
        Pago pago=pagoRepository.findByReservaId(reservaId)
                .orElseThrow(()->new NotFoundException("La reserva no tiene pago registrado"));
        Reserva reserva=reservaRepository.buscarConRelaciones(reservaId);
        boolean esHuesped=reserva.getUsuario().getId().equals(usuarioId);
        boolean esAnfitrion=reserva.getPropiedad().getAnfitrion().getId().equals(usuarioId);
        if(!esHuesped&&!esAnfitrion)
            throw new ForbiddenException("No puedes ver este pago");
        return pagoMapper.aResponse(pago);
    }
    private TipoPago parsearTipo(String tipo){
        try{
            return TipoPago.valueOf(tipo);
        }catch(IllegalArgumentException e){
            throw new BusinessException("Tipo de pago invalido");
        }
    }
}
