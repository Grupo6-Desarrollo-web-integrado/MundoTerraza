package app.application.service;
import app.application.dto.request.ActualizarUsuarioRequest;
import app.application.dto.response.UsuarioResponse;
import app.application.mapper.UsuarioMapper;
import app.domain.exception.NotFoundException;
import app.domain.model.Usuario;
import app.infrastructure.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class UsuarioService{
    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;
    public UsuarioService(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper){
        this.usuarioRepository=usuarioRepository;
        this.usuarioMapper=usuarioMapper;
    }
    @Transactional(readOnly=true)
    public UsuarioResponse obtenerPerfil(Long usuarioId){
        Usuario usuario=usuarioRepository.findById(usuarioId)
                .orElseThrow(()->new NotFoundException("Usuario no encontrado"));
        return usuarioMapper.aResponse(usuario);
    }
    @Transactional
    public UsuarioResponse actualizarPerfil(Long usuarioId, ActualizarUsuarioRequest request){
        Usuario usuario=usuarioRepository.findById(usuarioId)
                .orElseThrow(()->new NotFoundException("Usuario no encontrado"));
        usuario.setNombre(request.getNombre().trim());
        if(request.getCiudad()!=null)
            usuario.setCiudad(request.getCiudad().trim());
        if(request.getBiografia()!=null)
            usuario.setBiografia(request.getBiografia().trim());
        usuarioRepository.save(usuario);
        return usuarioMapper.aResponse(usuario);
    }
}
