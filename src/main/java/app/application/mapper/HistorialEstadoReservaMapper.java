package app.application.mapper;
import app.application.dto.response.HistorialEstadoReservaResponse;
import app.domain.model.HistorialEstadoReserva;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Mapper(componentModel="spring")
public interface HistorialEstadoReservaMapper{
    @Mapping(target="estadoAnterior", expression="java(historial.getEstadoAnterior()==null?null:historial.getEstadoAnterior().name())")
    @Mapping(target="estadoNuevo", expression="java(historial.getEstadoNuevo().name())")
    HistorialEstadoReservaResponse aResponse(HistorialEstadoReserva historial);
    List<HistorialEstadoReservaResponse> aResponseLista(List<HistorialEstadoReserva> historial);
}
