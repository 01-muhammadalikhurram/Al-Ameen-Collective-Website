import { useState } from 'react';
import axios from 'axios';

export default function OrderTrack() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId) return;
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/track/${orderId}`);
      setOrder(res.data);
    } catch (err) {
      setError('Order not found. Please check your Tracking ID.');
    } finally {
      setLoading(false);
    }
  };

  const renderTimeline = (status) => {
    const states = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];
    const currentIndex = states.indexOf(status);
    if (status === 'CANCELLED' || status === 'RETURNED') {
      return <div style={{ color: 'red', fontWeight: 'bold', marginTop: '2rem', textAlign: 'center', fontSize: '1.2rem' }}>Order {status}</div>;
    }
    
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10px', left: 0, right: 0, height: '2px', background: '#eee', zIndex: 1 }}></div>
        {states.map((s, i) => (
          <div key={s} style={{ textAlign: 'center', opacity: i <= currentIndex ? 1 : 0.4, zIndex: 2, position: 'relative' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: i <= currentIndex ? 'var(--primary-maroon)' : '#ccc', margin: '0 auto 0.5rem' }}></div>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{s}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', minHeight: '60vh' }}>
      <h1 style={{ textAlign: 'center', color: 'var(--primary-maroon)', marginBottom: '2rem' }}>Track Your Order</h1>
      <form onSubmit={handleTrack} style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
        <input 
          type="text" 
          placeholder="e.g. ORD-12345" 
          value={orderId} 
          onChange={e => setOrderId(e.target.value.toUpperCase())}
          style={{ flex: 1, padding: '1rem', fontSize: '1.2rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '1rem 2rem', background: 'var(--primary-maroon)', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? 'Searching...' : 'Track'}
        </button>
      </form>

      {error && <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>{error}</div>}

      {order && (
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)' }}>
          <h2 style={{ marginBottom: '1rem' }}>Tracking: {order.orderId}</h2>
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          
          {renderTimeline(order.status)}

          <h3 style={{ marginTop: '3rem', marginBottom: '1rem' }}>Order Details</h3>
          {order.items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={`http://localhost:5000${item.productImage}`} alt={item.productName} style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                {item.quantity}x {item.productName} ({item.productCode})
              </span>
              <span>PKR {item.price * item.quantity}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', fontWeight: 'bold', marginTop: '1rem' }}>
            <span>Delivery</span>
            <span>PKR {order.deliveryCharges}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', fontWeight: 'bold', fontSize: '1.2rem', borderTop: '2px solid #ccc' }}>
            <span>Total Payable</span>
            <span style={{ color: 'var(--primary-maroon)' }}>PKR {order.totalCustomerPayable}</span>
          </div>
        </div>
      )}
    </div>
  );
}
