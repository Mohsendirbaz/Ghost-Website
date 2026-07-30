import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import NarrowingHero from '../components/visuals/NarrowingHero';
import WorksCarousel from '../components/visuals/WorksCarousel';
import CoverShelf from '../components/visuals/CoverShelf';
import Figure from '../components/Figure';
import MoatStrip from '../components/MoatStrip';
import StandingsLegend from '../components/StandingsLegend';
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

      {/* The manifesto — hardware's endgame, algorithm's opening (vertical set) */}
      {m.manifesto && (
        <section className="manifesto" aria-label={m.manifesto.lines.join(' ')}>
          {m.manifesto.kicker && (
            <p className="manifesto__kicker" aria-hidden="true">
              {m.manifesto.kicker.split('?')[0]}<b>?</b>
            </p>
          )}
          <div className="manifesto__inner">
            {m.manifesto.lines.map((line, i) => (
              <p key={i} className={`manifesto__line${i === m.manifesto.accent ? ' manifesto__line--accent' : ''}`}>
                {line}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* The Narrowing — the monotone law as a first impression */}
      <NarrowingHero lang={lang} />

      {/* The front hall — every major work simultaneously available and open */}
      <WorksCarousel />

      {m.glance && (
        <Figure num="F-00" src={m.glance.src} caption={m.glance.caption} />
      )}

      {/* The moats — original ideas, each linked to its living proof */}
      <MoatStrip />

      {m.figures && (
        <section className="hm-band">
          <div className="hm-tiles">
            {m.figures.map((f, i) => (
              <div className="hm-tile" key={i}>
                <p className="hm-tile__v">{f.value}</p>
                {f.chip && <span className={`standing-chip standing-chip--${f.chip}`}>{f.chipText}</span>}
                <p className="hm-tile__l">{f.label}</p>
              </div>
            ))}
          </div>
          <StandingsLegend />
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
          <CoverShelf docs={t.corpusDocs} lang={lang} />
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
