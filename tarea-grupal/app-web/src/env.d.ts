interface ImportMetaEnv {
    readonly VITE_AUTHORS_API_URL: string;
    readonly VITE_BOOKS_API_URL: string;
    readonly VITE_CUSTOMERS_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
