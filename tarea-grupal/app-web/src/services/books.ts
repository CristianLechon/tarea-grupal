import api from './api';
import type { Book } from '../types/Book';

const BASE_URL = import.meta.env.BOOKS_API_URL || 'http://localhost:8080/books';

export const bookService = {
  getAll: async () => {
    const response = await api.get<Book[]>(BASE_URL);
    return response.data;
  },
  
  getById: async (isbn: string) => {
    const response = await api.get<Book>(`${BASE_URL}/${isbn}`);
    return response.data;
  },
  
  create: async (book: Book) => {
    const response = await api.post<Book>(BASE_URL, book);
    return response.data;
  },
  
  update: async (isbn: string, book: Partial<Book>) => {
    const response = await api.put<Book>(`${BASE_URL}/${isbn}`, book);
    return response.data;
  },
  
  delete: async (isbn: string) => {
    const response = await api.delete(`${BASE_URL}/${isbn}`);
    return response.data;
  }
};
