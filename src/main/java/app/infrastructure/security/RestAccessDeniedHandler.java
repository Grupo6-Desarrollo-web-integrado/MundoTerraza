package app.infrastructure.security;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;
/**
 *
 * @author inici4rsesi0n
 */
@Component
public class RestAccessDeniedHandler implements AccessDeniedHandler{
    private final ObjectMapper objectMapper;
    public RestAccessDeniedHandler(ObjectMapper objectMapper){
        this.objectMapper=objectMapper;
    }
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException)
            throws IOException, ServletException{
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        Map<String, Object> cuerpo=Map.of(
                "timestamp", LocalDateTime.now().toString(),
                "status", 403,
                "error", "Forbidden",
                "message", "No tienes permisos para esta operacion",
                "path", request.getRequestURI());
        objectMapper.writeValue(response.getOutputStream(), cuerpo);
    }
}
