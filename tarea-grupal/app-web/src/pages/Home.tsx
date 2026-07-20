import { Users, BookOpen, UserCircle } from 'lucide-react';
import { useAuthorStore } from '../store/useAuthorStore';
import { useBookStore } from '../store/useBookStore';
import { useCustomerStore } from '../store/useCustomerStore';
import { useEffect } from 'react';
import styles from './shared/PageStyles.module.css';

export const Home = () => {
  const { authors, fetchAuthors } = useAuthorStore();
  const { books, fetchBooks } = useBookStore();
  const { customers, fetchCustomers } = useCustomerStore();

  useEffect(() => {
    fetchAuthors();
    fetchBooks();
    fetchCustomers();
  }, [fetchAuthors, fetchBooks, fetchCustomers]);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Resumen</h1>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        <div className={styles.card} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '20px', borderRadius: '12px', color: 'var(--primary)' }}>
            <UserCircle size={40} />
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{authors.length}</h2>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Total Autores</p>
          </div>
        </div>

        <div className={styles.card} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '20px', borderRadius: '12px', color: '#10b981' }}>
            <BookOpen size={40} />
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{books.length}</h2>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Total Libros</p>
          </div>
        </div>

        <div className={styles.card} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '20px', borderRadius: '12px', color: '#ef4444' }}>
            <Users size={40} />
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{customers.length}</h2>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Total Clientes</p>
          </div>
        </div>

      </div>
    </div>
  );
};
