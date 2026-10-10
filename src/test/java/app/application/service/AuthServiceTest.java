package app.application.service;
import app.application.dto.request.BecomeHostRequest;
import app.application.dto.request.LoginRequest;
import app.application.dto.request.RefreshTokenRequest;
import app.application.dto.request.RegisterRequest;
import app.application.dto.response.AuthResponse;
import app.domain.exception.AccountLockedException;
import app.domain.exception.BusinessException;
import app.domain.exception.InvalidCredentialsException;
import app.domain.model.Usuario;
import app.domain.valueobject.Email;
import app.infrastructure.repository.UsuarioRepository;
import app.infrastructure.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
/**
 *
 * @author inici4rsesi0n
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService - Orquestacion")
class AuthServiceTest{
    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    private AuthService authService;
    private static final int MAX_INTENTOS=5;
    private static final int MINUTOS_BLOQUEO=15;
    @BeforeEach
    void setup(){
        authService=new AuthService(usuarioRepository, passwordEncoder, jwtService,
                MAX_INTENTOS, MINUTOS_BLOQUEO);
    }
    @Nested
    @DisplayName("Registro")
    class Registro{
        @Test
        @DisplayName("Registra usuario nuevo correctamente")
        void registraOk(){
            when(usuarioRepository.existsByCorreo(any(Email.class))).thenReturn(false);
            when(passwordEncoder.encode(anyString())).thenReturn("$2a$10$hash");
            when(usuarioRepository.save(any(Usuario.class))).thenAnswer(i->i.getArgument(0));
            when(jwtService.generarAccessToken(any())).thenReturn("access");
            when(jwtService.generarRefreshToken(any())).thenReturn("refresh");

            RegisterRequest req=new RegisterRequest();
            req.setNombre("Test");
            req.setCorreo("test@test.com");
            req.setPassword("secreto123");

            AuthResponse resp=authService.register(req);

            assertNotNull(resp);
            assertEquals("Test", resp.nombre());
            assertEquals("test@test.com", resp.correo());
            verify(usuarioRepository).save(any(Usuario.class));
        }
        @Test
        @DisplayName("Falla si el correo ya existe")
        void fallaCorreoDuplicado(){
            when(usuarioRepository.existsByCorreo(any(Email.class))).thenReturn(true);

            RegisterRequest req=new RegisterRequest();
            req.setNombre("Test");
            req.setCorreo("test@test.com");
            req.setPassword("secreto123");

            assertThrows(BusinessException.class, ()->authService.register(req));
            verify(usuarioRepository, never()).save(any());
        }
    }
    @Nested
    @DisplayName("Login")
    class Login{
        @Test
        @DisplayName("Login correcto devuelve tokens")
        void loginOk(){
            Usuario u=nuevoUsuario();
            when(usuarioRepository.findByCorreo(any(Email.class))).thenReturn(Optional.of(u));
            when(passwordEncoder.matches("secreto123", "$2a$10$hash")).thenReturn(true);
            when(jwtService.generarAccessToken(u)).thenReturn("access");
            when(jwtService.generarRefreshToken(u)).thenReturn("refresh");

            AuthResponse resp=authService.login(loginRequest("test@test.com", "secreto123"));

            assertEquals("access", resp.accessToken());
            assertEquals("refresh", resp.refreshToken());
            assertEquals(0, u.getIntentosFallidos());
        }
        @Test
        @DisplayName("Falla si el correo no existe")
        void fallaCorreoInexistente(){
            when(usuarioRepository.findByCorreo(any(Email.class))).thenReturn(Optional.empty());

            assertThrows(InvalidCredentialsException.class,
                    ()->authService.login(loginRequest("no@no.com", "secreto123")));
        }
        @Test
        @DisplayName("Falla si la contrasena es incorrecta e incrementa intentos")
        void fallaPasswordIncorrecta(){
            Usuario u=nuevoUsuario();
            when(usuarioRepository.findByCorreo(any(Email.class))).thenReturn(Optional.of(u));
            when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);

            assertThrows(InvalidCredentialsException.class,
                    ()->authService.login(loginRequest("test@test.com", "mala")));
            assertEquals(1, u.getIntentosFallidos());
            verify(usuarioRepository).save(u);
        }
        @Test
        @DisplayName("Bloquea cuenta tras 5 intentos fallidos")
        void bloqueaTrasCincoIntentos(){
            Usuario u=nuevoUsuario();
            when(usuarioRepository.findByCorreo(any(Email.class))).thenReturn(Optional.of(u));
            when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);

            for(int i=0;i<MAX_INTENTOS;i++){
                try{
                    authService.login(loginRequest("test@test.com", "mala"));
                }catch(RuntimeException ignored){
                }
            }
            assertTrue(u.estaBloqueado());
        }
        @Test
        @DisplayName("Falla si la cuenta esta bloqueada")
        void fallaCuentaBloqueada(){
            Usuario u=nuevoUsuario();
            for(int i=0;i<MAX_INTENTOS;i++)
                u.registrarIntentoFallido(MAX_INTENTOS, MINUTOS_BLOQUEO);
            when(usuarioRepository.findByCorreo(any(Email.class))).thenReturn(Optional.of(u));

            assertThrows(AccountLockedException.class,
                    ()->authService.login(loginRequest("test@test.com", "secreto123")));
            verify(passwordEncoder, never()).matches(anyString(), anyString());
        }
    }
    @Nested
    @DisplayName("Refresh token")
    class Refresh{
        @Test
        @DisplayName("Refresh valido emite nuevos tokens")
        void refreshOk(){
            Usuario u=nuevoUsuario();
            u.setId(1L);
            when(jwtService.esTokenValido("refresh")).thenReturn(true);
            when(jwtService.esRefreshToken("refresh")).thenReturn(true);
            when(jwtService.extraerIdUsuario("refresh")).thenReturn(1L);
            when(usuarioRepository.findById(1L)).thenReturn(Optional.of(u));
            when(jwtService.generarAccessToken(u)).thenReturn("nuevo-access");
            when(jwtService.generarRefreshToken(u)).thenReturn("nuevo-refresh");

            RefreshTokenRequest req=new RefreshTokenRequest();
            req.setRefreshToken("refresh");

            AuthResponse resp=authService.refresh(req);
            assertEquals("nuevo-access", resp.accessToken());
        }
        @Test
        @DisplayName("Refresh invalido falla")
        void refreshInvalido(){
            when(jwtService.esTokenValido("malo")).thenReturn(false);

            RefreshTokenRequest req=new RefreshTokenRequest();
            req.setRefreshToken("malo");

            assertThrows(InvalidCredentialsException.class, ()->authService.refresh(req));
        }
    }
    @Nested
    @DisplayName("Become host")
    class BecomeHost{
        @Test
        @DisplayName("Convierte usuario en anfitrion")
        void convierteOk(){
            Usuario u=nuevoUsuario();
            u.setId(1L);
            when(usuarioRepository.findById(1L)).thenReturn(Optional.of(u));
            when(usuarioRepository.save(u)).thenReturn(u);
            when(jwtService.generarAccessToken(u)).thenReturn("a");
            when(jwtService.generarRefreshToken(u)).thenReturn("r");

            BecomeHostRequest req=new BecomeHostRequest();
            req.setTelefono("987654321");
            req.setDni("12345678");
            req.setCiudad("Lima");
            req.setBiografia("Biografia valida de anfitrion en MundoTerraza");
            req.setAceptaTerminos(true);

            AuthResponse resp=authService.becomeHost(1L, req);
            assertTrue(resp.esAnfitrion());
            assertEquals("ANFITRION", resp.rol());
        }
    }
    private Usuario nuevoUsuario(){
        return new Usuario("Test", Email.de("test@test.com"), "$2a$10$hash");
    }
    private LoginRequest loginRequest(String correo, String password){
        LoginRequest req=new LoginRequest();
        req.setCorreo(correo);
        req.setPassword(password);
        return req;
    }
}
