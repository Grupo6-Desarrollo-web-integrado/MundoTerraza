package app.application.mapper;
import app.application.dto.response.BloqueoFechaResponse;
import app.domain.model.BloqueoFecha;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Mapper(componentModel="spring")
public interface BloqueoFechaMapper{
    @Mapping(target="habitacionId", source="habitacion.id")
    BloqueoFechaResponse aResponse(BloqueoFecha bloqueo);
    List<BloqueoFechaResponse> aResponseLista(List<BloqueoFecha> bloqueos);
}
