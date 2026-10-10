package app.application.service;
import app.application.dto.response.DisponibilidadResponse;
import app.domain.enums.EstadoHabitacion;
import app.domain.enums.EstadoReserva;
import app.domain.exception.BusinessException;
import app.domain.exception.NotFoundException;
import app.domain.model.Habitacion;
import app.infrastructure.repository.BloqueoFechaRepository;
import app.infrastructure.repository.HabitacionRepository;
import app.infrastructure.repository.ReservaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class DisponibilidadService{
    private static final List<EstadoReserva> ESTADOS_ACTIVOS=
            List.of(EstadoReserva.PENDIENTE, EstadoReserva.CONFIRMADA);
    private final HabitacionRepository habitacionRepository;
    private final ReservaRepository reservaRepository;
    private final BloqueoFechaRepository bloqueoFechaRepository;
    public DisponibilidadService(HabitacionRepository habitacionRepository,
                                 ReservaRepository reservaRepository,
                                 BloqueoFechaRepository bloqueoFechaRepository){
        this.habitacionRepository=habitacionRepository;
        this.reservaRepository=reservaRepository;
        this.bloqueoFechaRepository=bloqueoFechaRepository;
    }
    @Transactional(readOnly=true)
    public DisponibilidadResponse consultar(Long habitacionId, LocalDate inicio, LocalDate fin){
        Habitacion h=habitacionRepository.findById(habitacionId)
                .orElseThrow(()->new NotFoundException("Habitacion no encontrada"));
        return calcular(h, inicio, fin);
    }
    @Transactional(readOnly=true)
    public void verificarDisponibilidad(Habitacion h, LocalDate inicio, LocalDate fin, int cantidad){
        if(h.getEstado()!=EstadoHabitacion.DISPONIBLE)
            throw new BusinessException("La habitacion no esta disponible");
        if(cantidad<1)
            throw new BusinessException("La cantidad debe ser al menos 1");
        DisponibilidadResponse disp=calcular(h, inicio, fin);
        if(disp.unidadesDisponibles()<cantidad)
            throw new BusinessException("No hay suficientes unidades disponibles para esas fechas");
    }
    private DisponibilidadResponse calcular(Habitacion h, LocalDate inicio, LocalDate fin){
        if(inicio==null||fin==null)
            throw new BusinessException("Las fechas no pueden ser nulas");
        if(!fin.isAfter(inicio))
            throw new BusinessException("La fecha fin debe ser posterior a la fecha inicio");
        long ocupadas=reservaRepository.contarUnidadesOcupadas(
                h.getId(), inicio, fin, ESTADOS_ACTIVOS);
        long bloqueos=bloqueoFechaRepository.buscarSolapados(h.getId(), inicio, fin).size();
        int disponibles=bloqueos>0?0:(int)(h.getStockTotal()-ocupadas);
        if(disponibles<0)disponibles=0;
        return new DisponibilidadResponse(h.getId(), inicio, fin, h.getStockTotal(),
                (int)ocupadas, disponibles, disponibles>0);
    }
}
