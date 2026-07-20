import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomerStore } from '../../store/useCustomerStore';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import modalStyles from '../../components/ui/Modal.module.css';
import styles from '../shared/PageStyles.module.css';
import type { Customer } from '../../types/Customer';
import toast from 'react-hot-toast';

export const CustomersList = () => {
  const { customers, loading, fetchCustomers, createCustomer, updateCustomer, deleteCustomer } = useCustomerStore();
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '' });

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleOpenModal = (customer?: Customer) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone || '',
        address: customer.address || ''
      });
    } else {
      setEditingCustomer(null);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingCustomer && editingCustomer.id !== undefined) {
        await updateCustomer(editingCustomer.id, formData);
        toast.success('Cliente actualizado con éxito');
      } else {
        await createCustomer(formData);
        toast.success('Cliente creado con éxito');
      }
      handleCloseModal();
    } catch (error) {
    }
  };

  const confirmDelete = async () => {
    if (customerToDelete && customerToDelete.id !== undefined) {
      try {
        await deleteCustomer(customerToDelete.id);
        toast.success('Cliente eliminado con éxito');
        setIsDeleteModalOpen(false);
      } catch (error) {
      }
    }
  };

  if (loading && customers.length === 0) {
    return (
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Clientes</h1>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => handleOpenModal()}>
          <Plus size={18} /> Añadir Cliente
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={customer.id ?? `customer-${index}`}>
                  <td>{customer.id}</td>
                  <td>{customer.firstName} {customer.lastName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone || '-'}</td>
                  <td>{customer.address || '-'}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => navigate(`/customers/${customer.id}`)}>
                        <Eye size={16} />
                      </button>
                      <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => handleOpenModal(customer)}>
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className={`${styles.btn} ${styles.btnGhost}`}
                        style={{ color: 'var(--danger)' }}
                        onClick={() => {
                          setCustomerToDelete(customer);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    No se encontraron clientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingCustomer ? 'Editar Cliente' : 'Nuevo Cliente'}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Nombre</label>
            <input 
              required
              className={styles.formInput}
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Apellido</label>
            <input 
              required
              className={styles.formInput}
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Correo Electrónico</label>
            <input 
              required
              type="email"
              className={styles.formInput}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Teléfono</label>
            <input 
              type="tel"
              className={styles.formInput}
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Dirección</label>
            <input 
              type="text"
              className={styles.formInput}
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
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
        <p>¿Estás seguro que deseas eliminar a {customerToDelete?.firstName} {customerToDelete?.lastName}? Esta acción no se puede deshacer.</p>
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
