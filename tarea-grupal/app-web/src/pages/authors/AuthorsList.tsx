import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useAuthorStore } from '../../store/useAuthorStore';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import type { Author } from '../../types/Author';
import toast from 'react-hot-toast';

export const AuthorsList = () => {
  const { authors, loading, fetchAuthors, createAuthor, updateAuthor, deleteAuthor } = useAuthorStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [authorToDelete, setAuthorToDelete] = useState<Author | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', version: 0 });

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const handleOpenModal = (author?: Author) => {
    if (author) {
      setEditingAuthor(author);
      setFormData({ name: author.name, version: author.version || 0 });
    } else {
      setEditingAuthor(null);
      setFormData({ name: '', version: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingAuthor && editingAuthor.id !== undefined) {
        await updateAuthor(editingAuthor.id, formData);
        toast.success('Autor actualizado con éxito');
      } else {
        await createAuthor(formData);
        toast.success('Autor creado con éxito');
      }
      handleCloseModal();
    } catch (error) {
      // Error manejado por el interceptor
    }
  };

  const confirmDelete = async () => {
    if (authorToDelete && authorToDelete.id !== undefined) {
      try {
        await deleteAuthor(authorToDelete.id);
        toast.success('Autor eliminado con éxito');
        setIsDeleteModalOpen(false);
      } catch (error) {
        // Error manejado
      }
    }
  };

  if (loading && authors.length === 0) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Autores</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Añadir Autor
        </button>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Versión</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => (
                <tr key={author.id ?? `author-${index}`}>
                  <td>{author.id}</td>
                  <td>{author.name}</td>
                  <td>{author.version}</td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-ghost" onClick={() => handleOpenModal(author)}>
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="btn btn-ghost" 
                        style={{ color: 'var(--danger)' }}
                        onClick={() => {
                          setAuthorToDelete(author);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {authors.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    No se encontraron autores.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingAuthor ? 'Editar Autor' : 'Nuevo Autor'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input 
              required
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Versión</label>
            <input
                type="number"
                min="0"
                className="form-input"
                value={formData.version}
                onChange={(e) => setFormData({...formData, version: Math.max(0, parseInt(e.target.value) || 0)})}
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
        <p>¿Estás seguro que deseas eliminar a {authorToDelete?.name}? Esta acción no se puede deshacer.</p>
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
