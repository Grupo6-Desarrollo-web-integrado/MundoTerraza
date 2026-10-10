package app.domain.exception;
/**
 *
 * @author inici4rsesi0n
 */
public class BusinessException extends RuntimeException{
    public BusinessException(String mensaje){
        super(mensaje);
    }
}
