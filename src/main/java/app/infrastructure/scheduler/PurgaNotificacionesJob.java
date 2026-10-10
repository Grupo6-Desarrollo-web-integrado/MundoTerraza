package app.infrastructure.scheduler;
import app.domain.model.Notificacion;
import app.infrastructure.repository.NotificacionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Component
public class PurgaNotificacionesJob{
    private static final Logger log=LoggerFactory.getLogger(PurgaNotificacionesJob.class);
    private static final int DIAS_RETENCION=90;
    private final NotificacionRepository notificacionRepository;
    public PurgaNotificacionesJob(NotificacionRepository notificacionRepository){
        this.notificacionRepository=notificacionRepository;
    }
    @Scheduled(cron="0 0 3 * * *")
    @Transactional
    public void purgar(){
        LocalDateTime limite=LocalDateTime.now().minusDays(DIAS_RETENCION);
        List<Notificacion> obsoletas=notificacionRepository
                .findByLeidaTrueAndFechaCreacionBefore(limite);
        if(!obsoletas.isEmpty()){
            notificacionRepository.deleteAllInBatch(obsoletas);
            log.info("Purga de notificaciones: {} eliminadas", obsoletas.size());
        }
    }
}
