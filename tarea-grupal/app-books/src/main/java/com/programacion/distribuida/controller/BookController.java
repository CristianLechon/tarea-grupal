package com.programacion.distribuida.controller;

import com.programacion.distribuida.dtos.BookDto;
import com.programacion.distribuida.service.BookService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;

@Path("/books")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BookController {

    @Inject
    private BookService bookService;

    @GET
    public Response listarTodos() {
        var res = this.bookService.listarTodos();
        return Response.status(Response.Status.OK).entity(res).build();
    }

    @GET
    @Path("/{isbn}")
    public Response buscarPorIsbn(@PathParam("isbn") String isbn) {
        return bookService.buscarPorIsbn(isbn)
                .map(Response::ok)
                .orElse(Response.status(Response.Status.NOT_FOUND))
                .build();
    }

    @POST
    @Path("/")
    public Response crearBook(BookDto bookDto) {
        this.bookService.crear(bookDto);
        return Response.created(URI.create("/books/" + bookDto.getIsbn()))
                .entity(bookDto)
                .build();
    }

    @PUT
    @Path("/{isbn}")
    public Response actualizarBook(@PathParam("isbn") String isbn, BookDto bookDto) {
        return this.bookService.actualizar(isbn, bookDto)
                .map(Response::ok)
                .orElse(Response.status(Response.Status.NOT_FOUND))
                .build();
    }

    @DELETE
    @Path("/{isbn}")
    public Response eliminar(@PathParam("isbn") String isbn) {
        return this.bookService.eliminar(isbn)
                .map(Response::ok)
                .orElse(Response.status(Response.Status.NOT_FOUND))
                .build();
    }
}
