package app.infrastructure.security;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
/**
 *
 * @author inici4rsesi0n
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    private static final String CABECERA="Authorization";
    private static final String PREFIJO="Bearer ";
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;
    public JwtAuthenticationFilter(JwtService jwtService,
                                   CustomUserDetailsService userDetailsService){
        this.jwtService=jwtService;
        this.userDetailsService=userDetailsService;
    }
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException{
        String cabecera=request.getHeader(CABECERA);
        if(cabecera==null||!cabecera.startsWith(PREFIJO)){
            filterChain.doFilter(request, response);
            return;
        }
        String token=cabecera.substring(PREFIJO.length());
        if(!jwtService.esTokenValido(token)||!jwtService.esAccessToken(token)){
            filterChain.doFilter(request, response);
            return;
        }
        Long usuarioId=jwtService.extraerIdUsuario(token);
        if(SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetails=userDetailsService.loadUserById(usuarioId);
            UsernamePasswordAuthenticationToken auth=
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        filterChain.doFilter(request, response);
    }
}
