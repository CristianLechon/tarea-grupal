import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorStore } from '../../store/useAuthorStore';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import modalStyles from '../../components/ui/Modal.module.css';
import styles from '../shared/PageStyles.module.css';
import type { Author } from '../../types/Author';
import toast from 'react-hot-toast';

export const AuthorsList = () => {
  const { authors, loading, fetchAuthors, createAuthor, updateAuthor, deleteAuthor } = useAuthorStore();
  const navigate = useNavigate();
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
    }
  };

  const confirmDelete = async () => {
    if (authorToDelete && authorToDelete.id !== undefined) {
      try {
        await deleteAuthor(authorToDelete.id);
        toast.success('Autor eliminado con éxito');
        setIsDeleteModalOpen(false);
      } catch (error) {
      }
    }
  };

  if (loading && authors.length === 0) {
    return (
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Autores</h1>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => handleOpenModal()}>
          <Plus size={18} /> Añadir Autor
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
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
                    <div className={styles.actions}>
                      <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => navigate(`/authors/${author.id}`)}>
                        <Eye size={16} />
                      </button>
                      <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => handleOpenModal(author)}>
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className={`${styles.btn} ${styles.btnGhost}`}
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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingAuthor ? 'Editar Autor' : 'Nuevo Autor'}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Nombre</label>
            <input 
              required
              className={styles.formInput}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Versión</label>
            <input
                type="number"
                min="0"
                className={styles.formInput}
                value={formData.version}
                onChange={(e) => setFormData({...formData, version: Math.max(0, parseInt(e.target.value) || 0)})}
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

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirmar Eliminación">
        <p>¿Estás seguro que deseas eliminar a {authorToDelete?.name}? Esta acción no se puede deshacer.</p>
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
