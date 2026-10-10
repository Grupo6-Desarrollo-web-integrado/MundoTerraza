package app.application.dto.response;
import java.time.LocalDateTime;
/**
 *
 * @author inici4rsesi0n
 */
public record NotificacionResponse(
        Long id,
        String tipo,
        String titulo,
        String mensaje,
        Long referenciaId,
        boolean leida,
        LocalDateTime fechaCreacion
){}
