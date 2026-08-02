import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/dashboard/admin', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading Analytics...</div>;

  const cardStyle = { background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem', color: 'var(--primary-maroon)' }}>Dashboard Overview</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ ...cardStyle, borderLeft: '4px solid #0066cc' }}>
          <h3 style={{ color: '#666', margin: 0, fontSize: '1rem' }}>Total Revenue (Platform)</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>PKR {data.totalRevenue}</p>
        </div>
        <div style={{ ...cardStyle, borderLeft: '4px solid #28a745' }}>
          <h3 style={{ color: '#666', margin: 0, fontSize: '1rem' }}>Commission Earned (Received)</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#28a745' }}>PKR {data.earnedCommission}</p>
        </div>
        <div style={{ ...cardStyle, borderLeft: '4px solid #ffc107' }}>
          <h3 style={{ color: '#666', margin: 0, fontSize: '1rem' }}>Pending Commission (With Vendor)</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#d39e00' }}>PKR {data.pendingCommission}</p>
        </div>
        <div style={{ ...cardStyle, borderLeft: '4px solid #17a2b8' }}>
          <h3 style={{ color: '#666', margin: 0, fontSize: '1rem' }}>Total Orders</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{data.totalOrders}</p>
        </div>
      </div>

      <div style={{ ...cardStyle }}>
        <h3 style={{ marginBottom: '1rem' }}>Order Status Breakdown</h3>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {Object.entries(data.statusCounts).map(([status, count]) => (
            <div key={status} style={{ textAlign: 'center', background: '#f5f5f5', padding: '1rem', borderRadius: '8px', minWidth: '100px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-maroon)' }}>{count}</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>{status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
