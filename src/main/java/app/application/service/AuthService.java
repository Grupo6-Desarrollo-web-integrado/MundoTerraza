package app.application.service;
import app.application.dto.request.BecomeHostRequest;
import app.application.dto.request.LoginRequest;
import app.application.dto.request.RefreshTokenRequest;
import app.application.dto.request.RegisterRequest;
import app.application.dto.response.AuthResponse;
import app.domain.exception.AccountLockedException;
import app.domain.exception.BusinessException;
import app.domain.exception.InvalidCredentialsException;
import app.domain.exception.NotFoundException;
import app.domain.model.Usuario;
import app.domain.valueobject.Dni;
import app.domain.valueobject.Email;
import app.domain.valueobject.Password;
import app.domain.valueobject.Telefono;
import app.infrastructure.repository.UsuarioRepository;
import app.infrastructure.security.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class AuthService{
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final int maxIntentos;
    private final int minutosBloqueo;
    public AuthService(UsuarioRepository usuarioRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       @Value("${app.security.max-failed-attempts}") int maxIntentos,
                       @Value("${app.security.lock-duration-minutes}") int minutosBloqueo){
        this.usuarioRepository=usuarioRepository;
        this.passwordEncoder=passwordEncoder;
        this.jwtService=jwtService;
        this.maxIntentos=maxIntentos;
        this.minutosBloqueo=minutosBloqueo;
    }
    @Transactional
    public AuthResponse register(RegisterRequest request){
        Email correo=Email.de(request.getCorreo());
        if(usuarioRepository.existsByCorreo(correo))
            throw new BusinessException("El correo ya esta registrado");
        Password password=Password.plano(request.getPassword());
        String hash=passwordEncoder.encode(password.getValor());
        Usuario usuario=new Usuario(request.getNombre(), correo, hash);
        usuarioRepository.save(usuario);
        return construirRespuesta(usuario);
    }
    @Transactional
    public AuthResponse login(LoginRequest request){
        Email correo=Email.de(request.getCorreo());
        Usuario usuario=usuarioRepository.findByCorreo(correo)
                .orElseThrow(()->new InvalidCredentialsException("Credenciales incorrectas"));
        if(usuario.estaBloqueado())
            throw new AccountLockedException("Cuenta bloqueada temporalmente. Intenta mas tarde");
        if(!passwordEncoder.matches(request.getPassword(), usuario.getPasswordHash())){
            usuario.registrarIntentoFallido(maxIntentos, minutosBloqueo);
            usuarioRepository.save(usuario);
            if(usuario.estaBloqueado())
                throw new AccountLockedException("Cuenta bloqueada por demasiados intentos fallidos");
            throw new InvalidCredentialsException("Credenciales incorrectas");
        }
        usuario.reiniciarIntentos();
        usuarioRepository.save(usuario);
        return construirRespuesta(usuario);
    }
    @Transactional(readOnly=true)
    public AuthResponse refresh(RefreshTokenRequest request){
        String token=request.getRefreshToken();
        if(!jwtService.esTokenValido(token)||!jwtService.esRefreshToken(token))
            throw new InvalidCredentialsException("Refresh token invalido o expirado");
        Long usuarioId=jwtService.extraerIdUsuario(token);
        Usuario usuario=usuarioRepository.findById(usuarioId)
                .orElseThrow(()->new NotFoundException("Usuario no encontrado"));
        return construirRespuesta(usuario);
    }
    @Transactional
    public AuthResponse becomeHost(Long usuarioId, BecomeHostRequest request){
        Usuario usuario=usuarioRepository.findById(usuarioId)
                .orElseThrow(()->new NotFoundException("Usuario no encontrado"));
        Telefono telefono=Telefono.de(request.getTelefono());
        Dni dni=Dni.de(request.getDni());
        usuario.convertirEnAnfitrion(telefono, dni, request.getCiudad(), request.getBiografia());
        usuarioRepository.save(usuario);
        return construirRespuesta(usuario);
    }
    private AuthResponse construirRespuesta(Usuario usuario){
        String access=jwtService.generarAccessToken(usuario);
        String refresh=jwtService.generarRefreshToken(usuario);
        return new AuthResponse(usuario.getId(), usuario.getNombre(),
                usuario.getCorreo().getValor(), rolDe(usuario), usuario.isEsAnfitrion(),
                access, refresh);
    }
    private String rolDe(Usuario usuario){
        return usuario.isEsAnfitrion()?"ANFITRION":"HUESPED";
    }
}
