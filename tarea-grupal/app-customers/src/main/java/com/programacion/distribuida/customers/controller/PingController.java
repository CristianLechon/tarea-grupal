package com.programacion.distribuida.customers.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// NOTA: Este endpoint lo agregue nomas pq en la tabla 5.2 del pdf lo pide
// NO REEMPLAZA LOS HEALTH CHECKs del Actuator, eso lo voy a configurar en otro lado
@RestController
public class PingController {

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}

