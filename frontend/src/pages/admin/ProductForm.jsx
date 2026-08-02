import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: '', categories: '', gender: 'FEMALE', color: '', wholesalePrice: '',
    summary: '', description: '', brand: '', productType: '', fabricType: '',
    cuttingSize: '', shirtDetails: '', trouserDetails: '', commissionOverride: '', productCode: ''
  });
  const [image, setImage] = useState(null);
  const token = useAuthStore(state => state.token);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'categories') {
        data.append(key, JSON.stringify(formData[key].split(',').map(s => s.trim())));
      } else {
        data.append(key, formData[key]);
      }
    });
    if (image) data.append('images', image);

    try {
      await axios.post('http://localhost:5000/api/products', data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Product created');
      navigate('/admin/products');
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating product');
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Add New Product</h2>
      <form onSubmit={handleSubmit} style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)', display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Product Name *</label>
          <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Categories (comma separated) *</label>
          <input required type="text" placeholder="Lawn, Summer" value={formData.categories} onChange={e => setFormData({...formData, categories: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Gender *</label>
          <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} style={{ width: '100%', padding: '0.5rem' }}>
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
            <option value="UNISEX">Unisex</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Color *</label>
          <input required type="text" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Wholesale Price (PKR) *</label>
          <input required type="number" value={formData.wholesalePrice} onChange={e => setFormData({...formData, wholesalePrice: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Summary (Card view) *</label>
          <input required type="text" value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Description *</label>
          <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '0.5rem', minHeight: '100px' }} />
        </div>

        <h3 style={{ gridColumn: '1 / -1', marginTop: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>Optional Details</h3>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Brand</label>
          <input type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Product Type</label>
          <select value={formData.productType} onChange={e => setFormData({...formData, productType: e.target.value})} style={{ width: '100%', padding: '0.5rem' }}>
            <option value="">Select Type</option>
            <option value="2PC Suit">2PC Suit</option>
            <option value="3PC Suit">3PC Suit</option>
            <option value="Single Shirt">Single Shirt</option>
            <option value="Single Trouser">Single Trouser</option>
            <option value="Unstitched Fabric">Unstitched Fabric</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Fabric Type</label>
          <input type="text" value={formData.fabricType} onChange={e => setFormData({...formData, fabricType: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Cutting / Size</label>
          <input type="text" value={formData.cuttingSize} onChange={e => setFormData({...formData, cuttingSize: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Commission Override (PKR)</label>
          <input type="number" placeholder="Leave blank for Global default" value={formData.commissionOverride} onChange={e => setFormData({...formData, commissionOverride: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Custom Product Code</label>
          <input type="text" placeholder="Leave blank to auto-generate" value={formData.productCode} onChange={e => setFormData({...formData, productCode: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Shirt Details</label>
          <textarea value={formData.shirtDetails} onChange={e => setFormData({...formData, shirtDetails: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Trouser Details</label>
          <textarea value={formData.trouserDetails} onChange={e => setFormData({...formData, trouserDetails: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Image *</label>
          <input required type="file" onChange={e => setImage(e.target.files[0])} style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
          <button type="submit" style={{ padding: '0.75rem 1.5rem', background: 'var(--primary-gold)', color: 'var(--primary-maroon)', fontWeight: 'bold', borderRadius: '4px', width: '100%' }}>Create Product</button>
        </div>
      </form>
    </div>
  );
}
