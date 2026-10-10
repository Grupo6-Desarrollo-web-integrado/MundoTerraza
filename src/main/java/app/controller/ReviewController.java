package app.controller;
import app.application.dto.request.CrearReviewRequest;
import app.application.dto.request.EditarReviewRequest;
import app.application.dto.request.ResponderReviewRequest;
import app.application.dto.response.ReviewResponse;
import app.application.service.ReviewService;
import app.infrastructure.security.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/api")
public class ReviewController{
    private final ReviewService reviewService;
    public ReviewController(ReviewService reviewService){
        this.reviewService=reviewService;
    }
    @GetMapping("/propiedades/{propiedadId}/reviews")
    public ResponseEntity<List<ReviewResponse>> listar(@PathVariable Long propiedadId){
        return ResponseEntity.ok(reviewService.listarPorPropiedad(propiedadId));
    }
    @PostMapping("/reviews")
    public ResponseEntity<ReviewResponse> crear(@AuthenticationPrincipal CustomUserDetails user,
                                                @Valid @RequestBody CrearReviewRequest request){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.crear(user.getId(), request));
    }
    @PutMapping("/reviews/{id}")
    public ResponseEntity<ReviewResponse> editar(@AuthenticationPrincipal CustomUserDetails user,
                                                 @PathVariable Long id,
                                                 @Valid @RequestBody EditarReviewRequest request){
        return ResponseEntity.ok(reviewService.editar(user.getId(), id, request));
    }
    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> eliminar(@AuthenticationPrincipal CustomUserDetails user,
                                         @PathVariable Long id){
        reviewService.eliminar(user.getId(), id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/reviews/{id}/respuesta")
    public ResponseEntity<ReviewResponse> responder(@AuthenticationPrincipal CustomUserDetails user,
                                                    @PathVariable Long id,
                                                    @Valid @RequestBody ResponderReviewRequest request){
        return ResponseEntity.ok(reviewService.responder(user.getId(), id, request));
    }
}
