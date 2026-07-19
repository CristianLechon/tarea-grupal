import api from './api';
import type { Book } from '../types/Book';

const BASE_URL = import.meta.env.VITE_BOOKS_API_URL || 'http://localhost/app-books';

export const bookService = {
  getAll: async () => {
    const response = await api.get<Book[]>(`${BASE_URL}/books`);
    return response.data;
  },
  
  getById: async (isbn: string) => {
    const response = await api.get<Book>(`${BASE_URL}/books/${isbn}`);
    return response.data;
  },
  
  create: async (book: Book) => {
    const response = await api.post<Book>(`${BASE_URL}/books`, book);
    return response.data;
  },
  
  update: async (isbn: string, book: Partial<Book>) => {
    const response = await api.put<Book>(`${BASE_URL}/books/${isbn}`, book);
    return response.data;
  },
  
  delete: async (isbn: string) => {
    const response = await api.delete(`${BASE_URL}/books/${isbn}`);
    return response.data;
  }
};
