package app.infrastructure.repository;
import app.domain.model.Favorito;
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
public interface FavoritoRepository extends JpaRepository<Favorito, Long>{
    @EntityGraph(attributePaths={"propiedad", "propiedad.imagenes"})
    List<Favorito> findByUsuarioIdOrderByFechaDesc(Long usuarioId);
    Optional<Favorito> findByUsuarioIdAndPropiedadId(Long usuarioId, Long propiedadId);
    boolean existsByUsuarioIdAndPropiedadId(Long usuarioId, Long propiedadId);
    long countByPropiedadId(Long propiedadId);
}
