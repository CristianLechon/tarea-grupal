package com.programacion.distribuida.customers.controller;

import com.programacion.distribuida.customers.dtos.CustomerDto;
import com.programacion.distribuida.customers.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public ResponseEntity<List<CustomerDto>> listarTodos(
            @RequestParam(required = false) String email) {
        if (email != null && !email.isBlank()) {
            return ResponseEntity.ok(this.customerService.buscarPorEmail(email));
        }
        return ResponseEntity.ok(this.customerService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerDto> buscarPorId(@PathVariable Integer id) {
        return this.customerService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CustomerDto> crear(@Valid @RequestBody CustomerDto customerDto) {
        CustomerDto creado = this.customerService.crear(customerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerDto> actualizar(@PathVariable Integer id,
                                                  @Valid @RequestBody CustomerDto customerDto) {
        return this.customerService.actualizar(id, customerDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        return this.customerService.eliminar(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

}
