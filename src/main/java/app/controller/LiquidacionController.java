package app.controller;
import app.application.dto.response.LiquidacionResponse;
import app.application.service.LiquidacionService;
import app.infrastructure.security.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@RestController
@RequestMapping("/api/liquidaciones")
public class LiquidacionController{
    private final LiquidacionService liquidacionService;
    public LiquidacionController(LiquidacionService liquidacionService){
        this.liquidacionService=liquidacionService;
    }
    @GetMapping
    public ResponseEntity<List<LiquidacionResponse>> listar(@AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(liquidacionService.listarDelAnfitrion(user.getId()));
    }
    @GetMapping("/pendientes")
    public ResponseEntity<List<LiquidacionResponse>> pendientes(@AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(liquidacionService.listarPendientes(user.getId()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<LiquidacionResponse> obtener(@AuthenticationPrincipal CustomUserDetails user,
                                                       @PathVariable Long id){
        return ResponseEntity.ok(liquidacionService.obtener(user.getId(), id));
    }
}
