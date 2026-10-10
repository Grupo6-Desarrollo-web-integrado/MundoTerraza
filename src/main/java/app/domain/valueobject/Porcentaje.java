package app.domain.valueobject;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;
/**
 *
 * @author inici4rsesi0n
 */
public final class Porcentaje{
    private static final int ESCALA=2;
    private static final RoundingMode REDONDEO=RoundingMode.HALF_UP;
    private static final BigDecimal CIEN=BigDecimal.valueOf(100);
    private final BigDecimal valor;
    private Porcentaje(BigDecimal valor){this.valor=valor;}
    public static Porcentaje de(BigDecimal valor){
        if(valor==null)
            throw new IllegalArgumentException("El porcentaje no puede ser nulo");
        BigDecimal normalizado=valor.setScale(ESCALA, REDONDEO);
        if(normalizado.signum()<0||normalizado.compareTo(CIEN)>0)
            throw new IllegalArgumentException("El porcentaje debe estar entre 0 y 100");
        return new Porcentaje(normalizado);
    }
    public static Porcentaje de(double valor){return de(BigDecimal.valueOf(valor));}
    public Dinero aplicarA(Dinero base){
        if(base==null)
            throw new IllegalArgumentException("La base no puede ser nula");
        BigDecimal factor=valor.divide(CIEN, 6, REDONDEO);
        return Dinero.de(base.getMonto().multiply(factor).setScale(ESCALA, REDONDEO));
    }
    public BigDecimal getValor(){return valor;}
    @Override
    public boolean equals(Object o){
        if(this==o)return true;
        if(!(o instanceof Porcentaje that))return false;
        return valor.compareTo(that.valor)==0;
    }
    @Override
    public int hashCode(){return Objects.hash(valor.stripTrailingZeros());}
    @Override
    public String toString() {
        return valor.toPlainString()+"%";
    }
}
