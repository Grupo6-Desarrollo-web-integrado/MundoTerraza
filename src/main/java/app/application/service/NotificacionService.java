package app.application.service;
import app.application.dto.response.NotificacionResponse;
import app.application.mapper.NotificacionMapper;
import app.domain.enums.TipoNotificacion;
import app.domain.exception.ForbiddenException;
import app.domain.exception.NotFoundException;
import app.domain.model.Notificacion;
import app.domain.model.Usuario;
import app.infrastructure.repository.NotificacionRepository;
import app.infrastructure.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class NotificacionService{
    private final NotificacionRepository notificacionRepository;
    private final UsuarioRepository usuarioRepository;
    private final NotificacionMapper notificacionMapper;
    public NotificacionService(NotificacionRepository notificacionRepository,
                               UsuarioRepository usuarioRepository,
                               NotificacionMapper notificacionMapper){
        this.notificacionRepository=notificacionRepository;
        this.usuarioRepository=usuarioRepository;
        this.notificacionMapper=notificacionMapper;
    }
    @Transactional
    public void crear(Usuario usuario, TipoNotificacion tipo, String titulo,
                      String mensaje, Long referenciaId){
        Notificacion notificacion=new Notificacion(usuario, tipo, titulo, mensaje, referenciaId);
        notificacionRepository.save(notificacion);
    }
    @Transactional(readOnly=true)
    public List<NotificacionResponse> listar(Long usuarioId){
        return notificacionMapper.aResponseLista(
                notificacionRepository.findByUsuarioIdOrderByFechaCreacionDesc(usuarioId));
    }
    @Transactional(readOnly=true)
    public List<NotificacionResponse> listarNoLeidas(Long usuarioId){
        return notificacionMapper.aResponseLista(
                notificacionRepository.findByUsuarioIdAndLeidaFalseOrderByFechaCreacionDesc(usuarioId));
    }
    @Transactional(readOnly=true)
    public long contarNoLeidas(Long usuarioId){
        return notificacionRepository.countByUsuarioIdAndLeidaFalse(usuarioId);
    }
    @Transactional
    public NotificacionResponse marcarLeida(Long usuarioId, Long notificacionId){
        Notificacion n=notificacionRepository.findById(notificacionId)
                .orElseThrow(()->new NotFoundException("Notificacion no encontrada"));
        if(!n.getUsuario().getId().equals(usuarioId))
            throw new ForbiddenException("La notificacion no te pertenece");
        n.marcarLeida();
        notificacionRepository.save(n);
        return notificacionMapper.aResponse(n);
    }
    @Transactional
    public void marcarTodasLeidas(Long usuarioId){
        List<Notificacion> noLeidas=notificacionRepository
                .findByUsuarioIdAndLeidaFalseOrderByFechaCreacionDesc(usuarioId);
        noLeidas.forEach(Notificacion::marcarLeida);
        notificacionRepository.saveAll(noLeidas);
    }
}
