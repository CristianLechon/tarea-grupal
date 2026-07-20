import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Book } from '../../types/Book';
import { bookService } from '../../services/books';
import styles from './BookDetail.module.css';
import toast from 'react-hot-toast';

export const BookDetail = () => {
    const { isbn } = useParams<{ isbn: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            if (!isbn) return;
            try {
                setLoading(true);
                const data = await bookService.getById(isbn);
                setBook(data);
            } catch (err) {
                console.error(err);
                setError('Error al cargar el libro');
                toast.error('Error al cargar el libro');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [isbn]);

    const handleBack = () => navigate('/books');

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.spinnerWrapper}>
                    <div className={styles.spinner}></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>{error}</div>
                <button onClick={handleBack} className={styles.backButton}>Volver</button>
            </div>
        );
    }

    if (!book) {
        return (
            <div className={styles.container}>
                <div className={styles.notFound}>Libro no encontrado</div>
                <button onClick={handleBack} className={styles.backButton}>Volver</button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Detalle del Libro</h1>
                <button onClick={handleBack} className={styles.backButton}>
                    <ArrowLeft size={20} />
                    Volver
                </button>
            </div>
            <div className={styles.card}>
                <div className={styles.grid}>
                    <div className={styles.label}>ISBN:</div>
                    <div className={styles.value}>{book.isbn}</div>

                    <div className={styles.label}>Título:</div>
                    <div className={styles.value}>{book.title}</div>

                    <div className={styles.label}>Precio:</div>
                    <div className={styles.value}>${book.price.toFixed(2)}</div>

                    <div className={styles.label}>Autores:</div>
                    <div className={styles.value}>
                        {book.authors && book.authors.length > 0 ? (
                            <ul className={styles.authorList}>
                                {book.authors.map((a, i) => (
                                    <li key={i} className={styles.authorBadge}>{a.name}</li>
                                ))}
                            </ul>
                        ) : (
                            '-'
                        )}
                    </div>

                    <div className={styles.label}>Inventario Vendido:</div>
                    <div className={styles.value}>{book.inventorySold ?? '-'}</div>

                    <div className={styles.label}>Inventario Suministrado:</div>
                    <div className={styles.value}>{book.inventorySupplied ?? '-'}</div>
                </div>
            </div>
        </div>
    );
};
