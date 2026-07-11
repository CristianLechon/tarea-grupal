package com.programacion.distribuida.dtos;

import lombok.*;

@Getter @Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthorDto {
    private Integer id;
    private String name;
    private Integer version;
}
