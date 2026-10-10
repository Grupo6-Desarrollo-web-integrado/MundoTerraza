package app.domain.converter;
import app.domain.valueobject.Telefono;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
/**
 *
 * @author inici4rsesi0n
 */
@Converter(autoApply=true)
public class TelefonoConverter implements AttributeConverter<Telefono, String>{
    @Override
    public String convertToDatabaseColumn(Telefono telefono){
        return telefono==null?null:telefono.getValor();
    }
    @Override
    public Telefono convertToEntityAttribute(String valor){
        return valor==null?null:Telefono.de(valor);
    }
}
