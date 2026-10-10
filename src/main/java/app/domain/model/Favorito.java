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
@Table(name="favoritos")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class Favorito{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id_favorito")
    private Long id;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_usuario", nullable=false)
    private Usuario usuario;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_propiedad", nullable=false)
    private Propiedad propiedad;
    @Column(name="fecha", nullable=false)
    private LocalDateTime fecha;
    public Favorito(Usuario usuario, Propiedad propiedad){
        if(usuario==null)
            throw new IllegalArgumentException("Usuario no puede ser nulo");
        if(propiedad==null)
            throw new IllegalArgumentException("Propiedad no puede ser nula");
        this.usuario=usuario;
        this.propiedad=propiedad;
        this.fecha=LocalDateTime.now();
    }
}
