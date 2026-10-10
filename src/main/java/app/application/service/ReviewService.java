package app.application.service;
import app.application.dto.request.CrearReviewRequest;
import app.application.dto.request.EditarReviewRequest;
import app.application.dto.request.ResponderReviewRequest;
import app.application.dto.response.ReviewResponse;
import app.application.mapper.ReviewMapper;
import app.domain.enums.EstadoReserva;
import app.domain.enums.EstadoReview;
import app.domain.enums.TipoNotificacion;
import app.domain.exception.BusinessException;
import app.domain.exception.ConflictoException;
import app.domain.exception.ForbiddenException;
import app.domain.exception.NotFoundException;
import app.domain.model.Propiedad;
import app.domain.model.Review;
import app.domain.model.Usuario;
import app.infrastructure.repository.PropiedadRepository;
import app.infrastructure.repository.ReservaRepository;
import app.infrastructure.repository.ReviewRepository;
import app.infrastructure.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class ReviewService{
    private final ReviewRepository reviewRepository;
    private final PropiedadRepository propiedadRepository;
    private final UsuarioRepository usuarioRepository;
    private final ReservaRepository reservaRepository;
    private final NotificacionService notificacionService;
    private final ReviewMapper reviewMapper;
    public ReviewService(ReviewRepository reviewRepository,
                         PropiedadRepository propiedadRepository,
                         UsuarioRepository usuarioRepository,
                         ReservaRepository reservaRepository,
                         NotificacionService notificacionService,
                         ReviewMapper reviewMapper){
        this.reviewRepository=reviewRepository;
        this.propiedadRepository=propiedadRepository;
        this.usuarioRepository=usuarioRepository;
        this.reservaRepository=reservaRepository;
        this.notificacionService=notificacionService;
        this.reviewMapper=reviewMapper;
    }
    @Transactional(readOnly=true)
    public List<ReviewResponse> listarPorPropiedad(Long propiedadId){
        return reviewMapper.aResponseLista(
                reviewRepository.findByPropiedadIdAndEstadoOrderByFechaCreacionDesc(propiedadId, EstadoReview.ACTIVA));
    }
    @Transactional
    public ReviewResponse crear(Long usuarioId, CrearReviewRequest request){
        Usuario usuario=usuarioRepository.findById(usuarioId)
                .orElseThrow(()->new NotFoundException("Usuario no encontrado"));
        Propiedad propiedad=propiedadRepository.findById(request.getPropiedadId())
                .orElseThrow(()->new NotFoundException("Propiedad no encontrada"));
        if(reviewRepository.existsByUsuarioIdAndPropiedadId(usuarioId, request.getPropiedadId()))
            throw new ConflictoException("Ya dejaste una review sobre esta propiedad");
        boolean tuvoReserva=reservaRepository.existsByUsuarioIdAndPropiedadIdAndEstado(
                usuarioId, request.getPropiedadId(), EstadoReserva.COMPLETADA);
        if(!tuvoReserva)
            throw new BusinessException("Solo puedes resenar propiedades que hayas reservado y completado");
        Review review=new Review(usuario, propiedad, request.getRating(),
                request.getComentario(), request.getHabitacionMencionada());
        reviewRepository.save(review);
        recalcularRatingPropiedad(propiedad);
        notificacionService.crear(propiedad.getAnfitrion(), TipoNotificacion.REVIEW_RECIBIDA,
                "Nueva resena",
                "Recibiste una resena en "+propiedad.getTitulo(),
                review.getId());
        return reviewMapper.aResponse(review);
    }
    @Transactional
    public ReviewResponse editar(Long usuarioId, Long reviewId, EditarReviewRequest request){
        Review review=reviewRepository.findById(reviewId)
                .orElseThrow(()->new NotFoundException("Review no encontrada"));
        if(!review.getUsuario().getId().equals(usuarioId))
            throw new ForbiddenException("La review no te pertenece");
        review.editar(request.getRating(), request.getComentario());
        reviewRepository.save(review);
        recalcularRatingPropiedad(review.getPropiedad());
        return reviewMapper.aResponse(review);
    }
    @Transactional
    public void eliminar(Long usuarioId, Long reviewId){
        Review review=reviewRepository.findById(reviewId)
                .orElseThrow(()->new NotFoundException("Review no encontrada"));
        if(!review.getUsuario().getId().equals(usuarioId))
            throw new ForbiddenException("La review no te pertenece");
        review.eliminar();
        reviewRepository.save(review);
        recalcularRatingPropiedad(review.getPropiedad());
    }
    @Transactional
    public ReviewResponse responder(Long usuarioId, Long reviewId, ResponderReviewRequest request){
        Review review=reviewRepository.findById(reviewId)
                .orElseThrow(()->new NotFoundException("Review no encontrada"));
        if(!review.getPropiedad().getAnfitrion().getId().equals(usuarioId))
            throw new ForbiddenException("Solo el anfitrion puede responder esta review");
        review.responder(request.getRespuesta());
        reviewRepository.save(review);
        notificacionService.crear(review.getUsuario(), TipoNotificacion.REVIEW_RESPONDIDA,
                "Respuesta a tu resena",
                "El anfitrion respondio tu resena en "+review.getPropiedad().getTitulo(),
                review.getId());
        return reviewMapper.aResponse(review);
    }
    private void recalcularRatingPropiedad(Propiedad propiedad){
        Double promedio=reviewRepository.promedioRating(propiedad.getId(), EstadoReview.ACTIVA);
        long total=reviewRepository.countByPropiedadIdAndEstado(propiedad.getId(), EstadoReview.ACTIVA);
        propiedad.actualizarRating(promedio==null?0.0:promedio, (int)total);
        propiedadRepository.save(propiedad);
    }
}
