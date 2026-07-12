import { Link } from 'react-router-dom';

const secciones = [
    {
        to: '/authors',
        title: 'Autores',
        description: 'Gestion de autores y su relacion con libros.',
    },
    {
        to: '/books',
        title: 'Libros',
        description: 'Catalogo de libros, precios e inventario.',
    },
    {
        to: '/customers',
        title: 'Clientes',
        description: 'Registro de clientes de la libreria.',
    },
];

export function HomePage() {
    return (
        <div>
            <h1 className="text-2xl font-medium text-slate-900">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">
                Trabajo grupal 1 - Microservicios con Quarkus, Spring Boot y Kubernetes.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {secciones.map((s) => (
                    <Link
                        key={s.to}
                        to={s.to}
                        className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
                    >
                        <h2 className="font-medium text-slate-900">{s.title}</h2>
                        <p className="mt-1 text-sm text-slate-500">{s.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
