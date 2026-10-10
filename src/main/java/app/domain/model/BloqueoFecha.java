package app.domain.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
 *
 * @author inici4rsesi0n
 */
@Entity
@Table(name="bloqueos_fecha")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class BloqueoFecha{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id_bloqueo")
    private Long id;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_habitacion", nullable=false)
    private Habitacion habitacion;
    @Column(name="fecha_inicio", nullable=false)
    private LocalDate fechaInicio;
    @Column(name="fecha_fin", nullable=false)
    private LocalDate fechaFin;
    @Column(name="motivo", length=255)
    private String motivo;
    public BloqueoFecha(Habitacion habitacion, LocalDate fechaInicio,
                        LocalDate fechaFin, String motivo){
        if(habitacion==null)
            throw new IllegalArgumentException("Habitacion no puede ser nula");
        if(fechaInicio==null||fechaFin==null)
            throw new IllegalArgumentException("Fechas no pueden ser nulas");
        if(!fechaFin.isAfter(fechaInicio))
            throw new IllegalArgumentException("Fecha fin debe ser posterior a fecha inicio");
        this.habitacion=habitacion;
        this.fechaInicio=fechaInicio;
        this.fechaFin=fechaFin;
        this.motivo=motivo;
    }
}
