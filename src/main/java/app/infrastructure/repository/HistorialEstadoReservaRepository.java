package app.infrastructure.repository;
import app.domain.model.HistorialEstadoReserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Repository
public interface HistorialEstadoReservaRepository extends JpaRepository<HistorialEstadoReserva, Long>{
    List<HistorialEstadoReserva> findByReservaIdOrderByFechaAsc(Long reservaId);
}
