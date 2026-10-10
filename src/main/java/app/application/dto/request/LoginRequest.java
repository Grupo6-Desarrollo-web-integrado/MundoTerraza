package app.application.dto.request;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
/**
 *
 * @author inici4rsesi0n
 */
@Getter
@Setter
public class LoginRequest{
    @NotBlank
    @Email
    private String correo;
    @NotBlank
    private String password;
}
