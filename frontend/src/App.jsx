import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import ConfigPage from './pages/admin/ConfigPage';
import ProductList from './pages/admin/ProductList';
import ProductForm from './pages/admin/ProductForm';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes placeholder */}
          <Route path="/" element={<nav style={{ backgroundColor: 'var(--primary-gold)', color: 'var(--primary-maroon)', padding: '1.5rem 2rem', fontWeight: 'bold' }}><h2>Al Ameen Collective</h2></nav>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<h2>Dashboard Overview (Coming Sprint 6)</h2>} />
            <Route path="config" element={<ConfigPage />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/add" element={<ProductForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
