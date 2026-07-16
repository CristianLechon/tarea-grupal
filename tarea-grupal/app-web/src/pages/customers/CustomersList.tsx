import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useCustomerStore } from '../../store/useCustomerStore';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import type { Customer } from '../../types/Customer';
import toast from 'react-hot-toast';

export const CustomersList = () => {
  const { customers, loading, fetchCustomers, createCustomer, updateCustomer, deleteCustomer } = useCustomerStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  // Form State
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
      // Error manejado por el interceptor
    }
  };

  const confirmDelete = async () => {
    if (customerToDelete && customerToDelete.id !== undefined) {
      try {
        await deleteCustomer(customerToDelete.id);
        toast.success('Cliente eliminado con éxito');
        setIsDeleteModalOpen(false);
      } catch (error) {
        // Error manejado
      }
    }
  };

  if (loading && customers.length === 0) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Clientes</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Añadir Cliente
        </button>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table">
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
                    <div className="actions">
                      <button className="btn btn-ghost" onClick={() => handleOpenModal(customer)}>
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="btn btn-ghost" 
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

      {/* Create / Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingCustomer ? 'Editar Cliente' : 'Nuevo Cliente'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input 
              required
              className="form-input"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Apellido</label>
            <input 
              required
              className="form-input"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input 
              required
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Teléfono</label>
            <input 
              type="tel"
              className="form-input"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Dirección</label>
            <input 
              type="text"
              className="form-input"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
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
        <p>¿Estás seguro que deseas eliminar a {customerToDelete?.firstName} {customerToDelete?.lastName}? Esta acción no se puede deshacer.</p>
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
