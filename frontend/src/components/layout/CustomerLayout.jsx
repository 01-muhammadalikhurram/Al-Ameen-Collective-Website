import { Outlet } from 'react-router-dom';
import TopAlertBar from './TopAlertBar';
import Navbar from './Navbar';
import Footer from './Footer';

export default function CustomerLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <TopAlertBar />
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
