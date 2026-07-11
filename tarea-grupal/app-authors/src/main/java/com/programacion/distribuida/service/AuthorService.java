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

@ApplicationScoped
@Transactional
public class AuthorService {

    @Inject
    private AuthorRepository authorRepository;

    public List<AuthorDto> listarTodos() {
        List<AuthorDto> lista = new ArrayList<>();
        for (Author author: this.authorRepository.listAll()){
            lista.add(this.mapperToAuthorDto(author));
        }
        return lista;
    }

    public Optional<AuthorDto> buscarPorId(Integer id) {
        return Optional.of(this.mapperToAuthorDto(this.authorRepository.findById(id)));
    }

    public List<AuthorDto> findByBook(String isbn) {
        List<AuthorDto> lista = new ArrayList<>();
        for (Author author : this.authorRepository.findByBook(isbn)) {
            lista.add(this.mapperToAuthorDto(author));
        }
        return lista;
    }

    public void crear(AuthorDto authorDto) {
        this.authorRepository.persist(this.mapperToAuthor(authorDto));
    }

    public void actualizar(Integer id, AuthorDto authorDto) {
        Author author = this.authorRepository.findById(id);
        author.setName(authorDto.getName());
        author.setVersion(authorDto.getVersion());
    }

    public void eliminar(Integer id) {
        this.authorRepository.deleteById(id);
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
