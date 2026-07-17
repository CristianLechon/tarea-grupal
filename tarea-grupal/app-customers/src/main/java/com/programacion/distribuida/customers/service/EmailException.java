package com.programacion.distribuida.customers.service;

public class EmailException extends RuntimeException{
    public EmailException(String email) {
        super("Ya existe un cliente registrado con el email: " + email);
    }
}
