package app.application.service;
import app.application.dto.response.CategoriaResponse;
import app.application.dto.response.ServicioResponse;
import app.application.mapper.CategoriaMapper;
import app.application.mapper.ServicioMapper;
import app.infrastructure.repository.CategoriaRepository;
import app.infrastructure.repository.ServicioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class CatalogoService{
    private final CategoriaRepository categoriaRepository;
    private final ServicioRepository servicioRepository;
    private final CategoriaMapper categoriaMapper;
    private final ServicioMapper servicioMapper;
    public CatalogoService(CategoriaRepository categoriaRepository,
                           ServicioRepository servicioRepository,
                           CategoriaMapper categoriaMapper,
                           ServicioMapper servicioMapper){
        this.categoriaRepository=categoriaRepository;
        this.servicioRepository=servicioRepository;
        this.categoriaMapper=categoriaMapper;
        this.servicioMapper=servicioMapper;
    }
    @Transactional(readOnly=true)
    public List<CategoriaResponse> listarCategoriasActivas(){
        return categoriaMapper.aResponseLista(categoriaRepository.findByActivaTrue());
    }
    @Transactional(readOnly=true)
    public List<ServicioResponse> listarServiciosActivos(){
        return servicioMapper.aResponseLista(servicioRepository.findByActivoTrue());
    }
}
