import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const searchQ = searchParams.get('search') || '';
  const categoryQ = searchParams.get('category') || '';

  useEffect(() => {
    // Fetch categories on mount
    axios.get('http://localhost:5000/api/products').then(res => {
      const cats = new Set();
      res.data.forEach(p => {
        if (p.categories && Array.isArray(p.categories)) {
          p.categories.forEach(c => cats.add(c));
        }
      });
      setCategories(Array.from(cats));
    }).catch(console.error);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchQ, categoryQ]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/products';
      const params = new URLSearchParams();
      if (searchQ) params.append('search', searchQ);
      if (categoryQ) params.append('category', categoryQ);
      if (params.toString()) url += `?${params.toString()}`;
      
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (cat) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
        {searchQ ? `Search Results for "${searchQ}"` : 'Our Collections'}
      </h2>

      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
        <button onClick={() => handleFilter('')} style={{ padding: '0.5rem 1.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer', background: !categoryQ ? 'var(--primary-maroon)' : '#eee', color: !categoryQ ? '#fff' : '#333' }}>All</button>
        {categories.map(cat => (
          <button key={cat} onClick={() => handleFilter(cat)} style={{ padding: '0.5rem 1.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer', background: categoryQ === cat ? 'var(--primary-maroon)' : '#eee', color: categoryQ === cat ? '#fff' : '#333' }}>{cat}</button>
        ))}
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading products...</p>
      ) : products.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No products found matching your criteria.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
