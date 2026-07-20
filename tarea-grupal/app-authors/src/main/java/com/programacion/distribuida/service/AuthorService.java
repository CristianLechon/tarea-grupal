package com.programacion.distribuida.service;

import com.programacion.distribuida.dtos.AuthorDto;
import com.programacion.distribuida.model.Author;
import com.programacion.distribuida.repository.AuthorRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@ApplicationScoped
@Transactional
public class AuthorService {

    @Inject
    private AuthorRepository authorRepository;

    AtomicInteger counter = new AtomicInteger(1);

    public List<AuthorDto> listarTodos() {
        List<AuthorDto> lista = new ArrayList<>();
        for (Author author : this.authorRepository.listAll()) {
            lista.add(this.mapperToAuthorDto(author));
        }
        return lista;
    }

    public Optional<AuthorDto> buscarPorId(Integer id) {
        return Optional.ofNullable(this.authorRepository.findById(id))
                .map(author -> this.mapperToAuthorDto(author));
    }

    public List<AuthorDto> findByBook(String isbn) {
        int val = counter.getAndIncrement();
        if (val % 5 != 0) {
            String msg = String.format("Intento %d generando error", val);
            System.out.println(msg);
            throw new RuntimeException(msg);
        }
        List<AuthorDto> lista = new ArrayList<>();
        for (Author author : this.authorRepository.findByBook(isbn)) {
            lista.add(this.mapperToAuthorDto(author));
        }
        return lista;
    }

    public void crear(AuthorDto authorDto) {
        this.authorRepository.persist(this.mapperToAuthor(authorDto));
    }

    public Optional<AuthorDto> actualizar(Integer id, AuthorDto authorDto) {
        return Optional.ofNullable(this.authorRepository.findById(id))
                .map(author -> {
                    author.setName(authorDto.getName());
                    author.setVersion(authorDto.getVersion());
                    return this.mapperToAuthorDto(author);
                });
    }

    public Optional<Boolean> eliminar(Integer id) {
        return Optional.ofNullable(this.authorRepository.findById(id))
                .map(author -> {
                    this.authorRepository.deleteById(id);
                    return true;
                });
    }

    private AuthorDto mapperToAuthorDto(Author author) {
        AuthorDto dto = new AuthorDto();
        dto.setId(author.getId());
        dto.setName(author.getName());
        dto.setVersion(author.getVersion());
        return dto;
    }

    private Author mapperToAuthor(AuthorDto authorDto) {
        Author author = new Author();
        author.setId(authorDto.getId());
        author.setName(authorDto.getName());
        author.setVersion(authorDto.getVersion());
        return author;
    }
}
