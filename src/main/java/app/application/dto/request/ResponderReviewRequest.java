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
public class ResponderReviewRequest{
    @NotBlank
    @Size(min=10, max=500)
    private String respuesta;
}
