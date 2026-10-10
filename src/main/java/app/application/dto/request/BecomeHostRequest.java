package app.application.dto.request;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
/**
 *
 * @author inici4rsesi0n
 */
@Getter
@Setter
public class BecomeHostRequest{
    @NotBlank
    @Pattern(regexp="9\\d{8}")
    private String telefono;
    @NotBlank
    @Pattern(regexp="\\d{8}")
    private String dni;
    @NotBlank
    @Size(min=2, max=100)
    private String ciudad;
    @NotBlank
    @Size(min=20, max=500)
    private String biografia;
    @AssertTrue
    private boolean aceptaTerminos;
}
