package app.application.dto.response;
/**
 *
 * @author inici4rsesi0n
 */
public record ServicioResponse(
        Long id,
        String nombre,
        String icono,
        boolean activo
){}
