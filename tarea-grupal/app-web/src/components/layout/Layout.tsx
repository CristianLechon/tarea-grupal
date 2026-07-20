import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, UserCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import styles from './Layout.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <LayoutDashboard size={28} />
        <span>Admin Pro</span>
      </div>
      <nav className={styles.sidebarNav}>
        <NavLink to="/" className={({isActive}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem} end>
          <LayoutDashboard size={20} /> Inicio
        </NavLink>
        <NavLink to="/authors" className={({isActive}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <UserCircle size={20} /> Autores
        </NavLink>
        <NavLink to="/books" className={({isActive}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <BookOpen size={20} /> Libros
        </NavLink>
        <NavLink to="/customers" className={({isActive}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <Users size={20} /> Clientes
        </NavLink>
      </nav>
    </aside>
  );
};

export const Layout = () => {
  return (
    <div className={styles.appLayout}>
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
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};
