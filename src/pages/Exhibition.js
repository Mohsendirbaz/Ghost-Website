import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import SectionBlock from '../components/SectionBlock';
import './Page.css';

const VALID_VIEWS = ['multiplexer', 'stack', 'constitution', 'eventfabric'];

export default function Exhibition() {
  const { lang } = useLang();
  const t = copy[lang].exhibition;
  const [searchParams, setSearchParams] = useSearchParams();
  const viewerRef = useRef(null);

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
                  href={`/exhibition/?view=${room}`}
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
                  key={room}
                  src={`/exhibition/?view=${room}`}
                  title={activeRoom?.title || 'Ghost Autonomy Exhibition'}
                  style={{
                    width: '100%',
                    height: '82vh',
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
    </main>
  );
}
