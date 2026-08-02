import { useLocation, Link, Navigate } from 'react-router-dom';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) return <Navigate to="/" />;

  const whatsappMessage = `Hello Al Ameen! I have placed an order.\n*Order ID:* ${order.orderId}\n*Name:* ${order.customerName}\n*Total Items:* ${order.items.length}\n*Payable Amount:* PKR ${order.totalCustomerPayable}\nPlease confirm my order.`;
  const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div style={{ padding: '5rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
      <h1 style={{ color: 'var(--primary-maroon)', marginBottom: '1rem' }}>Order Generated Successfully!</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Your Tracking ID is <strong style={{ background: '#eee', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{order.orderId}</strong>
      </p>
      
      <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Total Payable Amount</h3>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-maroon)' }}>PKR {order.totalCustomerPayable}</div>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>Includes delivery and applicable charges.</p>
      </div>

      <p style={{ marginBottom: '2rem', color: '#444' }}>
        Please send your Order ID to our WhatsApp to expedite confirmation and dispatch.
      </p>

      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '100%', padding: '1rem', background: '#25D366', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '4px', textDecoration: 'none', marginBottom: '1rem' }}>
        Send to WhatsApp
      </a>
      
      <Link to="/catalog" style={{ color: 'var(--primary-maroon)', fontWeight: 'bold' }}>Continue Browsing</Link>
    </div>
  );
}
