import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/products/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Products</h2>
        <Link to="/admin/products/add" style={{ padding: '0.5rem 1rem', background: 'var(--primary-gold)', color: 'var(--primary-maroon)', fontWeight: 'bold', borderRadius: '4px' }}>Add New Product</Link>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--card-bg)', boxShadow: 'var(--shadow-subtle)' }}>
        <thead>
          <tr style={{ background: '#eee', textAlign: 'left' }}>
            <th style={{ padding: '1rem' }}>Code</th>
            <th style={{ padding: '1rem' }}>Name</th>
            <th style={{ padding: '1rem' }}>Price</th>
            <th style={{ padding: '1rem' }}>Status</th>
            <th style={{ padding: '1rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '1rem' }}>{p.productCode}</td>
              <td style={{ padding: '1rem' }}>{p.name}</td>
              <td style={{ padding: '1rem' }}>PKR {p.wholesalePrice}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{ padding: '0.25rem 0.5rem', background: p.isActive ? '#dcfce7' : '#fee2e2', color: p.isActive ? '#166534' : '#991b1b', borderRadius: '4px', fontSize: '0.875rem' }}>
                  {p.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                <button onClick={() => toggleStatus(p.id)} style={{ padding: '0.25rem 0.5rem', background: '#e5e7eb', borderRadius: '4px', marginRight: '0.5rem' }}>
                  {p.isActive ? 'Hide' : 'Show'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
