import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function VendorOrders() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/orders/vendor', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>Fulfillment Queue</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#eee', textAlign: 'left' }}>
            <th style={{ padding: '1rem' }}>Order ID</th>
            <th style={{ padding: '1rem' }}>Customer</th>
            <th style={{ padding: '1rem' }}>Date</th>
            <th style={{ padding: '1rem' }}>Status</th>
            <th style={{ padding: '1rem' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '1rem' }}>{order.orderId}</td>
              <td style={{ padding: '1rem' }}>{order.customerName}</td>
              <td style={{ padding: '1rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{ 
                  padding: '0.2rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem', 
                  background: order.status === 'CONFIRMED' ? '#cce5ff' : order.status === 'SHIPPED' ? '#fff3cd' : '#d4edda' 
                }}>
                  {order.status}
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                <Link to={`/vendor/orders/${order.id}`} style={{ color: '#2c3e50', fontWeight: 'bold' }}>Process</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
