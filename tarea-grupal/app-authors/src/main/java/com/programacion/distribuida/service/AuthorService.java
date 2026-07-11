package com.programacion.distribuida.service;

import com.programacion.distribuida.model.Author;
import com.programacion.distribuida.repository.AuthorRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
@Transactional
public class AuthorService {

    @Inject
    private AuthorRepository authorRepository;

    public List<Author> listarTodos() {
        return authorRepository.listAll();
    }
}
