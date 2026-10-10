package app.config;
import app.application.dto.response.ErrorResponse;
import app.domain.exception.AccountLockedException;
import app.domain.exception.BusinessException;
import app.domain.exception.ConflictoException;
import app.domain.exception.ForbiddenException;
import app.domain.exception.InvalidCredentialsException;
import app.domain.exception.NotFoundException;
import app.domain.exception.UnauthorizedException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
/**
 *
 * @author inici4rsesi0n
 */
@RestControllerAdvice
public class GlobalExceptionHandler{
    private static final Logger log=LoggerFactory.getLogger(GlobalExceptionHandler.class);
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> noEncontrado(NotFoundException e, HttpServletRequest request){
        return construir(HttpStatus.NOT_FOUND, e.getMessage(), request, null);
    }
    @ExceptionHandler(ConflictoException.class)
    public ResponseEntity<ErrorResponse> conflicto(ConflictoException e, HttpServletRequest request){
        return construir(HttpStatus.CONFLICT, e.getMessage(), request, null);
    }
    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorResponse> prohibido(ForbiddenException e, HttpServletRequest request){
        return construir(HttpStatus.FORBIDDEN, e.getMessage(), request, null);
    }
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> noAutorizado(UnauthorizedException e, HttpServletRequest request){
        return construir(HttpStatus.UNAUTHORIZED, e.getMessage(), request, null);
    }
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponse> credenciales(InvalidCredentialsException e, HttpServletRequest request){
        return construir(HttpStatus.UNAUTHORIZED, e.getMessage(), request, null);
    }
    @ExceptionHandler(AccountLockedException.class)
    public ResponseEntity<ErrorResponse> bloqueado(AccountLockedException e, HttpServletRequest request){
        return construir(HttpStatus.LOCKED, e.getMessage(), request, null);
    }
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> negocio(BusinessException e, HttpServletRequest request){
        return construir(HttpStatus.BAD_REQUEST, e.getMessage(), request, null);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> validacion(MethodArgumentNotValidException e, HttpServletRequest request){
        Map<String, String> detalles=new HashMap<>();
        for(FieldError fe:e.getBindingResult().getFieldErrors())
            detalles.put(fe.getField(), fe.getDefaultMessage());
        return construir(HttpStatus.BAD_REQUEST, "Datos invalidos en la peticion", request, detalles);
    }
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> archivoGrande(MaxUploadSizeExceededException e, HttpServletRequest request){
        return construir(HttpStatus.PAYLOAD_TOO_LARGE, "El archivo supera el tamano permitido", request, null);
    }
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> denegado(AccessDeniedException e, HttpServletRequest request){
        return construir(HttpStatus.FORBIDDEN, "No tienes permisos para esta operacion", request, null);
    }
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> autenticacion(AuthenticationException e, HttpServletRequest request){
        return construir(HttpStatus.UNAUTHORIZED, "Autenticacion requerida", request, null);
    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> argumentoIlegal(IllegalArgumentException e, HttpServletRequest request){
        return construir(HttpStatus.BAD_REQUEST, e.getMessage(), request, null);
    }
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponse> estadoIlegal(IllegalStateException e, HttpServletRequest request){
        return construir(HttpStatus.CONFLICT, e.getMessage(), request, null);
    }
    @ExceptionHandler(org.springframework.web.servlet.resource.NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> recursoNoEncontrado(
        org.springframework.web.servlet.resource.NoResourceFoundException e,
        HttpServletRequest request){
        return construir(HttpStatus.NOT_FOUND, "Recurso no encontrado", request, null);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> generico(Exception e, HttpServletRequest request){
        log.error("Error no controlado en {}", request.getRequestURI(), e);
        return construir(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno del servidor", request, null);
    }
    private ResponseEntity<ErrorResponse> construir(HttpStatus status, String mensaje,
                                                    HttpServletRequest request,
                                                    Map<String, String> detalles){
        ErrorResponse response=new ErrorResponse(LocalDateTime.now(), status.value(),
                status.getReasonPhrase(), mensaje, request.getRequestURI(), detalles);
        return ResponseEntity.status(status).body(response);
    }
}
