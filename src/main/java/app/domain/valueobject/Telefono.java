package app.domain.valueobject;
import java.util.Objects;
/**
 *
 * @author inici4rsesi0n
 */
public final class Telefono{
    private static final int LONGITUD=9;
    private final String valor;
    private Telefono(String valor){this.valor=valor;}
    public static Telefono de(String valor){
        if(valor==null)
            throw new IllegalArgumentException("El telefono no puede ser nulo");
        String limpio=valor.trim();
        if(!limpio.matches("9\\d{"+(LONGITUD-1)+"}"))
            throw new IllegalArgumentException("El telefono debe tener "+LONGITUD+" digitos e iniciar con 9");
        return new Telefono(limpio);
    }
    public String getValor(){return valor;}
    @Override
    public boolean equals(Object o){
        if(this==o)return true;
        if(!(o instanceof Telefono telefono))return false;
        return valor.equals(telefono.valor);
    }
    @Override
    public int hashCode(){return Objects.hash(valor);}
    @Override
    public String toString() {
        return valor;
    }
}
