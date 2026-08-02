import { Outlet, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function VendorLayout() {
  const { token, role, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (!token || role !== 'VENDOR') {
    return <Navigate to="/vendor/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate('/vendor/login');
  };

  const navItemStyle = {
    padding: '1rem',
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    borderRadius: '4px',
    marginBottom: '0.5rem',
    fontWeight: 'bold'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      <aside style={{ width: '250px', background: '#2c3e50', padding: '2rem 1rem', color: '#fff' }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '1.2rem' }}>Vendor Portal</h2>
        <nav>
          <Link to="/vendor/orders" style={{ ...navItemStyle, background: location.pathname.includes('/vendor/orders') ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
            📦 Fulfillment
          </Link>
        </nav>
        <button onClick={handleLogout} style={{ ...navItemStyle, background: 'rgba(255,0,0,0.2)', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', marginTop: 'auto' }}>
          🚪 Logout
        </button>
      </aside>

      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
