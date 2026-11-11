import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import NarrowingHero from '../components/visuals/NarrowingHero';
import WorksCarousel from '../components/visuals/WorksCarousel';
import Figure from '../components/Figure';
import MoatStrip from '../components/MoatStrip';
import StandingsLegend from '../components/StandingsLegend';
import './Home.css';

export default function Home() {
  const { lang } = useLang();
  const m = copy[lang].home.min || {};
  const arrow = lang === 'fa' ? '←' : '→';
  const [canvasJsonDownload, setCanvasJsonDownload] = useState('idle');

  const downloadCanvasJson = async (event) => {
    event.preventDefault();
    setCanvasJsonDownload('loading');
    try {
      if (!window.DecompressionStream) {
        throw new Error('This browser does not support downloading the compressed canvas JSON.');
      }
      const response = await fetch('/canvas/ORGANON_Projectwide_L5_Relationship_Map_Canvas_compact.json.gz');
      if (!response.ok || !response.body) {
        throw new Error(`Could not download the canvas JSON (HTTP ${response.status}).`);
      }
      const blob = await new Response(
        response.body.pipeThrough(new DecompressionStream('gzip')),
        { headers: { 'Content-Type': 'application/json' } }
      ).blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ORGANON_Projectwide_L5_Relationship_Map_Canvas_compact.json';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
      setCanvasJsonDownload('done');
    } catch (error) {
      console.error('Canvas JSON download failed:', error);
      setCanvasJsonDownload('error');
    }
  };

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

      <section className="hm-canvas" aria-label="Interactive Canvas (How Ghost Research Has Evolved)">
        <div className="hm-canvas__heading">
          <div>
            <h2 className="hm-h2">Interactive Canvas (How Ghost Research Has Evolved)</h2>
            <p className="hm-lead">
              {lang === 'fa'
                ? 'نقشهٔ تعاملی پژوهش به‌طور خودکار بارگذاری می‌شود و تغییرات شما پس از بازخوانی صفحه حفظ خواهد شد.'
                : 'Explore the research graph. It loads automatically, and your canvas changes are retained when you return.'}
            </p>
          </div>
          <div className="hm-canvas__downloads">
            <a
              className="hm-canvas__download"
              href="/canvas/Canvas_ORGANON.html"
              download="Interactive Canvas (How Ghost Research Has Evolved).html"
            >
              {lang === 'fa' ? 'دریافت بوم تعاملی' : 'Download interactive canvas'}
            </a>
            <a
              className="hm-canvas__download"
              href="/canvas/ORGANON_Projectwide_L5_Relationship_Map_Canvas_compact.json.gz"
              onClick={downloadCanvasJson}
            >
              {lang === 'fa' ? 'دریافت فایل JSON (۱۲۴ مگابایت)' : 'Download JSON file (124 MB)'}
            </a>
          </div>
        </div>
        {canvasJsonDownload !== 'idle' && (
          <p className="hm-canvas__download-status" aria-live="polite">
            {canvasJsonDownload === 'loading'
              ? (lang === 'fa' ? 'در حال آماده‌سازی فایل JSON...' : 'Preparing JSON download…')
              : canvasJsonDownload === 'done'
                ? (lang === 'fa' ? 'دانلود فایل JSON آغاز شد.' : 'JSON download started.')
                : (lang === 'fa' ? 'دانلود فایل JSON انجام نشد.' : 'JSON download failed. Please try again.')}
          </p>
        )}
        <iframe
          className="hm-canvas__frame"
          src="/canvas/Canvas_ORGANON.html"
          title="Interactive Canvas (How Ghost Research Has Evolved)"
          loading="eager"
        />
      </section>

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

      <section className="hm-close">
        <Link className="hm-link hm-link--primary" to={`/${lang}/contact`}>
          {m.closeCta} {arrow}
        </Link>
      </section>
    </main>
  );
}
