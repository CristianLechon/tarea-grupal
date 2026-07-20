import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Customer } from '../../types/Customer';
import { customerService } from '../../services/customers';
import styles from './CustomerDetail.module.css';
import toast from 'react-hot-toast';

export const CustomerDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await customerService.getById(Number(id));
                setCustomer(data);
            } catch (err) {
                console.error(err);
                setError('Error al cargar el cliente');
                toast.error('Error al cargar el cliente');
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [id]);

    const handleBack = () => navigate('/customers');

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '-';
        try {
            return new Date(dateStr).toLocaleDateString('es-EC', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return dateStr;
        }
    };

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

    if (!customer) {
        return (
            <div className={styles.container}>
                <div className={styles.notFound}>Cliente no encontrado</div>
                <button onClick={handleBack} className={styles.backButton}>Volver</button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Detalle del Cliente</h1>
                <button onClick={handleBack} className={styles.backButton}>
                    <ArrowLeft size={20} />
                    Volver
                </button>
            </div>
            <div className={styles.card}>
                <div className={styles.grid}>
                    <div className={styles.label}>ID:</div>
                    <div className={styles.value}>{customer.id}</div>

                    <div className={styles.label}>Nombre Completo:</div>
                    <div className={styles.value}>{customer.firstName} {customer.lastName}</div>

                    <div className={styles.label}>Correo Electrónico:</div>
                    <div className={styles.value}>{customer.email}</div>

                    <div className={styles.label}>Teléfono:</div>
                    <div className={styles.value}>{customer.phone || '-'}</div>

                    <div className={styles.label}>Dirección:</div>
                    <div className={styles.value}>{customer.address || '-'}</div>

                    <div className={styles.label}>Fecha de Creación:</div>
                    <div className={styles.value}>{formatDate(customer.createdAt)}</div>
                </div>
            </div>
        </div>
    );
};
