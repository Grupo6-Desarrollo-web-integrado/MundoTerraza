package app.domain.enums;
/**
 * Rol efectivo expuesto en la API. Se deriva del estado del usuario:
 * todo usuario es HUESPED; si ademas es anfitrion, su rol efectivo
 * puede alternar a ANFITRION segun el modo activo.
 *
 * @author inici4rsesi0n
 */
public enum RolEfectivo {
    HUESPED,
    ANFITRION
}
