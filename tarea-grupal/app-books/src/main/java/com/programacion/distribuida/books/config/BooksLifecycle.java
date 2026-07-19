package com.programacion.distribuida.books.config;

import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;
import io.vertx.core.Vertx;
import io.vertx.ext.consul.CheckOptions;
import io.vertx.ext.consul.ConsulClient;
import io.vertx.ext.consul.ConsulClientOptions;
import io.vertx.ext.consul.ServiceOptions;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.net.InetAddress;
import java.util.List;

@ApplicationScoped
public class BooksLifecycle {

    @Inject
    @ConfigProperty(name = "consul.host", defaultValue = "127.0.0.1")
    String consulHost;

    @Inject
    @ConfigProperty(name = "consul.port", defaultValue = "8500")
    Integer consulPort;

    @ConfigProperty(name = "app.name", defaultValue = "app-books")
    String appName;

    @Inject
    @ConfigProperty(name = "quarkus.http.port", defaultValue = "8080")
    Integer appPort;

    String servceId;

    public void iniciar(@Observes StartupEvent event, Vertx vertx) {
        try {
            ConsulClientOptions options = new ConsulClientOptions()
                    .setHost(consulHost)
                    .setPort(consulPort);
            ConsulClient client = ConsulClient.create(vertx, options);
            String ipAddress = InetAddress.getLocalHost().getHostAddress();
            servceId = appName + "-%s:%d".formatted(ipAddress, appPort);

            var urlCheck = "http://%s:%d/q/health/live".formatted(ipAddress, appPort);
            CheckOptions checkOptions = new CheckOptions()
                    .setHttp(urlCheck)
                    .setInterval("10s")
                    .setDeregisterAfter("10s");

            var tags = List.of(
                "traefik.enable=true",
                "traefik.http.routers." + appName + ".rule=PathPrefix(`/" + appName + "`)",
                "traefik.http.routers." + appName + ".middlewares=" + appName,
                "traefik.http.middlewares." + appName + ".stripprefix.prefixes=/" + appName
            );

            ServiceOptions serviceOptions = new ServiceOptions()
                    .setName(appName)
                    .setId(servceId)
                    .setAddress(ipAddress)
                    .setPort(appPort)
                    .setCheckOptions(checkOptions)
                    .setTags(tags);

            client.registerService(serviceOptions)
                    .onSuccess(it -> System.out.println("Servicio registrado en Consul: " + servceId))
                    .onFailure(it -> System.out.println("Error registrando en Consul: " + it.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void destruir(@Observes ShutdownEvent event, Vertx vertx) {
        ConsulClientOptions options = new ConsulClientOptions()
                .setHost(consulHost)
                .setPort(consulPort);
        ConsulClient client = ConsulClient.create(vertx, options);
        client.deregisterCheck(servceId)
                .onSuccess(it -> System.out.println("Servicio desregistrado de Consul: " + servceId))
                .onFailure(it -> System.out.println("Error desregistrando de Consul: " + it.getMessage()));
    }
}
