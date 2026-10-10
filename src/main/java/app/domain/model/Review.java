package app.domain.model;
import app.domain.enums.EstadoReview;
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
import jakarta.persistence.PrePersist;
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
@Table(name="reviews")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class Review{
    public static final int DIAS_EDICION=30;
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id_review")
    private Long id;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_usuario", nullable=false)
    private Usuario usuario;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_propiedad", nullable=false)
    private Propiedad propiedad;
    @Column(name="rating", nullable=false)
    private int rating;
    @Column(name="comentario", nullable=false, length=500)
    private String comentario;
    @Column(name="habitacion_mencionada", length=150)
    private String habitacionMencionada;
    @Column(name="respuesta_anfitrion", length=500)
    private String respuestaAnfitrion;
    @Column(name="fecha_respuesta")
    private LocalDateTime fechaRespuesta;
    @Enumerated(EnumType.STRING)
    @Column(name="estado", nullable=false, length=30)
    private EstadoReview estado;
    @Column(name="fecha_creacion", nullable=false)
    private LocalDateTime fechaCreacion;
    @Column(name="fecha_edicion")
    private LocalDateTime fechaEdicion;
    @Column(name="fecha_eliminacion")
    private LocalDateTime fechaEliminacion;
    public Review(Usuario usuario, Propiedad propiedad, int rating,
                  String comentario, String habitacionMencionada){
        if(usuario==null)
            throw new IllegalArgumentException("Usuario no puede ser nulo");
        if(propiedad==null)
            throw new IllegalArgumentException("Propiedad no puede ser nula");
        if(rating<1||rating>5)
            throw new IllegalArgumentException("Rating debe estar entre 1 y 5");
        if(comentario==null||comentario.trim().length()<10)
            throw new IllegalArgumentException("Comentario debe tener al menos 10 caracteres");
        if(comentario.length()>500)
            throw new IllegalArgumentException("Comentario no puede superar 500 caracteres");
        this.usuario=usuario;
        this.propiedad=propiedad;
        this.rating=rating;
        this.comentario=comentario.trim();
        this.habitacionMencionada=habitacionMencionada;
        this.estado=EstadoReview.ACTIVA;
    }
    public void editar(int nuevoRating, String nuevoComentario){
        if(!dentroDePlazoEdicion())
            throw new IllegalStateException("El plazo de edicion de 30 dias ha vencido");
        if(nuevoRating<1||nuevoRating>5)
            throw new IllegalArgumentException("Rating debe estar entre 1 y 5");
        if(nuevoComentario==null||nuevoComentario.trim().length()<10)
            throw new IllegalArgumentException("Comentario debe tener al menos 10 caracteres");
        if(nuevoComentario.length()>500)
            throw new IllegalArgumentException("Comentario no puede superar 500 caracteres");
        this.rating=nuevoRating;
        this.comentario=nuevoComentario.trim();
        this.fechaEdicion=LocalDateTime.now();
    }
    public void responder(String respuesta){
        if(respuestaAnfitrion!=null)
            throw new IllegalStateException("Ya existe una respuesta del anfitrion");
        if(respuesta==null||respuesta.trim().length()<10)
            throw new IllegalArgumentException("Respuesta debe tener al menos 10 caracteres");
        if(respuesta.length()>500)
            throw new IllegalArgumentException("Respuesta no puede superar 500 caracteres");
        this.respuestaAnfitrion=respuesta.trim();
        this.fechaRespuesta=LocalDateTime.now();
    }
    public void eliminar(){
        if(!dentroDePlazoEdicion())
            throw new IllegalStateException("Solo se puede eliminar dentro de los 30 dias");
        this.estado=EstadoReview.ELIMINADA;
        this.fechaEliminacion=LocalDateTime.now();
    }
    public boolean dentroDePlazoEdicion(){
        return LocalDateTime.now().isBefore(fechaCreacion.plusDays(DIAS_EDICION));
    }
    @PrePersist
    void alCrear(){
        this.fechaCreacion=LocalDateTime.now();
    }
}
