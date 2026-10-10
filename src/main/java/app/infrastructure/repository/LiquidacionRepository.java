package app.infrastructure.repository;
import app.domain.enums.EstadoLiquidacion;
import app.domain.model.Liquidacion;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
/**
 *
 * @author inici4rsesi0n
 */
@Repository
public interface LiquidacionRepository extends JpaRepository<Liquidacion, Long>{
    @EntityGraph(attributePaths={"reserva", "reserva.propiedad"})
    List<Liquidacion> findByAnfitrionIdOrderByFechaGeneracionDesc(Long anfitrionId);
    Optional<Liquidacion> findByReservaId(Long reservaId);
    List<Liquidacion> findByAnfitrionIdAndEstado(Long anfitrionId, EstadoLiquidacion estado);
}
