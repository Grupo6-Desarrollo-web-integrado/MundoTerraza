package app.infrastructure.repository;
import app.domain.enums.EstadoUsuario;
import app.domain.model.Usuario;
import app.domain.valueobject.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
/**
 *
 * @author inici4rsesi0n
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Optional<Usuario> findByCorreo(Email correo);
    boolean existsByCorreo(Email correo);
    List<Usuario> findByEstado(EstadoUsuario estado);
    List<Usuario> findByEsAnfitrionTrueAndEstado(EstadoUsuario estado);
}
