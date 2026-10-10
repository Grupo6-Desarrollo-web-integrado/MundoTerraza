package app.application.dto.response;
import java.math.BigDecimal;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
public record HabitacionResponse(
        Long id,
        String nombre,
        String descripcion,
        BigDecimal precioNoche,
        int maxAdultos,
        int maxNinos,
        int maxBebes,
        int maxMascotas,
        int cantidadDormitorios,
        int cantidadBanios,
        double metrosCuadrados,
        int stockTotal,
        String estado,
        List<ImagenResponse> imagenes
){}
