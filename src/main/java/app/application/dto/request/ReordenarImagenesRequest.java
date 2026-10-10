package app.application.dto.request;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Getter
@Setter
public class ReordenarImagenesRequest{
    @NotEmpty
    private List<@NotNull Long> imagenIds;
}
