package app.config;
import app.infrastructure.storage.FileStorageService;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import java.io.IOException;
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
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver(){
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException{
                        Resource requested=location.createRelative(resourcePath);
                        if(requested.exists()&&requested.isReadable())return requested;
                        if(resourcePath.startsWith("api/")||resourcePath.startsWith("uploads/")||
                           resourcePath.startsWith("swagger-ui")||resourcePath.startsWith("v3/api-docs")||
                           resourcePath.startsWith("error"))return null;
                        return new ClassPathResource("static/index.html");
                    }
                });
    }
}
