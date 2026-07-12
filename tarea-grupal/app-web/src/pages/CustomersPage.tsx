import { useEffect, useState } from 'react';
import { useCustomersStore } from '../store/useCustomersStore';
import { useToastStore } from '../store/useToastStore';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { CustomerFormModal } from '../components/customers/CustomerFormModal';
import type { Customer, CustomerInput } from '../types/Customer';

type ModalState =
    | { mode: 'closed' }
    | { mode: 'create' }
    | { mode: 'edit'; customer: Customer };

export function CustomersPage() {
    const { items, loading, error, fetchAll, create, update, remove } =
        useCustomersStore();
    const addToast = useToastStore((s) => s.addToast);

    const [modal, setModal] = useState<ModalState>({ mode: 'closed' });
    const [aEliminar, setAEliminar] = useState<Customer | null>(null);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    async function handleSubmit(data: CustomerInput) {
        if (modal.mode === 'edit') {
            await update(modal.customer.id!, data);
            addToast('Cliente actualizado', 'success');
        } else {
            await create(data);
            addToast('Cliente creado', 'success');
        }
        setModal({ mode: 'closed' });
    }

    async function handleEliminar() {
        if (!aEliminar) return;
        await remove(aEliminar.id!);
        addToast('Cliente eliminado', 'success');
        setAEliminar(null);
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium text-slate-900">Clientes</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => fetchAll()}
                        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                        Refrescar
                    </button>
                    <button
                        onClick={() => setModal({ mode: 'create' })}
                        className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
                    >
                        Nuevo cliente
                    </button>
                </div>
            </div>

            {error && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {error}
                </div>
            )}

            {loading ? (
                <LoadingSpinner label="Cargando clientes..." />
            ) : (
                <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="px-4 py-2 font-medium">Nombre</th>
                            <th className="px-4 py-2 font-medium">Email</th>
                            <th className="px-4 py-2 font-medium">Telefono</th>
                            <th className="px-4 py-2 font-medium">Direccion</th>
                            <th className="px-4 py-2 font-medium"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                                    No hay clientes registrados todavia.
                                </td>
                            </tr>
                        ) : (
                            items.map((c) => (
                                <tr key={c.id}>
                                    <td className="px-4 py-2 text-slate-800">
                                        {c.firstName} {c.lastName}
                                    </td>
                                    <td className="px-4 py-2 text-slate-600">{c.email}</td>
                                    <td className="px-4 py-2 text-slate-600">{c.phone ?? '-'}</td>
                                    <td className="px-4 py-2 text-slate-600">{c.address ?? '-'}</td>
                                    <td className="px-4 py-2 text-right">
                                        <button
                                            onClick={() => setModal({ mode: 'edit', customer: c })}
                                            className="mr-3 text-xs font-medium text-indigo-600 hover:text-indigo-800"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => setAEliminar(c)}
                                            className="text-xs font-medium text-red-600 hover:text-red-800"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            {modal.mode !== 'closed' && (
                <CustomerFormModal
                    initial={modal.mode === 'edit' ? modal.customer : undefined}
                    loading={loading}
                    onClose={() => setModal({ mode: 'closed' })}
                    onSubmit={handleSubmit}
                />
            )}

            {aEliminar && (
                <ConfirmDialog
                    title="Eliminar cliente"
                    message={`Vas a eliminar a ${aEliminar.firstName} ${aEliminar.lastName}. Esta accion no se puede deshacer.`}
                    loading={loading}
                    onConfirm={handleEliminar}
                    onCancel={() => setAEliminar(null)}
                />
            )}
        </div>
    );
}
