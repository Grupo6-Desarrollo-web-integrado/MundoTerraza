package app.infrastructure.repository;
import app.domain.model.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Repository
public interface ImagenRepository extends JpaRepository<Imagen, Long>{
    List<Imagen> findByPropiedadIdOrderByOrdenAsc(Long propiedadId);
    List<Imagen> findByHabitacionIdOrderByOrdenAsc(Long habitacionId);
    long countByPropiedadId(Long propiedadId);
    long countByHabitacionId(Long habitacionId);
}
