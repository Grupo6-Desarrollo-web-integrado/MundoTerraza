package app.application.dto.request;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
/**
 *
 * @author inici4rsesi0n
 */
@Getter
@Setter
public class CrearBloqueoRequest{
    private Long habitacionId;
    @NotNull
    private LocalDate fechaInicio;
    @NotNull
    private LocalDate fechaFin;
    @Size(max=255)
    private String motivo;
}
