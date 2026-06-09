import './HeroMinimal.css';

/**
 * HeroMinimal - Compact text-only hero
 * Used for: Contact, Legal pages
 */
export default function HeroMinimal({ h1, subhead }) {
  return (
    <section className="hero-minimal">
      <div className="container hero-minimal__content">
        <h1 className="hero-minimal__h1">{h1}</h1>
        {subhead && <p className="hero-minimal__sub">{subhead}</p>}
      </div>
    </section>
  );
}
