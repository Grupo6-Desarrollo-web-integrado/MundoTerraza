package app.infrastructure.repository;
import app.domain.model.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Long>{
    List<Notificacion> findByUsuarioIdOrderByFechaCreacionDesc(Long usuarioId);
    List<Notificacion> findByUsuarioIdAndLeidaFalseOrderByFechaCreacionDesc(Long usuarioId);
    long countByUsuarioIdAndLeidaFalse(Long usuarioId);
    List<Notificacion> findByLeidaTrueAndFechaCreacionBefore(LocalDateTime limite);
}
