package app.application.service;
import app.application.dto.response.LiquidacionResponse;
import app.application.mapper.LiquidacionMapper;
import app.domain.enums.EstadoLiquidacion;
import app.domain.exception.BusinessException;
import app.domain.exception.ForbiddenException;
import app.domain.exception.NotFoundException;
import app.domain.model.Liquidacion;
import app.domain.model.Reserva;
import app.infrastructure.repository.LiquidacionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class LiquidacionService{
    private final LiquidacionRepository liquidacionRepository;
    private final LiquidacionMapper liquidacionMapper;
    public LiquidacionService(LiquidacionRepository liquidacionRepository,
                              LiquidacionMapper liquidacionMapper){
        this.liquidacionRepository=liquidacionRepository;
        this.liquidacionMapper=liquidacionMapper;
    }
    @Transactional
    public Liquidacion generarPara(Reserva reserva){
        if(liquidacionRepository.findByReservaId(reserva.getId()).isPresent())
            throw new BusinessException("La reserva ya tiene una liquidacion generada");
        Liquidacion liquidacion=new Liquidacion(reserva);
        return liquidacionRepository.save(liquidacion);
    }
    @Transactional(readOnly=true)
    public List<LiquidacionResponse> listarDelAnfitrion(Long anfitrionId){
        return liquidacionMapper.aResponseLista(
                liquidacionRepository.findByAnfitrionIdOrderByFechaGeneracionDesc(anfitrionId));
    }
    @Transactional(readOnly=true)
    public LiquidacionResponse obtener(Long anfitrionId, Long liquidacionId){
        Liquidacion liquidacion=liquidacionRepository.findById(liquidacionId)
                .orElseThrow(()->new NotFoundException("Liquidacion no encontrada"));
        if(!liquidacion.getAnfitrion().getId().equals(anfitrionId))
            throw new ForbiddenException("La liquidacion no te pertenece");
        return liquidacionMapper.aResponse(liquidacion);
    }
    @Transactional(readOnly=true)
    public List<LiquidacionResponse> listarPendientes(Long anfitrionId){
        return liquidacionMapper.aResponseLista(
                liquidacionRepository.findByAnfitrionIdAndEstado(anfitrionId, EstadoLiquidacion.PENDIENTE));
    }
}
