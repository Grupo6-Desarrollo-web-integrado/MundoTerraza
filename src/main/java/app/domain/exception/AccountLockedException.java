package app.domain.exception;
/**
 *
 * @author inici4rsesi0n
 */
public class AccountLockedException extends BusinessException{
    public AccountLockedException(String mensaje){
        super(mensaje);
    }
}
