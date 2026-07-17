import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import SectionBlock from '../components/SectionBlock';
import './Page.css';

const VALID_VIEWS = ['multiplexer', 'stack', 'constitution', 'eventfabric'];

export default function Exhibition() {
  const { lang } = useLang();
  const t = copy[lang].exhibition;
  const { isDark } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const viewerRef = useRef(null);
  const roomSrc = (view) => `/exhibition/?view=${view}&theme=${isDark ? 'dark' : 'light'}`;

  const requested = searchParams.get('view');
  const [room, setRoom] = useState(
    VALID_VIEWS.includes(requested) ? requested : 'multiplexer'
  );
  const userNavigated = useRef(Boolean(requested));

  // Keep URL in sync and scroll the viewer into place when a room opens
  useEffect(() => {
    if (room) {
      if (searchParams.get('view') !== room) {
        setSearchParams({ view: room }, { replace: true });
      }
      if (userNavigated.current) {
        viewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      userNavigated.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  const activeRoom = t.rooms.find((r) => r.view === room);

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: copy[lang].nav.exhibition },
      ]} />
      <Hero
        eyebrow={t.heroEyebrow}
        h1={t.heroH1}
        subhead={t.heroSub}
      />

      {/* Placard */}
      <SectionBlock
        title={t.placardTitle}
        body={t.placardBody}
        note={t.placardNote}
        gray
      />

      {/* Room cards */}
      <section className="safety-layers">
        <div className="container">
          <h2 className="section-title">{t.roomsTitle}</h2>
          <div className="safety-layers__grid">
            {t.rooms.map((r) => (
              <div
                key={r.view}
                className="layer-card"
                role="button"
                tabIndex={0}
                onClick={() => setRoom(r.view)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setRoom(r.view)}
                style={{
                  cursor: 'pointer',
                  outline: room === r.view ? '2px solid currentColor' : 'none',
                }}
                aria-pressed={room === r.view}
              >
                <img
                  className="room-thumb"
                  src={`/covers/exhibition/room-${r.view}.png`}
                  alt=""
                  loading="lazy"
                />
                <h3 className="layer-card__title">{r.title}</h3>
                <p className="layer-card__body">{r.desc}</p>
                <p className="layer-card__num" style={{ marginTop: '0.75rem' }}>
                  {room === r.view ? `▶ ${t.nowShowing}` : `${t.enterRoom} →`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Viewer */}
      <section ref={viewerRef} className="section-block" style={{ scrollMarginTop: '90px' }}>
        <div className="container">
          {room ? (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  marginBottom: '0.75rem',
                }}
              >
                <h2 className="section-title" style={{ margin: 0 }}>
                  {t.nowShowing}: {activeRoom?.title}
                </h2>
                <a
                  href={roomSrc(room)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  {t.openFull} ↗
                </a>
              </div>
              <div
                style={{
                  border: '1px solid rgba(128,128,128,0.35)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#0d1117',
                }}
              >
                <iframe
                  key={`${room}-${isDark ? 'd' : 'l'}`}
                  src={roomSrc(room)}
                  title={activeRoom?.title || 'Ghost Autonomy Exhibition'}
                  style={{
                    width: '100%',
                    height: 'clamp(420px, 82vh, 920px)',
                    border: '0',
                    display: 'block',
                  }}
                  loading="lazy"
                />
              </div>
            </>
          ) : (
            <p className="section-block__note" style={{ textAlign: 'center' }}>
              {lang === 'en'
                ? 'Select a room above to begin.'
                : 'برای شروع، یکی از تالارهای بالا را انتخاب کنید.'}
            </p>
          )}
        </div>
      </section>

      {/* ── Annex: the Memory Wing — standalone Memory Module instruments.
             Registered in src/data/artifacts.js; files live in
             public/docs/html/memory/. English-only, concept-stage research;
             standings discipline applies. ── */}
      <section className="annex" aria-label={lang === 'fa' ? 'بال حافظه' : 'The Memory Wing'}>
        <p className="annex__eyebrow">{lang === 'fa' ? 'ضمیمهٔ نمایشگاه' : 'Exhibition Annex'}</p>
        <h2 className="annex__title">{lang === 'fa' ? 'بال حافظه' : 'The Memory Wing'}</h2>
        <p className="annex__lead">
          {lang === 'fa'
            ? 'ابزارهای ماژول حافظه — بهای فراخوانی، میثاق بازیابی و بافت جست‌وجوی هم‌زیست — به‌صورت مستقل و در سطح مفهوم. فعلاً فقط انگلیسی؛ انضباط جایگاه ادعا این‌جا هم برقرار است.'
            : 'Standalone instruments from the Memory Module — the Price of Recall, the Retrieval Covenant, and the Symbiotic Search Fabric — concept-stage research, English-only for now. The standings discipline applies here as everywhere.'}
        </p>
        <div className="annex__grid">
          {[
            { slug: 'memory-integration-atlas', file: 'integration-atlas.html',
              en: ['Integration Atlas', 'The module’s ideas as one governed graph.'],
              fa: ['اطلس یکپارچگی', 'ایده‌های ماژول در قالب یک گراف حاکمیت‌دار.'] },
            { slug: 'memory-synergy-matrix', file: 'integration-matrix.html',
              en: ['Synergy Matrix', 'Every pair of ideas — mapped, or honestly marked unexamined.'],
              fa: ['ماتریس هم‌افزایی', 'هر جفت ایده — نگاشته، یا صادقانه «بررسی‌نشده».'] },
            { slug: 'memory-mechanism-spine', file: 'mechanism-spine.html',
              en: ['Shared Mechanism Spine', 'Fifteen laws the Memory Module keeps rewriting.'],
              fa: ['ستون سازوکارهای مشترک', 'پانزده قانونی که ماژول حافظه بازنویسی می‌کند.'] },
            { slug: 'symbiotic-search-fabric', file: 'symbiotic_search_fabric.html',
              en: ['Symbiotic Search Fabric', 'Retrieval as a governed, time-bounded fabric — not a lookup.'],
              fa: ['بافت جست‌وجوی هم‌زیست', 'بازیابی به‌مثابه بافتی حاکمیت‌دار و زمان‌کران‌دار — نه یک جست‌وجوی ساده.'] },
          ].map((a) => (
            <div key={a.slug} className="annex-card bp-frame">
              <span className="annex-card__t">{lang === 'fa' ? a.fa[0] : a.en[0]}</span>
              <span className="annex-card__d">{lang === 'fa' ? a.fa[1] : a.en[1]}</span>
              <span className="annex-card__links">
                <Link to={`/${lang}/artifacts/${a.slug}`}>{lang === 'fa' ? 'نمایش در گالری' : 'View in gallery'}</Link>
                <a href={`/docs/html/memory/${a.file}`} target="_blank" rel="noopener noreferrer">
                  {lang === 'fa' ? 'تمام‌صفحه ↗' : 'Open full ↗'}
                </a>
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
