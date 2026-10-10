package app.application.dto.request;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Getter
@Setter
public class CrearPropiedadRequest{
    @NotBlank
    @Size(min=5, max=150)
    private String titulo;
    @NotBlank
    @Size(min=20, max=1000)
    private String descripcion;
    @NotBlank
    @Size(min=3, max=150)
    private String ubicacion;
    @NotNull
    @DecimalMin("-90.0")
    @DecimalMax("90.0")
    private Double latitud;
    @NotNull
    @DecimalMin("-180.0")
    @DecimalMax("180.0")
    private Double longitud;
    @NotBlank
    private String tipoAlojamiento;
    @NotBlank
    private String politicaCancelacion;
    @NotNull
    private Long categoriaId;
    private List<Long> servicioIds=new ArrayList<>();
}
