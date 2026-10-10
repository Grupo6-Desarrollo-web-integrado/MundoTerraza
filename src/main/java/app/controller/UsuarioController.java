package app.controller;
import app.application.dto.request.ActualizarUsuarioRequest;
import app.application.dto.response.UsuarioResponse;
import app.application.service.UsuarioService;
import app.infrastructure.security.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 *
 * @author inici4rsesi0n
 */
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController{
    private final UsuarioService usuarioService;
    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService=usuarioService;
    }
    @GetMapping("/me")
    public ResponseEntity<UsuarioResponse> perfil(@AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(usuarioService.obtenerPerfil(user.getId()));
    }
    @PutMapping("/me")
    public ResponseEntity<UsuarioResponse> actualizar(@AuthenticationPrincipal CustomUserDetails user,
                                                      @Valid @RequestBody ActualizarUsuarioRequest request){
        return ResponseEntity.ok(usuarioService.actualizarPerfil(user.getId(), request));
    }
}
