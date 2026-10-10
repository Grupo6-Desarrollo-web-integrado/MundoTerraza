package app.application.service;
import app.application.dto.request.CrearReviewRequest;
import app.application.dto.request.EditarReviewRequest;
import app.application.dto.request.ResponderReviewRequest;
import app.application.dto.response.ReviewResponse;
import app.application.mapper.ReviewMapper;
import app.domain.enums.EstadoReserva;
import app.domain.enums.EstadoReview;
import app.domain.enums.PoliticaCancelacion;
import app.domain.enums.TipoAlojamiento;
import app.domain.exception.BusinessException;
import app.domain.exception.ConflictoException;
import app.domain.exception.ForbiddenException;
import app.domain.exception.NotFoundException;
import app.domain.model.Categoria;
import app.domain.model.Propiedad;
import app.domain.model.Review;
import app.domain.model.Usuario;
import app.domain.valueobject.Dni;
import app.domain.valueobject.Email;
import app.domain.valueobject.Telefono;
import app.infrastructure.repository.PropiedadRepository;
import app.infrastructure.repository.ReservaRepository;
import app.infrastructure.repository.ReviewRepository;
import app.infrastructure.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import java.time.LocalDateTime;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
/**
 *
 * @author inici4rsesi0n
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("ReviewService - Orquestacion")
class ReviewServiceTest{
    @Mock
    private ReviewRepository reviewRepository;
    @Mock
    private PropiedadRepository propiedadRepository;
    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private ReservaRepository reservaRepository;
    @Mock
    private NotificacionService notificacionService;
    @Mock
    private ReviewMapper reviewMapper;
    private ReviewService reviewService;
    private Usuario anfitrion;
    private Usuario huesped;
    private Propiedad propiedad;
    private Review review;
    private static final String COMENTARIO="Comentario valido para la review";
    @BeforeEach
    void setup(){
        reviewService=new ReviewService(reviewRepository, propiedadRepository,
                usuarioRepository, reservaRepository, notificacionService, reviewMapper);
        anfitrion=new Usuario("Anf", Email.de("a@a.com"), "$2a$10$hash");
        anfitrion.setId(1L);
        anfitrion.convertirEnAnfitrion(Telefono.de("987654321"), Dni.de("12345678"),
                "Lima", "Biografia valida de anfitrion");
        huesped=new Usuario("Huesped", Email.de("h@h.com"), "$2a$10$hash");
        huesped.setId(2L);
        Categoria categoria=new Categoria("Urbano", "Desc");
        propiedad=new Propiedad(anfitrion, categoria, "Titulo valido",
                "Descripcion valida de la propiedad", "Lima",
                -12.0, -77.0, TipoAlojamiento.DEPARTAMENTO, PoliticaCancelacion.FLEXIBLE);
        propiedad.setId(1L);
        review=new Review(huesped, propiedad, 5, COMENTARIO, "Suite 1");
        ReflectionTestUtils.setField(review, "fechaCreacion", LocalDateTime.now());
    }
    @Nested
    @DisplayName("Crear review")
    class Crear{
        @Test
        @DisplayName("Crea review con reserva COMPLETADA")
        void creaOk(){
            when(usuarioRepository.findById(2L)).thenReturn(Optional.of(huesped));
            when(propiedadRepository.findById(anyLong())).thenReturn(Optional.of(propiedad));
            when(reviewRepository.existsByUsuarioIdAndPropiedadId(2L, 1L)).thenReturn(false);
            when(reservaRepository.existsByUsuarioIdAndPropiedadIdAndEstado(
                    2L, 1L, EstadoReserva.COMPLETADA)).thenReturn(true);
            when(reviewRepository.save(any(Review.class))).thenAnswer(i->i.getArgument(0));
            when(reviewRepository.promedioRating(anyLong(), any())).thenReturn(5.0);
            when(reviewRepository.countByPropiedadIdAndEstado(anyLong(), any())).thenReturn(1L);
            when(reviewMapper.aResponse(any(Review.class))).thenReturn(mockResponse());

            CrearReviewRequest req=new CrearReviewRequest();
            req.setPropiedadId(1L);
            req.setRating(5);
            req.setComentario(COMENTARIO);

            ReviewResponse resp=reviewService.crear(2L, req);
            assertNotNull(resp);
            verify(reviewRepository).save(any(Review.class));
            verify(notificacionService).crear(any(), any(), any(), any(), any());
        }
        @Test
        @DisplayName("Falla si no tiene reserva COMPLETADA")
        void fallaSinReservaCompletada(){
            when(usuarioRepository.findById(2L)).thenReturn(Optional.of(huesped));
            when(propiedadRepository.findById(anyLong())).thenReturn(Optional.of(propiedad));
            when(reviewRepository.existsByUsuarioIdAndPropiedadId(2L, 1L)).thenReturn(false);
            when(reservaRepository.existsByUsuarioIdAndPropiedadIdAndEstado(
                    2L, 1L, EstadoReserva.COMPLETADA)).thenReturn(false);

            CrearReviewRequest req=new CrearReviewRequest();
            req.setPropiedadId(1L);
            req.setRating(5);
            req.setComentario(COMENTARIO);

            assertThrows(BusinessException.class, ()->reviewService.crear(2L, req));
            verify(reviewRepository, never()).save(any());
        }
        @Test
        @DisplayName("Falla si ya existe review del usuario sobre la propiedad")
        void fallaReviewDuplicada(){
            when(usuarioRepository.findById(2L)).thenReturn(Optional.of(huesped));
            when(propiedadRepository.findById(anyLong())).thenReturn(Optional.of(propiedad));
            when(reviewRepository.existsByUsuarioIdAndPropiedadId(2L, 1L)).thenReturn(true);

            CrearReviewRequest req=new CrearReviewRequest();
            req.setPropiedadId(1L);
            req.setRating(5);
            req.setComentario(COMENTARIO);

            assertThrows(ConflictoException.class, ()->reviewService.crear(2L, req));
        }
        @Test
        @DisplayName("Falla si la propiedad no existe")
        void fallaPropiedadInexistente(){
            when(usuarioRepository.findById(2L)).thenReturn(Optional.of(huesped));
            when(propiedadRepository.findById(anyLong())).thenReturn(Optional.empty());

            CrearReviewRequest req=new CrearReviewRequest();
            req.setPropiedadId(99L);
            req.setRating(5);
            req.setComentario(COMENTARIO);

            assertThrows(NotFoundException.class, ()->reviewService.crear(2L, req));
        }
    }
    @Nested
    @DisplayName("Editar review")
    class Editar{
        @Test
        @DisplayName("Autor puede editar dentro del plazo")
        void editaOk(){
            when(reviewRepository.findById(anyLong())).thenReturn(Optional.of(review));
            when(reviewRepository.save(review)).thenReturn(review);
            when(reviewRepository.promedioRating(anyLong(), any())).thenReturn(4.0);
            when(reviewRepository.countByPropiedadIdAndEstado(anyLong(), any())).thenReturn(1L);
            when(reviewMapper.aResponse(review)).thenReturn(mockResponse());

            EditarReviewRequest req=new EditarReviewRequest();
            req.setRating(4);
            req.setComentario("Comentario editado con contenido valido");

            reviewService.editar(2L, 1L, req);
            assertEquals(4, review.getRating());
        }
        @Test
        @DisplayName("Usuario distinto al autor no puede editar")
        void fallaNoAutor(){
            when(reviewRepository.findById(anyLong())).thenReturn(Optional.of(review));

            EditarReviewRequest req=new EditarReviewRequest();
            req.setRating(4);
            req.setComentario("Comentario editado con contenido valido");

            assertThrows(ForbiddenException.class, ()->reviewService.editar(99L, 1L, req));
        }
    }
    @Nested
    @DisplayName("Eliminar review")
    class Eliminar{
        @Test
        @DisplayName("Autor elimina dentro del plazo")
        void eliminaOk(){
            when(reviewRepository.findById(anyLong())).thenReturn(Optional.of(review));
            when(reviewRepository.save(review)).thenReturn(review);
            when(reviewRepository.promedioRating(anyLong(), any())).thenReturn(0.0);
            when(reviewRepository.countByPropiedadIdAndEstado(anyLong(), any())).thenReturn(0L);

            reviewService.eliminar(2L, 1L);

            assertEquals(EstadoReview.ELIMINADA, review.getEstado());
        }
    }
    @Nested
    @DisplayName("Responder review")
    class Responder{
        @Test
        @DisplayName("Anfitrion responde a review de su propiedad")
        void respondeOk(){
            when(reviewRepository.findById(anyLong())).thenReturn(Optional.of(review));
            when(reviewRepository.save(review)).thenReturn(review);
            when(reviewMapper.aResponse(review)).thenReturn(mockResponse());

            ResponderReviewRequest req=new ResponderReviewRequest();
            req.setRespuesta("Gracias por tu comentario, vuelve pronto");

            reviewService.responder(1L, 1L, req);

            assertNotNull(review.getRespuestaAnfitrion());
            verify(notificacionService).crear(any(), any(), any(), any(), any());
        }
        @Test
        @DisplayName("Usuario distinto al anfitrion no puede responder")
        void fallaNoAnfitrion(){
            when(reviewRepository.findById(anyLong())).thenReturn(Optional.of(review));

            ResponderReviewRequest req=new ResponderReviewRequest();
            req.setRespuesta("Gracias por tu comentario, vuelve pronto");

            assertThrows(ForbiddenException.class, ()->reviewService.responder(99L, 1L, req));
        }
    }
    private ReviewResponse mockResponse(){
        return new ReviewResponse(1L, 2L, "Huesped", 1L, 5, COMENTARIO,
                "Suite 1", null, null, "ACTIVA", null, null);
    }
}
