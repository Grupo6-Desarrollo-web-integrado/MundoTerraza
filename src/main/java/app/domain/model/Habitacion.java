package app.domain.model;
import app.domain.enums.EstadoHabitacion;
import app.domain.valueobject.Dinero;
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
@Table(name="habitaciones")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class Habitacion{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id_habitacion")
    private Long id;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_propiedad", nullable=false)
    private Propiedad propiedad;
    @Column(name="nombre", nullable=false, length=100)
    private String nombre;
    @Column(name="descripcion", nullable=false, length=500)
    private String descripcion;
    @Column(name="precio_noche", nullable=false)
    private Dinero precioNoche;
    @Column(name="max_adultos", nullable=false)
    private int maxAdultos;
    @Column(name="max_ninos", nullable=false)
    private int maxNinos;
    @Column(name="max_bebes", nullable=false)
    private int maxBebes;
    @Column(name="max_mascotas", nullable=false)
    private int maxMascotas;
    @Column(name="cantidad_dormitorios", nullable=false)
    private int cantidadDormitorios;
    @Column(name="cantidad_banios", nullable=false)
    private int cantidadBanios;
    @Column(name="metros_cuadrados", nullable=false)
    private double metrosCuadrados;
    @Column(name="stock_total", nullable=false)
    private int stockTotal;
    @Enumerated(EnumType.STRING)
    @Column(name="estado", nullable=false, length=30)
    private EstadoHabitacion estado;
    @OneToMany(mappedBy="habitacion", fetch=FetchType.LAZY, cascade=CascadeType.ALL, orphanRemoval=true)
    private List<Imagen> imagenes=new ArrayList<>();
    @Column(name="fecha_creacion", nullable=false)
    private LocalDateTime fechaCreacion;
    @Column(name="fecha_actualizacion", nullable=false)
    private LocalDateTime fechaActualizacion;
    public Habitacion(Propiedad propiedad, String nombre, String descripcion, Dinero precioNoche,
                      int maxAdultos, int maxNinos, int maxBebes, int maxMascotas,
                      int cantidadDormitorios, int cantidadBanios, double metrosCuadrados, int stockTotal){
        if(propiedad==null)
            throw new IllegalArgumentException("Propiedad no puede ser nula");
        if(nombre==null||nombre.isBlank())
            throw new IllegalArgumentException("Nombre no puede ser nulo o vacio");
        if(descripcion==null||descripcion.isBlank())
            throw new IllegalArgumentException("Descripcion no puede ser nula o vacia");
        if(precioNoche==null)
            throw new IllegalArgumentException("Precio por noche no puede ser nulo");
        if(maxAdultos<1)
            throw new IllegalArgumentException("Max adultos debe ser al menos 1");
        if(maxNinos<0||maxBebes<0||maxMascotas<0)
            throw new IllegalArgumentException("Los maximos de ninos, bebes y mascotas no pueden ser negativos");
        if(cantidadDormitorios<1)
            throw new IllegalArgumentException("Cantidad de dormitorios debe ser al menos 1");
        if(cantidadBanios<1)
            throw new IllegalArgumentException("Cantidad de banios debe ser al menos 1");
        if(metrosCuadrados<=0)
            throw new IllegalArgumentException("Metros cuadrados debe ser mayor a cero");
        if(stockTotal<1)
            throw new IllegalArgumentException("Stock total debe ser al menos 1");
        this.propiedad=propiedad;
        this.nombre=nombre.trim();
        this.descripcion=descripcion.trim();
        this.precioNoche=precioNoche;
        this.maxAdultos=maxAdultos;
        this.maxNinos=maxNinos;
        this.maxBebes=maxBebes;
        this.maxMascotas=maxMascotas;
        this.cantidadDormitorios=cantidadDormitorios;
        this.cantidadBanios=cantidadBanios;
        this.metrosCuadrados=metrosCuadrados;
        this.stockTotal=stockTotal;
        this.estado=EstadoHabitacion.DISPONIBLE;
    }
    public void agregarImagen(Imagen imagen){
        if(imagen==null)
            throw new IllegalArgumentException("Imagen no puede ser nula");
        this.imagenes.add(imagen);
    }
    public void ponerEnMantenimiento(){
        if(this.estado==EstadoHabitacion.MANTENIMIENTO)
            throw new IllegalStateException("La habitacion ya esta en mantenimiento");
        this.estado=EstadoHabitacion.MANTENIMIENTO;
    }
    public void marcarDisponible(){
        if(this.estado==EstadoHabitacion.DISPONIBLE)
            throw new IllegalStateException("La habitacion ya esta disponible");
        this.estado=EstadoHabitacion.DISPONIBLE;
    }
    public void desactivar(){
        this.estado=EstadoHabitacion.INACTIVA;
    }
    public void actualizarPrecio(Dinero nuevoPrecio){
        if(nuevoPrecio==null)
            throw new IllegalArgumentException("Precio no puede ser nulo");
        this.precioNoche=nuevoPrecio;
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
