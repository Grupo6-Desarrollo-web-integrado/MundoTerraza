package app.infrastructure.repository;
import app.domain.enums.EstadoPropiedad;
import app.domain.model.Propiedad;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
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
public interface PropiedadRepository extends JpaRepository<Propiedad, Long>,
        JpaSpecificationExecutor<Propiedad>{
    @EntityGraph(attributePaths={"anfitrion", "categoria", "imagenes"})
    @Query("select p from Propiedad p where p.id=:id and p.estado<>:excluido")
    Optional<Propiedad> buscarPorIdConRelaciones(@Param("id") Long id,
                                                 @Param("excluido") EstadoPropiedad excluido);
    List<Propiedad> findAllByEstadoNot(EstadoPropiedad estado);
}
