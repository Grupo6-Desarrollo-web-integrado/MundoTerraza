package app.domain.model;
import app.domain.enums.EstadoLiquidacion;
import app.domain.valueobject.Dinero;
import app.domain.valueobject.Porcentaje;
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
import jakarta.persistence.OneToOne;
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
@Table(name="liquidaciones")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class Liquidacion{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id_liquidacion")
    private Long id;
    @OneToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_reserva", nullable=false, unique=true)
    private Reserva reserva;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_anfitrion", nullable=false)
    private Usuario anfitrion;
    @Column(name="subtotal", nullable=false)
    private Dinero subtotal;
    @Column(name="porcentaje_comision", nullable=false)
    private Porcentaje porcentajeComision;
    @Column(name="monto_comision", nullable=false)
    private Dinero montoComision;
    @Column(name="monto_neto", nullable=false)
    private Dinero montoNeto;
    @Enumerated(EnumType.STRING)
    @Column(name="estado", nullable=false, length=30)
    private EstadoLiquidacion estado;
    @Column(name="fecha_generacion", nullable=false)
    private LocalDateTime fechaGeneracion;
    public Liquidacion(Reserva reserva){
        if(reserva==null)
            throw new IllegalArgumentException("Reserva no puede ser nula");
        this.reserva=reserva;
        this.anfitrion=reserva.getPropiedad().getAnfitrion();
        this.subtotal=reserva.getSubtotal();
        this.porcentajeComision=Reserva.COMISION_PLATAFORMA;
        this.montoComision=reserva.getComisionPlataforma();
        this.montoNeto=reserva.getMontoAnfitrion();
        this.estado=EstadoLiquidacion.PENDIENTE;
        this.fechaGeneracion=LocalDateTime.now();
    }
    public void marcarPagada(){
        if(this.estado==EstadoLiquidacion.PAGADA)
            throw new IllegalStateException("La liquidacion ya esta pagada");
        this.estado=EstadoLiquidacion.PAGADA;
    }
}
