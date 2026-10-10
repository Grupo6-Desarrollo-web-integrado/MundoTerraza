package app.application.dto.response;
import java.time.LocalDateTime;
/**
 *
 * @author inici4rsesi0n
 */
public record FavoritoResponse(
        Long id,
        PropiedadCardResponse propiedad,
        LocalDateTime fecha
){}
