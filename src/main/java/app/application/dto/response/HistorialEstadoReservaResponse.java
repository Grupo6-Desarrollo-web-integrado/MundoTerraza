package app.application.dto.response;
import java.time.LocalDateTime;
/**
 *
 * @author inici4rsesi0n
 */
public record HistorialEstadoReservaResponse(
        Long id,
        String estadoAnterior,
        String estadoNuevo,
        String motivo,
        LocalDateTime fecha
){}
