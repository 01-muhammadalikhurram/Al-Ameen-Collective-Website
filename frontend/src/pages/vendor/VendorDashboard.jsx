import { useState, useEffect } from 'react';
import axios from 'axios';

export default function VendorDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/dashboard/vendor', {
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
      <h2 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Vendor Dashboard</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ ...cardStyle, borderLeft: '4px solid #17a2b8' }}>
          <h3 style={{ color: '#666', margin: 0, fontSize: '1rem' }}>Active Orders (To Process)</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{data.activeOrdersCount}</p>
        </div>
        <div style={{ ...cardStyle, borderLeft: '4px solid #28a745' }}>
          <h3 style={{ color: '#666', margin: 0, fontSize: '1rem' }}>Total Wholesale Earned</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#28a745' }}>PKR {data.totalWholesaleEarned}</p>
        </div>
        <div style={{ ...cardStyle, borderLeft: '4px solid #dc3545' }}>
          <h3 style={{ color: '#666', margin: 0, fontSize: '1rem' }}>Amount Owed to Admin</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#dc3545' }}>PKR {data.totalOwedToAdmin}</p>
        </div>
      </div>
    </div>
  );
}
