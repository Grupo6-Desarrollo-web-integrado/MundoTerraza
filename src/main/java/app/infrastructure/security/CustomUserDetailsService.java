package app.infrastructure.security;
import app.domain.model.Usuario;
import app.domain.valueobject.Email;
import app.infrastructure.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class CustomUserDetailsService implements UserDetailsService{
    private final UsuarioRepository usuarioRepository;
    public CustomUserDetailsService(UsuarioRepository usuarioRepository){
        this.usuarioRepository=usuarioRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String correo){
        Usuario usuario=usuarioRepository.findByCorreo(Email.de(correo))
                .orElseThrow(()->new UsernameNotFoundException("Usuario no encontrado: "+correo));
        return new CustomUserDetails(usuario);
    }
    public UserDetails loadUserById(Long id){
        Usuario usuario=usuarioRepository.findById(id)
                .orElseThrow(()->new UsernameNotFoundException("Usuario no encontrado: "+id));
        return new CustomUserDetails(usuario);
    }
}
