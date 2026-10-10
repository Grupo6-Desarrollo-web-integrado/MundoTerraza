package app.domain.converter;
import app.domain.valueobject.Coordenada;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
/**
 *
 * @author inici4rsesi0n
 */
@Converter
public class CoordenadaConverter implements AttributeConverter<Coordenada, String>{
    private static final String SEPARADOR=",";
    @Override
    public String convertToDatabaseColumn(Coordenada coordenada){
        return coordenada==null?null:coordenada.toString();
    }
    @Override
    public Coordenada convertToEntityAttribute(String valor){
        if(valor==null||valor.isBlank())return null;
        String[] partes=valor.split(SEPARADOR);
        if(partes.length!=2)
            throw new IllegalStateException("Coordenada almacenada con formato invalido: "+valor);
        return Coordenada.de(Double.parseDouble(partes[0]), Double.parseDouble(partes[1]));
    }
}
