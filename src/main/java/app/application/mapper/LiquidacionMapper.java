package app.application.mapper;
import app.application.dto.response.LiquidacionResponse;
import app.domain.model.Liquidacion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Mapper(componentModel="spring")
public interface LiquidacionMapper{
    @Mapping(target="reservaId", source="reserva.id")
    @Mapping(target="anfitrionId", source="anfitrion.id")
    @Mapping(target="subtotal", source="subtotal.monto")
    @Mapping(target="porcentajeComision", source="porcentajeComision.valor")
    @Mapping(target="montoComision", source="montoComision.monto")
    @Mapping(target="montoNeto", source="montoNeto.monto")
    @Mapping(target="estado", expression="java(liquidacion.getEstado().name())")
    LiquidacionResponse aResponse(Liquidacion liquidacion);
    List<LiquidacionResponse> aResponseLista(List<Liquidacion> liquidaciones);
}
