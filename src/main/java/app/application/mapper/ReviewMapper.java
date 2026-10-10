package app.application.mapper;
import app.application.dto.response.ReviewResponse;
import app.domain.model.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Mapper(componentModel="spring")
public interface ReviewMapper{
    @Mapping(target="usuarioId", source="usuario.id")
    @Mapping(target="nombreUsuario", source="usuario.nombre")
    @Mapping(target="propiedadId", source="propiedad.id")
    @Mapping(target="estado", expression="java(review.getEstado().name())")
    ReviewResponse aResponse(Review review);
    List<ReviewResponse> aResponseLista(List<Review> reviews);
}
