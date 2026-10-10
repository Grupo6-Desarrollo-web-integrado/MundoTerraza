package app.application.dto.response;
/**
 *
 * @author inici4rsesi0n
 */
public record CategoriaResponse(
        Long id,
        String nombre,
        String descripcion,
        boolean activa
){}
