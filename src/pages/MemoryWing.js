import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { copy } from '../data/copy';
import Breadcrumb from '../components/Breadcrumb';
import { HeroMinimal } from '../components/Hero';
import CoverShelf from '../components/visuals/CoverShelf';
import './Page.css';

/**
 * The Memory Wing — dedicated tab for the Memory Module instruments.
 * Rebuilt 2026-07-17 to the open-instrument standard (viewer-first, like
 * the Simulation Bench): the active instrument is already open on arrival,
 * the switcher sits on the viewer, and the cards below are documentation,
 * never a gate. ?view= deep-links a specific instrument (the home carousel
 * and command palette land here at level one).
 * Files live in public/docs/html/memory/; entries mirror artifacts.js.
 */

const INSTRUMENTS = [
  {
    key: 'atlas', file: 'integration-atlas.html', slug: 'memory-integration-atlas',
    en: ['Integration Atlas', 'Every idea of the Memory Module as one governed graph — nodes are concepts, edges are documented couplings.'],
    fa: ['اطلس یکپارچگی', 'همهٔ ایده‌های ماژول حافظه در یک گراف حاکمیت‌دار — گره‌ها مفاهیم‌اند و یال‌ها پیوندهای مستند.'],
  },
  {
    key: 'matrix', file: 'integration-matrix.html', slug: 'memory-synergy-matrix',
    en: ['Synergy Matrix', 'Every pair of ideas crossed — each cell honestly marked mapped, or unexamined.'],
    fa: ['ماتریس هم‌افزایی', 'هر جفت ایده — هر خانه صادقانه علامت‌خورده: نگاشته یا بررسی‌نشده.'],
  },
  {
    key: 'spine', file: 'mechanism-spine.html', slug: 'memory-mechanism-spine',
    en: ['Shared Mechanism Spine', 'Fifteen laws the Memory Module keeps rewriting — the spine beneath the theses.'],
    fa: ['ستون سازوکارهای مشترک', 'پانزده قانونی که ماژول حافظه بازنویسی می‌کند — ستونِ زیر تزها.'],
  },
  {
    key: 'fabric', file: 'symbiotic_search_fabric.html', slug: 'symbiotic-search-fabric',
    en: ['Symbiotic Search Fabric', 'Retrieval as a co-adaptive, client-owned, time-bounded fabric — not a lookup.'],
    fa: ['بافت جست‌وجوی هم‌زیست', 'بازیابی به‌مثابه بافتی هم‌سازگار، در مالکیت کارفرما و زمان‌کران‌دار — نه یک جست‌وجوی ساده.'],
  },
];

const THESES = [
  { slug: 'symbiotic-search-fabric-thesis', title: { en: 'The Symbiotic Search Fabric — Thesis', fa: 'بافت جست‌وجوی هم‌زیست — تز' }, desc: { en: 'The architecture in full.', fa: 'معماری به‌تمامی.' } },
  { slug: 'retrieval-covenant-thesis', title: { en: 'The Retrieval Covenant — Thesis II', fa: 'میثاق بازیابی — تز دوم' }, desc: { en: 'A contract calculus for warranted recall.', fa: 'حساب قراردادی برای فراخوانی ضمانت‌دار.' } },
  { slug: 'price-of-recall-thesis', title: { en: 'The Price of Recall — Thesis III', fa: 'بهای فراخوانی — تز سوم' }, desc: { en: 'Shadow-priced optimization for contracted recall.', fa: 'بهینه‌سازی با قیمت سایه برای فراخوانی قراردادی.' } },
  { slug: 'symbiotic-search-fabric-white-paper', title: { en: 'White Paper No. 1', fa: 'وایت‌پیپر شمارهٔ ۱' }, desc: { en: 'The framework, written for engineers.', fa: 'چارچوب، برای مهندسان.' } },
];

