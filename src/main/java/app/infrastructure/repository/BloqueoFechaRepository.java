package app.infrastructure.repository;
import app.domain.model.BloqueoFecha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Repository
public interface BloqueoFechaRepository extends JpaRepository<BloqueoFecha, Long>{
    List<BloqueoFecha> findByHabitacionIdOrderByFechaInicioAsc(Long habitacionId);
    @Query("""
           select b from BloqueoFecha b
           where b.habitacion.id=:habitacionId
             and b.fechaInicio<:fechaFin
             and b.fechaFin>:fechaInicio
           """)
    List<BloqueoFecha> buscarSolapados(@Param("habitacionId") Long habitacionId,
                                       @Param("fechaInicio") LocalDate fechaInicio,
                                       @Param("fechaFin") LocalDate fechaFin);
}
