import { useState, type FormEvent } from 'react';
import { Modal } from '../ui/Modal';
import type { Customer, CustomerInput } from '../../types/Customer';

interface CustomerFormModalProps {
    initial?: Customer;
    loading?: boolean;
    onClose: () => void;
    onSubmit: (data: CustomerInput) => Promise<void>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormErrors = Partial<Record<keyof CustomerInput, string>>;

export function CustomerFormModal({
                                      initial,
                                      loading = false,
                                      onClose,
                                      onSubmit,
                                  }: CustomerFormModalProps) {
    const [form, setForm] = useState<CustomerInput>({
        firstName: initial?.firstName ?? '',
        lastName: initial?.lastName ?? '',
        email: initial?.email ?? '',
        phone: initial?.phone ?? '',
        address: initial?.address ?? '',
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const isEdit = Boolean(initial);

    function validar(): boolean {
        const nuevosErrores: FormErrors = {};
        if (!form.firstName.trim()) nuevosErrores.firstName = 'El nombre es obligatorio';
        if (!form.lastName.trim()) nuevosErrores.lastName = 'El apellido es obligatorio';
        if (!form.email.trim()) {
            nuevosErrores.email = 'El email es obligatorio';
        } else if (!EMAIL_REGEX.test(form.email)) {
            nuevosErrores.email = 'El email no tiene un formato valido';
        }
        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!validar()) return;
        await onSubmit(form);
    }

    function campo<K extends keyof CustomerInput>(key: K, value: string) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    return (
        <Modal title={isEdit ? 'Editar cliente' : 'Nuevo cliente'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                        Nombre
                    </label>
                    <input
                        value={form.firstName}
                        onChange={(e) => campo('firstName', e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                    {errors.firstName && (
                        <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                        Apellido
                    </label>
                    <input
                        value={form.lastName}
                        onChange={(e) => campo('lastName', e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                    {errors.lastName && (
                        <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                        Email
                    </label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => campo('email', e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                        Telefono
                    </label>
                    <input
                        value={form.phone}
                        onChange={(e) => campo('phone', e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                        Direccion
                    </label>
                    <input
                        value={form.address}
                        onChange={(e) => campo('address', e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                </div>

                <div className="mt-3 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear cliente'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
