package app.domain.valueobject;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;
/**
 *
 * @author inici4rsesi0n
 */
public final class Dinero{
    private static final int ESCALA=2;
    private static final RoundingMode REDONDEO=RoundingMode.HALF_UP;
    private final BigDecimal monto;
    private Dinero(BigDecimal monto){this.monto=monto;}
    public static Dinero de(BigDecimal monto){
        if(monto==null)
            throw new IllegalArgumentException("El monto no puede ser nulo");
        BigDecimal normalizado=monto.setScale(ESCALA, REDONDEO);
        if(normalizado.signum()<0)
            throw new IllegalArgumentException("El monto no puede ser negativo");
        return new Dinero(normalizado);
    }
    public static Dinero de(double monto){return de(BigDecimal.valueOf(monto));}
    public static Dinero cero(){return new Dinero(BigDecimal.ZERO.setScale(ESCALA, REDONDEO));}
    public Dinero sumar(Dinero otro){
        if(otro==null)
            throw new IllegalArgumentException("El monto a sumar no puede ser nulo");
        return new Dinero(this.monto.add(otro.monto).setScale(ESCALA, REDONDEO));
    }
    public Dinero restar(Dinero otro){
        if(otro==null)
            throw new IllegalArgumentException("El monto a restar no puede ser nulo");
        BigDecimal resultado=this.monto.subtract(otro.monto).setScale(ESCALA, REDONDEO);
        if(resultado.signum()<0)
            throw new IllegalArgumentException("El resultado no puede ser negativo");
        return new Dinero(resultado);
    }
    public Dinero multiplicar(int factor){
        if(factor<0)
            throw new IllegalArgumentException("El factor no puede ser negativo");
        return new Dinero(this.monto.multiply(BigDecimal.valueOf(factor)).setScale(ESCALA, REDONDEO));
    }
    public BigDecimal getMonto(){return monto;}
    @Override
    public boolean equals(Object o){
        if(this==o)return true;
        if(!(o instanceof Dinero dinero))return false;
        return monto.compareTo(dinero.monto)==0;
    }
    @Override
    public int hashCode(){return Objects.hash(monto.stripTrailingZeros());}
    @Override
    public String toString() {
        return monto.toPlainString();
    }
}
