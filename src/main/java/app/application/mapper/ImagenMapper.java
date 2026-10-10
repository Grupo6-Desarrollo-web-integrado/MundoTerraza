package app.application.mapper;
import app.application.dto.response.ImagenResponse;
import app.domain.model.Imagen;
import org.mapstruct.Mapper;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Mapper(componentModel="spring")
public interface ImagenMapper{
    ImagenResponse aResponse(Imagen imagen);
    List<ImagenResponse> aResponseLista(List<Imagen> imagenes);
}
