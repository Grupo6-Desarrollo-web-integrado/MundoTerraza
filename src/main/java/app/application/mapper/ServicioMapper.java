package app.application.mapper;
import app.application.dto.response.ServicioResponse;
import app.domain.model.Servicio;
import org.mapstruct.Mapper;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Mapper(componentModel="spring")
public interface ServicioMapper{
    ServicioResponse aResponse(Servicio servicio);
    List<ServicioResponse> aResponseLista(List<Servicio> servicios);
}
