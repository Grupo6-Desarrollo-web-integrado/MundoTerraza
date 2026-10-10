package app.domain.converter;
import app.domain.valueobject.Dni;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
/**
 *
 * @author inici4rsesi0n
 */
@Converter(autoApply=true)
public class DniConverter implements AttributeConverter<Dni, String>{
    @Override
    public String convertToDatabaseColumn(Dni dni){
        return dni==null?null:dni.getValor();
    }
    @Override
    public Dni convertToEntityAttribute(String valor){
        return valor==null?null:Dni.de(valor);
    }
}
