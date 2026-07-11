package com.programacion.distribuida.repository;

import com.programacion.distribuida.model.Author;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
@Transactional
public class AuthorRepository implements PanacheRepositoryBase<Author, Integer> {
    public List<Author> findByBook(String isbn) {
        return this.find("select o.author from BookAuthor o where o.id.isbn = ?1", isbn)
                .list();
    }
}
