package com.programacion.distribuida.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "books")
public class Book {
    @Id
    private String isbn;
    private Integer version;
    private Double price;
    private String title;
    
    @OneToOne(mappedBy = "book")
    private Inventory inventory;
}
