import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { ToastContainer } from '../ui/ToastContainer';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
            <ToastContainer />
        </div>
    );
}
