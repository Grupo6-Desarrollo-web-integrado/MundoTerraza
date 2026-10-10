package app.infrastructure.scheduler;
import app.domain.enums.EstadoPropiedad;
import app.domain.enums.EstadoReview;
import app.domain.model.Propiedad;
import app.infrastructure.repository.PropiedadRepository;
import app.infrastructure.repository.ReviewRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Component
public class ReconciliacionRatingJob{
    private static final Logger log=LoggerFactory.getLogger(ReconciliacionRatingJob.class);
    private final PropiedadRepository propiedadRepository;
    private final ReviewRepository reviewRepository;
    public ReconciliacionRatingJob(PropiedadRepository propiedadRepository,
                                   ReviewRepository reviewRepository){
        this.propiedadRepository=propiedadRepository;
        this.reviewRepository=reviewRepository;
    }
    @Scheduled(cron="0 30 3 * * *")
    @Transactional
    public void reconciliar(){
        List<Propiedad> propiedades=propiedadRepository.findAll();
        int actualizadas=0;
        for(Propiedad p:propiedades){
            if(p.getEstado()==EstadoPropiedad.ELIMINADA)continue;
            Double promedio=reviewRepository.promedioRating(p.getId(), EstadoReview.ACTIVA);
            long total=reviewRepository.countByPropiedadIdAndEstado(p.getId(), EstadoReview.ACTIVA);
            double nuevo=promedio==null?0.0:promedio;
            int nuevoTotal=(int)total;
            if(Double.compare(p.getRatingPromedio(), nuevo)!=0||p.getTotalReviews()!=nuevoTotal){
                p.actualizarRating(nuevo, nuevoTotal);
                propiedadRepository.save(p);
                actualizadas++;
            }
        }
        if(actualizadas>0)
            log.info("Reconciliacion de rating: {} propiedades actualizadas", actualizadas);
    }
}
