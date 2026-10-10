package app.domain.valueobject;
import java.util.Objects;
/**
 *
 * @author inici4rsesi0n
 */
public final class Capacidad{
    private static final int MINIMO=1;
    private static final int MAXIMO=50;
    private final int valor;
    private Capacidad(int valor){this.valor=valor;}
    public static Capacidad de(int valor){
        if(valor<MINIMO||valor>MAXIMO)
            throw new IllegalArgumentException("La capacidad debe estar entre "+MINIMO+" y "+MAXIMO+" personas");
        return new Capacidad(valor);
    }
    public int getValor(){return valor;}
    @Override
    public boolean equals(Object o){
        if(this==o)return true;
        if(!(o instanceof Capacidad capacidad))return false;
        return valor==capacidad.valor;
    }
    @Override
    public int hashCode(){return Objects.hash(valor);}
    @Override
    public String toString() {
        return String.valueOf(valor);
    }
}
