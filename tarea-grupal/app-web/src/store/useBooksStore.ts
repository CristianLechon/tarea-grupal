import { create } from 'zustand';
import { booksService } from '../services/booksService';
import type { Book, BookInput } from '../types/Book';

interface BooksState {
    items: Book[];
    loading: boolean;
    error: string | null;

    fetchAll: () => Promise<void>;
    create: (input: BookInput) => Promise<void>;
    update: (isbn: string, input: BookInput) => Promise<void>;
    remove: (isbn: string) => Promise<void>;
}

export const useBooksStore = create<BooksState>((set, get) => ({
    items: [],
    loading: false,
    error: null,

    fetchAll: async () => {
        set({ loading: true, error: null });
        try {
            const items = await booksService.listar();
            set({ items, loading: false });
        } catch {
            set({ error: 'No se pudieron cargar los libros', loading: false });
        }
    },

    create: async (input) => {
        set({ loading: true, error: null });
        try {
            await booksService.crear(input);
            await get().fetchAll();
        } catch {
            set({ error: 'No se pudo crear el libro', loading: false });
        }
    },

    update: async (isbn, input) => {
        set({ loading: true, error: null });
        try {
            await booksService.actualizar(isbn, input);
            await get().fetchAll();
        } catch {
            set({ error: 'No se pudo actualizar el libro', loading: false });
        }
    },

    remove: async (isbn) => {
        set({ loading: true, error: null });
        try {
            await booksService.eliminar(isbn);
            await get().fetchAll();
        } catch {
            set({ error: 'No se pudo eliminar el libro', loading: false });
        }
    },
}));
