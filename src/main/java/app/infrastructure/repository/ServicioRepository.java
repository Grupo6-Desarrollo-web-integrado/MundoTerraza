package app.infrastructure.repository;
import app.domain.model.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
/**
 *
 * @author inici4rsesi0n
 */
@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long>{
    List<Servicio> findByActivoTrue();
    Optional<Servicio> findByNombreIgnoreCase(String nombre);
    boolean existsByNombreIgnoreCase(String nombre);
}
