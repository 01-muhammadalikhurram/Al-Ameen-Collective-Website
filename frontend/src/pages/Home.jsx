import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <div style={{
        background: 'linear-gradient(to right, var(--primary-maroon), #2a080c)',
        color: '#fff',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary-gold)', marginBottom: '1rem' }}>Premium Collections at Wholesale Prices</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>Discover our latest lawn and winter collections. High-quality unstitched and stitched suits.</p>
        <Link to="/catalog" style={{ display: 'inline-block', padding: '1rem 2.5rem', background: 'var(--primary-gold)', color: 'var(--primary-maroon)', fontWeight: 'bold', borderRadius: '4px', fontSize: '1.1rem' }}>
          Shop Now
        </Link>
      </div>

      <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Why Choose Al Ameen?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div style={{ padding: '2rem', background: 'var(--card-bg)', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary-maroon)' }}>Wholesale Pricing</h3>
            <p>Access premium quality products without the retail markup. Perfect for resellers and bulk buyers.</p>
          </div>
          <div style={{ padding: '2rem', background: 'var(--card-bg)', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary-maroon)' }}>Premium Fabric</h3>
            <p>Guaranteed authentic and high-quality threads, meticulously quality-checked before dispatch.</p>
          </div>
          <div style={{ padding: '2rem', background: 'var(--card-bg)', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary-maroon)' }}>Fast Fulfillment</h3>
            <p>Our dedicated vendor network ensures your orders are processed and shipped instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
