import { useState, useEffect } from 'react';
import './CookieBanner.css';

/**
 * CookieBanner - GDPR/CCPA compliant cookie consent
 * Stores consent in localStorage
 */
export default function CookieBanner({ onAccept, onReject, privacyLink = '/en/privacy' }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ghost-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'accepted') {
      onAccept?.();
    }
  }, [onAccept]);

  const handleAccept = () => {
    localStorage.setItem('ghost-cookie-consent', 'accepted');
    setIsVisible(false);
    onAccept?.();
  };

  const handleReject = () => {
    localStorage.setItem('ghost-cookie-consent', 'rejected');
    setIsVisible(false);
    onReject?.();
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__inner container">
        <div className="cookie-banner__content">
          <h3 className="cookie-banner__title">We use cookies</h3>
          <p className="cookie-banner__text">
            We use cookies to enhance your browsing experience and analyze site traffic.
            {' '}
            <a href={privacyLink} className="cookie-banner__link">
              Privacy Policy
            </a>
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button className="cookie-banner__btn cookie-banner__btn--accept" onClick={handleAccept}>
            Accept
          </button>
          <button className="cookie-banner__btn cookie-banner__btn--reject" onClick={handleReject}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
