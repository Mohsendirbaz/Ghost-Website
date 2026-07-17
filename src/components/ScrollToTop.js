import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop — the missing navigation primitive. Without it, every SPA
 * route change preserved the previous page's scroll position, landing
 * visitors mid-page and making navigation feel circular. Hash links and
 * in-page anchors are left to their own behavior.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return; // let anchor navigation handle itself
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
}
