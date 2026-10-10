package app.domain.converter;
import app.domain.valueobject.Porcentaje;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.math.BigDecimal;
/**
 *
 * @author inici4rsesi0n
 */
@Converter(autoApply=true)
public class PorcentajeConverter implements AttributeConverter<Porcentaje, BigDecimal>{
    @Override
    public BigDecimal convertToDatabaseColumn(Porcentaje porcentaje){
        return porcentaje==null?null:porcentaje.getValor();
    }
    @Override
    public Porcentaje convertToEntityAttribute(BigDecimal valor){
        return valor==null?null:Porcentaje.de(valor);
    }
}
