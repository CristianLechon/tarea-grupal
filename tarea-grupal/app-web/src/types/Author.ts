export interface Author {
    id?: number;
    name: string;
    version?: number;
}

export type AuthorInput = Omit<Author, 'id'>;
