package app.domain.exception;
/**
 *
 * @author inici4rsesi0n
 */
public class UnauthorizedException extends BusinessException{
    public UnauthorizedException(String mensaje){
        super(mensaje);
    }
}
