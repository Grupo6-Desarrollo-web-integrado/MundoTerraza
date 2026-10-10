package app;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
/**
 *
 * @author inici4rsesi0n
 */
@SpringBootApplication
@EnableScheduling
public class MundoTerrazaApplication{
    public static void main(String[] args){
        SpringApplication.run(MundoTerrazaApplication.class, args);
    }
}
