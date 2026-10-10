package app.application.mapper;
import app.application.dto.response.UsuarioResponse;
import app.domain.model.Usuario;
import app.domain.valueobject.Dni;
import app.domain.valueobject.Email;
import app.domain.valueobject.Telefono;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
/**
 *
 * @author inici4rsesi0n
 */
@Mapper(componentModel="spring")
public interface UsuarioMapper{
    @Mapping(target="correo", source="correo", qualifiedByName="emailAString")
    @Mapping(target="telefono", source="telefono", qualifiedByName="telefonoAString")
    @Mapping(target="dni", source="dni", qualifiedByName="dniAString")
    UsuarioResponse aResponse(Usuario usuario);
    @Named("emailAString")
    default String emailAString(Email email){
        return email==null?null:email.getValor();
    }
    @Named("telefonoAString")
    default String telefonoAString(Telefono telefono){
        return telefono==null?null:telefono.getValor();
    }
    @Named("dniAString")
    default String dniAString(Dni dni){
        return dni==null?null:dni.getValor();
    }
}
