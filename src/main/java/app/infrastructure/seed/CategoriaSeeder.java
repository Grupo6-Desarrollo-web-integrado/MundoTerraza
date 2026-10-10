package app.infrastructure.seed;
import app.domain.model.Categoria;
import app.infrastructure.repository.CategoriaRepository;
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
@Order(1)
public class CategoriaSeeder implements CommandLineRunner{
    private static final Logger log=LoggerFactory.getLogger(CategoriaSeeder.class);
    private final CategoriaRepository categoriaRepository;
    public CategoriaSeeder(CategoriaRepository categoriaRepository){
        this.categoriaRepository=categoriaRepository;
    }
    @Override
    @Transactional
    public void run(String... args){
        if(categoriaRepository.count()>0){
            log.info("Categorias ya cargadas: {}", categoriaRepository.count());
            return;
        }
        List<Categoria> categorias=List.of(
                new Categoria("Playa", "Alojamientos frente al mar o cerca de la costa"),
                new Categoria("Montaña", "Alojamientos en zonas altas o de sierra"),
                new Categoria("Urbano", "Departamentos y casas en zonas centricas"),
                new Categoria("Campo", "Alojamientos en zonas rurales o de naturaleza"),
                new Categoria("Lago", "Alojamientos frente a lagos o lagunas"),
                new Categoria("Desierto", "Alojamientos en zonas aridas o de dunas"),
                new Categoria("Selva", "Alojamientos en zonas amazonicas o tropicales"));
        categoriaRepository.saveAll(categorias);
        log.info("Categorias cargadas: {}", categorias.size());
    }
}
