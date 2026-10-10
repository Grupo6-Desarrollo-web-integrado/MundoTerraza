package app.application.service;
import app.application.dto.response.FavoritoResponse;
import app.application.mapper.PropiedadMapper;
import app.domain.exception.ConflictoException;
import app.domain.exception.NotFoundException;
import app.domain.model.Favorito;
import app.domain.model.Propiedad;
import app.domain.model.Usuario;
import app.infrastructure.repository.FavoritoRepository;
import app.infrastructure.repository.PropiedadRepository;
import app.infrastructure.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class FavoritoService{
    private final FavoritoRepository favoritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final PropiedadRepository propiedadRepository;
    private final PropiedadMapper propiedadMapper;
    public FavoritoService(FavoritoRepository favoritoRepository,
                           UsuarioRepository usuarioRepository,
                           PropiedadRepository propiedadRepository,
                           PropiedadMapper propiedadMapper){
        this.favoritoRepository=favoritoRepository;
        this.usuarioRepository=usuarioRepository;
        this.propiedadRepository=propiedadRepository;
        this.propiedadMapper=propiedadMapper;
    }
    @Transactional(readOnly=true)
    public List<FavoritoResponse> listar(Long usuarioId){
        return favoritoRepository.findByUsuarioIdOrderByFechaDesc(usuarioId).stream()
                .map(f->new FavoritoResponse(f.getId(), propiedadMapper.aCard(f.getPropiedad()), f.getFecha()))
                .toList();
    }
    @Transactional
    public void agregar(Long usuarioId, Long propiedadId){
        if(favoritoRepository.existsByUsuarioIdAndPropiedadId(usuarioId, propiedadId))
            throw new ConflictoException("La propiedad ya esta en favoritos");
        Usuario usuario=usuarioRepository.findById(usuarioId)
                .orElseThrow(()->new NotFoundException("Usuario no encontrado"));
        Propiedad propiedad=propiedadRepository.findById(propiedadId)
                .orElseThrow(()->new NotFoundException("Propiedad no encontrada"));
        favoritoRepository.save(new Favorito(usuario, propiedad));
    }
    @Transactional
    public void quitar(Long usuarioId, Long propiedadId){
        Favorito favorito=favoritoRepository.findByUsuarioIdAndPropiedadId(usuarioId, propiedadId)
                .orElseThrow(()->new NotFoundException("La propiedad no esta en favoritos"));
        favoritoRepository.delete(favorito);
    }
    @Transactional(readOnly=true)
    public boolean esFavorito(Long usuarioId, Long propiedadId){
        return favoritoRepository.existsByUsuarioIdAndPropiedadId(usuarioId, propiedadId);
    }
}
