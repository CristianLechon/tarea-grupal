import { useToastStore } from '../../store/useToastStore';

const stylesByType = {
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    info: 'bg-slate-50 border-slate-200 text-slate-800',
};

export function ToastContainer() {
    const { toasts, removeToast } = useToastStore();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`flex items-start justify-between gap-3 rounded-lg border px-4 py-3 shadow-sm ${stylesByType[toast.type]}`}
                >
                    <p className="text-sm">{toast.message}</p>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="text-xs font-medium opacity-60 hover:opacity-100"
                        aria-label="Cerrar notificacion"
                    >
                        X
                    </button>
                </div>
            ))}
        </div>
    );
}
