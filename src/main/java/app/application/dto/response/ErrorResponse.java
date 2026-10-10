package app.application.dto.response;
import java.time.LocalDateTime;
import java.util.Map;
/**
 *
 * @author inici4rsesi0n
 */
public record ErrorResponse(
        LocalDateTime timestamp,
        int status,
        String error,
        String mensaje,
        String path,
        Map<String, String> detalles
){}
