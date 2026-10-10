package app.application.dto.response;
import java.math.BigDecimal;
import java.time.LocalDateTime;
/**
 *
 * @author inici4rsesi0n
 */
public record PagoResponse(
        Long id,
        Long reservaId,
        BigDecimal monto,
        String tipoPago,
        String estado,
        String referencia,
        LocalDateTime fecha
){}
