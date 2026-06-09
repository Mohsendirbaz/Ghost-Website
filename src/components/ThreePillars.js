import './ThreePillars.css';

export default function ThreePillars({ eyebrow, title, subtitle, pillars }) {
  return (
    <section className="pillars">
      <div className="container">
        {(eyebrow || title || subtitle) && (
          <div className="pillars__header">
            {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="pillars__grid">
          {pillars.map((p, i) => (
            <div key={i} className="pillar-card">
              <div className="pillar-card__icon">{p.icon}</div>
              <h3 className="pillar-card__title">{p.title}</h3>
              <p className="pillar-card__body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
