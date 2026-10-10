package app.infrastructure.repository;
import app.domain.model.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
/**
 *
 * @author inici4rsesi0n
 */
@Repository
public interface PagoRepository extends JpaRepository<Pago, Long>{
    Optional<Pago> findByReservaId(Long reservaId);
}
