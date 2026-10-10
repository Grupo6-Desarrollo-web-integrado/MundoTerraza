package app.domain.valueobject;
import java.util.Objects;
/**
 *
 * @author inici4rsesi0n
 */
public final class Coordenada{
    private final double latitud;
    private final double longitud;
    private Coordenada(double latitud, double longitud){
        this.latitud=latitud;
        this.longitud=longitud;
    }
    public static Coordenada de(double latitud, double longitud){
        if(latitud<-90||latitud>90)
            throw new IllegalArgumentException("La latitud debe estar entre -90 y 90");
        if(longitud<-180||longitud>180)
            throw new IllegalArgumentException("La longitud debe estar entre -180 y 180");
        return new Coordenada(latitud, longitud);
    }
    public double getLatitud(){return latitud;}
    public double getLongitud(){return longitud;}
    @Override
    public boolean equals(Object o){
        if(this==o)return true;
        if(!(o instanceof Coordenada that))return false;
        return Double.compare(that.latitud, latitud)==0&&Double.compare(that.longitud, longitud)==0;
    }
    @Override
    public int hashCode(){return Objects.hash(latitud, longitud);}
    @Override
    public String toString() {
        return latitud+","+longitud;
    }
}
