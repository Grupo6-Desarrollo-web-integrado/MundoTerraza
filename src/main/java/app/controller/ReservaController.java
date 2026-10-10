package app.controller;
import app.application.dto.request.CrearReservaRequest;
import app.application.dto.response.HistorialEstadoReservaResponse;
import app.application.dto.response.ReservaResponse;
import app.application.service.ReservaService;
import app.infrastructure.security.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@RestController
@RequestMapping("/api/reservas")
public class ReservaController{
    private final ReservaService reservaService;
    public ReservaController(ReservaService reservaService){
        this.reservaService=reservaService;
    }
    @PostMapping
    public ResponseEntity<ReservaResponse> crear(@AuthenticationPrincipal CustomUserDetails user,
                                                 @Valid @RequestBody CrearReservaRequest request){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reservaService.crear(user.getId(), request));
    }
    @GetMapping("/mias")
    public ResponseEntity<List<ReservaResponse>> mias(@AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(reservaService.listarMisReservas(user.getId()));
    }
    @GetMapping("/recibidas")
    public ResponseEntity<List<ReservaResponse>> recibidas(@AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(reservaService.listarRecibidas(user.getId()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ReservaResponse> obtener(@AuthenticationPrincipal CustomUserDetails user,
                                                   @PathVariable Long id){
        return ResponseEntity.ok(reservaService.obtener(user.getId(), id));
    }
    @PutMapping("/{id}/confirmar")
    public ResponseEntity<ReservaResponse> confirmar(@AuthenticationPrincipal CustomUserDetails user,
                                                     @PathVariable Long id){
        return ResponseEntity.ok(reservaService.confirmar(user.getId(), id));
    }
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<ReservaResponse> cancelar(@AuthenticationPrincipal CustomUserDetails user,
                                                    @PathVariable Long id){
        return ResponseEntity.ok(reservaService.cancelar(user.getId(), id));
    }
    @GetMapping("/{id}/historial")
    public ResponseEntity<List<HistorialEstadoReservaResponse>> historial(
            @AuthenticationPrincipal CustomUserDetails user,
            @PathVariable Long id){
        return ResponseEntity.ok(reservaService.obtenerHistorial(user.getId(), id));
    }
}
