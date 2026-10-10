package app.infrastructure.observability;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
/**
 *
 * @author inici4rsesi0n
 */
@Aspect
@Component
public class LoggingAspect{
    private static final Logger log=LoggerFactory.getLogger(LoggingAspect.class);
    @Around("execution(* app.application.service..*(..))")
    public Object logear(ProceedingJoinPoint joinPoint) throws Throwable{
        String metodo=joinPoint.getSignature().toShortString();
        long inicio=System.currentTimeMillis();
        try{
            Object resultado=joinPoint.proceed();
            long duracion=System.currentTimeMillis()-inicio;
            log.debug("OK {} ({} ms)", metodo, duracion);
            return resultado;
        }catch(Throwable t){
            long duracion=System.currentTimeMillis()-inicio;
            log.debug("ERROR {} ({} ms) - {}", metodo, duracion, t.getMessage());
            throw t;
        }
    }
}
