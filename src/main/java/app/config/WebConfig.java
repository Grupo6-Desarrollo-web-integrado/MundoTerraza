package app.config;
import app.infrastructure.storage.FileStorageService;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
/**
 *
 * @author inici4rsesi0n
 */
@Configuration
public class WebConfig implements WebMvcConfigurer{
    private final FileStorageService fileStorageService;
    public WebConfig(FileStorageService fileStorageService){
        this.fileStorageService=fileStorageService;
    }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        String ubicacion=fileStorageService.getRoot().toUri().toString();
        if(!ubicacion.endsWith("/"))ubicacion+="/";
        registry.addResourceHandler(FileStorageService.URL_PREFIX+"**")
                .addResourceLocations(ubicacion);
    }
}
