package app.application.mapper;
import app.application.dto.response.HabitacionResponse;
import app.domain.model.Habitacion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Mapper(componentModel="spring", uses={ImagenMapper.class})
public interface HabitacionMapper{
    @Mapping(target="precioNoche", source="precioNoche.monto")
    @Mapping(target="estado", expression="java(habitacion.getEstado().name())")
    HabitacionResponse aResponse(Habitacion habitacion);
    List<HabitacionResponse> aResponseLista(List<Habitacion> habitaciones);
}
