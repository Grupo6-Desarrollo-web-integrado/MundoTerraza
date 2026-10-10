package app.domain.model;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
 *
 * @author inici4rsesi0n
 */
@Entity
@Table(name="servicios_propiedad")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class ServicioPropiedad{
    @EmbeddedId
    private ServicioPropiedadId id;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @MapsId("propiedadId")
    @JoinColumn(name="id_propiedad", nullable=false)
    private Propiedad propiedad;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @MapsId("servicioId")
    @JoinColumn(name="id_servicio", nullable=false)
    private Servicio servicio;
    @Column(name="fecha_asociacion", nullable=false)
    private LocalDateTime fechaAsociacion;
    public ServicioPropiedad(Propiedad propiedad, Servicio servicio){
        if(propiedad==null)
            throw new IllegalArgumentException("Propiedad no puede ser nula");
        if(servicio==null)
            throw new IllegalArgumentException("Servicio no puede ser nulo");
        if(!servicio.isActivo())
            throw new IllegalStateException("El servicio no esta activo");
        this.id=new ServicioPropiedadId(propiedad.getId(), servicio.getId());
        this.propiedad=propiedad;
        this.servicio=servicio;
        this.fechaAsociacion=LocalDateTime.now();
    }
}
