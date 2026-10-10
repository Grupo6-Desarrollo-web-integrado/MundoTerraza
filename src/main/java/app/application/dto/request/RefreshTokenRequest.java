package app.application.dto.request;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
/**
 *
 * @author inici4rsesi0n
 */
@Getter
@Setter
public class RefreshTokenRequest{
    @NotBlank
    private String refreshToken;
}
