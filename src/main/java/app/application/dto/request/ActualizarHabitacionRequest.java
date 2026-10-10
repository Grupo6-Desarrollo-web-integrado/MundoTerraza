package app.application.dto.request;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
/**
 *
 * @author inici4rsesi0n
 */
@Getter
@Setter
public class ActualizarHabitacionRequest{
    @NotBlank
    @Size(min=3, max=100)
    private String nombre;
    @NotBlank
    @Size(min=10, max=500)
    private String descripcion;
    @NotNull
    @DecimalMin(value="0.01")
    private BigDecimal precioNoche;
    @NotNull
    @Min(1)
    private Integer maxAdultos;
    @NotNull
    @Min(0)
    private Integer maxNinos;
    @NotNull
    @Min(0)
    private Integer maxBebes;
    @NotNull
    @Min(0)
    private Integer maxMascotas;
    @NotNull
    @Min(1)
    private Integer cantidadDormitorios;
    @NotNull
    @Min(1)
    private Integer cantidadBanios;
    @NotNull
    @DecimalMin(value="1.0")
    private Double metrosCuadrados;
    @NotNull
    @Min(1)
    private Integer stockTotal;
}
