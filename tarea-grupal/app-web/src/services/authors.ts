import api from './api';
import type { Author } from '../types/Author';

const BASE_URL = import.meta.env.VITE_AUTHORS_API_URL || 'http://localhost/app-authors';

export const authorService = {
  getAll: async () => {
    const response = await api.get<Author[]>(`${BASE_URL}/authors`);
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get<Author>(`${BASE_URL}/authors/${id}`);
    return response.data;
  },
  
  create: async (author: Omit<Author, 'id'>) => {
    const response = await api.post<Author>(`${BASE_URL}/authors`, author);
    return response.data;
  },
  
  update: async (id: number, author: Partial<Author>) => {
    const response = await api.put<Author>(`${BASE_URL}/authors/${id}`, author);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`${BASE_URL}/authors/${id}`);
    return response.data;
  }
};
