package app.controller;
import app.application.dto.response.CategoriaResponse;
import app.application.dto.response.ServicioResponse;
import app.application.service.CatalogoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
/**
 *
 * @author inici4rsesi0n
 */
@RestController
@RequestMapping("/api")
public class CatalogoController{
    private final CatalogoService catalogoService;
    public CatalogoController(CatalogoService catalogoService){
        this.catalogoService=catalogoService;
    }
    @GetMapping("/categorias")
    public ResponseEntity<List<CategoriaResponse>> categorias(){
        return ResponseEntity.ok(catalogoService.listarCategoriasActivas());
    }
    @GetMapping("/servicios")
    public ResponseEntity<List<ServicioResponse>> servicios(){
        return ResponseEntity.ok(catalogoService.listarServiciosActivos());
    }
}
