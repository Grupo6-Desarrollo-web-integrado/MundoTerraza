package app.application.dto.request;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
/**
 *
 * @author inici4rsesi0n
 */
@Getter
@Setter
public class EditarReviewRequest{
    @NotNull
    @Min(1)
    @Max(5)
    private Integer rating;
    @NotBlank
    @Size(min=10, max=500)
    private String comentario;
}
