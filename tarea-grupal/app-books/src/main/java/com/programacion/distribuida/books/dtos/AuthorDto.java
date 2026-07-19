package com.programacion.distribuida.books.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthorDto {
    private  Integer id;
    private String name;
}
