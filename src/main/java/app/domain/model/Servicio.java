package app.domain.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
 *
 * @author inici4rsesi0n
 */
@Entity
@Table(name="servicios")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class Servicio{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="nombre", nullable=false, unique=true, length=100)
    private String nombre;
    @Column(name="icono", length=50)
    private String icono;
    @Column(name="activo", nullable=false)
    private boolean activo;
    public Servicio(String nombre, String icono){
        if(nombre==null||nombre.isBlank())
            throw new IllegalArgumentException("Nombre no puede ser nulo o vacio");
        this.nombre=nombre.trim();
        this.icono=icono;
        this.activo=true;
    }
    public void activar(){
        if(this.activo)
            throw new IllegalStateException("El servicio ya esta activo");
        this.activo=true;
    }
    public void desactivar(){
        if(!this.activo)
            throw new IllegalStateException("El servicio ya esta inactivo");
        this.activo=false;
    }
}
