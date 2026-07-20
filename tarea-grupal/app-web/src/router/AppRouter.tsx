import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/Home";
import { AuthorsList } from "../pages/authors/AuthorsList";
import { AuthorDetail } from "../pages/authors/AuthorDetail";
import { BooksList } from "../pages/books/BooksList";
import { BookDetail } from "../pages/books/BookDetail";
import { CustomersList } from "../pages/customers/CustomersList";
import { CustomerDetail } from "../pages/customers/CustomerDetail";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="authors" element={<AuthorsList />} />
                    <Route path="authors/:id" element={<AuthorDetail />} />
                    <Route path="books" element={<BooksList />} />
                    <Route path="books/:isbn" element={<BookDetail />} />
                    <Route path="customers" element={<CustomersList />} />
                    <Route path="customers/:id" element={<CustomerDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}