export default function MemoryWing() {
  const { lang } = useLang();
  const { isDark } = useTheme();
  const fa = lang === 'fa';
  const [searchParams, setSearchParams] = useSearchParams();
  const viewerRef = useRef(null);

  const requested = searchParams.get('view');
  const [active, setActive] = useState(
    INSTRUMENTS.some((i) => i.key === requested) ? requested : 'atlas'
  );
  const mounted = useRef(false);

  useEffect(() => {
    if (searchParams.get('view') !== active) {
      setSearchParams({ view: active }, { replace: true });
    }
    if (mounted.current) {
      viewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    mounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const inst = INSTRUMENTS.find((i) => i.key === active);
  const src = `/docs/html/memory/${inst?.file}?theme=${isDark ? 'dark' : 'light'}`;

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: fa ? 'بال حافظه' : 'Memory Wing' },
      ]} />
      <HeroMinimal
        h1={fa ? 'بال حافظه' : 'The Memory Wing'}
        subhead={fa
          ? 'ماژول حافظه، ابزارمند: حافظه‌ای که بهای ماندگاری‌اش را می‌پردازد، بازیابی‌ای که میثاق دارد، و جست‌وجویی که بافت است. ابزار فعال از لحظهٔ ورود باز است. پژوهش در سطح مفهوم؛ فعلاً فقط انگلیسی؛ انضباط جایگاه ادعا برقرار است.'
          : 'The Memory Module, instrumented: memory that pays for its persistence, retrieval under covenant, search as a governed fabric. The active instrument is open on arrival. Concept-stage research, English-only for now; the standings discipline applies throughout.'}
      />

      {/* Viewer first — the instrument is open on arrival */}
      <section ref={viewerRef} className="section-block" style={{ scrollMarginTop: '90px', paddingTop: '1rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <div role="tablist" aria-label={fa ? 'انتخاب ابزار' : 'Choose an instrument'} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {INSTRUMENTS.map((i) => (
                <button
                  key={i.key}
                  role="tab"
                  aria-selected={active === i.key}
                  className={active === i.key ? 'btn btn-primary' : 'btn'}
                  onClick={() => setActive(i.key)}
                >
                  {active === i.key ? '▶ ' : ''}{fa ? i.fa[0] : i.en[0]}
                </button>
              ))}
            </div>
            <span style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <Link className="btn" to={`/${lang}/artifacts/${inst?.slug}`} style={{ textDecoration: 'none' }}>
                {fa ? 'صفحهٔ آرتیفکت' : 'Artifact page'}
              </Link>
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                {fa ? 'تمام‌صفحه ↗' : 'Open full ↗'}
              </a>
            </span>
          </div>
          <div className="bp-frame" style={{ overflow: 'hidden' }}>
            <iframe
              key={`${active}-${isDark ? 'd' : 'l'}`}
              src={src}
              title={inst ? (fa ? inst.fa[0] : inst.en[0]) : 'Memory instrument'}
              style={{ width: '100%', height: 'clamp(480px, 82vh, 1000px)', border: 0, display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* Documentation cards — below the viewer, never a gate */}
      <section className="safety-layers">
        <div className="container">
          <h2 className="section-title">{fa ? 'چهار ابزار' : 'The Four Instruments'}</h2>
          <div className="safety-layers__grid">
            {INSTRUMENTS.map((i) => (
              <div
                key={i.key}
                className="layer-card"
                role="button"
                tabIndex={0}
                onClick={() => setActive(i.key)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActive(i.key)}
                style={{ cursor: 'pointer', outline: active === i.key ? '2px solid currentColor' : 'none' }}
                aria-pressed={active === i.key}
              >
                <h3 className="layer-card__title">{fa ? i.fa[0] : i.en[0]}</h3>
                <p className="layer-card__body">{fa ? i.fa[1] : i.en[1]}</p>
                <p className="layer-card__num" style={{ marginTop: '0.75rem' }}>
                  {active === i.key ? `▶ ${fa ? 'در حال نمایش' : 'Now showing'}` : `${fa ? 'نمایش' : 'View'} →`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thesis shelf */}
      <section className="section-block section-block--gray">
        <div className="container">
          <h2 className="section-title">{fa ? 'خط تز' : 'The Thesis Line'}</h2>
          <p className="section-block__body">
            {fa
              ? 'اسناد پشت ابزارها — در کتابخانهٔ فنی، با جلد و متن کامل.'
              : 'The documents behind the instruments — in the Technical Library, with covers and full text.'}
          </p>
          <CoverShelf
            docs={THESES.map((d) => ({ slug: d.slug, title: fa ? d.title.fa : d.title.en, desc: fa ? d.desc.fa : d.desc.en }))}
            lang={lang}
          />
        </div>
      </section>
    </main>
  );
}
