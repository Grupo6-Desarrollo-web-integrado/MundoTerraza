package app.application.service;
import app.application.dto.request.ActualizarHabitacionRequest;
import app.application.dto.request.CrearHabitacionRequest;
import app.application.dto.response.HabitacionResponse;
import app.application.mapper.HabitacionMapper;
import app.domain.enums.EstadoHabitacion;
import app.domain.exception.BusinessException;
import app.domain.exception.ForbiddenException;
import app.domain.exception.NotFoundException;
import app.domain.model.Habitacion;
import app.domain.model.Imagen;
import app.domain.model.Propiedad;
import app.domain.valueobject.Dinero;
import app.infrastructure.repository.HabitacionRepository;
import app.infrastructure.repository.ImagenRepository;
import app.infrastructure.repository.PropiedadRepository;
import app.infrastructure.storage.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class HabitacionService{
    private static final Logger log=LoggerFactory.getLogger(HabitacionService.class);
    private static final int MAX_IMAGENES=5;
    private final HabitacionRepository habitacionRepository;
    private final PropiedadRepository propiedadRepository;
    private final ImagenRepository imagenRepository;
    private final FileStorageService fileStorageService;
    private final HabitacionMapper habitacionMapper;
    public HabitacionService(HabitacionRepository habitacionRepository,
                             PropiedadRepository propiedadRepository,
                             ImagenRepository imagenRepository,
                             FileStorageService fileStorageService,
                             HabitacionMapper habitacionMapper){
        this.habitacionRepository=habitacionRepository;
        this.propiedadRepository=propiedadRepository;
        this.imagenRepository=imagenRepository;
        this.fileStorageService=fileStorageService;
        this.habitacionMapper=habitacionMapper;
    }
    @Transactional(readOnly=true)
    public List<HabitacionResponse> listarPorPropiedad(Long propiedadId){
        return habitacionMapper.aResponseLista(
                habitacionRepository.findByPropiedadIdAndEstadoNot(propiedadId, EstadoHabitacion.INACTIVA));
    }
    @Transactional
    public HabitacionResponse crear(Long usuarioId, Long propiedadId, CrearHabitacionRequest request){
        Propiedad propiedad=propiedadRepository.findById(propiedadId)
                .orElseThrow(()->new NotFoundException("Propiedad no encontrada"));
        verificarPropietario(propiedad, usuarioId);
        Habitacion habitacion=new Habitacion(propiedad, request.getNombre(), request.getDescripcion(),
                Dinero.de(request.getPrecioNoche()), request.getMaxAdultos(), request.getMaxNinos(),
                request.getMaxBebes(), request.getMaxMascotas(), request.getCantidadDormitorios(),
                request.getCantidadBanios(), request.getMetrosCuadrados(), request.getStockTotal());
        habitacionRepository.save(habitacion);
        log.info("Habitacion creada id={} propiedadId={} anfitrionId={}",
                habitacion.getId(), propiedadId, usuarioId);
        return habitacionMapper.aResponse(habitacion);
    }
    @Transactional
    public HabitacionResponse actualizar(Long usuarioId, Long habitacionId,
                                         ActualizarHabitacionRequest request){
        Habitacion h=habitacionRepository.findById(habitacionId)
                .orElseThrow(()->new NotFoundException("Habitacion no encontrada"));
        verificarPropietario(h.getPropiedad(), usuarioId);
        if(request.getStockTotal()<h.getStockTotal())
            throw new BusinessException("No se puede reducir el stock por debajo del original");
        h.setNombre(request.getNombre().trim());
        h.setDescripcion(request.getDescripcion().trim());
        h.actualizarPrecio(Dinero.de(request.getPrecioNoche()));
        h.setMaxAdultos(request.getMaxAdultos());
        h.setMaxNinos(request.getMaxNinos());
        h.setMaxBebes(request.getMaxBebes());
        h.setMaxMascotas(request.getMaxMascotas());
        h.setCantidadDormitorios(request.getCantidadDormitorios());
        h.setCantidadBanios(request.getCantidadBanios());
        h.setMetrosCuadrados(request.getMetrosCuadrados());
        h.setStockTotal(request.getStockTotal());
        habitacionRepository.save(h);
        return habitacionMapper.aResponse(h);
    }
    @Transactional
    public void eliminar(Long usuarioId, Long habitacionId){
        Habitacion h=habitacionRepository.findById(habitacionId)
                .orElseThrow(()->new NotFoundException("Habitacion no encontrada"));
        verificarPropietario(h.getPropiedad(), usuarioId);
        if(!h.getImagenes().isEmpty()){
            h.getImagenes().forEach(img->fileStorageService.eliminar(img.getUrl()));
        }
        h.desactivar();
        habitacionRepository.save(h);
        log.info("Habitacion desactivada id={} propiedadId={} anfitrionId={}",
                habitacionId, h.getPropiedad().getId(), usuarioId);
    }
    @Transactional
    public void agregarImagen(Long usuarioId, Long habitacionId, MultipartFile archivo){
        Habitacion h=habitacionRepository.findById(habitacionId)
                .orElseThrow(()->new NotFoundException("Habitacion no encontrada"));
        verificarPropietario(h.getPropiedad(), usuarioId);
        long actuales=imagenRepository.countByHabitacionId(habitacionId);
        if(actuales>=MAX_IMAGENES)
            throw new BusinessException("Maximo "+MAX_IMAGENES+" imagenes por habitacion");
        String url=fileStorageService.guardar(archivo);
        try{
            Imagen imagen=Imagen.paraHabitacion(h, url, (int)actuales);
            imagenRepository.save(imagen);
        }catch(RuntimeException e){
            fileStorageService.eliminar(url);
            throw e;
        }
    }
    @Transactional
    public void eliminarImagen(Long usuarioId, Long habitacionId, Long imagenId){
        Habitacion h=habitacionRepository.findById(habitacionId)
                .orElseThrow(()->new NotFoundException("Habitacion no encontrada"));
        verificarPropietario(h.getPropiedad(), usuarioId);
        Imagen imagen=imagenRepository.findById(imagenId)
                .orElseThrow(()->new NotFoundException("Imagen no encontrada"));
        if(imagen.getHabitacion()==null||!imagen.getHabitacion().getId().equals(habitacionId))
            throw new BusinessException("La imagen no pertenece a esta habitacion");
        String url=imagen.getUrl();
        imagenRepository.delete(imagen);
        fileStorageService.eliminar(url);
        List<Imagen> restantes=imagenRepository.findByHabitacionIdOrderByOrdenAsc(habitacionId);
        for(int i=0;i<restantes.size();i++)
            restantes.get(i).cambiarOrden(i);
        imagenRepository.saveAll(restantes);
    }
    private void verificarPropietario(Propiedad propiedad, Long usuarioId){
        if(!propiedad.getAnfitrion().getId().equals(usuarioId))
            throw new ForbiddenException("No eres el propietario de esta propiedad");
    }
}
