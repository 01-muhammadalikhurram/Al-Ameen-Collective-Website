import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function AdminSidebar() {
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div style={{ width: '250px', background: 'var(--card-bg)', minHeight: '100vh', padding: '2rem 1rem', boxShadow: 'var(--shadow-subtle)', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ marginBottom: '2rem', textAlign: 'center', color: 'var(--primary-gold)' }}>Admin Panel</h3>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        <Link to="/admin/dashboard" style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>Dashboard</Link>
        <Link to="/admin/products" style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>Products</Link>
        <Link to="/admin/config" style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>Settings</Link>
      </nav>
      <button onClick={handleLogout} style={{ marginTop: 'auto', padding: '0.75rem', background: '#eee', color: 'var(--primary-maroon)', borderRadius: '4px' }}>Logout</button>
    </div>
  );
}
