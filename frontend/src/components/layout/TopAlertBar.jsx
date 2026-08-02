import React from 'react';

export default function TopAlertBar() {
  return (
    <div style={{
      background: 'var(--alert-black)',
      color: 'var(--alert-text)',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      padding: '0.5rem 0',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="marquee" style={{ display: 'inline-block', animation: 'marquee 15s linear infinite' }}>
        🚀 Free Delivery on orders over PKR 5,000! &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;
        🎉 Summer Collection Now Live! &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;
        🛍️ Wholesale Prices for Everyone!
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
