package app.infrastructure.security;
import app.domain.model.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
public class CustomUserDetails implements UserDetails{
    private final Usuario usuario;
    public CustomUserDetails(Usuario usuario){
        if(usuario==null)
            throw new IllegalArgumentException("Usuario no puede ser nulo");
        this.usuario=usuario;
    }
    public Usuario getUsuario(){return usuario;}
    public Long getId(){return usuario.getId();}
    public boolean esAnfitrion(){return usuario.isEsAnfitrion();}
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        if(usuario.isEsAnfitrion())
            return List.of(new SimpleGrantedAuthority("ROLE_HUESPED"),
                           new SimpleGrantedAuthority("ROLE_ANFITRION"));
        return List.of(new SimpleGrantedAuthority("ROLE_HUESPED"));
    }
    @Override
    public String getPassword(){return usuario.getPasswordHash();}
    @Override
    public String getUsername(){return usuario.getCorreo().getValor();}
    @Override
    public boolean isAccountNonExpired(){return true;}
    @Override
    public boolean isAccountNonLocked(){return !usuario.estaBloqueado();}
    @Override
    public boolean isCredentialsNonExpired(){return true;}
    @Override
    public boolean isEnabled(){return usuario.getEstado()==app.domain.enums.EstadoUsuario.ACTIVA;}
}
