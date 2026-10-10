package app.application.dto.response;
import java.time.LocalDateTime;
/**
 *
 * @author inici4rsesi0n
 */
public record ReviewResponse(
        Long id,
        Long usuarioId,
        String nombreUsuario,
        Long propiedadId,
        int rating,
        String comentario,
        String habitacionMencionada,
        String respuestaAnfitrion,
        LocalDateTime fechaRespuesta,
        String estado,
        LocalDateTime fechaCreacion,
        LocalDateTime fechaEdicion
){}
