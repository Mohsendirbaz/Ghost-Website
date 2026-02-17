/**
 * src/components/CartPanel.js
 * Full-height slide-out panel showing cart items and download controls.
 */
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import { generateAndDownloadZip } from '../services/downloadService';
import './Cart.css';

// ─── File type icons ───────────────────────────────────────────────────────────

function FileTypeIcon({ type }) {
  switch (type) {
    case 'pdf':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#dc3545" opacity="0.2" stroke="#dc3545" strokeWidth="1.5" />
          <polyline points="14 2 14 8 20 8" stroke="#dc3545" strokeWidth="1.5" />
          <text x="12" y="17" fontSize="5" fontWeight="bold" fill="#dc3545" textAnchor="middle">PDF</text>
        </svg>
      );
    case 'md':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#0d6efd" opacity="0.2" stroke="#0d6efd" strokeWidth="1.5" />
          <polyline points="14 2 14 8 20 8" stroke="#0d6efd" strokeWidth="1.5" />
          <text x="12" y="17" fontSize="5" fontWeight="bold" fill="#0d6efd" textAnchor="middle">MD</text>
        </svg>
      );
    case 'xlsx':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#198754" opacity="0.2" stroke="#198754" strokeWidth="1.5" />
          <polyline points="14 2 14 8 20 8" stroke="#198754" strokeWidth="1.5" />
          <text x="12" y="17" fontSize="5" fontWeight="bold" fill="#198754" textAnchor="middle">XLS</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#6B7280" opacity="0.2" stroke="#6B7280" strokeWidth="1.5" />
          <polyline points="14 2 14 8 20 8" stroke="#6B7280" strokeWidth="1.5" />
        </svg>
      );
  }
}

// ─── Individual cart item row ──────────────────────────────────────────────────

function CartItemRow({ item, onRemove, lang }) {
  const isRtl = lang === 'fa';
  const displayTitle = isRtl
    ? (item.title?.fa || item.filename)
    : (item.title?.en || item.filename);
  const sizeLabel = item.sizeBytes
    ? (item.sizeBytes / (1024 * 1024)).toFixed(1) + ' MB'
    : null;

  return (
    <div className="cart-item" role="listitem">
      <div className="cart-item-icon" aria-hidden="true">
        <FileTypeIcon type={item.type} />
      </div>
      <div className="cart-item-details">
        <div className="cart-item-filename" title={item.filename}>
          {displayTitle}
        </div>
        <div className="cart-item-meta">
          <span className="cart-item-type-badge">{(item.type || 'file').toUpperCase()}</span>
          {item.category && (
            <>
              <span className="cart-item-meta-sep" aria-hidden="true">·</span>
              <span>{item.category}</span>
            </>
          )}
          {sizeLabel && (
            <>
              <span className="cart-item-meta-sep" aria-hidden="true">·</span>
              <span>{sizeLabel}</span>
            </>
          )}
        </div>
      </div>
      <button
        className="cart-item-remove"
        onClick={() => onRemove(item.id)}
        aria-label={isRtl ? `حذف ${item.filename}` : `Remove ${item.filename}`}
        type="button"
      >
        <svg viewBox="0 0 24 24" className="cart-item-remove-icon" aria-hidden="true">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
}

// ─── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ lang }) {
  const t = copy[lang]?.cart || copy.en.cart;
  return (
    <div className="cart-empty" role="status" aria-live="polite">
      <svg viewBox="0 0 24 24" className="cart-empty-icon" aria-hidden="true">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
      <p className="cart-empty-title">{t.emptyCart}</p>
      <p className="cart-empty-desc">{t.emptyCartDesc}</p>
    </div>
  );
}

// ─── Main panel ────────────────────────────────────────────────────────────────

