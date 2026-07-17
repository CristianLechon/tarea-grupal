package com.programacion.distribuida.service;

import com.programacion.distribuida.client.AuthorRestClient;
import com.programacion.distribuida.dtos.AuthorDto;
import com.programacion.distribuida.dtos.BookDto;
import com.programacion.distribuida.model.Book;
import com.programacion.distribuida.model.Inventory;
import com.programacion.distribuida.repository.BookRepository;
import com.programacion.distribuida.repository.InventoryRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
@Transactional
public class BookService {

    @Inject
    private BookRepository bookRepository;

    @Inject
    private InventoryRepository inventoryRepository;

    @Inject
    @RestClient
    private AuthorRestClient authorRestClient;

    public List<BookDto> listarTodos() {
        List<BookDto> lista = new ArrayList<>();
        for (Book book : this.bookRepository.listAll()) {
            lista.add(this.construirBookDtoCompleto(book));
        }
        return lista;
    }

    public Optional<BookDto> buscarPorIsbn(String isbn) {
        return Optional.ofNullable(this.bookRepository.findById(isbn))
                .map(this::construirBookDtoCompleto);
    }

    public void crear(BookDto bookDto) {
        Book book = new Book();
        book.setIsbn(bookDto.getIsbn());
        book.setTitle(bookDto.getTitle());
        book.setPrice(bookDto.getPrice());
        book.setVersion(1);
        this.bookRepository.persist(book);
        
        Inventory inv = new Inventory();
        inv.setBookIsbn(book.getIsbn());
        inv.setSold(0);
        inv.setSupplied(bookDto.getInventorySupplied() != null ? bookDto.getInventorySupplied() : 0);
        inv.setVersion(1);
        this.inventoryRepository.persist(inv);
    }

    public Optional<BookDto> actualizar(String isbn, BookDto bookDto) {
        return Optional.ofNullable(this.bookRepository.findById(isbn))
                .map(book -> {
                    book.setTitle(bookDto.getTitle());
                    book.setPrice(bookDto.getPrice());
                    return this.construirBookDtoCompleto(book);
                });
    }

    public Optional<Boolean> eliminar(String isbn) {
        return Optional.ofNullable(this.bookRepository.findById(isbn))
                .map(book -> {
                    this.inventoryRepository.deleteById(isbn);
                    this.bookRepository.deleteById(isbn);
                    return true;
                });
    }

    private BookDto construirBookDtoCompleto(Book book) {
        BookDto dto = new BookDto();
        dto.setIsbn(book.getIsbn());
        dto.setTitle(book.getTitle());
        dto.setPrice(book.getPrice());

        Inventory inv = inventoryRepository.findById(book.getIsbn());
        if (inv != null) {
            dto.setInventorySold(inv.getSold());
            dto.setInventorySupplied(inv.getSupplied());
        }

        try {
            List<AuthorDto> autores = authorRestClient.findByBook(book.getIsbn());
            dto.setAuthors(autores);
        } catch (Exception e) {
            System.err.println("Error obteniendo autores: " + e.getMessage());
            dto.setAuthors(new ArrayList<>());
        }

        return dto;
    }
}
