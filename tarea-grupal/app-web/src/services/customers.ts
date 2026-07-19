import api from './api';
import type { Customer } from '../types/Customer';

const BASE_URL = import.meta.env.VITE_CUSTOMERS_API_URL || 'http://localhost/app-customers';

export const customerService = {
  getAll: async () => {
    const response = await api.get<Customer[]>(`${BASE_URL}/customers`);
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get<Customer>(`${BASE_URL}/customers/${id}`);
    return response.data;
  },
  
  create: async (customer: Omit<Customer, 'id'>) => {
    const response = await api.post<Customer>(`${BASE_URL}/customers`, customer);
    return response.data;
  },
  
  update: async (id: number, customer: Partial<Customer>) => {
    const response = await api.put<Customer>(`${BASE_URL}/customers/${id}`, customer);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`${BASE_URL}/customers/${id}`);
    return response.data;
  }
};
