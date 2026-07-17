import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { copy } from '../data/copy';
import Breadcrumb from '../components/Breadcrumb';
import { HeroMinimal } from '../components/Hero';
import './Page.css';

/**
 * The Simulation Bench — dedicated tab for the planning-stack simulation
 * instruments. Three interactive visual abstracts, each a self-contained
 * RK4 laboratory that runs entirely in the visitor's browser.
 *
 * Interaction contract (see upgrading website/2026-07-17_effortless-interaction.md):
 * the major visualization is OPEN on arrival — no click is required to see
 * a running simulation. The switcher sits on the viewer itself; cards below
 * are documentation, not gates. ?view= deep-links a specific instrument;
 * the iframe inherits the site theme via ?theme=.
 * Files live in public/docs/html/simulation/.
 */

const INSTRUMENTS = [
  {
    key: 'vehicle', file: 'vehicle-dynamics.html',
    en: [
      'Vehicle Dynamics',
      'The kinematic bicycle with jerk and steering-rate inputs, integrated live (RK4). Four maneuver presets, six signal strips with their constraint bands, scrub-anywhere playback.',
    ],
    fa: [
      'دینامیک خودرو',
      'دوچرخهٔ سینماتیکی با ورودی‌های تکانه و نرخ فرمان، با انتگرال‌گیری زنده (RK4). چهار مانور از پیش‌تنظیم، شش نوار سیگنال با باندهای قید، و پیمایش آزاد روی زمان.',
    ],
  },
  {
    key: 'symmetry', file: 'symmetry-smoothness.html',
    en: [
      'Symmetry & Smoothness',
      'Six symmetry forms of smooth motion, then a minimum-snap lane change you can deform: click the J(ε) objective bowl to set the time-skew and watch every mirrored signal answer.',
    ],
    fa: [
      'تقارن و همواری',
      'شش صورتِ تقارن در حرکت هموار، سپس تعویض خطی با کمینهٔ اسنپ که می‌توانید آن را تغییر شکل دهید: روی کاسهٔ هدف J(ε) کلیک کنید تا کج‌شدگی زمانی تنظیم شود و پاسخ هر سیگنال آینه‌ای را ببینید.',
    ],
  },
  {
    key: 'actuation', file: 'actuation-space.html',
    en: [
      'Actuation-Space Smoothness',
      'Steering, brake, and acceleration as one three-axis curve — drag to rotate the actuation space, follow the minimap, and read the joint smoothness triad on its strips.',
    ],
    fa: [
      'همواری فضای عملگر',
      'فرمان، ترمز و شتاب به‌صورت یک منحنی سه‌محوره — با کشیدن، فضای عملگر را بچرخانید، نقشهٔ کوچک را دنبال کنید و سه‌گانهٔ همواری توأمان را روی نوارها بخوانید.',
    ],
  },
];

export default function Simulation() {
  const { lang } = useLang();
  const { isDark } = useTheme();
  const fa = lang === 'fa';
  const [searchParams, setSearchParams] = useSearchParams();
  const viewerRef = useRef(null);

  const requested = searchParams.get('view');
  const [active, setActive] = useState(
    INSTRUMENTS.some((i) => i.key === requested) ? requested : 'vehicle'
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
  const src = `/docs/html/simulation/${inst?.file}?theme=${isDark ? 'dark' : 'light'}`;

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: fa ? 'شبیه‌سازی' : 'Simulation' },
      ]} />
      <HeroMinimal
        h1={fa ? 'میز شبیه‌سازی' : 'The Simulation Bench'}
        subhead={fa
          ? 'ابزارهای سطح برنامه‌ریزی، زنده در مرورگر شما: هر سه شبیه‌سازی از لحظهٔ ورود در حال اجرایند — چیزی برای بازکردن نیست. مدل‌ها در سطح مفهوم‌اند و انضباط جایگاه ادعا برقرار است.'
          : 'The planning-stack instruments, live in your browser: all three simulations are already running when you arrive — there is nothing to open. Concept-stage models; the standings discipline applies throughout.'}
      />

      {/* Viewer first — the major visualization is open on arrival */}
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
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              {fa ? 'تمام‌صفحه ↗' : 'Open full ↗'}
            </a>
          </div>
          <div className="bp-frame" style={{ overflow: 'hidden' }}>
            <iframe
              key={`${active}-${isDark ? 'd' : 'l'}`}
              src={src}
              title={inst ? (fa ? inst.fa[0] : inst.en[0]) : 'Simulation instrument'}
              style={{ width: '100%', height: 'clamp(480px, 82vh, 1000px)', border: 0, display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* Documentation cards — below the bench, never a gate */}
      <section className="safety-layers">
        <div className="container">
          <h2 className="section-title">{fa ? 'سه ابزار' : 'The Three Instruments'}</h2>
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
          <p className="section-block__body" style={{ marginTop: '1.25rem' }}>
            {fa
              ? 'هر ابزار یک سند HTML خودکفاست: انتگرال‌گیری، نمودارها و جدول‌ها همه در مرورگر شما اجرا می‌شوند؛ چیزی به سرور فرستاده نمی‌شود.'
              : 'Each instrument is a self-contained HTML document: the integration, charts, and tables all run in your browser; nothing is sent to a server.'}
          </p>
        </div>
      </section>
    </main>
  );
}
