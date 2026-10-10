package app.application.dto.request;
import jakarta.validation.constraints.Email;
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
public class RegisterRequest{
    @NotBlank
    @Size(min=2, max=100)
    private String nombre;
    @NotBlank
    @Email
    @Size(max=150)
    private String correo;
    @NotBlank
    @Size(min=6, max=72)
    private String password;
}
