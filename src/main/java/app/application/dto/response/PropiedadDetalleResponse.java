package app.application.dto.response;
import java.math.BigDecimal;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
public record PropiedadDetalleResponse(
        Long id,
        String titulo,
        String descripcion,
        String ubicacion,
        double latitud,
        double longitud,
        String tipoAlojamiento,
        String politicaCancelacion,
        String estado,
        String categoria,
        Long categoriaId,
        Long anfitrionId,
        String nombreAnfitrion,
        String ciudadAnfitrion,
        String biografiaAnfitrion,
        BigDecimal precioDesde,
        double ratingPromedio,
        int totalReviews,
        boolean esFavoritoEntreHuespedes,
        List<ImagenResponse> imagenes,
        List<ServicioResponse> servicios,
        List<HabitacionResponse> habitaciones
){}
