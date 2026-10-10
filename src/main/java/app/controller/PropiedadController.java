package app.controller;
import app.application.dto.request.ActualizarPropiedadRequest;
import app.application.dto.request.CrearPropiedadRequest;
import app.application.dto.request.FiltroPropiedadRequest;
import app.application.dto.request.ReordenarImagenesRequest;
import app.application.dto.response.PageResponse;
import app.application.dto.response.PropiedadCardResponse;
import app.application.dto.response.PropiedadDetalleResponse;
import app.application.service.PropiedadService;
import app.infrastructure.security.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
/**
 *
 * @author inici4rsesi0n
 */
@RestController
@RequestMapping("/api/propiedades")
public class PropiedadController{
    private final PropiedadService propiedadService;
    public PropiedadController(PropiedadService propiedadService){
        this.propiedadService=propiedadService;
    }
    @GetMapping
    public ResponseEntity<PageResponse<PropiedadCardResponse>> listar(
            @ModelAttribute FiltroPropiedadRequest filtro,
            @RequestParam(defaultValue="0") int pagina,
            @RequestParam(defaultValue="10") int tamanio){
        return ResponseEntity.ok(propiedadService.listar(filtro, pagina, tamanio));
    }
    @GetMapping("/{id}")
    public ResponseEntity<PropiedadDetalleResponse> detalle(@PathVariable Long id){
        return ResponseEntity.ok(propiedadService.obtenerDetalle(id));
    }
    @PostMapping
    public ResponseEntity<PropiedadDetalleResponse> crear(@AuthenticationPrincipal CustomUserDetails user,
                                                          @Valid @RequestBody CrearPropiedadRequest request){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(propiedadService.crear(user.getId(), request));
    }
    @PutMapping("/{id}")
    public ResponseEntity<PropiedadDetalleResponse> actualizar(@AuthenticationPrincipal CustomUserDetails user,
                                                               @PathVariable Long id,
                                                               @Valid @RequestBody ActualizarPropiedadRequest request){
        return ResponseEntity.ok(propiedadService.actualizar(user.getId(), id, request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@AuthenticationPrincipal CustomUserDetails user,
                                         @PathVariable Long id){
        propiedadService.eliminar(user.getId(), id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/{id}/publicar")
    public ResponseEntity<PropiedadDetalleResponse> publicar(@AuthenticationPrincipal CustomUserDetails user,
                                                             @PathVariable Long id){
        return ResponseEntity.ok(propiedadService.publicar(user.getId(), id));
    }
    @PostMapping("/{id}/desactivar")
    public ResponseEntity<PropiedadDetalleResponse> desactivar(@AuthenticationPrincipal CustomUserDetails user,
                                                               @PathVariable Long id){
        return ResponseEntity.ok(propiedadService.desactivar(user.getId(), id));
    }
    @PostMapping("/{id}/imagenes")
    public ResponseEntity<Void> agregarImagen(@AuthenticationPrincipal CustomUserDetails user,
                                              @PathVariable Long id,
                                              @RequestParam("archivo") MultipartFile archivo){
        propiedadService.agregarImagen(user.getId(), id, archivo);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @DeleteMapping("/{id}/imagenes/{imagenId}")
    public ResponseEntity<Void> eliminarImagen(@AuthenticationPrincipal CustomUserDetails user,
                                               @PathVariable Long id,
                                               @PathVariable Long imagenId){
        propiedadService.eliminarImagen(user.getId(), id, imagenId);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}/imagenes/orden")
    public ResponseEntity<Void> reordenarImagenes(@AuthenticationPrincipal CustomUserDetails user,
                                                  @PathVariable Long id,
                                                  @Valid @RequestBody ReordenarImagenesRequest request){
        propiedadService.reordenarImagenes(user.getId(), id, request);
        return ResponseEntity.noContent().build();
    }
}
