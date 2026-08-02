import React, { useState, useEffect } from 'react';

export default function TopAlertBar() {
  const alerts = [
    "🚀 Free Delivery on orders over PKR 5,000!",
    "🎉 Summer Collection Now Live!",
    "🛍️ Wholesale Prices for Everyone!"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % alerts.length);
    }, 5000); // Change alert every 5 seconds
    return () => clearInterval(timer);
  }, [alerts.length]);

  return (
    <div style={{
      background: 'var(--alert-black)',
      color: 'var(--alert-text)',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      padding: '0.5rem 0',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '35px',
      position: 'relative'
    }}>
      {alerts.map((alert, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            transition: 'all 0.5s ease-in-out',
            opacity: index === currentIndex ? 1 : 0,
            transform: index === currentIndex ? 'translateX(0)' : index < currentIndex ? 'translateX(-100%)' : 'translateX(100%)',
          }}
        >
          {alert}
        </div>
      ))}
    </div>
  );
}
