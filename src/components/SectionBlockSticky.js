import { useState, useEffect, useRef } from 'react';
import './SectionBlockSticky.css';

/**
 * SectionBlockSticky - Content block with sticky visual column
 * Visual stays pinned while text scrolls past
 * Used for: Technology deep dives, Science explanations
 */
export default function SectionBlockSticky({
  eyebrow,
  title,
  body,
  children,
  visualPosition = 'right',
  gray = false,
  className = '',
}) {
  const [isSticky, setIsSticky] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const classes = [
    'section-block-sticky',
    gray ? 'section-block-sticky--gray' : '',
    visualPosition === 'left' ? 'section-block-sticky--visual-left' : '',
    isSticky ? 'section-block-sticky--active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section ref={sectionRef} className={classes}>
      <div className="container section-block-sticky__inner">
        <div className="section-block-sticky__content">
          {eyebrow && <span className="section-block-sticky__eyebrow">{eyebrow}</span>}
          {title && <h2 className="section-block-sticky__title">{title}</h2>}
          {body && <div className="section-block-sticky__body">{body}</div>}
        </div>

        <div className="section-block-sticky__visual">
          {children}
        </div>
      </div>
    </section>
  );
}
