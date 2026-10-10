package app.application.dto.response;
import java.time.LocalDate;
/**
 *
 * @author inici4rsesi0n
 */
public record BloqueoFechaResponse(
        Long id,
        Long habitacionId,
        LocalDate fechaInicio,
        LocalDate fechaFin,
        String motivo
){}
