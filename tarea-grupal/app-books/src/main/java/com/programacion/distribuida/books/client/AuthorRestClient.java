package com.programacion.distribuida.books.client;

import com.programacion.distribuida.books.dtos.AuthorDto;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.faulttolerance.CircuitBreaker;
import org.eclipse.microprofile.faulttolerance.Fallback;
import org.eclipse.microprofile.faulttolerance.Retry;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import java.util.List;

@Path("/authors")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RegisterRestClient(configKey = "authors-api")
public interface AuthorRestClient {

    @GET
    @Path("/find/{isbn}")
    @Retry(maxRetries = 2)
    @CircuitBreaker(requestVolumeThreshold = 3, delay = 5000)
    @Fallback(fallbackMethod = "findByBookFallback")
    List<AuthorDto> findByBook(@PathParam("isbn") String isbn);

    default List<AuthorDto> findByBookFallback(String isbn, Throwable t) {
        System.out.println("FALLBACK ACTIVADO: No se pudo contactar con app-authors. Causa: " + t.getMessage());
        t.printStackTrace();
        AuthorDto dto = AuthorDto.builder()
                .name("Autores temporalmente no disponibles")
                .id(0)
                .build();
        return List.of(dto);
    }
}
