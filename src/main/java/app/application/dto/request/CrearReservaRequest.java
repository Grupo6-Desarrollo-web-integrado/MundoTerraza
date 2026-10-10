package app.application.dto.request;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
/**
 *
 * @author inici4rsesi0n
 */
@Getter
@Setter
public class CrearReservaRequest{
    @NotNull
    private Long habitacionId;
    @NotNull
    @Min(1)
    private Integer cantidad;
    @NotNull
    private LocalDate fechaInicio;
    @NotNull
    private LocalDate fechaFin;
}
