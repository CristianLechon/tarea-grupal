package com.programacion.distribuida.customers.service;

import com.programacion.distribuida.customers.dtos.CustomerDto;
import com.programacion.distribuida.customers.model.Customer;
import com.programacion.distribuida.customers.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<CustomerDto> listarTodos() {
        List<CustomerDto> lista = new ArrayList<>();
        for (Customer customer : this.customerRepository.findAll()) {
            lista.add(this.mapperToCustomerDto(customer));
        }
        return lista;
    }

    public Optional<CustomerDto> buscarPorId(Integer id) {
        return this.customerRepository.findById(id)
                .map(this::mapperToCustomerDto);
    }

    public List<CustomerDto> buscarPorEmail(String email) {
        List<CustomerDto> lista = new ArrayList<>();
        this.customerRepository.findByEmail(email)
                .ifPresent(customer -> lista.add(this.mapperToCustomerDto(customer)));
        return lista;
    }

    public CustomerDto crear(CustomerDto customerDto) {
        if (this.customerRepository.findByEmail(customerDto.getEmail()).isPresent()) {
            throw new EmailException(customerDto.getEmail());
        }
        Customer customer = this.mapperToCustomer(customerDto);
        customer.setCreatedAt(LocalDateTime.now());
        this.customerRepository.save(customer);
        return this.mapperToCustomerDto(customer);
    }

    public Optional<CustomerDto> actualizar(Integer id, CustomerDto customerDto) {
        return this.customerRepository.findById(id).map(customer -> {
            customer.setFirstName(customerDto.getFirstName());
            customer.setLastName(customerDto.getLastName());
            customer.setEmail(customerDto.getEmail());
            customer.setPhone(customerDto.getPhone());
            customer.setAddress(customerDto.getAddress());
            this.customerRepository.save(customer);
            return this.mapperToCustomerDto(customer);
        });
    }

    public boolean eliminar(Integer id) {
        if (!this.customerRepository.existsById(id)) {
            return false;
        }
        this.customerRepository.deleteById(id);
        return true;
    }

    private CustomerDto mapperToCustomerDto(Customer customer) {
        return CustomerDto.builder()
                .id(customer.getId())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .createdAt(customer.getCreatedAt())
                .build();
    }

    private Customer mapperToCustomer(CustomerDto dto) {
        Customer customer = new Customer();
        customer.setFirstName(dto.getFirstName());
        customer.setLastName(dto.getLastName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
        return customer;
    }
}
