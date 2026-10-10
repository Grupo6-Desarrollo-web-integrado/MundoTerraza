package app.application.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
/**
 *
 * @author inici4rsesi0n
 */
@Getter
@Setter
public class ActualizarUsuarioRequest{
    @NotBlank
    @Size(min=2, max=100)
    private String nombre;
    @Size(max=100)
    private String ciudad;
    @Size(max=500)
    private String biografia;
}
