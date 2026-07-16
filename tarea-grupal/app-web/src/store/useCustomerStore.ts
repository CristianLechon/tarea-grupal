import { create } from 'zustand';
import type { Customer } from '../types/Customer';
import { customerService } from '../services/customers';

interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  fetchCustomers: () => Promise<void>;
  createCustomer: (customer: Omit<Customer, 'id'>) => Promise<void>;
  updateCustomer: (id: number, customer: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: number) => Promise<void>;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [],
  loading: false,
  error: null,
  
  fetchCustomers: async () => {
    set({ loading: true, error: null });
    try {
      const customers = await customerService.getAll();
      set({ customers, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  createCustomer: async (customer) => {
    set({ loading: true, error: null });
    try {
      await customerService.create(customer);
      const customers = await customerService.getAll();
      set({ customers, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  updateCustomer: async (id, customerData) => {
    set({ loading: true, error: null });
    try {
      await customerService.update(id, customerData);
      const customers = await customerService.getAll();
      set({ customers, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  deleteCustomer: async (id) => {
    set({ loading: true, error: null });
    try {
      await customerService.delete(id);
      const customers = await customerService.getAll();
      set({ customers, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
