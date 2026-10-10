package app.application.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
/**
 *
 * @author inici4rsesi0n
 */
@Getter
@Setter
public class CrearPagoRequest{
    @NotNull
    private Long reservaId;
    @NotBlank
    private String tipoPago;
    private String referencia;
}
