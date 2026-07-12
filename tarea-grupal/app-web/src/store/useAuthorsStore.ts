import { create } from 'zustand';
import { authorsService } from '../services/authorsService';
import type { Author, AuthorInput } from '../types/Author';

interface AuthorsState {
    items: Author[];
    loading: boolean;
    error: string | null;

    fetchAll: () => Promise<void>;
    create: (input: AuthorInput) => Promise<void>;
    update: (id: number, input: AuthorInput) => Promise<void>;
    remove: (id: number) => Promise<void>;
}

export const useAuthorsStore = create<AuthorsState>((set, get) => ({
    items: [],
    loading: false,
    error: null,

    fetchAll: async () => {
        set({ loading: true, error: null });
        try {
            const items = await authorsService.listar();
            set({ items, loading: false });
        } catch {
            set({ error: 'No se pudieron cargar los autores', loading: false });
        }
    },

    create: async (input) => {
        set({ loading: true, error: null });
        try {
            await authorsService.crear(input);
            await get().fetchAll();
        } catch {
            set({ error: 'No se pudo crear el autor', loading: false });
        }
    },

    update: async (id, input) => {
        set({ loading: true, error: null });
        try {
            await authorsService.actualizar(id, input);
            await get().fetchAll();
        } catch {
            set({ error: 'No se pudo actualizar el autor', loading: false });
        }
    },

    remove: async (id) => {
        set({ loading: true, error: null });
        try {
            await authorsService.eliminar(id);
            await get().fetchAll();
        } catch {
            set({ error: 'No se pudo eliminar el autor', loading: false });
        }
    },
}));
