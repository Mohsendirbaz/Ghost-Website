import { Link } from 'react-router-dom';
import './HeroSecondary.css';

/**
 * HeroSecondary - Half viewport with gradient background
 * Used for: Most content pages (Science, Safety, Partners, etc.)
 */
export default function HeroSecondary({ eyebrow, h1, subhead, cta1, cta1To, cta2, cta2To, dark = false }) {
  return (
    <section className={`hero-secondary${dark ? ' hero-secondary--dark' : ''}`}>
      <div className="hero-secondary__bg">
        <div className="hero-secondary__orb hero-secondary__orb--1" />
        <div className="hero-secondary__orb hero-secondary__orb--2" />
        <div className="hero-secondary__grid" />
      </div>
      <div className="container hero-secondary__content">
        {eyebrow && <p className="hero-secondary__eyebrow">{eyebrow}</p>}
        <h1 className="hero-secondary__h1">{h1}</h1>
        {subhead && <p className="hero-secondary__sub">{subhead}</p>}
        {(cta1 || cta2) && (
          <div className="hero-secondary__ctas">
            {cta1 && (
              <Link to={cta1To || '#'} className="btn btn-primary">
                {cta1}
              </Link>
            )}
            {cta2 && (
              <Link to={cta2To || '#'} className="btn btn-secondary">
                {cta2}
              </Link>
            )}
          </div>
        )}
      </div>
      <div className="hero-secondary__accent" />
    </section>
  );
}
