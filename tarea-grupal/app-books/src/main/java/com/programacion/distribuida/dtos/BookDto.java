package com.programacion.distribuida.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    private String isbn;
    private String title;
    private Double price;

    private Integer inventorySold;
    private Integer inventorySupplied;

    public List<AuthorDto> authors;
}
