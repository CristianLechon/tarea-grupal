import { createApiClient } from './httpClient';
import type { Customer, CustomerInput } from '../types/Customer';

const api = createApiClient(import.meta.env.VITE_CUSTOMERS_API_URL);

export const customersService = {
    listar: async (): Promise<Customer[]> => {
        const { data } = await api.get<Customer[]>('/customers');
        return data;
    },

    buscarPorId: async (id: number): Promise<Customer> => {
        const { data } = await api.get<Customer>(`/customers/${id}`);
        return data;
    },

    crear: async (customer: CustomerInput): Promise<Customer> => {
        const { data } = await api.post<Customer>('/customers', customer);
        return data;
    },

    actualizar: async (id: number, customer: CustomerInput): Promise<Customer> => {
        const { data } = await api.put<Customer>(`/customers/${id}`, customer);
        return data;
    },

    eliminar: async (id: number): Promise<void> => {
        await api.delete(`/customers/${id}`);
    },
};
