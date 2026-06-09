/**
 * src/context/CartContext.js
 * Global cart state: add, remove, clear, persist to localStorage.
 */
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'ga_cart_v1';

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (parsed.version === 1 && Array.isArray(parsed.items)) return parsed.items;
    return [];
  } catch {
    return [];
  }
}

function writeStorage(items) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, items, updatedAt: new Date().toISOString() })
    );
  } catch {
    // Quota exceeded — silently degrade (session-only cart remains intact)
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStorage());
  const [justAdded, setJustAdded] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const justAddedTimerRef = useRef(null);

  // Persist on every items change
  useEffect(() => {
    const before = localStorage.getItem(STORAGE_KEY);
    writeStorage(items);
    const after = localStorage.getItem(STORAGE_KEY);
    // Detect write failure (quota) — compare lengths
    if (items.length > 0 && after === before && after === null) {
      setStorageWarning(true);
    }
  }, [items]);

  const addToCart = useCallback((item) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, { ...item, addedAt: item.addedAt || Date.now() }];
    });
    // Trigger badge pulse
    setJustAdded(true);
    if (justAddedTimerRef.current) clearTimeout(justAddedTimerRef.current);
    justAddedTimerRef.current = setTimeout(() => setJustAdded(false), 1000);
  }, []);

  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const hasItem = useCallback(
    (id) => items.some((i) => i.id === id),
    [items]
  );

  const getItemCount = useCallback(() => items.length, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        justAdded,
        storageWarning,
        addToCart,
        removeFromCart,
        clearCart,
        hasItem,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
