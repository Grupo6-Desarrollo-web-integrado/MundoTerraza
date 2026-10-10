package app.domain.model;
import app.domain.enums.EstadoPropiedad;
import app.domain.valueobject.Dni;
import app.domain.valueobject.Email;
import app.domain.valueobject.Telefono;
import app.domain.enums.EstadoUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
 *
 * @author inici4rsesi0n
 */
@Entity
@Table(name="usuarios")
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
public class Usuario{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="nombre", nullable=false, length=100)
    private String nombre;
    @Column(name="correo", nullable=false, unique=true, length=150)
    private Email correo;
    @Column(name="password", nullable=false, length=255)
    private String passwordHash;
    @Column(name="telefono", length=20)
    private Telefono telefono;
    @Column(name="dni", length=15)
    private Dni dni;
    @Column(name="ciudad", length=100)
    private String ciudad;
    @Column(name="biografia", length=500)
    private String biografia;
    @Column(name="es_anfitrion", nullable=false)
    private boolean esAnfitrion;
    @Column(name="fecha_anfitrion")
    private LocalDateTime fechaAnfitrion;
    @Enumerated(EnumType.STRING)
    @Column(name="estado", nullable=false, length=30)
    private EstadoUsuario estado;
    @Column(name="intentos_fallidos", nullable=false)
    private int intentosFallidos;
    @Column(name="bloqueado_hasta")
    private LocalDateTime bloqueadoHasta;
    @Column(name="fecha_creacion", nullable=false)
    private LocalDateTime fechaCreacion;
    @Column(name="fecha_actualizacion", nullable=false)
    private LocalDateTime fechaActualizacion;
    public Usuario(String nombre, Email correo, String passwordHash){
        if(nombre==null||nombre.isBlank())
            throw new IllegalArgumentException("Nombre no puede ser nulo o vacio");
        if(correo==null)
            throw new IllegalArgumentException("Correo no puede ser nulo");
        if(passwordHash==null||passwordHash.isBlank())
            throw new IllegalArgumentException("Hash de contrasena no puede ser nulo o vacio");
        this.nombre=nombre.trim();
        this.correo=correo;
        this.passwordHash=passwordHash;
        this.esAnfitrion=false;
        this.estado=EstadoUsuario.ACTIVA;
        this.intentosFallidos=0;
    }
    public void convertirEnAnfitrion(Telefono telefono, Dni dni, String ciudad, String biografia){
        if(this.esAnfitrion)
            throw new IllegalStateException("El usuario ya es anfitrion");
        if(telefono==null)
            throw new IllegalArgumentException("Telefono no puede ser nulo");
        if(dni==null)
            throw new IllegalArgumentException("DNI no puede ser nulo");
        if(ciudad==null||ciudad.isBlank())
            throw new IllegalArgumentException("Ciudad no puede ser nula o vacia");
        if(biografia==null||biografia.isBlank())
            throw new IllegalArgumentException("Biografia no puede ser nula o vacia");
        this.telefono=telefono;
        this.dni=dni;
        this.ciudad=ciudad.trim();
        this.biografia=biografia.trim();
        this.esAnfitrion=true;
        this.fechaAnfitrion=LocalDateTime.now();
    }
    public void registrarIntentoFallido(int maxIntentos, int minutosBloqueo){
        this.intentosFallidos++;
        if(this.intentosFallidos>=maxIntentos)
            this.bloqueadoHasta=LocalDateTime.now().plusMinutes(minutosBloqueo);
    }
    public void reiniciarIntentos(){
        this.intentosFallidos=0;
        this.bloqueadoHasta=null;
    }
    public boolean estaBloqueado(){
        return bloqueadoHasta!=null&&bloqueadoHasta.isAfter(LocalDateTime.now());
    }
    @PrePersist
    void alCrear(){
        LocalDateTime ahora=LocalDateTime.now();
        this.fechaCreacion=ahora;
        this.fechaActualizacion=ahora;
    }
    @PreUpdate
    void alActualizar(){
        this.fechaActualizacion=LocalDateTime.now();
    }
}
