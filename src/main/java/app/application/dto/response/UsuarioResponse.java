package app.application.dto.response;
import java.time.LocalDateTime;
/**
 *
 * @author inici4rsesi0n
 */
public record UsuarioResponse(
        Long id,
        String nombre,
        String correo,
        String telefono,
        String dni,
        String ciudad,
        String biografia,
        boolean esAnfitrion,
        LocalDateTime fechaAnfitrion,
        LocalDateTime fechaCreacion
){}
