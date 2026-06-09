import { Link } from 'react-router-dom';
import './CTABand.css';

export default function CTABand({ title, body, cta1, cta1To, cta2, cta2To }) {
  return (
    <section className="cta-band">
      <div className="cta-band__bg">
        <div className="cta-band__orb" />
      </div>
      <div className="container cta-band__inner">
        <div className="cta-band__text">
          <h2 className="cta-band__title">{title}</h2>
          {body && <p className="cta-band__body">{body}</p>}
        </div>
        <div className="cta-band__actions">
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
      </div>
    </section>
  );
}
