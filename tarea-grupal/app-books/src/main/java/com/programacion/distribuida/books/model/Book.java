package com.programacion.distribuida.books.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Entity
@Table(name = "books")
@Getter @Setter
@ToString
public class Book {

    @Id
    private String isbn;

    private String title;
    private BigDecimal price;
    private Integer version;

    @OneToOne(mappedBy = "book")
    private Inventory inventory;
}
