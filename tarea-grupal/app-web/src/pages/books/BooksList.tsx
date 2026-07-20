import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookStore } from '../../store/useBookStore';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import modalStyles from '../../components/ui/Modal.module.css';
import styles from '../shared/PageStyles.module.css';
import type { Book } from '../../types/Book';
import toast from 'react-hot-toast';

export const BooksList = () => {
  const { books, loading, fetchBooks, createBook, updateBook, deleteBook } = useBookStore();
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const [formData, setFormData] = useState({ isbn: '', title: '', price: 0 });

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleOpenModal = (book?: Book) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        isbn: book.isbn,
        title: book.title,
        price: book.price
      });
    } else {
      setEditingBook(null);
      setFormData({ isbn: '', title: '', price: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await updateBook(editingBook.isbn, formData);
        toast.success('Libro actualizado con éxito');
      } else {
        await createBook(formData);
        toast.success('Libro creado con éxito');
      }
      handleCloseModal();
    } catch (error) {
    }
  };

  const confirmDelete = async () => {
    if (bookToDelete) {
      try {
        await deleteBook(bookToDelete.isbn);
        toast.success('Libro eliminado con éxito');
        setIsDeleteModalOpen(false);
      } catch (error) {
      }
    }
  };

  if (loading && books.length === 0) {
    return (
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Libros</h1>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => handleOpenModal()}>
          <Plus size={18} /> Añadir Libro
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ISBN</th>
                <th>Título</th>
                <th>Precio</th>
                <th>Autores</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.isbn}>
                  <td>{book.isbn}</td>
                  <td>{book.title}</td>
                  <td>${book.price}</td>
                  <td>{book.authors?.map(a => a.name).join(', ') || '-'}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => navigate(`/books/${book.isbn}`)}>
                        <Eye size={16} />
                      </button>
                      <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => handleOpenModal(book)}>
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className={`${styles.btn} ${styles.btnGhost}`}
                        style={{ color: 'var(--danger)' }}
                        onClick={() => {
                          setBookToDelete(book);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {books.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    No se encontraron libros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingBook ? 'Editar Libro' : 'Nuevo Libro'}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>ISBN</label>
            <input 
              required
              className={styles.formInput}
              value={formData.isbn}
              onChange={(e) => setFormData({...formData, isbn: e.target.value})}
              disabled={!!editingBook}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Título</label>
            <input 
              required
              className={styles.formInput}
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Precio</label>
            <input 
              required
              type="number"
              step="0.01"
              className={styles.formInput}
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
            />
          </div>
          <div className={modalStyles.modalFooter}>
            <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={handleCloseModal}>Cancelar</button>
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirmar Eliminación">
        <p>¿Estás seguro que deseas eliminar el libro "{bookToDelete?.title}"? Esta acción no se puede deshacer.</p>
        <div className={modalStyles.modalFooter}>
          <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setIsDeleteModalOpen(false)}>Cancelar</button>
          <button className={`${styles.btn} ${styles.btnDanger}`} onClick={confirmDelete} disabled={loading}>
            {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </Modal>
    </div>
  );
};
