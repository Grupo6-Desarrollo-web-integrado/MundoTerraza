package app.application.mapper;
import app.application.dto.response.CategoriaResponse;
import app.domain.model.Categoria;
import org.mapstruct.Mapper;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Mapper(componentModel="spring")
public interface CategoriaMapper{
    CategoriaResponse aResponse(Categoria categoria);
    List<CategoriaResponse> aResponseLista(List<Categoria> categorias);
}
