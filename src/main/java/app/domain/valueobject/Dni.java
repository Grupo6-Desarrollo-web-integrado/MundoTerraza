package app.domain.valueobject;
import java.util.Objects;
/**
 *
 * @author inici4rsesi0n
 */
public final class Dni{
    private static final int LONGITUD=8;
    private final String valor;
    private Dni(String valor){this.valor=valor;}
    public static Dni de(String valor){
        if(valor==null)
            throw new IllegalArgumentException("El DNI no puede ser nulo");
        String limpio=valor.trim();
        if(!limpio.matches("\\d{"+LONGITUD+"}"))
            throw new IllegalArgumentException("El DNI debe tener exactamente "+LONGITUD+" digitos");
        return new Dni(limpio);
    }
    public String getValor(){return valor;}
    @Override
    public boolean equals(Object o){
        if(this==o)return true;
        if(!(o instanceof Dni dni))return false;
        return valor.equals(dni.valor);
    }
    @Override
    public int hashCode(){return Objects.hash(valor);}
    @Override
    public String toString() {
        return valor;
    }
}
