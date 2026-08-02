import { useState, useEffect } from 'react';
import axios from 'axios';

export default function VendorPayouts() {
  const [payouts, setPayouts] = useState([]);
  
  useEffect(() => {
    const fetchPayouts = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/orders/vendor/payouts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPayouts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPayouts();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>Payout History (Settled)</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#eee', textAlign: 'left' }}>
            <th style={{ padding: '1rem' }}>Order ID</th>
            <th style={{ padding: '1rem' }}>Settled On</th>
            <th style={{ padding: '1rem' }}>Status</th>
            <th style={{ padding: '1rem' }}>Commission Paid</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map(order => (
            <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '1rem', fontWeight: 'bold' }}>{order.orderId}</td>
              <td style={{ padding: '1rem' }}>{new Date(order.updatedAt).toLocaleDateString()}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', background: '#d4edda' }}>
                  Commission Settled
                </span>
              </td>
              <td style={{ padding: '1rem' }}>PKR {order.totalAdminCommission}</td>
            </tr>
          ))}
          {payouts.length === 0 && (
            <tr>
              <td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>No settled payouts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
