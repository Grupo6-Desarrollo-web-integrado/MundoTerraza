package app.domain.model;
import app.domain.enums.EstadoReserva;
import app.domain.valueobject.Dinero;
import app.domain.valueobject.Porcentaje;
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
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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
@Table(name="reservas")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class Reserva{
    public static final Porcentaje COMISION_PLATAFORMA=Porcentaje.de(15.00);
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id_reserva")
    private Long id;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_usuario", nullable=false)
    private Usuario usuario;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_habitacion", nullable=false)
    private Habitacion habitacion;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_propiedad", nullable=false)
    private Propiedad propiedad;
    @Column(name="cantidad", nullable=false)
    private int cantidad;
    @Column(name="fecha_inicio", nullable=false)
    private LocalDate fechaInicio;
    @Column(name="fecha_fin", nullable=false)
    private LocalDate fechaFin;
    @Column(name="precio_por_noche_al_crear", nullable=false)
    private Dinero precioPorNocheAlCrear;
    @Column(name="subtotal", nullable=false)
    private Dinero subtotal;
    @Column(name="comision_plataforma", nullable=false)
    private Dinero comisionPlataforma;
    @Column(name="monto_anfitrion", nullable=false)
    private Dinero montoAnfitrion;
    @Enumerated(EnumType.STRING)
    @Column(name="estado", nullable=false, length=30)
    private EstadoReserva estado;
    @OneToMany(mappedBy="reserva", fetch=FetchType.LAZY, cascade=CascadeType.ALL, orphanRemoval=true)
    private List<HistorialEstadoReserva> historial=new ArrayList<>();
    @OneToOne(mappedBy="reserva", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
    private Pago pago;
    @Column(name="fecha_creacion", nullable=false)
    private LocalDateTime fechaCreacion;
    @Column(name="fecha_actualizacion", nullable=false)
    private LocalDateTime fechaActualizacion;
    public Reserva(Usuario usuario, Habitacion habitacion, int cantidad,
                   LocalDate fechaInicio, LocalDate fechaFin){
        if(usuario==null)
            throw new IllegalArgumentException("Usuario no puede ser nulo");
        if(habitacion==null)
            throw new IllegalArgumentException("Habitacion no puede ser nula");
        if(cantidad<1)
            throw new IllegalArgumentException("Cantidad debe ser al menos 1");
        if(fechaInicio==null||fechaFin==null)
            throw new IllegalArgumentException("Fechas no pueden ser nulas");
        if(!fechaFin.isAfter(fechaInicio))
            throw new IllegalArgumentException("Fecha fin debe ser posterior a fecha inicio");
        if(cantidad>habitacion.getStockTotal())
            throw new IllegalArgumentException("Cantidad excede el stock disponible");
        this.usuario=usuario;
        this.habitacion=habitacion;
        this.propiedad=habitacion.getPropiedad();
        this.cantidad=cantidad;
        this.fechaInicio=fechaInicio;
        this.fechaFin=fechaFin;
        this.precioPorNocheAlCrear=habitacion.getPrecioNoche();
        long noches=ChronoUnit.DAYS.between(fechaInicio, fechaFin);
        this.subtotal=habitacion.getPrecioNoche().multiplicar((int)noches).multiplicar(cantidad);
        this.comisionPlataforma=COMISION_PLATAFORMA.aplicarA(subtotal);
        this.montoAnfitrion=subtotal.restar(comisionPlataforma);
        this.estado=EstadoReserva.PENDIENTE;
    }
    public void confirmar(){
        if(this.estado!=EstadoReserva.PENDIENTE)
            throw new IllegalStateException("Solo se puede confirmar una reserva PENDIENTE");
        this.estado=EstadoReserva.CONFIRMADA;
    }
    public void cancelar(){
        if(this.estado==EstadoReserva.COMPLETADA)
            throw new IllegalStateException("No se puede cancelar una reserva COMPLETADA");
        if(this.estado==EstadoReserva.CANCELADA)
            throw new IllegalStateException("La reserva ya esta cancelada");
        this.estado=EstadoReserva.CANCELADA;
    }
    public void completar(){
        if(this.estado!=EstadoReserva.CONFIRMADA)
            throw new IllegalStateException("Solo se puede completar una reserva CONFIRMADA");
        this.estado=EstadoReserva.COMPLETADA;
    }
    public long getNoches(){
        return ChronoUnit.DAYS.between(fechaInicio, fechaFin);
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
