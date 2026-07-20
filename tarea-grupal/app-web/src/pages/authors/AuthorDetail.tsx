import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Author } from '../../types/Author';
import { authorService } from '../../services/authors';
import styles from './AuthorDetail.module.css';
import toast from 'react-hot-toast';

export const AuthorDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [author, setAuthor] = useState<Author | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAuthor = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await authorService.getById(Number(id));
                setAuthor(data);
            } catch (err) {
                console.error(err);
                setError('Error al cargar el autor');
                toast.error('Error al cargar el autor');
            } finally {
                setLoading(false);
            }
        };

        fetchAuthor();
    }, [id]);

    const handleBack = () => navigate('/authors');

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

    if (!author) {
        return (
            <div className={styles.container}>
                <div className={styles.notFound}>Autor no encontrado</div>
                <button onClick={handleBack} className={styles.backButton}>Volver</button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Detalle del Autor</h1>
                <button onClick={handleBack} className={styles.backButton}>
                    <ArrowLeft size={20} />
                    Volver
                </button>
            </div>
            <div className={styles.card}>
                <div className={styles.grid}>
                    <div className={styles.label}>ID:</div>
                    <div className={styles.value}>{author.id}</div>

                    <div className={styles.label}>Nombre:</div>
                    <div className={styles.value}>{author.name}</div>

                    <div className={styles.label}>Versión:</div>
                    <div className={styles.value}>{author.version ?? '-'}</div>
                </div>
            </div>
        </div>
    );
};
