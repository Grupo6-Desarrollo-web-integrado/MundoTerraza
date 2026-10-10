package app.application.dto.response;
import java.time.LocalDate;
/**
 *
 * @author inici4rsesi0n
 */
public record DisponibilidadResponse(
        Long habitacionId,
        LocalDate fechaInicio,
        LocalDate fechaFin,
        int stockTotal,
        int unidadesOcupadas,
        int unidadesDisponibles,
        boolean disponible
){}
