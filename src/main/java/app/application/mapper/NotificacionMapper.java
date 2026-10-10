package app.application.mapper;
import app.application.dto.response.NotificacionResponse;
import app.domain.model.Notificacion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Mapper(componentModel="spring")
public interface NotificacionMapper{
    @Mapping(target="tipo", expression="java(notificacion.getTipo().name())")
    NotificacionResponse aResponse(Notificacion notificacion);
    List<NotificacionResponse> aResponseLista(List<Notificacion> notificaciones);
}
