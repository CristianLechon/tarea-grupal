import { create } from 'zustand';
import type { Author } from '../types/Author';
import { authorService } from '../services/authors';

interface AuthorState {
  authors: Author[];
  loading: boolean;
  error: string | null;
  fetchAuthors: () => Promise<void>;
  createAuthor: (author: Omit<Author, 'id'>) => Promise<void>;
  updateAuthor: (id: number, author: Partial<Author>) => Promise<void>;
  deleteAuthor: (id: number) => Promise<void>;
}

export const useAuthorStore = create<AuthorState>((set) => ({
  authors: [],
  loading: false,
  error: null,
  
  fetchAuthors: async () => {
    set({ loading: true, error: null });
    try {
      const authors = await authorService.getAll();
      set({ authors, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  createAuthor: async (author) => {
    set({ loading: true, error: null });
    try {
      await authorService.create(author);
      const authors = await authorService.getAll();
      set({ authors, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  updateAuthor: async (id, authorData) => {
    set({ loading: true, error: null });
    try {
      await authorService.update(id, authorData);
      const authors = await authorService.getAll();
      set({ authors, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  deleteAuthor: async (id) => {
    set({ loading: true, error: null });
    try {
      await authorService.delete(id);
      const authors = await authorService.getAll();
      set({ authors, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
