package app.domain.model;
import app.domain.enums.TipoNotificacion;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name="notificaciones")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class Notificacion{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id_notificacion")
    private Long id;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_usuario", nullable=false)
    private Usuario usuario;
    @Enumerated(EnumType.STRING)
    @Column(name="tipo", nullable=false, length=50)
    private TipoNotificacion tipo;
    @Column(name="titulo", nullable=false, length=150)
    private String titulo;
    @Column(name="mensaje", nullable=false, length=500)
    private String mensaje;
    @Column(name="referencia_id")
    private Long referenciaId;
    @Column(name="leida", nullable=false)
    private boolean leida;
    @Column(name="fecha_creacion", nullable=false)
    private LocalDateTime fechaCreacion;
    public Notificacion(Usuario usuario, TipoNotificacion tipo, String titulo,
                        String mensaje, Long referenciaId){
        if(usuario==null)
            throw new IllegalArgumentException("Usuario no puede ser nulo");
        if(tipo==null)
            throw new IllegalArgumentException("Tipo de notificacion no puede ser nulo");
        if(titulo==null||titulo.isBlank())
            throw new IllegalArgumentException("Titulo no puede ser nulo o vacio");
        if(mensaje==null||mensaje.isBlank())
            throw new IllegalArgumentException("Mensaje no puede ser nulo o vacio");
        this.usuario=usuario;
        this.tipo=tipo;
        this.titulo=titulo.trim();
        this.mensaje=mensaje.trim();
        this.referenciaId=referenciaId;
        this.leida=false;
        this.fechaCreacion=LocalDateTime.now();
    }
    public void marcarLeida(){
        if(this.leida)
            throw new IllegalStateException("La notificacion ya esta marcada como leida");
        this.leida=true;
    }
}
