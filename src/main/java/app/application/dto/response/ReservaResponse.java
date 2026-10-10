package app.application.dto.response;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
/**
 *
 * @author inici4rsesi0n
 */
public record ReservaResponse(
        Long id,
        Long usuarioId,
        String nombreUsuario,
        Long habitacionId,
        String nombreHabitacion,
        Long propiedadId,
        String tituloPropiedad,
        String nombreAnfitrion,
        int cantidad,
        LocalDate fechaInicio,
        LocalDate fechaFin,
        long noches,
        BigDecimal precioPorNocheAlCrear,
        BigDecimal subtotal,
        BigDecimal comisionPlataforma,
        BigDecimal montoAnfitrion,
        String estado,
        LocalDateTime fechaCreacion
){}
