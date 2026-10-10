package app.application.dto.response;
import java.math.BigDecimal;
import java.time.LocalDateTime;
/**
 *
 * @author inici4rsesi0n
 */
public record LiquidacionResponse(
        Long id,
        Long reservaId,
        Long anfitrionId,
        BigDecimal subtotal,
        BigDecimal porcentajeComision,
        BigDecimal montoComision,
        BigDecimal montoNeto,
        String estado,
        LocalDateTime fechaGeneracion
){}
