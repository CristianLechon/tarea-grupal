import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, UserCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <LayoutDashboard size={28} />
        <span>Admin Pro</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"} end>
          <LayoutDashboard size={20} /> Inicio
        </NavLink>
        <NavLink to="/authors" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <UserCircle size={20} /> Autores
        </NavLink>
        <NavLink to="/books" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <BookOpen size={20} /> Libros
        </NavLink>
        <NavLink to="/customers" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Users size={20} /> Clientes
        </NavLink>
      </nav>
    </aside>
  );
};

export const Layout = () => {
  return (
    <div className="app-layout">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#334155',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } }
        }} 
      />
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};
