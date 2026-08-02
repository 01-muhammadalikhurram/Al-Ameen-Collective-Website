export default function Footer() {
  return (
    <footer style={{
      background: '#fff',
      padding: '3rem 2rem',
      marginTop: 'auto',
      borderTop: '1px solid #eee',
      textAlign: 'center',
      color: '#666'
    }}>
      <h3 style={{ color: 'var(--primary-maroon)', marginBottom: '1rem' }}>Al Ameen Collective</h3>
      <p style={{ marginBottom: '1rem' }}>Providing premium unstitched and stitched collections at wholesale prices.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.9rem' }}>
        <a href="#">About Us</a>
        <a href="#">Contact: +92 300 1234567</a>
        <a href="#">FAQs</a>
      </div>
      <p style={{ marginTop: '2rem', fontSize: '0.8rem' }}>&copy; {new Date().getFullYear()} Al Ameen Collective. All rights reserved.</p>
    </footer>
  );
}
