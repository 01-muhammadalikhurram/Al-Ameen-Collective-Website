import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [id]);

  const updateStatus = async (status) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`http://localhost:5000/api/orders/admin/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrder({ ...order, status });
    } catch (err) {
      console.error(err);
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', padding: '2rem', borderRadius: '8px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem', cursor: 'pointer', border: 'none', background: 'none', color: '#0066cc' }}>← Back to Orders</button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, color: 'var(--primary-maroon)' }}>Order {order.orderId}</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span style={{ padding: '0.5rem 1rem', background: '#eee', borderRadius: '4px', fontWeight: 'bold' }}>Status: {order.status}</span>
          {order.status === 'PENDING' && (
            <button onClick={() => updateStatus('CONFIRMED')} style={{ padding: '0.5rem 1rem', background: 'var(--primary-maroon)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Mark Confirmed</button>
          )}
        </div>
      </div>

      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0 }}>Commission Status</h3>
          <p style={{ margin: 0, color: order.commissionReceived ? 'green' : 'red' }}>
            {order.commissionReceived ? '✅ Commission Received' : '❌ Commission Pending (with Vendor)'}
          </p>
        </div>
        {order.status === 'DELIVERED' && !order.commissionReceived && (
          <button 
            onClick={() => {
              const token = localStorage.getItem('token');
              axios.patch(`http://localhost:5000/api/orders/admin/${id}/status`, { commissionReceived: true }, {
                headers: { Authorization: `Bearer ${token}` }
              }).then(() => setOrder({...order, commissionReceived: true}));
            }}
            style={{ padding: '0.5rem 1rem', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Mark Commission Received
          </button>
        )}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <h3>Customer Details</h3>
          <p><strong>Name:</strong> {order.customerName}</p>
          <p><strong>Phone:</strong> {order.customerPhone}</p>
          <p><strong>WhatsApp:</strong> {order.customerWhatsapp}</p>
          <p><strong>Address:</strong> {order.customerAddress}</p>
          <p><strong>Remarks:</strong> {order.customerRemarks || 'None'}</p>
        </div>
        <div>
          <h3>Financial Breakdown</h3>
          <p><strong>Wholesale Total:</strong> PKR {order.totalWholesalePrice}</p>
          <p><strong>Admin Commission:</strong> PKR {order.totalAdminCommission}</p>
          <p><strong>Delivery Charges:</strong> PKR {order.deliveryCharges}</p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '0.5rem' }}>Customer Pays: PKR {order.totalCustomerPayable}</p>
        </div>
      </div>

      <h3>Order Items</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#f9f9f9', textAlign: 'left' }}>
            <th style={{ padding: '1rem' }}>Product</th>
            <th style={{ padding: '1rem' }}>Code</th>
            <th style={{ padding: '1rem' }}>Qty</th>
            <th style={{ padding: '1rem' }}>Wholesale</th>
            <th style={{ padding: '1rem' }}>Commission</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={`http://localhost:5000${item.productImage}`} alt={item.productName} style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                {item.productName}
              </td>
              <td style={{ padding: '1rem' }}>{item.productCode}</td>
              <td style={{ padding: '1rem' }}>{item.quantity}</td>
              <td style={{ padding: '1rem' }}>PKR {item.wholesalePriceAtTime}</td>
              <td style={{ padding: '1rem' }}>PKR {item.commissionAtTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
