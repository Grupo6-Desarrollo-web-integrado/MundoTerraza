package app.application.mapper;
import app.application.dto.response.PagoResponse;
import app.domain.model.Pago;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Mapper(componentModel="spring")
public interface PagoMapper{
    @Mapping(target="reservaId", source="reserva.id")
    @Mapping(target="monto", source="monto.monto")
    @Mapping(target="tipoPago", expression="java(pago.getTipoPago().name())")
    @Mapping(target="estado", expression="java(pago.getEstado().name())")
    PagoResponse aResponse(Pago pago);
    List<PagoResponse> aResponseLista(List<Pago> pagos);
}
