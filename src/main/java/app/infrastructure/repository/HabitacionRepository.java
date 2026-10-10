package app.infrastructure.repository;
import app.domain.enums.EstadoHabitacion;
import app.domain.model.Habitacion;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Repository
public interface HabitacionRepository extends JpaRepository<Habitacion, Long>{
    @EntityGraph(attributePaths={"imagenes"})
    List<Habitacion> findByPropiedadId(Long propiedadId);
    List<Habitacion> findByPropiedadIdAndEstadoNot(Long propiedadId, EstadoHabitacion estado);
    boolean existsByPropiedadIdAndEstadoNot(Long propiedadId, EstadoHabitacion estado);
}
