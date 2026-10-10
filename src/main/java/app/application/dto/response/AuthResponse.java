package app.application.dto.response;
/**
 *
 * @author inici4rsesi0n
 */
public record AuthResponse(
        Long id,
        String nombre,
        String correo,
        String rol,
        boolean esAnfitrion,
        String accessToken,
        String refreshToken
){}
