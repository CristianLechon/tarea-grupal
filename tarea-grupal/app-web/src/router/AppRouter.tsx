import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/HomePage';
import { AuthorsPage } from '../pages/AuthorsPage';
import { BooksPage } from '../pages/BooksPage';
import { CustomersPage } from '../pages/CustomersPage';

export function AppRouter() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/authors" element={<AuthorsPage />} />
                    <Route path="/books" element={<BooksPage />} />
                    <Route path="/customers" element={<CustomersPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
