package com.programacion.distribuida.repository;

import com.programacion.distribuida.model.Inventory;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional
public class InventoryRepository implements PanacheRepositoryBase<Inventory, String> {
}
