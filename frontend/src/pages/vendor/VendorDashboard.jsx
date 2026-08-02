import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VendorDashboard() {
  const [data, setData] = useState(null);
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId) return;
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/orders/vendor/search/${searchId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/vendor/orders/${res.data.id}`);
    } catch (err) {
      alert('Order not found in your queue (must be Confirmed or above).');
    }
  };

  const cardStyle = { background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>Vendor Dashboard</h2>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            placeholder="Search Order ID (ORD-...)" 
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '250px' }}
          />
          <button type="submit" style={{ padding: '0.75rem 1.5rem', background: '#2c3e50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Find</button>
        </form>
      </div>
      
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
