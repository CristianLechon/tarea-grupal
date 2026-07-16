import api from './api';
import type { Author } from '../types/Author';

const BASE_URL = import.meta.env.AUTHORS_API_URL || 'http://localhost:8070/authors';

export const authorService = {
  getAll: async () => {
    const response = await api.get<Author[]>(BASE_URL);
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get<Author>(`${BASE_URL}/${id}`);
    return response.data;
  },
  
  create: async (author: Omit<Author, 'id'>) => {
    const response = await api.post<Author>(BASE_URL, author);
    return response.data;
  },
  
  update: async (id: number, author: Partial<Author>) => {
    const response = await api.put<Author>(`${BASE_URL}/${id}`, author);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`${BASE_URL}/${id}`);
    return response.data;
  }
};
