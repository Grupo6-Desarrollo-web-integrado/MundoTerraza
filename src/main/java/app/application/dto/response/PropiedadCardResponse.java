package app.application.dto.response;
import java.math.BigDecimal;
/**
 *
 * @author inici4rsesi0n
 */
public record PropiedadCardResponse(
        Long id,
        String titulo,
        String ubicacion,
        String tipoAlojamiento,
        BigDecimal precioDesde,
        String categoria,
        String nombreAnfitrion,
        String imagenPrincipal,
        double ratingPromedio,
        int totalReviews,
        boolean esFavoritoEntreHuespedes
){}
