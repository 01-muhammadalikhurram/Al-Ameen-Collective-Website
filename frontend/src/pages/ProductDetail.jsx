import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function ProductDetail() {
  const addToCart = useCartStore(state => state.addToCart);
  const navigate = useNavigate();
  const { code } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [code]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${code}`);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '5rem', textAlign: 'center' }}>Loading...</div>;
  if (!product) return <div style={{ padding: '5rem', textAlign: 'center' }}>Product not found</div>;

  const primaryImage = product.images?.[0] ? `http://localhost:5000${product.images[0]}` : 'https://via.placeholder.com/600x800';

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Link to="/catalog" style={{ display: 'inline-block', marginBottom: '2rem', color: '#666' }}>&larr; Back to Catalog</Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        {/* Left: Gallery */}
        <div>
          <img src={primaryImage} alt={product.name} style={{ width: '100%', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)' }} />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', overflowX: 'auto' }}>
            {product.images?.map((img, idx) => (
              <img key={idx} src={`http://localhost:5000${img}`} alt={`thumb ${idx}`} style={{ width: '80px', height: '100px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', border: '2px solid transparent' }} />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div>
          <span style={{ color: '#888', letterSpacing: '1px', fontSize: '0.9rem' }}>{product.productCode}</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary-maroon)' }}>{product.name}</h1>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>PKR {product.wholesalePrice}</p>

          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#444', lineHeight: '1.6' }}>
            {product.description}
          </p>

          <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {product.brand && <div><strong style={{ color: '#888' }}>Brand:</strong> {product.brand}</div>}
            {product.productType && <div><strong style={{ color: '#888' }}>Type:</strong> {product.productType}</div>}
            {product.fabricType && <div><strong style={{ color: '#888' }}>Fabric:</strong> {product.fabricType}</div>}
            {product.cuttingSize && <div><strong style={{ color: '#888' }}>Cutting:</strong> {product.cuttingSize}</div>}
            {product.gender && <div><strong style={{ color: '#888' }}>Gender:</strong> {product.gender}</div>}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => { addToCart(product); alert('Added to cart!'); }} style={{ flex: 1, padding: '1rem', background: '#eee', color: '#333', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Add to Cart</button>
            <button onClick={() => { addToCart(product); navigate('/checkout'); }} style={{ flex: 2, padding: '1rem', background: 'var(--primary-maroon)', color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Order Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
