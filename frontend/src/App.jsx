import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import ConfigAdmin from './pages/admin/ConfigAdmin';
import OrderList from './pages/admin/OrderList';
import OrderDetail from './pages/admin/OrderDetail';
import ProductList from './pages/admin/ProductList';
import ProductForm from './pages/admin/ProductForm';

import VendorLayout from './components/layout/VendorLayout';
import VendorLogin from './pages/vendor/VendorLogin';
import VendorOrders from './pages/vendor/VendorOrders';
import VendorOrderDetail from './pages/vendor/VendorOrderDetail';

import CustomerLayout from './components/layout/CustomerLayout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="product/:code" element={<ProductDetail />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-success" element={<OrderSuccess />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<h2>Dashboard Overview (Coming Sprint 6)</h2>} />
            <Route path="config" element={<ConfigAdmin />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/add" element={<ProductForm />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="orders/:id" element={<OrderDetail />} />
          </Route>
          
          {/* Vendor Routes */}
          <Route path="/vendor/login" element={<VendorLogin />} />
          <Route path="/vendor" element={<VendorLayout />}>
            <Route path="orders" element={<VendorOrders />} />
            <Route path="orders/:id" element={<VendorOrderDetail />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
