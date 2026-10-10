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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class PagoService{
    private static final Logger log=LoggerFactory.getLogger(PagoService.class);
    private static final String PREFIJO_FALLO="FAIL-";
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
        Pago pago=pagoRepository.findByReservaId(reserva.getId()).orElse(null);
        if(pago!=null&&pago.getEstado()==EstadoPago.APROBADO)
            throw new BusinessException("La reserva ya tiene un pago aprobado");
        if(pago==null){
            TipoPago tipo=parsearTipo(request.getTipoPago());
            pago=new Pago(reserva, tipo, request.getReferencia());
        }
        boolean pasarelaOk=simularPasarela(request.getReferencia());
        if(pasarelaOk){
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
            log.info("Pago aprobado id={} reservaId={} usuarioId={}",
                    pago.getId(), reserva.getId(), usuarioId);
        }else{
            pago.rechazar();
            pagoRepository.save(pago);
            notificacionService.crear(reserva.getUsuario(), TipoNotificacion.PAGO_RECHAZADO,
                    "Pago rechazado",
                    "Tu pago para "+reserva.getPropiedad().getTitulo()+" fue rechazado",
                    reserva.getId());
            log.warn("Pago rechazado por pasarela simulada reservaId={} usuarioId={}",
                    reserva.getId(), usuarioId);
        }
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
    private boolean simularPasarela(String referencia){
        if(referencia==null||referencia.isBlank())return true;
        return !referencia.toUpperCase().startsWith(PREFIJO_FALLO);
    }
    private TipoPago parsearTipo(String tipo){
        try{
            return TipoPago.valueOf(tipo);
        }catch(IllegalArgumentException e){
            throw new BusinessException("Tipo de pago invalido");
        }
    }
}
