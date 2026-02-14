import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero({ eyebrow, h1, subhead, cta1, cta1To, cta2, cta2To, dark = false }) {
  return (
    <section className={`hero${dark ? ' hero--dark' : ''}`}>
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__grid" />
      </div>
      <div className="container hero__content">
        {eyebrow && <p className="hero__eyebrow">{eyebrow}</p>}
        <h1 className="hero__h1">{h1}</h1>
        {subhead && <p className="hero__sub">{subhead}</p>}
        {(cta1 || cta2) && (
          <div className="hero__ctas">
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
    </section>
  );
}
