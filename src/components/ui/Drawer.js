import { useState, useEffect, useRef } from 'react';
import './Drawer.css';

/**
 * Drawer Component
 * Reusable slide-out panel with backdrop, focus trap, and ESC handler
 *
 * @param {boolean} open - Controls drawer visibility
 * @param {function} onClose - Called when drawer should close
 * @param {string} position - 'left' | 'right' (default: 'right')
 * @param {string} title - Drawer title
 * @param {ReactNode} children - Drawer content
 * @param {string} className - Additional CSS classes
 * @param {number} width - Drawer width in pixels (default: 400)
 */
export default function Drawer({
  open,
  onClose,
  position = 'right',
  title,
  children,
  className = '',
  width = 400,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Animate in on open
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [open]);

  // ESC key closes drawer
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Focus close button on open
  useEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusable = drawer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift+Tab on first element → focus last
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab on last element → focus first
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    drawer.addEventListener('keydown', trap);
    return () => drawer.removeEventListener('keydown', trap);
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open && !isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isVisible ? 'drawer-backdrop--visible' : ''}`}
        onClick={onClose}
        role="presentation"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        ref={drawerRef}
        className={`drawer drawer--${position} ${isVisible ? 'drawer--open' : ''} ${className}`}
        style={{ width: `${width}px`, maxWidth: '90vw' }}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Drawer'}
      >
        {/* Header */}
        <div className="drawer__header">
          {title && <h2 className="drawer__title">{title}</h2>}
          <button
            ref={closeButtonRef}
            className="drawer__close"
            onClick={onClose}
            aria-label="Close drawer"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="drawer__content">
          {children}
        </div>
      </aside>
    </>
  );
}
