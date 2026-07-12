export interface Customer {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    createdAt?: string;
}

// Payload para crear/editar (sin campos generados por el backend)
export type CustomerInput = Omit<Customer, 'id' | 'createdAt'>;
