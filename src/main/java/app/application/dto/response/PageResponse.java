package app.application.dto.response;
import org.springframework.data.domain.Page;
import java.util.List;
import java.util.function.Function;
/**
 *
 * @author inici4rsesi0n
 */
public record PageResponse<T>(
        List<T> contenido,
        int pagina,
        int tamanio,
        long total,
        int totalPaginas,
        boolean esUltima
){
    public static <E, D> PageResponse<D> desde(Page<E> page, Function<E, D> mapper){
        List<D> contenido=page.getContent().stream().map(mapper).toList();
        return new PageResponse<>(
                contenido,
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast());
    }
}
