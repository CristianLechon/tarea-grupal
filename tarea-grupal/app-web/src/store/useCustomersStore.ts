import { create } from 'zustand';
import { customersService } from '../services/customersService';
import type { Customer, CustomerInput } from '../types/Customer';

interface CustomersState {
    items: Customer[];
    loading: boolean;
    error: string | null;

    fetchAll: () => Promise<void>;
    create: (input: CustomerInput) => Promise<void>;
    update: (id: number, input: CustomerInput) => Promise<void>;
    remove: (id: number) => Promise<void>;
}

export const useCustomersStore = create<CustomersState>((set, get) => ({
    items: [],
    loading: false,
    error: null,

    fetchAll: async () => {
        set({ loading: true, error: null });
        try {
            const items = await customersService.listar();
            set({ items, loading: false });
        } catch {
            set({ error: 'No se pudieron cargar los clientes', loading: false });
        }
    },

    create: async (input) => {
        set({ loading: true, error: null });
        try {
            await customersService.crear(input);
            await get().fetchAll();
        } catch {
            set({ error: 'No se pudo crear el cliente', loading: false });
        }
    },

    update: async (id, input) => {
        set({ loading: true, error: null });
        try {
            await customersService.actualizar(id, input);
            await get().fetchAll();
        } catch {
            set({ error: 'No se pudo actualizar el cliente', loading: false });
        }
    },

    remove: async (id) => {
        set({ loading: true, error: null });
        try {
            await customersService.eliminar(id);
            await get().fetchAll();
        } catch {
            set({ error: 'No se pudo eliminar el cliente', loading: false });
        }
    },
}));
