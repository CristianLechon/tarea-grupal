import { createApiClient } from './httpClient';
import type { Author, AuthorInput } from '../types/Author';

const api = createApiClient(import.meta.env.VITE_AUTHORS_API_URL);

export const authorsService = {
    listar: async (): Promise<Author[]> => {
        const { data } = await api.get<Author[]>('/authors');
        return data;
    },

    buscarPorId: async (id: number): Promise<Author> => {
        const { data } = await api.get<Author>(`/authors/${id}`);
        return data;
    },

    buscarPorIsbn: async (isbn: string): Promise<Author[]> => {
        const { data } = await api.get<Author[]>(`/authors/find/${isbn}`);
        return data;
    },

    crear: async (author: AuthorInput): Promise<Author> => {
        const { data } = await api.post<Author>('/authors', author);
        return data;
    },

    actualizar: async (id: number, author: AuthorInput): Promise<Author> => {
        const { data } = await api.put<Author>(`/authors/${id}`, author);
        return data;
    },

    eliminar: async (id: number): Promise<void> => {
        await api.delete(`/authors/${id}`);
    },
};
