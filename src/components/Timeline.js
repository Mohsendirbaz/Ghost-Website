import { useState, useEffect, useRef } from 'react';
import './Timeline.css';

/**
 * Timeline - Vertical timeline with milestones
 * Animates in as user scrolls
 * Used for: Company history, Product evolution
 */
export default function Timeline({ items, className = '' }) {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const itemRefs = useRef([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]));
          }
        },
        { threshold: 0.2 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, [items]);

  const classes = ['timeline', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="timeline__line"></div>
      {items.map((item, index) => (
        <div
          key={index}
          ref={el => (itemRefs.current[index] = el)}
          className={`timeline__item ${
            visibleItems.has(index) ? 'timeline__item--visible' : ''
          }`}
        >
          <div className="timeline__marker">
            <div className="timeline__dot"></div>
          </div>
          <div className="timeline__content">
            <div className="timeline__year">{item.year}</div>
            <h3 className="timeline__title">{item.title}</h3>
            {item.description && (
              <p className="timeline__description">{item.description}</p>
            )}
            {item.image && (
              <div className="timeline__image">
                <img src={item.image} alt={item.title} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
