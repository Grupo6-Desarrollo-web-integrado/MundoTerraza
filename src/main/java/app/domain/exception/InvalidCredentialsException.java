package app.domain.exception;
/**
 *
 * @author inici4rsesi0n
 */
public class InvalidCredentialsException extends BusinessException{
    public InvalidCredentialsException(String mensaje){
        super(mensaje);
    }
}