export default function CartPanel({ onClose }) {
  const { items, removeFromCart, clearCart, storageWarning } = useCart();
  const { lang } = useLang();
  const t = copy[lang]?.cart || copy.en.cart;
  const isRtl = lang === 'fa';

  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const panelRef = useRef(null);
  const closeRef = useRef(null);

  // Animate in on mount
  useEffect(() => {
    requestAnimationFrame(() => setIsOpen(true));
  }, []);

  // Escape key closes panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus first element on mount
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Focus trap
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    panel.addEventListener('keydown', trap);
    return () => panel.removeEventListener('keydown', trap);
  }, [items]);

  const totalMB = useMemo(() => {
    const bytes = items.reduce((sum, item) => sum + (item.sizeBytes || 0), 0);
    return bytes / (1024 * 1024);
  }, [items]);

  const handleDownload = useCallback(async () => {
    setIsGenerating(true);
    setStatusMessage(null);
    try {
      const result = await generateAndDownloadZip(items, lang);
      if (result.failedCount > 0) {
        setStatusMessage({ type: 'warn', text: t.partialError(result.failedCount) });
      } else {
        setStatusMessage({ type: 'success', text: t.success });
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch {
      setStatusMessage({ type: 'error', text: t.error });
    } finally {
      setIsGenerating(false);
    }
  }, [items, lang, t]);

  const handleClearAll = useCallback(() => {
    if (!window.confirm(t.confirmClear(items.length))) return;
    clearCart();
  }, [items.length, clearCart, t]);

  return (
    <div
      className="cart-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        className={`cart-panel${isOpen ? ' cart-panel--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t.cartTitle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="cart-header">
          <h2>{t.cartTitle}</h2>
          <button
            ref={closeRef}
            className="cart-close-btn"
            onClick={onClose}
            aria-label={isRtl ? 'بستن' : 'Close'}
            type="button"
          >
            <svg viewBox="0 0 24 24" className="cart-close-icon" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        {/* Storage warning */}
        {storageWarning && (
          <div className="cart-storage-warning" role="alert">
            {isRtl
              ? 'فضای ذخیره‌سازی مرورگر پر است. سبد فقط در این نشست ذخیره می‌شود.'
              : 'Browser storage is full. Cart will not persist after page refresh.'}
          </div>
        )}

        {/* Status message */}
        {statusMessage && (
          <div
            role="alert"
            aria-live="polite"
            style={{
              padding: '8px var(--space-4)',
              fontSize: 'var(--text-sm)',
              background: statusMessage.type === 'success'
                ? 'rgba(16, 185, 129, 0.1)'
                : statusMessage.type === 'warn'
                  ? 'rgba(245, 158, 11, 0.1)'
                  : 'rgba(239, 68, 68, 0.1)',
              color: statusMessage.type === 'success'
                ? '#065f46'
                : statusMessage.type === 'warn'
                  ? '#92400e'
                  : '#991b1b',
              borderBottom: '1px solid var(--color-border)',
              flexShrink: 0,
            }}
          >
            {statusMessage.text}
          </div>
        )}

        {/* Items or empty state */}
        {items.length === 0 ? (
          <EmptyState lang={lang} />
        ) : (
          <>
            <div className="cart-items" role="list" aria-label={isRtl ? 'فایل‌های سبد' : 'Cart files'}>
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  lang={lang}
                />
              ))}
            </div>

            {/* Footer */}
            <footer className="cart-footer">
              <div className="cart-summary">
                {t.itemCount(items.length)}
                {totalMB > 0 && ` · ${t.totalSize(totalMB)}`}
              </div>
              <div className="cart-actions">
                <button
                  className="btn-secondary"
                  onClick={handleClearAll}
                  type="button"
                >
                  {t.clearAll}
                </button>
                <button
                  className="btn-primary"
                  onClick={handleDownload}
                  disabled={isGenerating}
                  type="button"
                  aria-busy={isGenerating}
                >
                  {isGenerating && <span className="cart-spinner" aria-hidden="true" />}
                  {isGenerating ? t.generating : t.downloadZip}
                </button>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
