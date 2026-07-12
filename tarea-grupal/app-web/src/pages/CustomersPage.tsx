import { useEffect } from 'react';
import { useCustomersStore } from '../store/useCustomersStore';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export function CustomersPage() {
    const { items, loading, error, fetchAll } = useCustomersStore();

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium text-slate-900">Clientes</h1>
                <button
                    onClick={() => fetchAll()}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                    Refrescar
                </button>
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
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-slate-400">
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
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* TODO: agregar formulario de crear/editar y confirmacion de eliminar */}
        </div>
    );
}
