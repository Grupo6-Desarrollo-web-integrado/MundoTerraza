package app.infrastructure.repository;
import app.domain.enums.EstadoReserva;
import app.domain.model.Reserva;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long>{
    @EntityGraph(attributePaths={"usuario", "habitacion", "propiedad", "propiedad.anfitrion"})
    List<Reserva> findByUsuarioIdOrderByFechaCreacionDesc(Long usuarioId);
    @EntityGraph(attributePaths={"usuario", "habitacion", "propiedad", "propiedad.anfitrion"})
    List<Reserva> findByPropiedadAnfitrionIdOrderByFechaCreacionDesc(Long anfitrionId);
    boolean existsByUsuarioIdAndPropiedadIdAndEstado(Long usuarioId, Long propiedadId, EstadoReserva estado);
    @Query("""
           select r from Reserva r
           where r.habitacion.id=:habitacionId
             and r.estado in :estados
             and r.fechaInicio<:fechaFin
             and r.fechaFin>:fechaInicio
           """)
    List<Reserva> buscarSolapadas(@Param("habitacionId") Long habitacionId,
                                  @Param("fechaInicio") LocalDate fechaInicio,
                                  @Param("fechaFin") LocalDate fechaFin,
                                  @Param("estados") Collection<EstadoReserva> estados);
    @Query("""
           select coalesce(sum(r.cantidad), 0) from Reserva r
           where r.habitacion.id=:habitacionId
             and r.estado in :estados
             and r.fechaInicio<:fechaFin
             and r.fechaFin>:fechaInicio
           """)
    long contarUnidadesOcupadas(@Param("habitacionId") Long habitacionId,
                                @Param("fechaInicio") LocalDate fechaInicio,
                                @Param("fechaFin") LocalDate fechaFin,
                                @Param("estados") Collection<EstadoReserva> estados);
    @EntityGraph(attributePaths={"usuario", "habitacion", "propiedad", "propiedad.anfitrion"})
    @Query("select r from Reserva r where r.id=:id")
    Reserva buscarConRelaciones(@Param("id") Long id);
}
