package app.infrastructure.repository;
import app.domain.enums.EstadoReview;
import app.domain.model.Review;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
/**
 *
 * @author inici4rsesi0n
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{
    @EntityGraph(attributePaths={"usuario"})
    List<Review> findByPropiedadIdAndEstadoOrderByFechaCreacionDesc(Long propiedadId, EstadoReview estado);
    Optional<Review> findByUsuarioIdAndPropiedadId(Long usuarioId, Long propiedadId);
    boolean existsByUsuarioIdAndPropiedadId(Long usuarioId, Long propiedadId);
    long countByPropiedadIdAndEstado(Long propiedadId, EstadoReview estado);
    @Query("select coalesce(avg(r.rating), 0) from Review r where r.propiedad.id=:propiedadId and r.estado=:estado")
    Double promedioRating(@Param("propiedadId") Long propiedadId, @Param("estado") EstadoReview estado);
}
