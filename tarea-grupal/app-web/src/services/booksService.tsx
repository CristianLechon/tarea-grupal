import { createApiClient } from './httpClient';
import type { Book, BookInput } from '../types/Book';

const api = createApiClient(import.meta.env.VITE_BOOKS_API_URL);

export const booksService = {
    listar: async (): Promise<Book[]> => {
        const { data } = await api.get<Book[]>('/books');
        return data;
    },

    buscarPorIsbn: async (isbn: string): Promise<Book> => {
        const { data } = await api.get<Book>(`/books/${isbn}`);
        return data;
    },

    crear: async (book: BookInput): Promise<Book> => {
        const { data } = await api.post<Book>('/books', book);
        return data;
    },

    actualizar: async (isbn: string, book: BookInput): Promise<Book> => {
        const { data } = await api.put<Book>(`/books/${isbn}`, book);
        return data;
    },

    eliminar: async (isbn: string): Promise<void> => {
        await api.delete(`/books/${isbn}`);
    },
};
