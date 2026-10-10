package app.domain.valueobject;
import java.util.Objects;
/**
 *
 * @author inici4rsesi0n
 */
public final class Password{
    private static final int MIN_LONGITUD=6;
    private static final int MAX_LONGITUD=72;
    private final String valor;
    private final boolean hasheado;
    private Password(String valor, boolean hasheado){
        this.valor=valor;
        this.hasheado=hasheado;
    }
    public static Password plano(String valor){
        if(valor==null)
            throw new IllegalArgumentException("La contrasena no puede ser nula");
        if(valor.length()<MIN_LONGITUD)
            throw new IllegalArgumentException("La contrasena debe tener al menos "+MIN_LONGITUD+" caracteres");
        if(valor.length()>MAX_LONGITUD)
            throw new IllegalArgumentException("La contrasena no puede superar los "+MAX_LONGITUD+" caracteres");
        return new Password(valor, false);
    }
    public static Password hash(String valor){
        if(valor==null||valor.isBlank())
            throw new IllegalArgumentException("El hash de la contrasena no puede estar vacio");
        return new Password(valor, true);
    }
    public String getValor(){return valor;}
    public boolean estaHasheado(){return hasheado;}
    @Override
    public boolean equals(Object o){
        if(this==o)return true;
        if(!(o instanceof Password password))return false;
        return valor.equals(password.valor);
    }
    @Override
    public int hashCode(){return Objects.hash(valor);}
    @Override
    public String toString() {
        return hasheado?"Password[hash]":"Password[plano]";
    }
}
