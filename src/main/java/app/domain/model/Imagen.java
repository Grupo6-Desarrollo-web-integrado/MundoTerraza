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
@Table(name="imagenes")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class Imagen{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id_imagen")
    private Long id;
    @Column(name="url", nullable=false, length=255)
    private String url;
    @Column(name="orden", nullable=false)
    private int orden;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="id_propiedad")
    private Propiedad propiedad;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="id_habitacion")
    private Habitacion habitacion;
    @Column(name="fecha_subida", nullable=false)
    private LocalDateTime fechaSubida;
    public static Imagen paraPropiedad(Propiedad propiedad, String url, int orden){
        if(propiedad==null)
            throw new IllegalArgumentException("Propiedad no puede ser nula");
        if(url==null||url.isBlank())
            throw new IllegalArgumentException("URL no puede ser nula o vacia");
        if(orden<0)
            throw new IllegalArgumentException("Orden no puede ser negativo");
        Imagen imagen=new Imagen();
        imagen.propiedad=propiedad;
        imagen.url=url;
        imagen.orden=orden;
        imagen.fechaSubida=LocalDateTime.now();
        return imagen;
    }
    public static Imagen paraHabitacion(Habitacion habitacion, String url, int orden){
        if(habitacion==null)
            throw new IllegalArgumentException("Habitacion no puede ser nula");
        if(url==null||url.isBlank())
            throw new IllegalArgumentException("URL no puede ser nula o vacia");
        if(orden<0)
            throw new IllegalArgumentException("Orden no puede ser negativo");
        Imagen imagen=new Imagen();
        imagen.habitacion=habitacion;
        imagen.url=url;
        imagen.orden=orden;
        imagen.fechaSubida=LocalDateTime.now();
        return imagen;
    }
    public void cambiarOrden(int nuevoOrden){
        if(nuevoOrden<0)
            throw new IllegalArgumentException("Orden no puede ser negativo");
        this.orden=nuevoOrden;
    }
}
