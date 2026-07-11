package com.programacion.distribuida.controller;

import com.programacion.distribuida.model.Author;
import com.programacion.distribuida.service.AuthorService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/authors")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthorController {

    @Inject
    private AuthorService authorService;

    @GET
    public Response listarTodos() {
        var res = this.authorService.listarTodos();
        return Response.status(Response.Status.OK).entity(res).build();
    }
}
