package app.domain.converter;
import app.domain.valueobject.Dinero;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.math.BigDecimal;
/**
 *
 * @author inici4rsesi0n
 */
@Converter(autoApply=true)
public class DineroConverter implements AttributeConverter<Dinero, BigDecimal>{
    @Override
    public BigDecimal convertToDatabaseColumn(Dinero dinero){
        return dinero==null?null:dinero.getMonto();
    }
    @Override
    public Dinero convertToEntityAttribute(BigDecimal valor){
        return valor==null?null:Dinero.de(valor);
    }
}
