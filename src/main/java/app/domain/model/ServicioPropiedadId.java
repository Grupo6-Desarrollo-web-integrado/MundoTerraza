package app.domain.model;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
 *
 * @author inici4rsesi0n
 */
@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServicioPropiedadId implements Serializable{
    @Column(name="id_propiedad")
    private Long propiedadId;
    @Column(name="id_servicio")
    private Long servicioId;
    @Override
    public boolean equals(Object o){
        if(this==o)return true;
        if(!(o instanceof ServicioPropiedadId that))return false;
        return Objects.equals(propiedadId, that.propiedadId)&&Objects.equals(servicioId, that.servicioId);
    }
    @Override
    public int hashCode(){return Objects.hash(propiedadId, servicioId);}
}
