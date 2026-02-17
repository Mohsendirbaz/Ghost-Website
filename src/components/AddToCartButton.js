/**
 * src/components/AddToCartButton.js
 * Reusable "Add to Cart" / "In Cart" toggle button.
 *
 * Props:
 *   item     – CartItem object (id, filename, path, type, title, category, keywords, addedAt)
 *   variant  – 'default' | 'compact' | 'icon-only'
 *   className – extra CSS class
 *   disabled  – override disable
 */
import { useState, useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import './Cart.css';

// ─── Inline SVG icons ──────────────────────────────────────────────────────────

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="cart-btn-icon" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="cart-btn-icon" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" strokeWidth="2.5" />
    </svg>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function AddToCartButton({ item, variant = 'default', className = '', disabled = false }) {
  const { addToCart, hasItem } = useCart();
  const { lang } = useLang();
  const t = copy[lang]?.cart || copy.en.cart;

  const inCart = hasItem(item.id);
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = useCallback(() => {
    if (inCart || disabled) return;
    addToCart({ ...item, addedAt: Date.now() });
    setJustAdded(true);
  }, [inCart, disabled, addToCart, item]);

  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), 400);
    return () => clearTimeout(timer);
  }, [justAdded]);

  const label = inCart ? t.inCart : t.addToCart;
  const ariaLabel = inCart
    ? (lang === 'fa' ? `${item.filename} در سبد است` : `${item.filename} is in cart`)
    : (lang === 'fa' ? `افزودن ${item.filename} به سبد` : `Add ${item.filename} to cart`);

  const classNames = [
    'cart-btn',
    `cart-btn--${variant}`,
    inCart ? 'cart-btn--in-cart' : '',
    justAdded ? 'cart-btn--success' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classNames}
      onClick={handleClick}
      aria-pressed={inCart}
      aria-label={ariaLabel}
      disabled={disabled && !inCart}
      tabIndex={0}
    >
      {inCart ? <CheckIcon /> : <BagIcon />}
      <span className="cart-btn-label">{label}</span>
    </button>
  );
}
