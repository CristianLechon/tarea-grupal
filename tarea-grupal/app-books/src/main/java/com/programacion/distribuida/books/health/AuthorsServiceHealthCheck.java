package com.programacion.distribuida.books.health;

import com.programacion.distribuida.books.client.AuthorRestClient;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Liveness;
import org.eclipse.microprofile.health.Readiness;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@ApplicationScoped
@Readiness
@Liveness
public class AuthorsServiceHealthCheck implements HealthCheck {

    @Inject
    @RestClient
    private AuthorRestClient authorRestClient;

    @Override
    public HealthCheckResponse call() {
        try {
            // Hacemos una llamada de prueba para ver si el servicio responde o si el circuito esta abierto
            authorRestClient.findByBook("test-health");
            return HealthCheckResponse.up("Servicio app-authors");
        } catch (Exception e) {
            return HealthCheckResponse.named("Servicio app-authors")
                    .withData("Motivo", "El circuito esta abierto o el servicio no responde")
                    .down()
                    .build();
        }
    }
}
