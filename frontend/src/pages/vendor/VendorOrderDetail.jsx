import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function VendorOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/vendor/${id}`, {
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
      await axios.patch(`http://localhost:5000/api/orders/vendor/${id}/status`, { status }, {
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
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem', cursor: 'pointer', border: 'none', background: 'none', color: '#0066cc' }}>← Back to Queue</button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>Process Order {order.orderId}</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span style={{ padding: '0.5rem 1rem', background: '#eee', borderRadius: '4px', fontWeight: 'bold' }}>Status: {order.status}</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', background: '#f9f9f9', padding: '1rem', borderRadius: '4px' }}>
        {order.status === 'CONFIRMED' && <button onClick={() => updateStatus('SHIPPED')} style={{ padding: '0.5rem 1rem', background: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Mark as Shipped</button>}
        {order.status === 'SHIPPED' && <button onClick={() => updateStatus('DELIVERED')} style={{ padding: '0.5rem 1rem', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Mark as Delivered</button>}
        {['CONFIRMED', 'SHIPPED'].includes(order.status) && <button onClick={() => updateStatus('RETURNED')} style={{ padding: '0.5rem 1rem', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Mark as Returned</button>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <h3>Shipping Details</h3>
          <p><strong>Name:</strong> {order.customerName}</p>
          <p><strong>Phone:</strong> {order.customerPhone}</p>
          <p><strong>Address:</strong> {order.customerAddress}</p>
          <p><strong>Remarks:</strong> {order.customerRemarks || 'None'}</p>
        </div>
        <div>
          <h3>Vendor Financials</h3>
          {/* Vendor strictly sees Wholesale Price + Delivery. They do NOT see the Admin Commission total, only what they owe Admin */}
          <p><strong>You Collect from Customer:</strong> PKR {order.totalCustomerPayable}</p>
          <p><strong>Your Wholesale Cut:</strong> PKR {order.totalWholesalePrice}</p>
          <p><strong>Delivery Allowance:</strong> PKR {order.deliveryCharges}</p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '0.5rem', color: '#dc3545' }}>
            Amount Owed to Admin: PKR {order.totalAdminCommission}
          </p>
        </div>
      </div>

      <h3>Items to Pack</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#eee', textAlign: 'left' }}>
            <th style={{ padding: '1rem' }}>Product</th>
            <th style={{ padding: '1rem' }}>Code</th>
            <th style={{ padding: '1rem' }}>Qty</th>
            <th style={{ padding: '1rem' }}>Your Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={`http://localhost:5000${item.productImage}`} alt={item.productName} style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                {item.productName}
              </td>
              <td style={{ padding: '1rem' }}>{item.productCode}</td>
              <td style={{ padding: '1rem', fontWeight: 'bold' }}>{item.quantity}</td>
              <td style={{ padding: '1rem' }}>PKR {item.wholesalePriceAtTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
