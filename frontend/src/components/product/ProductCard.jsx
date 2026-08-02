import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

export default function ProductCard({ product }) {
  const addToCart = useCartStore(state => state.addToCart);
  const navigate = useNavigate();
  const primaryImage = product.images?.[0] ? `http://localhost:5000${product.images[0]}` : 'https://via.placeholder.com/300x400?text=No+Image';

  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-subtle)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
    }}>
      <Link to={`/product/${product.productCode}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '250px', overflow: 'hidden' }}>
          <img src={primaryImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <span style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.25rem' }}>{product.productCode}</span>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', flex: 1 }}>{product.name}</h3>
          <p style={{ fontWeight: 'bold', color: 'var(--primary-maroon)', fontSize: '1.2rem' }}>PKR {product.wholesalePrice}</p>
        </div>
      </Link>
      <div style={{ padding: '0 1rem 1rem 1rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); alert('Added to cart!'); }} style={{ flex: 1, padding: '0.75rem', background: '#eee', color: '#333', borderRadius: '4px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Add to Cart</button>
        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); navigate('/checkout'); }} style={{ flex: 1, padding: '0.75rem', background: 'var(--primary-maroon)', color: '#fff', borderRadius: '4px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Order Now</button>
      </div>
    </div>
  );
}
