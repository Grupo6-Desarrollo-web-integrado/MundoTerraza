package app.domain.model;
import app.domain.enums.EstadoReserva;
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
@Table(name="historial_estados_reserva")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class HistorialEstadoReserva{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="id_reserva", nullable=false)
    private Reserva reserva;
    @Enumerated(EnumType.STRING)
    @Column(name="estado_anterior", length=30)
    private EstadoReserva estadoAnterior;
    @Enumerated(EnumType.STRING)
    @Column(name="estado_nuevo", nullable=false, length=30)
    private EstadoReserva estadoNuevo;
    @Column(name="motivo", length=255)
    private String motivo;
    @Column(name="fecha", nullable=false)
    private LocalDateTime fecha;
    public HistorialEstadoReserva(Reserva reserva, EstadoReserva estadoAnterior,
                                  EstadoReserva estadoNuevo, String motivo){
        if(reserva==null)
            throw new IllegalArgumentException("Reserva no puede ser nula");
        if(estadoNuevo==null)
            throw new IllegalArgumentException("Estado nuevo no puede ser nulo");
        this.reserva=reserva;
        this.estadoAnterior=estadoAnterior;
        this.estadoNuevo=estadoNuevo;
        this.motivo=motivo;
        this.fecha=LocalDateTime.now();
    }
}
