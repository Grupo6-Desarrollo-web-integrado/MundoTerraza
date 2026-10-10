package app.domain.model;
import app.domain.enums.EstadoPago;
import app.domain.enums.TipoPago;
import app.domain.valueobject.Dinero;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name="pagos")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class Pago{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id_pago")
    private Long id;
    @OneToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_reserva", nullable=false, unique=true)
    private Reserva reserva;
    @Column(name="monto", nullable=false)
    private Dinero monto;
    @Enumerated(EnumType.STRING)
    @Column(name="tipo_pago", nullable=false, length=30)
    private TipoPago tipoPago;
    @Enumerated(EnumType.STRING)
    @Column(name="estado", nullable=false, length=30)
    private EstadoPago estado;
    @Column(name="referencia", length=100)
    private String referencia;
    @Column(name="fecha", nullable=false)
    private LocalDateTime fecha;
    public Pago(Reserva reserva, TipoPago tipoPago, String referencia){
        if(reserva==null)
            throw new IllegalArgumentException("Reserva no puede ser nula");
        if(tipoPago==null)
            throw new IllegalArgumentException("Tipo de pago no puede ser nulo");
        this.reserva=reserva;
        this.monto=reserva.getSubtotal();
        this.tipoPago=tipoPago;
        this.referencia=referencia;
        this.estado=EstadoPago.PENDIENTE;
        this.fecha=LocalDateTime.now();
    }
    public void aprobar(){
        if(this.estado==EstadoPago.APROBADO)
            throw new IllegalStateException("El pago ya esta aprobado");
        this.estado=EstadoPago.APROBADO;
    }
    public void rechazar(){
        if(this.estado==EstadoPago.RECHAZADO)
            throw new IllegalStateException("El pago ya esta rechazado");
        this.estado=EstadoPago.RECHAZADO;
    }
    public void reembolsar(){
        if(this.estado!=EstadoPago.APROBADO)
            throw new IllegalStateException("Solo se puede reembolsar un pago APROBADO");
        this.estado=EstadoPago.REEMBOLSADO;
    }
}
