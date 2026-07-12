package com.programacion.distribuida.controller;

import com.programacion.distribuida.dtos.AuthorDto;
import com.programacion.distribuida.service.AuthorService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Path("/authors")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthorController {

    @Inject
    private AuthorService authorService;

    @Inject
    @ConfigProperty(name = "quarkus.http.port")
    Integer httpPort;

    @GET
    public Response listarTodos() {
        var res = this.authorService.listarTodos();
        return Response.status(Response.Status.OK).entity(res).build();
    }

    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Integer id) {
        return authorService.buscarPorId(id)
                .map(it -> {
                    it.setName(it.getName() + " (puerto: " + httpPort + ")");
                    return it;
                })
                .map(Response::ok)
                .orElse(Response.status(Response.Status.NOT_FOUND))
                .build();
    }

    @GET
    @Path("/find/{isbn}")
    public Response buscarPorIsbn(@PathParam("isbn") String isbn) {
        var res = this.authorService.findByBook(isbn);
        return Response.status(Response.Status.OK).entity(res).build();
    }

    @POST
    @Path("/")
    public Response crearAuthor(AuthorDto authorDto) {
        this.authorService.crear(authorDto);
        return Response.status(Response.Status.CREATED).entity(authorDto).build();
    }

    @PUT
    @Path("/{id}")
    public Response actualizarAuthor(@PathParam("id") Integer id, AuthorDto authorDto) {
        return this.authorService.actualizar(id, authorDto)
                .map(Response::ok)
                .orElse(Response.status(Response.Status.NOT_FOUND))
                .build();
    }

    @DELETE
    @Path("/{id}")
    public Response eliminar(@PathParam("id") Integer id) {
        return this.authorService.eliminar(id)
                .map(Response::ok)
                .orElse(Response.status(Response.Status.NOT_FOUND))
                .build();
    }

}
