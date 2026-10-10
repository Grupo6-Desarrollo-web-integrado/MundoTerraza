package app.application.mapper;
import app.application.dto.response.PropiedadCardResponse;
import app.application.dto.response.PropiedadDetalleResponse;
import app.application.dto.response.ServicioResponse;
import app.domain.model.Propiedad;
import app.domain.model.Servicio;
import app.domain.model.ServicioPropiedad;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.math.BigDecimal;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Mapper(componentModel="spring", uses={ImagenMapper.class, HabitacionMapper.class, ServicioMapper.class})
public interface PropiedadMapper{
    @Mapping(target="tipoAlojamiento", expression="java(propiedad.getTipoAlojamiento().name())")
    @Mapping(target="categoria", source="categoria.nombre")
    @Mapping(target="nombreAnfitrion", source="anfitrion.nombre")
    @Mapping(target="precioDesde", expression="java(precioDesde(propiedad))")
    @Mapping(target="imagenPrincipal", expression="java(imagenPrincipal(propiedad))")
    PropiedadCardResponse aCard(Propiedad propiedad);
    List<PropiedadCardResponse> aCardLista(List<Propiedad> propiedades);
    @Mapping(target="tipoAlojamiento", expression="java(propiedad.getTipoAlojamiento().name())")
    @Mapping(target="politicaCancelacion", expression="java(propiedad.getPoliticaCancelacion().name())")
    @Mapping(target="estado", expression="java(propiedad.getEstado().name())")
    @Mapping(target="categoria", source="categoria.nombre")
    @Mapping(target="categoriaId", source="categoria.id")
    @Mapping(target="anfitrionId", source="anfitrion.id")
    @Mapping(target="nombreAnfitrion", source="anfitrion.nombre")
    @Mapping(target="ciudadAnfitrion", source="anfitrion.ciudad")
    @Mapping(target="biografiaAnfitrion", source="anfitrion.biografia")
    @Mapping(target="precioDesde", expression="java(precioDesde(propiedad))")
    @Mapping(target="imagenes", source="imagenes")
    @Mapping(target="servicios", expression="java(serviciosDePropiedad(propiedad))")
    @Mapping(target="habitaciones", source="habitaciones")
    PropiedadDetalleResponse aDetalle(Propiedad propiedad);
    default BigDecimal precioDesde(Propiedad propiedad){
        if(propiedad.getHabitaciones()==null||propiedad.getHabitaciones().isEmpty())
            return BigDecimal.ZERO;
        return propiedad.getHabitaciones().stream()
                .map(h->h.getPrecioNoche().getMonto())
                .min(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);
    }
    default String imagenPrincipal(Propiedad propiedad){
        if(propiedad.getImagenes()==null||propiedad.getImagenes().isEmpty())
            return null;
        return propiedad.getImagenes().stream()
                .filter(i->i.getOrden()==0)
                .findFirst()
                .orElse(propiedad.getImagenes().get(0))
                .getUrl();
    }
    default List<ServicioResponse> serviciosDePropiedad(Propiedad propiedad){
        if(propiedad.getServicios()==null||propiedad.getServicios().isEmpty())
            return List.of();
        return propiedad.getServicios().stream()
                .map(ServicioPropiedad::getServicio)
                .map(this::aServicio)
                .toList();
    }
    default ServicioResponse aServicio(Servicio servicio){
        return new ServicioResponse(servicio.getId(), servicio.getNombre(), servicio.getIcono(), servicio.isActivo());
    }
}
