package app.infrastructure.repository;
import app.domain.enums.EstadoPropiedad;
import app.domain.model.Propiedad;
import app.domain.model.Servicio;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
public final class PropiedadSpecification{
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
    public static Specification<Propiedad> porPrecioMaximo(Double precioMax){
        if(precioMax==null)return null;
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Object, Object> habitaciones=root.join("habitaciones", JoinType.LEFT);
            return cb.lessThanOrEqualTo(habitaciones.get("precioNoche"), precioMax);
        };
    }
    public static Specification<Propiedad> porPrecioMinimo(Double precioMin){
        if(precioMin==null)return null;
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Object, Object> habitaciones=root.join("habitaciones", JoinType.LEFT);
            return cb.greaterThanOrEqualTo(habitaciones.get("precioNoche"), precioMin);
        };
    }
    public static Specification<Propiedad> porServicios(Collection<Long> servicioIds){
        if(servicioIds==null||servicioIds.isEmpty())return null;
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Object, Servicio> servicios=root.join("servicios", JoinType.INNER);
            return servicios.get("servicio").get("id").in(servicioIds);
        };
    }
    public static Specification<Propiedad> porHuespedesMinimos(Integer huespedes){
        if(huespedes==null||huespedes<1)return null;
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Object, Object> habitaciones=root.join("habitaciones", JoinType.LEFT);
            return cb.greaterThanOrEqualTo(habitaciones.get("maxAdultos"), huespedes);
        };
    }
    public static Specification<Propiedad> combinadas(String texto, Long categoriaId,
                                                      String tipo, Double precioMin,
                                                      Double precioMax, Collection<Long> servicios,
                                                      Integer huespedes){
        return (root, query, cb) -> {
            List<Predicate> predicates=new ArrayList<>();
            predicates.add(cb.equal(root.get("estado"), EstadoPropiedad.ACTIVA));
            if(texto!=null&&!texto.isBlank()){
                String patron="%"+texto.trim().toLowerCase()+"%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("titulo")), patron),
                        cb.like(cb.lower(root.get("ubicacion")), patron)
                ));
            }
            if(categoriaId!=null)
                predicates.add(cb.equal(root.get("categoria").get("id"), categoriaId));
            if(tipo!=null&&!tipo.isBlank())
                predicates.add(cb.equal(root.get("tipoAlojamiento"), tipo));
            if(precioMin!=null){
                query.distinct(true);
                Join<Object, Object> h=root.join("habitaciones", JoinType.LEFT);
                predicates.add(cb.greaterThanOrEqualTo(h.get("precioNoche"), precioMin));
            }
            if(precioMax!=null){
                query.distinct(true);
                Join<Object, Object> h=root.join("habitaciones", JoinType.LEFT);
                predicates.add(cb.lessThanOrEqualTo(h.get("precioNoche"), precioMax));
            }
            if(servicios!=null&&!servicios.isEmpty()){
                query.distinct(true);
                Join<Object, Object> sp=root.join("servicios", JoinType.INNER);
                predicates.add(sp.get("servicio").get("id").in(servicios));
            }
            if(huespedes!=null&&huespedes>=1){
                query.distinct(true);
                Join<Object, Object> h=root.join("habitaciones", JoinType.LEFT);
                predicates.add(cb.greaterThanOrEqualTo(h.get("maxAdultos"), huespedes));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
