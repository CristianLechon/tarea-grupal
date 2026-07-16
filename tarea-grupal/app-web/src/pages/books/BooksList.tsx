import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useBookStore } from '../../store/useBookStore';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import type { Book } from '../../types/Book';
import toast from 'react-hot-toast';

export const BooksList = () => {
  const { books, loading, fetchBooks, createBook, updateBook, deleteBook } = useBookStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  // Form State
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
      // Error manejado
    }
  };

  const confirmDelete = async () => {
    if (bookToDelete) {
      try {
        await deleteBook(bookToDelete.isbn);
        toast.success('Libro eliminado con éxito');
        setIsDeleteModalOpen(false);
      } catch (error) {
        // Error manejado
      }
    }
  };

  if (loading && books.length === 0) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Libros</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Añadir Libro
        </button>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table">
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
                    <div className="actions">
                      <button className="btn btn-ghost" onClick={() => handleOpenModal(book)}>
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="btn btn-ghost" 
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

      {/* Create / Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingBook ? 'Editar Libro' : 'Nuevo Libro'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">ISBN</label>
            <input 
              required
              className="form-input"
              value={formData.isbn}
              onChange={(e) => setFormData({...formData, isbn: e.target.value})}
              disabled={!!editingBook}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Título</label>
            <input 
              required
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Precio</label>
            <input 
              required
              type="number"
              step="0.01"
              className="form-input"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={handleCloseModal}>Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirmar Eliminación">
        <p>¿Estás seguro que deseas eliminar el libro "{bookToDelete?.title}"? Esta acción no se puede deshacer.</p>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</button>
          <button className="btn btn-danger" onClick={confirmDelete} disabled={loading}>
            {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </Modal>
    </div>
  );
};
