import { Modal } from './Modal';

interface ConfirmDialogProps {
    title: string;
    message: string;
    confirmLabel?: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDialog({
                                  title,
                                  message,
                                  confirmLabel = 'Eliminar',
                                  loading = false,
                                  onConfirm,
                                  onCancel,
                              }: ConfirmDialogProps) {
    return (
        <Modal title={title} onClose={onCancel}>
            <p className="text-sm text-slate-600">{message}</p>
            <div className="mt-6 flex justify-end gap-2">
                <button
                    onClick={onCancel}
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                    Cancelar
                </button>
                <button
                    onClick={onConfirm}
                    disabled={loading}
                    className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                >
                    {loading ? 'Eliminando...' : confirmLabel}
                </button>
            </div>
        </Modal>
    );
}
