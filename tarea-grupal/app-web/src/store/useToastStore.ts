import { create } from 'zustand';

export type ToastType = 'error' | 'success' | 'info';

export interface Toast {
    id: number;
    type: ToastType;
    message: string;
}

interface ToastState {
    toasts: Toast[];
    addToast: (message: string, type?: ToastType) => void;
    removeToast: (id: number) => void;
}

let nextId = 1;

export const useToastStore = create<ToastState>((set) => ({
    toasts: [],
    addToast: (message, type = 'info') => {
        const id = nextId++;
        set((state) => ({ toasts: [...state.toasts, { id, type, message }] }));
        // Auto-descarte a los 5s
        setTimeout(() => {
            set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
        }, 5000);
    },
    removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
