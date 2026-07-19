package com.programacion.distribuida.books.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "inventory")
@ToString
public class Inventory {
    
    @Id
    @Column(name = "book_isbn")
    private String bookIsbn;

    @OneToOne
    @JoinColumn(name = "book_isbn", insertable = false, updatable = false)
    @ToString.Exclude
    private Book book;
    
    private Integer sold;
    private Integer supplied;
    private Integer version;
}
