import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
  const { items, getCartTotal, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    address: '',
    remarks: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return setError('Your cart is empty');
    setLoading(true);
    setError('');

    try {
      const payload = {
        items: items.map(i => ({ productId: i.productId, quantity: i.quantity })),
        customerDetails: formData
      };
      const res = await axios.post('http://localhost:5000/api/orders', payload);
      
      clearCart();
      navigate('/order-success', { state: { order: res.data } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
      <div>
        <h2 style={{ marginBottom: '2rem', color: 'var(--primary-maroon)' }}>Checkout Information</h2>
        {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Name *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phone Number *</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>WhatsApp (Optional)</label>
              <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Delivery Address *</label>
            <textarea required name="address" rows="3" value={formData.address} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}></textarea>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Remarks / Special Instructions</label>
            <textarea name="remarks" rows="2" value={formData.remarks} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}></textarea>
          </div>
          
          <button type="submit" disabled={loading || items.length === 0} style={{ padding: '1rem', background: 'var(--primary-maroon)', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: (loading || items.length === 0) ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Processing...' : 'Confirm Order'}
          </button>
        </form>
      </div>

      <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)', height: 'fit-content' }}>
        <h2 style={{ marginBottom: '2rem' }}>Order Summary</h2>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {items.map(item => (
              <div key={item.productId} style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <img src={`http://localhost:5000${item.image}`} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>{item.productCode}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} style={{ padding: '0.2rem 0.5rem', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>-</button>
                    <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} style={{ padding: '0.2rem 0.5rem', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>+</button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold' }}>PKR {item.wholesalePrice * item.quantity}</div>
                  <button onClick={() => removeFromCart(item.productId)} style={{ background: 'none', border: 'none', color: 'red', fontSize: '0.8rem', cursor: 'pointer', marginTop: '0.5rem' }}>Remove</button>
                </div>
              </div>
            ))}
            
            <div style={{ borderTop: '2px solid #eee', paddingTop: '1rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Subtotal Preview</span>
                <span style={{ fontWeight: 'bold' }}>PKR {getCartTotal()}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#888' }}>* Final totals including exact delivery and commissions will be calculated securely on generation.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
