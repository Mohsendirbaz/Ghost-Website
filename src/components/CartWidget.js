/**
 * src/components/CartWidget.js
 * Floating action button that shows cart count and opens CartPanel.
 * Hidden when cart is empty.
 */
import { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import CartPanel from './CartPanel';
import './Cart.css';

function ShoppingBagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="cart-widget-icon" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default function CartWidget() {
  const { getItemCount, justAdded } = useCart();
  const { lang } = useLang();
  const [panelOpen, setPanelOpen] = useState(false);
  const widgetRef = useRef(null);
  const count = getItemCount();

  if (count === 0) return null;

  const ariaLabel = lang === 'fa'
    ? `باز کردن سبد (${count} فایل)`
    : `Open cart (${count} file${count !== 1 ? 's' : ''})`;

  return (
    <>
      <button
        ref={widgetRef}
        className="cart-widget"
        onClick={() => setPanelOpen(true)}
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={panelOpen}
        type="button"
      >
        <ShoppingBagIcon />
        <span className={`cart-badge${justAdded ? ' cart-badge--pulse' : ''}`} aria-hidden="true">
          {count > 99 ? '99+' : count}
        </span>
      </button>

      {panelOpen && (
        <CartPanel
          onClose={() => {
            setPanelOpen(false);
            // Return focus to widget button after panel closes
            setTimeout(() => widgetRef.current?.focus(), 50);
          }}
        />
      )}
    </>
  );
}
