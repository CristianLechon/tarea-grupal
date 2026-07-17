package com.programacion.distribuida.health;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Liveness;
import org.eclipse.microprofile.health.Readiness;

import javax.sql.DataSource;
import java.sql.Connection;

@ApplicationScoped
@Readiness
@Liveness
public class DatabaseHealthCheck implements HealthCheck {

    @Inject
    private DataSource dataSource;

    @Override
    public HealthCheckResponse call() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(2)) {
                return HealthCheckResponse.up("Conexion a la base de datos");
            } else {
                return HealthCheckResponse.down("Conexion a la base de datos");
            }
        } catch (Exception e) {
            return HealthCheckResponse.named("Conexion a la base de datos")
                    .withData("error", e.getMessage())
                    .down()
                    .build();
        }
    }
}
