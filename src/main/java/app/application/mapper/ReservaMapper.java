package app.application.mapper;
import app.application.dto.response.ReservaResponse;
import app.domain.model.Reserva;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Mapper(componentModel="spring")
public interface ReservaMapper{
    @Mapping(target="usuarioId", source="usuario.id")
    @Mapping(target="nombreUsuario", source="usuario.nombre")
    @Mapping(target="habitacionId", source="habitacion.id")
    @Mapping(target="nombreHabitacion", source="habitacion.nombre")
    @Mapping(target="propiedadId", source="propiedad.id")
    @Mapping(target="tituloPropiedad", source="propiedad.titulo")
    @Mapping(target="nombreAnfitrion", source="propiedad.anfitrion.nombre")
    @Mapping(target="noches", expression="java(reserva.getNoches())")
    @Mapping(target="precioPorNocheAlCrear", source="precioPorNocheAlCrear.monto")
    @Mapping(target="subtotal", source="subtotal.monto")
    @Mapping(target="comisionPlataforma", source="comisionPlataforma.monto")
    @Mapping(target="montoAnfitrion", source="montoAnfitrion.monto")
    @Mapping(target="estado", expression="java(reserva.getEstado().name())")
    ReservaResponse aResponse(Reserva reserva);
    List<ReservaResponse> aResponseLista(List<Reserva> reservas);
}
