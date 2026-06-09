import { useState, useEffect, useRef } from 'react';
import './StatsBand.css';

/**
 * StatsBand - Horizontal strip with animated count-up numbers
 * Triggers animation when scrolled into view
 * Used for: Key metrics, achievements, proof points
 */
export default function StatsBand({ stats, gray = false, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const bandRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (bandRef.current) {
      observer.observe(bandRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    stats.forEach((stat, index) => {
      const target = parseFloat(stat.value);
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += increment;

        if (step >= steps) {
          current = target;
          clearInterval(timer);
        }

        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = current;
          return newCounts;
        });
      }, interval);
    });
  }, [isVisible, stats]);

  const formatValue = (value, originalValue) => {
    // Check if original value has decimal places
    const hasDecimal = originalValue.toString().includes('.');
    return hasDecimal ? value.toFixed(1) : Math.round(value);
  };

  const classes = [
    'stats-band',
    gray ? 'stats-band--gray' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section ref={bandRef} className={classes}>
      <div className="container stats-band__inner">
        {stats.map((stat, index) => (
          <div key={index} className="stats-band__item">
            <div className="stats-band__value">
              {formatValue(counts[index], stat.value)}
              {stat.suffix && <span className="stats-band__suffix">{stat.suffix}</span>}
            </div>
            <div className="stats-band__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
