import type { Author } from './Author';

export interface Book {
    isbn: string;
    title: string;
    price: number;
    authors?: Author[];
    inventorySold?: number;
    inventorySupplied?: number;
}

export type BookInput = Omit<Book, 'authors'>;
