import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

export default function ConfigPage() {
  const [config, setConfig] = useState({
    globalCommission: 1000,
    baseDeliveryCharge: 250,
    freeDeliveryEnabled: false,
    freeDeliveryThreshold: 5000
  });
  const [loading, setLoading] = useState(true);
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/config', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConfig(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/admin/config', config, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Configuration saved successfully');
    } catch (err) {
      alert('Error saving configuration');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Global Configuration</h2>
      <form onSubmit={handleSave} style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)', maxWidth: '500px' }}>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Global Commission (PKR)</label>
          <input type="number" value={config.globalCommission} onChange={e => setConfig({...config, globalCommission: Number(e.target.value)})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Base Delivery Charge (PKR)</label>
          <input type="number" value={config.baseDeliveryCharge} onChange={e => setConfig({...config, baseDeliveryCharge: Number(e.target.value)})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label>Enable Free Delivery Threshold</label>
          <input type="checkbox" checked={config.freeDeliveryEnabled} onChange={e => setConfig({...config, freeDeliveryEnabled: e.target.checked})} />
        </div>

        {config.freeDeliveryEnabled && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Free Delivery Threshold (PKR)</label>
            <input type="number" value={config.freeDeliveryThreshold} onChange={e => setConfig({...config, freeDeliveryThreshold: Number(e.target.value)})} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
        )}

        <button type="submit" style={{ padding: '0.75rem 1.5rem', background: 'var(--primary-gold)', color: 'var(--primary-maroon)', fontWeight: 'bold', borderRadius: '4px' }}>Save Configuration</button>
      </form>
    </div>
  );
}
