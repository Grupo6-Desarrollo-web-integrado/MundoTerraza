package app.infrastructure.storage;
import app.domain.exception.BusinessException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;
/**
 *
 * @author inici4rsesi0n
 */
@Service
public class FileStorageService{
    public static final String URL_PREFIX="/uploads/";
    private static final long MAX_BYTES=5L*1024*1024;
    private static final Set<String> EXTENSIONES=Set.of("jpg", "jpeg", "png");
    private static final Set<String> TIPOS=Set.of("image/jpeg", "image/png");
    private final Path root;
    public FileStorageService(@Value("${app.upload-dir:uploads}") String uploadDir){
        this.root=Paths.get(uploadDir).toAbsolutePath().normalize();
        try{
            Files.createDirectories(root);
        }catch(IOException e){
            throw new IllegalStateException("No se pudo crear la carpeta de imagenes: "+root, e);
        }
    }
    public Path getRoot(){
        return root;
    }
    public String guardar(MultipartFile archivo){
        if(archivo==null||archivo.isEmpty())
            throw new BusinessException("La imagen esta vacia");
        if(archivo.getSize()>MAX_BYTES)
            throw new BusinessException("Cada imagen debe pesar maximo 5 MB");
        String ext=extension(archivo.getOriginalFilename());
        String tipo=archivo.getContentType()==null?"":archivo.getContentType().toLowerCase(Locale.ROOT);
        if(!EXTENSIONES.contains(ext)||!TIPOS.contains(tipo))
            throw new BusinessException("Solo se permiten imagenes .jpg o .png");
        try(InputStream in=archivo.getInputStream()){
            if(ImageIO.read(in)==null)
                throw new BusinessException("El archivo no es una imagen valida");
        }catch(IOException e){
            throw new BusinessException("No se pudo leer la imagen");
        }
        String nombre=UUID.randomUUID()+"."+("jpeg".equals(ext)?"jpg":ext);
        Path destino=root.resolve(nombre).normalize();
        if(!destino.startsWith(root))
            throw new BusinessException("Nombre de archivo no permitido");
        try(InputStream in=archivo.getInputStream()){
            Files.copy(in, destino, StandardCopyOption.REPLACE_EXISTING);
        }catch(IOException e){
            throw new IllegalStateException("No se pudo guardar la imagen en el servidor", e);
        }
        return URL_PREFIX+nombre;
    }
    public void eliminar(String url){
        if(url==null||!url.startsWith(URL_PREFIX))return;
        try{
            Path archivo=root.resolve(url.substring(URL_PREFIX.length())).normalize();
            if(archivo.startsWith(root))
                Files.deleteIfExists(archivo);
        }catch(IOException ignored){
        }
    }
    private String extension(String nombre){
        if(nombre==null||!nombre.contains("."))return "";
        return nombre.substring(nombre.lastIndexOf('.')+1).toLowerCase(Locale.ROOT);
    }
}
