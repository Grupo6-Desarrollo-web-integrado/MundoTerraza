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
@Table(name="categorias")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class Categoria{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="nombre", nullable=false, unique=true, length=100)
    private String nombre;
    @Column(name="descripcion", length=255)
    private String descripcion;
    @Column(name="activa", nullable=false)
    private boolean activa;
    public Categoria(String nombre, String descripcion){
        if(nombre==null||nombre.isBlank())
            throw new IllegalArgumentException("Nombre no puede ser nulo o vacio");
        this.nombre=nombre.trim();
        this.descripcion=descripcion;
        this.activa=true;
    }
    public void activar(){
        if(this.activa)
            throw new IllegalStateException("La categoria ya esta activa");
        this.activa=true;
    }
    public void desactivar(){
        if(!this.activa)
            throw new IllegalStateException("La categoria ya esta inactiva");
        this.activa=false;
    }
}
