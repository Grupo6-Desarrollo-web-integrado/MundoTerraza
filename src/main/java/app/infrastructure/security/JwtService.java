package app.infrastructure.security;
import app.domain.model.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class JwtService{
    public static final String TIPO_ACCESS="access";
    public static final String TIPO_REFRESH="refresh";
    private final String secreto;
    private final long expiracionAccessMs;
    private final long expiracionRefreshMs;
    public JwtService(@Value("${app.jwt.secret}") String secreto,
                      @Value("${app.jwt.access-expiration-minutes}") long accessMin,
                      @Value("${app.jwt.refresh-expiration-days}") long refreshDias){
        this.secreto=secreto;
        this.expiracionAccessMs=accessMin*60L*1000L;
        this.expiracionRefreshMs=refreshDias*24L*60L*60L*1000L;
    }
    public String generarAccessToken(Usuario usuario){
        return construir(usuario, TIPO_ACCESS, expiracionAccessMs);
    }
    public String generarRefreshToken(Usuario usuario){
        return construir(usuario, TIPO_REFRESH, expiracionRefreshMs);
    }
    private String construir(Usuario usuario, String tipo, long expMs){
        Date ahora=new Date();
        return Jwts.builder()
                .subject(String.valueOf(usuario.getId()))
                .claims(Map.of(
                        "correo", usuario.getCorreo().getValor(),
                        "nombre", usuario.getNombre(),
                        "esAnfitrion", usuario.isEsAnfitrion(),
                        "tipo", tipo))
                .issuedAt(ahora)
                .expiration(new Date(ahora.getTime()+expMs))
                .signWith(getClave())
                .compact();
    }
    public Long extraerIdUsuario(String token){
        return Long.parseLong(extraerClaim(token, Claims::getSubject));
    }
    public String extraerCorreo(String token){
        return extraerClaim(token, c->c.get("correo", String.class));
    }
    public String extraerTipo(String token){
        return extraerClaim(token, c->c.get("tipo", String.class));
    }
    public boolean esTokenValido(String token){
        try{
            Claims claims=extraerTodosLosClaims(token);
            return claims.getExpiration().after(new Date());
        }catch(Exception e){
            return false;
        }
    }
    public boolean esAccessToken(String token){
        return TIPO_ACCESS.equals(extraerTipo(token));
    }
    public boolean esRefreshToken(String token){
        return TIPO_REFRESH.equals(extraerTipo(token));
    }
    private <T> T extraerClaim(String token, Function<Claims, T> resolver){
        Claims claims=extraerTodosLosClaims(token);
        return resolver.apply(claims);
    }
    private Claims extraerTodosLosClaims(String token){
        return Jwts.parser()
                .verifyWith(getClave())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    private SecretKey getClave(){
        byte[] bytes;
        try{
            bytes=Decoders.BASE64.decode(secreto);
        }catch(Exception e){
            bytes=secreto.getBytes(StandardCharsets.UTF_8);
        }
        return Keys.hmacShaKeyFor(bytes);
    }
}
