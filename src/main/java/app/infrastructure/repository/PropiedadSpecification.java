package app.infrastructure.repository;
import app.domain.enums.EstadoHabitacion;
import app.domain.enums.EstadoPropiedad;
import app.domain.enums.EstadoReserva;
import app.domain.model.BloqueoFecha;
import app.domain.model.Habitacion;
import app.domain.model.Propiedad;
import app.domain.model.Reserva;
import app.domain.model.ServicioPropiedad;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
public final class PropiedadSpecification{
    private static final List<EstadoReserva> ESTADOS_ACTIVOS=
            List.of(EstadoReserva.PENDIENTE, EstadoReserva.CONFIRMADA);
    private PropiedadSpecification(){}
    public static Specification<Propiedad> activas(){
        return (root, query, cb) -> cb.equal(root.get("estado"), EstadoPropiedad.ACTIVA);
    }
    public static Specification<Propiedad> porTexto(String texto){
        if(texto==null||texto.isBlank())return null;
        String patron="%"+texto.trim().toLowerCase()+"%";
        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("titulo")), patron),
                cb.like(cb.lower(root.get("ubicacion")), patron)
        );
    }
    public static Specification<Propiedad> porCategoria(Long categoriaId){
        if(categoriaId==null)return null;
        return (root, query, cb) -> cb.equal(root.get("categoria").get("id"), categoriaId);
    }
    public static Specification<Propiedad> porTipoAlojamiento(String tipo){
        if(tipo==null||tipo.isBlank())return null;
        return (root, query, cb) -> cb.equal(root.get("tipoAlojamiento"), tipo);
    }
    public static Specification<Propiedad> porPrecioMinimo(Double precioMin){
        if(precioMin==null)return null;
        return (root, query, cb) -> {
            Subquery<Long> sq=query.subquery(Long.class);
            Root<Habitacion> h=sq.from(Habitacion.class);
            sq.select(cb.literal(1L)).where(
                    cb.equal(h.get("propiedad").get("id"), root.get("id")),
                    cb.greaterThanOrEqualTo(h.get("precioNoche"), precioMin)
            );
            return cb.exists(sq);
        };
    }
    public static Specification<Propiedad> porPrecioMaximo(Double precioMax){
        if(precioMax==null)return null;
        return (root, query, cb) -> {
            Subquery<Long> sq=query.subquery(Long.class);
            Root<Habitacion> h=sq.from(Habitacion.class);
            sq.select(cb.literal(1L)).where(
                    cb.equal(h.get("propiedad").get("id"), root.get("id")),
                    cb.lessThanOrEqualTo(h.get("precioNoche"), precioMax)
            );
            return cb.exists(sq);
        };
    }
    public static Specification<Propiedad> porServicios(Collection<Long> servicioIds){
        if(servicioIds==null||servicioIds.isEmpty())return null;
        return (root, query, cb) -> {
            Subquery<Long> sq=query.subquery(Long.class);
            Root<ServicioPropiedad> sp=sq.from(ServicioPropiedad.class);
            sq.select(cb.literal(1L)).where(
                    cb.equal(sp.get("propiedad").get("id"), root.get("id")),
                    sp.get("servicio").get("id").in(servicioIds)
            );
            return cb.exists(sq);
        };
    }
    public static Specification<Propiedad> porHuespedesMinimos(Integer huespedes){
        if(huespedes==null||huespedes<1)return null;
        return (root, query, cb) -> {
            Subquery<Long> sq=query.subquery(Long.class);
            Root<Habitacion> h=sq.from(Habitacion.class);
            sq.select(cb.literal(1L)).where(
                    cb.equal(h.get("propiedad").get("id"), root.get("id")),
                    cb.greaterThanOrEqualTo(h.get("maxAdultos"), huespedes)
            );
            return cb.exists(sq);
        };
    }
    public static Specification<Propiedad> disponibleEntre(LocalDate desde, LocalDate hasta, int cantidad){
        return (root, query, cb) -> {
            Subquery<Long> sqHab=query.subquery(Long.class);
            Root<Habitacion> h=sqHab.from(Habitacion.class);
            Subquery<Long> sqBloq=query.subquery(Long.class);
            Root<BloqueoFecha> b=sqBloq.from(BloqueoFecha.class);
            sqBloq.select(cb.literal(1L)).where(
                    cb.equal(b.get("habitacion").get("id"), h.get("id")),
                    cb.lessThan(b.get("fechaInicio"), hasta),
                    cb.greaterThan(b.get("fechaFin"), desde)
            );
            Subquery<Long> sqOcupadas=query.subquery(Long.class);
            Root<Reserva> r=sqOcupadas.from(Reserva.class);
            sqOcupadas.select(cb.sum(r.get("cantidad")).as(Long.class));
            sqOcupadas.where(
                    cb.equal(r.get("habitacion").get("id"), h.get("id")),
                    r.get("estado").in(ESTADOS_ACTIVOS),
                    cb.lessThan(r.get("fechaInicio"), hasta),
                    cb.greaterThan(r.get("fechaFin"), desde)
            );
            Expression<Long> ocupadas=cb.coalesce(sqOcupadas, 0L);
            Expression<Long> stock=h.get("stockTotal").as(Long.class);
            sqHab.select(cb.literal(1L)).where(
                    cb.equal(h.get("propiedad").get("id"), root.get("id")),
                    cb.equal(h.get("estado"), EstadoHabitacion.DISPONIBLE),
                    cb.not(cb.exists(sqBloq)),
                    cb.ge(cb.diff(stock, ocupadas), cantidad)
            );
            return cb.exists(sqHab);
        };
    }
    public static Specification<Propiedad> combinadas(String texto, Long categoriaId,
                                                      String tipo, Double precioMin,
                                                      Double precioMax, Collection<Long> servicios,
                                                      Integer huespedes){
        return combinadas(texto, categoriaId, tipo, precioMin, precioMax,
                servicios, huespedes, null, null, 1);
    }
    public static Specification<Propiedad> combinadas(String texto, Long categoriaId,
                                                      String tipo, Double precioMin,
                                                      Double precioMax, Collection<Long> servicios,
                                                      Integer huespedes, LocalDate desde,
                                                      LocalDate hasta, int cantidad){
        Specification<Propiedad> spec=activas();
        if(texto!=null&&!texto.isBlank())spec=spec.and(porTexto(texto));
        if(categoriaId!=null)spec=spec.and(porCategoria(categoriaId));
        if(tipo!=null&&!tipo.isBlank())spec=spec.and(porTipoAlojamiento(tipo));
        if(precioMin!=null)spec=spec.and(porPrecioMinimo(precioMin));
        if(precioMax!=null)spec=spec.and(porPrecioMaximo(precioMax));
        if(servicios!=null&&!servicios.isEmpty())spec=spec.and(porServicios(servicios));
        if(huespedes!=null&&huespedes>=1)spec=spec.and(porHuespedesMinimos(huespedes));
        if(desde!=null&&hasta!=null)spec=spec.and(disponibleEntre(desde, hasta, cantidad));
        return spec;
    }
}
