package com.programacion.distribuida.customers.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {

    private Integer id;

    @NotBlank(message = "El nombre es obligatorio")
    private String firstName;

    @NotBlank(message = "El apellido es obligatorio")
    private String lastName;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email no tiene un formato valido")
    private String email;

    private String phone;

    private String address;

    private LocalDateTime createdAt;
}
