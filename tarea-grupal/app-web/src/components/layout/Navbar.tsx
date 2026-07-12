import { NavLink } from 'react-router-dom';

const links = [
    { to: '/', label: 'Dashboard', end: true },
    { to: '/authors', label: 'Autores' },
    { to: '/books', label: 'Libros' },
    { to: '/customers', label: 'Clientes' },
];

export function Navbar() {
    return (
        <header className="border-b border-slate-800 bg-slate-900">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="text-sm font-medium tracking-wide text-white">
          Books app
        </span>
                <nav className="flex gap-1">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            className={({ isActive }) =>
                                `rounded-md px-3 py-1.5 text-sm transition-colors ${
                                    isActive
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}
