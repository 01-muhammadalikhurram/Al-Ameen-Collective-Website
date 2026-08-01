import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Placeholder Navbar for Sprint 1 */}
        <nav style={{ backgroundColor: 'var(--primary-gold)', color: 'var(--primary-maroon)', padding: '1.5rem 2rem', fontWeight: 'bold' }}>
          <h2>Al Ameen Collective</h2>
        </nav>

        <main style={{ minHeight: '80vh', padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<h1>Welcome to Al Ameen Collective</h1>} />
            <Route path="/catalog" element={<h2>Product Catalog</h2>} />
            <Route path="/checkout" element={<h2>Checkout</h2>} />
            <Route path="/admin/*" element={<h2>Admin Panel Placeholder</h2>} />
            <Route path="/vendor/*" element={<h2>Vendor Panel Placeholder</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
