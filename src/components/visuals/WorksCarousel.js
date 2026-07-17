import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { MAJOR_WORKS } from '../../data/majorWorks';

/**
 * The front-hall carousel — the Major Works, simultaneously available and open.
 * ALL slides are the real HTML documents, live from page load — nothing is
 * reduced to an image (author's doctrine, 2026-07-17). Every instrument slide
 * mounts its actual iframe once and keeps it mounted: sliding anywhere lands
 * on a running instrument that never lost its state. `loading="lazy"` lets
 * the browser stagger the initial fetches, and browsers natively throttle
 * offscreen iframes' animation frames, so the rail stays tractable without
 * substituting content. The capture images serve one purpose only: a
 * split-second boot poster behind each frame before its document paints
 * (and the Final Plate slide, which genuinely is a poster).
 * One click ("Enter") lands inside the wing with the same instrument open.
 */

export default function WorksCarousel() {
  const { lang } = useLang();
  const { isDark } = useTheme();
  const fa = lang === 'fa';
  const railRef = useRef(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback((i) => {
    const clamped = Math.max(0, Math.min(MAJOR_WORKS.length - 1, i));
    const el = railRef.current?.children[clamped];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        });
      },
      { root: rail, threshold: 0.6 }
    );
    Array.from(rail.children).forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  // Visual left/right arrows map to index steps; in RTL the rail flows the other way.
  const step = fa ? -1 : 1;
  // All embedded instruments read ?theme= (2026-07-17); works with ?view= use &.
  const src = (w) => w.live + (w.live.includes('?') ? '&' : '?') + `theme=${isDark ? 'dark' : 'light'}`;

  return (
    <section className="works" aria-label={fa ? 'کارهای اصلی' : 'The Major Works'}>
      <div className="works__head">
        <h2 className="works__title">
          {fa ? 'کارهای اصلی — همه در دسترس، همه زنده' : 'The Major Works — all open, all running'}
        </h2>
        <p className="works__count" aria-live="polite">
          {String(active + 1).padStart(2, '0')} / {String(MAJOR_WORKS.length).padStart(2, '0')}
        </p>
      </div>

      <div className="works__frame">
        <button
          type="button"
          className="works__arrow works__arrow--prev"
          aria-label={fa ? 'اسلاید قبلی' : 'Previous work'}
          onClick={() => goTo(active - step)}
        >
          ‹
        </button>
        <div
          className="works__rail"
          ref={railRef}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + step); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(active - step); }
          }}
        >
          {MAJOR_WORKS.map((w, i) => {
            const label = fa ? w.fa : w.en;
            return (
              <article className="works__slide" data-index={i} key={w.key} aria-label={label.t}>
                <div className="works__bar">
                  <span className="works__kicker">{label.k}</span>
                  <span className="works__name">{label.t}</span>
                  <span className="works__acts">
                    <Link to={`/${lang}${w.enter}`} className="works__act">
                      {fa ? 'ورود' : 'Enter'} ↗
                    </Link>
                  </span>
                </div>
                <div
                  className="works__stage"
                  style={{ backgroundImage: w.img ? 'none' : `url(${w.capture})` }}
                >
                  {w.img ? (
                    <img src={w.img} alt={label.t} className="works__poster--contain" />
                  ) : (
                    <iframe key={isDark ? 'd' : 'l'} src={src(w)} title={label.t} className="works__live" loading="lazy" />
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <button
          type="button"
          className="works__arrow works__arrow--next"
          aria-label={fa ? 'اسلاید بعدی' : 'Next work'}
          onClick={() => goTo(active + step)}
        >
          ›
        </button>
      </div>

      <div className="works__index" role="tablist" aria-label={fa ? 'فهرست کارها' : 'Works index'}>
        {MAJOR_WORKS.map((w, i) => (
          <button
            key={w.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`works__dot${i === active ? ' is-on' : ''}`}
            onClick={() => goTo(i)}
          >
            {(fa ? w.fa : w.en).t}
          </button>
        ))}
      </div>
    </section>
  );
}
