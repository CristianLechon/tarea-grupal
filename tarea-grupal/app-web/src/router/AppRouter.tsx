import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/Home";
import { AuthorsList } from "../pages/authors/AuthorsList";
import { BooksList } from "../pages/books/BooksList";
import { CustomersList } from "../pages/customers/CustomersList";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="authors" element={<AuthorsList />} />
                    <Route path="books" element={<BooksList />} />
                    <Route path="customers" element={<CustomersList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}