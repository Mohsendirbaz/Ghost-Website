import { useState, useEffect } from 'react';
import './ScrollProgress.css';

/**
 * ScrollProgress Component
 * Fixed progress bar at top of viewport showing page scroll depth
 *
 * Calculates scroll percentage and displays as a horizontal bar.
 * Respects prefers-reduced-motion preference.
 */
export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate progress percentage
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

      setScrollProgress(Math.min(progress, 100));
    };

    // Calculate on mount
    calculateScrollProgress();

    // Recalculate on scroll and resize
    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    window.addEventListener('resize', calculateScrollProgress);

    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
      window.removeEventListener('resize', calculateScrollProgress);
    };
  }, []);

  return (
    <div className="scroll-progress" role="progressbar" aria-valuenow={Math.round(scrollProgress)} aria-valuemin="0" aria-valuemax="100" aria-label="Page scroll progress">
      <div
        className="scroll-progress__bar"
        style={{ transform: `translateX(${scrollProgress - 100}%)` }}
      />
    </div>
  );
}
