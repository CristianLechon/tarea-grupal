import { create } from 'zustand';
import type { Book } from '../types/Book';
import { bookService } from '../services/books';

interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
  createBook: (book: Book) => Promise<void>;
  updateBook: (isbn: string, book: Partial<Book>) => Promise<void>;
  deleteBook: (isbn: string) => Promise<void>;
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  loading: false,
  error: null,
  
  fetchBooks: async () => {
    set({ loading: true, error: null });
    try {
      const books = await bookService.getAll();
      set({ books, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  createBook: async (book) => {
    set({ loading: true, error: null });
    try {
      await bookService.create(book);
      const books = await bookService.getAll();
      set({ books, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  updateBook: async (isbn, bookData) => {
    set({ loading: true, error: null });
    try {
      await bookService.update(isbn, bookData);
      const books = await bookService.getAll();
      set({ books, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  deleteBook: async (isbn) => {
    set({ loading: true, error: null });
    try {
      await bookService.delete(isbn);
      const books = await bookService.getAll();
      set({ books, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
