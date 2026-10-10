package app.controller;
import app.application.dto.response.NotificacionResponse;
import app.application.service.NotificacionService;
import app.infrastructure.security.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;
/**
 *
 * @author inici4rsesi0n
 */
@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController{
    private final NotificacionService notificacionService;
    public NotificacionController(NotificacionService notificacionService){
        this.notificacionService=notificacionService;
    }
    @GetMapping
    public ResponseEntity<List<NotificacionResponse>> listar(@AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(notificacionService.listar(user.getId()));
    }
    @GetMapping("/no-leidas")
    public ResponseEntity<List<NotificacionResponse>> noLeidas(@AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(notificacionService.listarNoLeidas(user.getId()));
    }
    @GetMapping("/contador")
    public ResponseEntity<Map<String, Long>> contador(@AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(Map.of("noLeidas", notificacionService.contarNoLeidas(user.getId())));
    }
    @PutMapping("/{id}/leida")
    public ResponseEntity<NotificacionResponse> marcarLeida(@AuthenticationPrincipal CustomUserDetails user,
                                                            @PathVariable Long id){
        return ResponseEntity.ok(notificacionService.marcarLeida(user.getId(), id));
    }
    @PutMapping("/leidas-todas")
    public ResponseEntity<Void> marcarTodas(@AuthenticationPrincipal CustomUserDetails user){
        notificacionService.marcarTodasLeidas(user.getId());
        return ResponseEntity.noContent().build();
    }
}
