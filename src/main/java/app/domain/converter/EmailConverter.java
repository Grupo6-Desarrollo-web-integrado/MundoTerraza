package app.domain.converter;
import app.domain.valueobject.Email;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
/**
 *
 * @author inici4rsesi0n
 */
@Converter(autoApply=true)
public class EmailConverter implements AttributeConverter<Email, String>{
    @Override
    public String convertToDatabaseColumn(Email email){
        return email==null?null:email.getValor();
    }
    @Override
    public Email convertToEntityAttribute(String valor){
        return valor==null?null:Email.de(valor);
    }
}
