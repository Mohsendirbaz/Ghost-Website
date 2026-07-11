import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import './Home.css';

export default function Home() {
  const { lang } = useLang();
  const t = copy[lang].home;
  const m = t.min || {};
  const arrow = lang === 'fa' ? '←' : '→';

  return (
    <main id="main-content" className="hm">
      <section className="hm-hero">
        <p className="hm-eyebrow">{m.eyebrow}</p>
        <h1 className="hm-h1">{m.h1}</h1>
        <p className="hm-sub">{m.sub}</p>
        <p className="hm-links">
          <Link className="hm-link hm-link--primary" to={`/${lang}/exhibition`}>
            {m.ctaPrimary} {arrow}
          </Link>
          <Link className="hm-link" to={`/${lang}/contact`}>
            {m.ctaSecondary} {arrow}
          </Link>
        </p>
      </section>

      {m.glance && (
        <figure className="hm-glance">
          <img src={m.glance.src} alt={m.glance.caption} />
          <figcaption>{m.glance.caption}</figcaption>
        </figure>
      )}

      {m.figures && (
        <section className="hm-band">
          <div className="hm-tiles">
            {m.figures.map((f, i) => (
              <div className="hm-tile" key={i}>
                <p className="hm-tile__v">{f.value}</p>
                {f.chip && <span className={`hm-chip hm-chip--${f.chip}`}>{f.chipText}</span>}
                <p className="hm-tile__l">{f.label}</p>
              </div>
            ))}
          </div>
          <p className="hm-note">{m.figuresNote}</p>
        </section>
      )}

      <section className="hm-row">
        <h2 className="hm-h2">{m.exTitle}</h2>
        <p className="hm-lead">{m.exLead}</p>
        <div className="hm-rooms">
          {(m.exRooms || []).map((r) => (
            <Link key={r.key} className="hm-room" to={`/${lang}/exhibition?view=${r.key}`}>
              {r.label}
            </Link>
          ))}
          <Link className="hm-link hm-link--primary" to={`/${lang}/exhibition`}>
            {m.exEnter} {arrow}
          </Link>
        </div>
      </section>

      {t.corpusDocs && (
        <section className="hm-row">
          <h2 className="hm-h2">{t.corpusTitle}</h2>
          <p className="hm-lead">{m.corpusLead}</p>
          <div className="hm-docs">
            {t.corpusDocs.map((doc, i) => (
              <Link key={i} className="hm-doc" to={`/${lang}/library/assets/${doc.slug}`}>
                <span className="hm-doc__t">{doc.title}</span>
                <span className="hm-doc__d">{doc.desc}</span>
                <span className="hm-doc__a" aria-hidden="true">{arrow}</span>
              </Link>
            ))}
          </div>
          <p className="hm-more">
            <Link className="hm-link" to={`/${lang}/library`}>
              {m.corpusMore} {arrow}
            </Link>
          </p>
        </section>
      )}

      <section className="hm-close">
        <p className="hm-close__line">{m.closeLine}</p>
        <Link className="hm-link hm-link--primary" to={`/${lang}/contact`}>
          {m.closeCta} {arrow}
        </Link>
      </section>
    </main>
  );
}
