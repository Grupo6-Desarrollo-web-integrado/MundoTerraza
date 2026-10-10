package app.domain.valueobject;
import java.util.Objects;
import java.util.regex.Pattern;
/**
 *
 * @author inici4rsesi0n
 */
public final class Email{
    private static final Pattern PATRON=Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    private static final int MAX_LONGITUD=150;
    private final String valor;
    private Email(String valor){this.valor=valor;}
    public static Email de(String valor){
        if(valor==null)
            throw new IllegalArgumentException("El correo no puede ser nulo");
        String limpio=valor.trim().toLowerCase();
        if(limpio.isBlank())
            throw new IllegalArgumentException("El correo no puede estar vacio");
        if(limpio.length()>MAX_LONGITUD)
            throw new IllegalArgumentException("El correo supera los "+MAX_LONGITUD+" caracteres");
        if(!PATRON.matcher(limpio).matches())
            throw new IllegalArgumentException("El correo no tiene un formato valido");
        return new Email(limpio);
    }
    public String getValor(){return valor;}
    @Override
    public boolean equals(Object o){
        if(this==o)return true;
        if(!(o instanceof Email email))return false;
        return valor.equals(email.valor);
    }
    @Override
    public int hashCode(){return Objects.hash(valor);}
    @Override
    public String toString() {
        return valor;
    }
}
