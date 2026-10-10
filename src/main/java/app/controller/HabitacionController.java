package app.controller;
import app.application.dto.request.ActualizarHabitacionRequest;
import app.application.dto.request.CrearBloqueoRequest;
import app.application.dto.request.CrearHabitacionRequest;
import app.application.dto.response.BloqueoFechaResponse;
import app.application.dto.response.DisponibilidadResponse;
import app.application.dto.response.HabitacionResponse;
import app.application.service.BloqueoFechaService;
import app.application.service.DisponibilidadService;
import app.application.service.HabitacionService;
import app.infrastructure.security.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@RestController
@RequestMapping("/api")
public class HabitacionController{
    private final HabitacionService habitacionService;
    private final DisponibilidadService disponibilidadService;
    private final BloqueoFechaService bloqueoFechaService;
    public HabitacionController(HabitacionService habitacionService,
                                DisponibilidadService disponibilidadService,
                                BloqueoFechaService bloqueoFechaService){
        this.habitacionService=habitacionService;
        this.disponibilidadService=disponibilidadService;
        this.bloqueoFechaService=bloqueoFechaService;
    }
    @GetMapping("/propiedades/{propiedadId}/habitaciones")
    public ResponseEntity<List<HabitacionResponse>> listar(@PathVariable Long propiedadId){
        return ResponseEntity.ok(habitacionService.listarPorPropiedad(propiedadId));
    }
    @PostMapping("/propiedades/{propiedadId}/habitaciones")
    public ResponseEntity<HabitacionResponse> crear(@AuthenticationPrincipal CustomUserDetails user,
                                                    @PathVariable Long propiedadId,
                                                    @Valid @RequestBody CrearHabitacionRequest request){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(habitacionService.crear(user.getId(), propiedadId, request));
    }
    @PutMapping("/habitaciones/{id}")
    public ResponseEntity<HabitacionResponse> actualizar(@AuthenticationPrincipal CustomUserDetails user,
                                                         @PathVariable Long id,
                                                         @Valid @RequestBody ActualizarHabitacionRequest request){
        return ResponseEntity.ok(habitacionService.actualizar(user.getId(), id, request));
    }
    @DeleteMapping("/habitaciones/{id}")
    public ResponseEntity<Void> eliminar(@AuthenticationPrincipal CustomUserDetails user,
                                         @PathVariable Long id){
        habitacionService.eliminar(user.getId(), id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/habitaciones/{id}/imagenes")
    public ResponseEntity<Void> agregarImagen(@AuthenticationPrincipal CustomUserDetails user,
                                              @PathVariable Long id,
                                              @RequestParam("archivo") MultipartFile archivo){
        habitacionService.agregarImagen(user.getId(), id, archivo);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @DeleteMapping("/habitaciones/{id}/imagenes/{imagenId}")
    public ResponseEntity<Void> eliminarImagen(@AuthenticationPrincipal CustomUserDetails user,
                                               @PathVariable Long id,
                                               @PathVariable Long imagenId){
        habitacionService.eliminarImagen(user.getId(), id, imagenId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/habitaciones/{id}/disponibilidad")
    public ResponseEntity<DisponibilidadResponse> disponibilidad(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDate desde,
            @RequestParam @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDate hasta){
        return ResponseEntity.ok(disponibilidadService.consultar(id, desde, hasta));
    }
    @GetMapping("/habitaciones/{id}/bloqueos")
    public ResponseEntity<List<BloqueoFechaResponse>> listarBloqueos(@PathVariable Long id){
        return ResponseEntity.ok(bloqueoFechaService.listar(id));
    }
    @PostMapping("/habitaciones/{id}/bloqueos")
    public ResponseEntity<BloqueoFechaResponse> crearBloqueo(@AuthenticationPrincipal CustomUserDetails user,
                                                             @PathVariable Long id,
                                                             @Valid @RequestBody CrearBloqueoRequest request){
        CrearBloqueoRequest ajustado=new CrearBloqueoRequest();
        ajustado.setHabitacionId(id);
        ajustado.setFechaInicio(request.getFechaInicio());
        ajustado.setFechaFin(request.getFechaFin());
        ajustado.setMotivo(request.getMotivo());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bloqueoFechaService.crear(user.getId(), ajustado));
    }
    @DeleteMapping("/bloqueos/{id}")
    public ResponseEntity<Void> eliminarBloqueo(@AuthenticationPrincipal CustomUserDetails user,
                                                @PathVariable Long id){
        bloqueoFechaService.eliminar(user.getId(), id);
        return ResponseEntity.noContent().build();
    }
}
