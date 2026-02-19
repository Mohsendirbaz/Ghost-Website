import { useState, useEffect } from 'react';
import './BackToTop.css';

/**
 * BackToTop Component
 * Floating button that appears after scrolling down,
 * allows user to smoothly scroll back to top of page
 *
 * @param {number} showAfter - Scroll threshold in pixels (default: 400)
 */
export default function BackToTop({ showAfter = 400 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check on mount
    toggleVisibility();

    // Listen to scroll events
    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`back-to-top ${isVisible ? 'back-to-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      type="button"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
}
