package app.application.service;
import app.application.dto.request.ActualizarPropiedadRequest;
import app.application.dto.request.CrearPropiedadRequest;
import app.application.dto.request.FiltroPropiedadRequest;
import app.application.dto.request.ReordenarImagenesRequest;
import app.application.dto.response.PageResponse;
import app.application.dto.response.PropiedadCardResponse;
import app.application.dto.response.PropiedadDetalleResponse;
import app.application.mapper.PropiedadMapper;
import app.domain.enums.EstadoPropiedad;
import app.domain.enums.PoliticaCancelacion;
import app.domain.enums.TipoAlojamiento;
import app.domain.exception.BusinessException;
import app.domain.exception.ForbiddenException;
import app.domain.exception.NotFoundException;
import app.domain.model.Categoria;
import app.domain.model.Imagen;
import app.domain.model.Propiedad;
import app.domain.model.Servicio;
import app.domain.model.ServicioPropiedad;
import app.domain.model.Usuario;
import app.infrastructure.repository.CategoriaRepository;
import app.infrastructure.repository.ImagenRepository;
import app.infrastructure.repository.PropiedadRepository;
import app.infrastructure.repository.PropiedadSpecification;
import app.infrastructure.repository.ServicioRepository;
import app.infrastructure.repository.UsuarioRepository;
import app.infrastructure.storage.FileStorageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class PropiedadService{
    private static final int MAX_IMAGENES=5;
    private final PropiedadRepository propiedadRepository;
    private final UsuarioRepository usuarioRepository;
    private final CategoriaRepository categoriaRepository;
    private final ServicioRepository servicioRepository;
    private final ImagenRepository imagenRepository;
    private final FileStorageService fileStorageService;
    private final PropiedadMapper propiedadMapper;
    public PropiedadService(PropiedadRepository propiedadRepository,
                            UsuarioRepository usuarioRepository,
                            CategoriaRepository categoriaRepository,
                            ServicioRepository servicioRepository,
                            ImagenRepository imagenRepository,
                            FileStorageService fileStorageService,
                            PropiedadMapper propiedadMapper){
        this.propiedadRepository=propiedadRepository;
        this.usuarioRepository=usuarioRepository;
        this.categoriaRepository=categoriaRepository;
        this.servicioRepository=servicioRepository;
        this.imagenRepository=imagenRepository;
        this.fileStorageService=fileStorageService;
        this.propiedadMapper=propiedadMapper;
    }
    @Transactional(readOnly=true)
    public PageResponse<PropiedadCardResponse> listar(FiltroPropiedadRequest filtro, int pagina, int tamanio){
        Specification<Propiedad> spec=PropiedadSpecification.combinadas(
                filtro.getTexto(), filtro.getCategoriaId(), filtro.getTipoAlojamiento(),
                filtro.getPrecioMin(), filtro.getPrecioMax(),
                filtro.getServicioIds(), filtro.getHuespedes());
        Pageable pageable=PageRequest.of(pagina, tamanio);
        Page<Propiedad> page=propiedadRepository.findAll(spec, pageable);
        return PageResponse.desde(page, propiedadMapper::aCard);
    }
    @Transactional(readOnly=true)
    public PropiedadDetalleResponse obtenerDetalle(Long id){
        Propiedad p=propiedadRepository.buscarPorIdConRelaciones(id, EstadoPropiedad.ELIMINADA)
                .orElseThrow(()->new NotFoundException("Propiedad no encontrada"));
        return propiedadMapper.aDetalle(p);
    }
    @Transactional
    public PropiedadDetalleResponse crear(Long anfitrionId, CrearPropiedadRequest request){
        Usuario anfitrion=usuarioRepository.findById(anfitrionId)
                .orElseThrow(()->new NotFoundException("Usuario no encontrado"));
        if(!anfitrion.isEsAnfitrion())
            throw new ForbiddenException("Debes ser anfitrion para publicar propiedades");
        Categoria categoria=categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(()->new NotFoundException("Categoria no encontrada"));
        if(!categoria.isActiva())
            throw new BusinessException("La categoria no esta activa");
        TipoAlojamiento tipo=parsearTipo(request.getTipoAlojamiento());
        PoliticaCancelacion politica=parsearPolitica(request.getPoliticaCancelacion());
        Propiedad propiedad=new Propiedad(anfitrion, categoria, request.getTitulo(),
                request.getDescripcion(), request.getUbicacion(),
                request.getLatitud(), request.getLongitud(), tipo, politica);
        aplicarServicios(propiedad, request.getServicioIds());
        propiedadRepository.save(propiedad);
        return propiedadMapper.aDetalle(propiedad);
    }
    @Transactional
    public PropiedadDetalleResponse actualizar(Long usuarioId, Long propiedadId,
                                               ActualizarPropiedadRequest request){
        Propiedad propiedad=propiedadRepository.findById(propiedadId)
                .orElseThrow(()->new NotFoundException("Propiedad no encontrada"));
        verificarPropietario(propiedad, usuarioId);
        Categoria categoria=categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(()->new NotFoundException("Categoria no encontrada"));
        if(!categoria.isActiva())
            throw new BusinessException("La categoria no esta activa");
        propiedad.setTitulo(request.getTitulo().trim());
        propiedad.setDescripcion(request.getDescripcion().trim());
        propiedad.setUbicacion(request.getUbicacion().trim());
        propiedad.setLatitud(request.getLatitud());
        propiedad.setLongitud(request.getLongitud());
        propiedad.setTipoAlojamiento(parsearTipo(request.getTipoAlojamiento()));
        propiedad.setPoliticaCancelacion(parsearPolitica(request.getPoliticaCancelacion()));
        propiedad.setCategoria(categoria);
        propiedad.getServicios().clear();
        aplicarServicios(propiedad, request.getServicioIds());
        propiedadRepository.save(propiedad);
        return propiedadMapper.aDetalle(propiedad);
    }
    @Transactional
    public void eliminar(Long usuarioId, Long propiedadId){
        Propiedad propiedad=propiedadRepository.findById(propiedadId)
                .orElseThrow(()->new NotFoundException("Propiedad no encontrada"));
        verificarPropietario(propiedad, usuarioId);
        List<String> urls=new ArrayList<>();
        for(Imagen img:propiedad.getImagenes())
            urls.add(img.getUrl());
        for(var habitacion:propiedad.getHabitaciones())
            for(Imagen img:habitacion.getImagenes())
                urls.add(img.getUrl());
        try{
            propiedadRepository.delete(propiedad);
        }catch(Exception e){
            propiedad.marcarEliminada();
            propiedadRepository.save(propiedad);
        }
        urls.forEach(fileStorageService::eliminar);
    }
    @Transactional
    public PropiedadDetalleResponse publicar(Long usuarioId, Long propiedadId){
        Propiedad propiedad=propiedadRepository.findById(propiedadId)
                .orElseThrow(()->new NotFoundException("Propiedad no encontrada"));
        verificarPropietario(propiedad, usuarioId);
        propiedad.publicar();
        propiedadRepository.save(propiedad);
        return propiedadMapper.aDetalle(propiedad);
    }
    @Transactional
    public PropiedadDetalleResponse desactivar(Long usuarioId, Long propiedadId){
        Propiedad propiedad=propiedadRepository.findById(propiedadId)
                .orElseThrow(()->new NotFoundException("Propiedad no encontrada"));
        verificarPropietario(propiedad, usuarioId);
        propiedad.desactivar();
        propiedadRepository.save(propiedad);
        return propiedadMapper.aDetalle(propiedad);
    }
    @Transactional
    public void agregarImagen(Long usuarioId, Long propiedadId, MultipartFile archivo){
        Propiedad propiedad=propiedadRepository.findById(propiedadId)
                .orElseThrow(()->new NotFoundException("Propiedad no encontrada"));
        verificarPropietario(propiedad, usuarioId);
        long actuales=imagenRepository.countByPropiedadId(propiedadId);
        if(actuales>=MAX_IMAGENES)
            throw new BusinessException("Maximo "+MAX_IMAGENES+" imagenes por propiedad");
        String url=fileStorageService.guardar(archivo);
        try{
            Imagen imagen=Imagen.paraPropiedad(propiedad, url, (int)actuales);
            imagenRepository.save(imagen);
        }catch(RuntimeException e){
            fileStorageService.eliminar(url);
            throw e;
        }
    }
    @Transactional
    public void eliminarImagen(Long usuarioId, Long propiedadId, Long imagenId){
        Propiedad propiedad=propiedadRepository.findById(propiedadId)
                .orElseThrow(()->new NotFoundException("Propiedad no encontrada"));
        verificarPropietario(propiedad, usuarioId);
        Imagen imagen=imagenRepository.findById(imagenId)
                .orElseThrow(()->new NotFoundException("Imagen no encontrada"));
        if(imagen.getPropiedad()==null||!imagen.getPropiedad().getId().equals(propiedadId))
            throw new BusinessException("La imagen no pertenece a esta propiedad");
        String url=imagen.getUrl();
        imagenRepository.delete(imagen);
        fileStorageService.eliminar(url);
        reordenarTrasEliminar(propiedadId);
    }
    @Transactional
    public void reordenarImagenes(Long usuarioId, Long propiedadId, ReordenarImagenesRequest request){
        Propiedad propiedad=propiedadRepository.findById(propiedadId)
                .orElseThrow(()->new NotFoundException("Propiedad no encontrada"));
        verificarPropietario(propiedad, usuarioId);
        List<Imagen> imagenes=imagenRepository.findByPropiedadIdOrderByOrdenAsc(propiedadId);
        if(imagenes.size()!=request.getImagenIds().size())
            throw new BusinessException("La lista de imagenes no coincide con las de la propiedad");
        for(int i=0;i<request.getImagenIds().size();i++){
            Long id=request.getImagenIds().get(i);
            Imagen img=imagenes.stream().filter(x->x.getId().equals(id)).findFirst()
                    .orElseThrow(()->new BusinessException("Imagen no pertenece a la propiedad"));
            img.cambiarOrden(i);
        }
        imagenRepository.saveAll(imagenes);
    }
    private void reordenarTrasEliminar(Long propiedadId){
        List<Imagen> restantes=imagenRepository.findByPropiedadIdOrderByOrdenAsc(propiedadId);
        for(int i=0;i<restantes.size();i++)
            restantes.get(i).cambiarOrden(i);
        imagenRepository.saveAll(restantes);
    }
    private void aplicarServicios(Propiedad propiedad, List<Long> servicioIds){
        if(servicioIds==null||servicioIds.isEmpty())return;
        List<Servicio> servicios=servicioRepository.findAllById(servicioIds);
        if(servicios.size()!=servicioIds.size())
            throw new BusinessException("Alguno de los servicios no existe");
        for(Servicio s:servicios){
            if(!s.isActivo())
                throw new BusinessException("El servicio "+s.getNombre()+" no esta activo");
            propiedad.getServicios().add(new ServicioPropiedad(propiedad, s));
        }
    }
    private void verificarPropietario(Propiedad propiedad, Long usuarioId){
        if(!propiedad.getAnfitrion().getId().equals(usuarioId))
            throw new ForbiddenException("No eres el propietario de esta propiedad");
    }
    private TipoAlojamiento parsearTipo(String tipo){
        try{
            return TipoAlojamiento.valueOf(tipo);
        }catch(IllegalArgumentException e){
            throw new BusinessException("Tipo de alojamiento invalido");
        }
    }
    private PoliticaCancelacion parsearPolitica(String politica){
        try{
            return PoliticaCancelacion.valueOf(politica);
        }catch(IllegalArgumentException e){
            throw new BusinessException("Politica de cancelacion invalida");
        }
    }
}
