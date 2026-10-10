package app.domain.exception;
/**
 *
 * @author inici4rsesi0n
 */
public class ForbiddenException extends BusinessException{
    public ForbiddenException(String mensaje){
        super(mensaje);
    }
}
