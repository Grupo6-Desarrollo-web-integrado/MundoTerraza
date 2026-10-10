package app.domain.exception;
/**
 *
 * @author inici4rsesi0n
 */
public class NotFoundException extends BusinessException{
    public NotFoundException(String mensaje){
        super(mensaje);
    }
}
