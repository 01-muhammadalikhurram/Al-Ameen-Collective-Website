import AdminSidebar from './AdminSidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export default function AdminLayout() {
  const token = useAuthStore(state => state.token);

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
}
