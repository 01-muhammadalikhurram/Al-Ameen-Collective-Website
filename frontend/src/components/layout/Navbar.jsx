import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--primary-gold)',
      color: 'var(--primary-maroon)',
      padding: '1rem 2rem',
      boxShadow: 'var(--shadow-subtle)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>
        Al Ameen Collective
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/catalog" style={{ fontWeight: 500 }}>Catalog</Link>
        <form onSubmit={handleSearch} style={{ display: 'flex' }}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px 0 0 4px', border: 'none', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem', background: 'var(--primary-maroon)', color: '#fff', borderRadius: '0 4px 4px 0' }}>Search</button>
        </form>
        <Link to="/checkout" style={{ fontWeight: 500 }}>Cart</Link>
      </div>
    </nav>
  );
}
