package app.controller;
import app.application.dto.request.CrearPagoRequest;
import app.application.dto.response.PagoResponse;
import app.application.service.PagoService;
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
/**
 *
 * @author inici4rsesi0n
 */
@RestController
@RequestMapping("/api/pagos")
public class PagoController{
    private final PagoService pagoService;
    public PagoController(PagoService pagoService){
        this.pagoService=pagoService;
    }
    @PostMapping
    public ResponseEntity<PagoResponse> registrar(@AuthenticationPrincipal CustomUserDetails user,
                                                  @Valid @RequestBody CrearPagoRequest request){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(pagoService.registrar(user.getId(), request));
    }
    @PutMapping("/{id}/aprobar")
    public ResponseEntity<PagoResponse> aprobar(@AuthenticationPrincipal CustomUserDetails user,
                                                @PathVariable Long id){
        return ResponseEntity.ok(pagoService.aprobar(user.getId(), id));
    }
    @PutMapping("/{id}/rechazar")
    public ResponseEntity<PagoResponse> rechazar(@AuthenticationPrincipal CustomUserDetails user,
                                                 @PathVariable Long id){
        return ResponseEntity.ok(pagoService.rechazar(user.getId(), id));
    }
    @GetMapping("/reserva/{reservaId}")
    public ResponseEntity<PagoResponse> obtener(@AuthenticationPrincipal CustomUserDetails user,
                                                @PathVariable Long reservaId){
        return ResponseEntity.ok(pagoService.obtener(user.getId(), reservaId));
    }
}
