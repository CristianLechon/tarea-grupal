package com.programacion.distribuida.client;


import com.programacion.distribuida.client.fallback.AuthorFallback;
import com.programacion.distribuida.dtos.AuthorDto;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import org.eclipse.microprofile.faulttolerance.CircuitBreaker;
import org.eclipse.microprofile.faulttolerance.Fallback;
import org.eclipse.microprofile.faulttolerance.Retry;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import java.util.List;

@RegisterRestClient(baseUri = "stork://authors-api")
@Path("/authors")
public interface AuthorRestClient {

    @GET
    @Path("/find/{isbn}")
    @Retry(maxRetries = 2)
    @CircuitBreaker(requestVolumeThreshold = 3, delay = 5000)
    @Fallback(AuthorFallback.class)
    List<AuthorDto> findByBook(@PathParam("isbn") String isbn);


}
