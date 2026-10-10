package app.application.dto.request;
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
public class FiltroPropiedadRequest{
    private String texto;
    private Long categoriaId;
    private String tipoAlojamiento;
    private Double precioMin;
    private Double precioMax;
    private Integer huespedes;
    private List<Long> servicioIds=new ArrayList<>();
}
