package app.domain.model;
import app.domain.enums.EstadoHabitacion;
import app.domain.enums.EstadoPropiedad;
import app.domain.enums.PoliticaCancelacion;
import app.domain.enums.TipoAlojamiento;
import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
 *
 * @author inici4rsesi0n
 */
@Entity
@Table(name="propiedades")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class Propiedad{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id_propiedad")
    private Long id;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_anfitrion", nullable=false)
    private Usuario anfitrion;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_categoria", nullable=false)
    private Categoria categoria;
    @Column(name="titulo", nullable=false, length=150)
    private String titulo;
    @Column(name="descripcion", nullable=false, length=1000)
    private String descripcion;
    @Column(name="ubicacion", nullable=false, length=150)
    private String ubicacion;
    @Column(name="latitud", nullable=false)
    private double latitud;
    @Column(name="longitud", nullable=false)
    private double longitud;
    @Enumerated(EnumType.STRING)
    @Column(name="tipo_alojamiento", nullable=false, length=30)
    private TipoAlojamiento tipoAlojamiento;
    @Enumerated(EnumType.STRING)
    @Column(name="politica_cancelacion", nullable=false, length=30)
    private PoliticaCancelacion politicaCancelacion;
    @Enumerated(EnumType.STRING)
    @Column(name="estado", nullable=false, length=30)
    private EstadoPropiedad estado;
    @Column(name="rating_promedio", nullable=false)
    private double ratingPromedio;
    @Column(name="total_reviews", nullable=false)
    private int totalReviews;
    @Column(name="es_favorito_entre_huespedes", nullable=false)
    private boolean esFavoritoEntreHuespedes;
    @OneToMany(mappedBy="propiedad", fetch=FetchType.LAZY, cascade=CascadeType.ALL, orphanRemoval=true)
    private List<ServicioPropiedad> servicios=new ArrayList<>();
    @OneToMany(mappedBy="propiedad", fetch=FetchType.LAZY, cascade=CascadeType.ALL, orphanRemoval=true)
    private List<Habitacion> habitaciones=new ArrayList<>();
    @OneToMany(mappedBy="propiedad", fetch=FetchType.LAZY, cascade=CascadeType.ALL, orphanRemoval=true)
    private List<Imagen> imagenes=new ArrayList<>();
    @Column(name="fecha_creacion", nullable=false)
    private LocalDateTime fechaCreacion;
    @Column(name="fecha_actualizacion", nullable=false)
    private LocalDateTime fechaActualizacion;
    @Column(name="fecha_eliminacion")
    private LocalDateTime fechaEliminacion;
    public Propiedad(Usuario anfitrion, Categoria categoria, String titulo, String descripcion,
                     String ubicacion, double latitud, double longitud,
                     TipoAlojamiento tipoAlojamiento, PoliticaCancelacion politicaCancelacion){
        if(anfitrion==null)
            throw new IllegalArgumentException("Anfitrion no puede ser nulo");
        if(!anfitrion.isEsAnfitrion())
            throw new IllegalArgumentException("El usuario no esta habilitado como anfitrion");
        if(categoria==null)
            throw new IllegalArgumentException("Categoria no puede ser nula");
        if(titulo==null||titulo.isBlank())
            throw new IllegalArgumentException("Titulo no puede ser nulo o vacio");
        if(descripcion==null||descripcion.isBlank())
            throw new IllegalArgumentException("Descripcion no puede ser nula o vacia");
        if(ubicacion==null||ubicacion.isBlank())
            throw new IllegalArgumentException("Ubicacion no puede ser nula o vacia");
        if(latitud<-90||latitud>90)
            throw new IllegalArgumentException("Latitud fuera de rango");
        if(longitud<-180||longitud>180)
            throw new IllegalArgumentException("Longitud fuera de rango");
        if(tipoAlojamiento==null)
            throw new IllegalArgumentException("Tipo de alojamiento no puede ser nulo");
        if(politicaCancelacion==null)
            throw new IllegalArgumentException("Politica de cancelacion no puede ser nula");
        this.anfitrion=anfitrion;
        this.categoria=categoria;
        this.titulo=titulo.trim();
        this.descripcion=descripcion.trim();
        this.ubicacion=ubicacion.trim();
        this.latitud=latitud;
        this.longitud=longitud;
        this.tipoAlojamiento=tipoAlojamiento;
        this.politicaCancelacion=politicaCancelacion;
        this.estado=EstadoPropiedad.BORRADOR;
        this.ratingPromedio=0.0;
        this.totalReviews=0;
        this.esFavoritoEntreHuespedes=false;
    }
    public void agregarHabitacion(Habitacion habitacion){
        if(habitacion==null)
            throw new IllegalArgumentException("Habitacion no puede ser nula");
        this.habitaciones.add(habitacion);
    }
    public void quitarHabitacion(Habitacion habitacion){
        this.habitaciones.remove(habitacion);
    }
    public void agregarImagen(Imagen imagen){
        if(imagen==null)
            throw new IllegalArgumentException("Imagen no puede ser nula");
        this.imagenes.add(imagen);
    }
    public void publicar(){
        if(this.estado==EstadoPropiedad.ACTIVA)
            throw new IllegalStateException("La propiedad ya esta activa");
        if(this.habitaciones.isEmpty())
            throw new IllegalStateException("La propiedad debe tener al menos una habitacion");
        if(this.imagenes.isEmpty())
            throw new IllegalStateException("La propiedad debe tener al menos una imagen");
        boolean hayDisponible=this.habitaciones.stream()
                .anyMatch(h->h.getEstado()==EstadoHabitacion.DISPONIBLE);
        if(!hayDisponible)
            throw new IllegalStateException("La propiedad debe tener al menos una habitacion DISPONIBLE");
        this.estado=EstadoPropiedad.ACTIVA;
    }
    public void desactivar(){
        if(this.estado==EstadoPropiedad.INACTIVA)
            throw new IllegalStateException("La propiedad ya esta inactiva");
        this.estado=EstadoPropiedad.INACTIVA;
    }
    public void marcarEliminada(){
        this.estado=EstadoPropiedad.ELIMINADA;
        this.fechaEliminacion=LocalDateTime.now();
    }
    public void actualizarRating(double promedio, int total){
        this.ratingPromedio=promedio;
        this.totalReviews=total;
        this.esFavoritoEntreHuespedes=promedio>=4.8&&total>=10;
    }
    @PrePersist
    void alCrear(){
        LocalDateTime ahora=LocalDateTime.now();
        this.fechaCreacion=ahora;
        this.fechaActualizacion=ahora;
    }
    @PreUpdate
    void alActualizar(){
        this.fechaActualizacion=LocalDateTime.now();
    }
}
