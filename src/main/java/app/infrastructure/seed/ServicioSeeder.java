package app.infrastructure.seed;
import app.domain.model.Servicio;
import app.infrastructure.repository.ServicioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@Component
@Order(2)
public class ServicioSeeder implements CommandLineRunner{
    private static final Logger log=LoggerFactory.getLogger(ServicioSeeder.class);
    private final ServicioRepository servicioRepository;
    public ServicioSeeder(ServicioRepository servicioRepository){
        this.servicioRepository=servicioRepository;
    }
    @Override
    @Transactional
    public void run(String... args){
        if(servicioRepository.count()>0){
            log.info("Servicios ya cargados: {}", servicioRepository.count());
            return;
        }
        List<Servicio> servicios=List.of(
                new Servicio("WiFi", "wifi"),
                new Servicio("TV", "tv"),
                new Servicio("Cocina", "cocina"),
                new Servicio("Lavadora", "lavadora"),
                new Servicio("Aire acondicionado", "aire"),
                new Servicio("Calefaccion", "calefaccion"),
                new Servicio("Gimnasio", "gimnasio"),
                new Servicio("Piscina", "piscina"),
                new Servicio("Ascensor", "ascensor"),
                new Servicio("Estacionamiento", "estacionamiento"),
                new Servicio("Jacuzzi", "jacuzzi"),
                new Servicio("Balcon", "balcon"),
                new Servicio("Terraza", "terraza"),
                new Servicio("Zona de trabajo", "trabajo"),
                new Servicio("Desayuno incluido", "desayuno"));
        servicioRepository.saveAll(servicios);
        log.info("Servicios cargados: {}", servicios.size());
    }
}
