package app.controller;
import app.application.dto.response.FavoritoResponse;
import app.application.service.FavoritoService;
import app.infrastructure.security.CustomUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@RestController
@RequestMapping("/api/favoritos")
public class FavoritoController{
    private final FavoritoService favoritoService;
    public FavoritoController(FavoritoService favoritoService){
        this.favoritoService=favoritoService;
    }
    @GetMapping
    public ResponseEntity<List<FavoritoResponse>> listar(@AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(favoritoService.listar(user.getId()));
    }
    @PostMapping("/{propiedadId}")
    public ResponseEntity<Void> agregar(@AuthenticationPrincipal CustomUserDetails user,
                                        @PathVariable Long propiedadId){
        favoritoService.agregar(user.getId(), propiedadId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @DeleteMapping("/{propiedadId}")
    public ResponseEntity<Void> quitar(@AuthenticationPrincipal CustomUserDetails user,
                                       @PathVariable Long propiedadId){
        favoritoService.quitar(user.getId(), propiedadId);
        return ResponseEntity.noContent().build();
    }
}
