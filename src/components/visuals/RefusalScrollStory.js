import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../context/LanguageContext';
import { copy } from '../../data/copy';
import StandingsLegend from '../StandingsLegend';

/**
 * RefusalScrollStory — the S0→S4 chain as one accumulating diagram.
 * Left column: a sticky vertical funnel (direction-neutral, RTL-safe).
 * Right column: the existing stage copy as scroll steps — the prose is
 * demoted to captioning, not deleted; every string comes from copy.js.
 * After S4 the diagram changes medium: the software lanes end and one
 * hardwired line reaches the actuator, carrying the corpus's only
 * measured latency (~32 ns), rendered solid per the standings grammar.
 * The six acceptance criteria (G1–G6) then fill a conformance ring.
 */

const STAGE_Y = [64, 148, 232, 316, 400]; // stage band centers in the 520-tall SVG
const HALF = [150, 118, 90, 64, 42]; // funnel half-width entering each stage

export default function RefusalScrollStory() {
  const { lang } = useLang();
  const t = copy[lang].safety;
  const stages = t.refusalStages || [];
  const criteria = t.refusalCriteria || [];
  const [active, setActive] = useState(0);
  const [ringCount, setRingCount] = useState(0);
  const stageRefs = useRef([]);
  const critRefs = useRef([]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setActive(stages.length - 1);
      setRingCount(criteria.length);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number(e.target.dataset.idx);
          if (e.isIntersecting) {
            if (e.target.dataset.kind === 'stage') {
              setActive((a) => Math.max(a, idx));
            } else {
              setRingCount((c) => Math.max(c, idx + 1));
            }
          }
        });
      },
      { rootMargin: '-35% 0px -45% 0px' }
    );
    stageRefs.current.forEach((el) => el && io.observe(el));
    critRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [stages.length, criteria.length]);

  const fa = lang === 'fa';
  const L = {
    evidence: fa ? 'شواهد' : 'evidence',
    actuator: fa ? 'عملگر' : 'actuator',
    hardwired: fa ? 'مدار سخت‌سیم — نه نرم‌افزار' : 'hardwired — not software',
    veto: fa ? '~۳۲ ns — اندازه‌گیری‌شده' : '~32 ns — measured',
    ringTitle: t.refusalCriteriaTitle,
    ringOf: (k, n) => (fa ? `${k} از ${n}` : `${k} / ${n}`),
    ariaFunnel: fa
      ? 'قیف امتناع: پنج مرحله که مجموعهٔ فرمان مجاز را تنگ می‌کنند و به یک وتوی آنالوگ سخت‌سیم ختم می‌شوند'
      : 'The refusal funnel: five stages narrowing the admissible command set, ending in one hardwired analog veto',
  };

  // conformance ring geometry
  const R = 74;
  const C = 2 * Math.PI * R;
  const SEG = C / 6;
  const GAP = 7;

  return (
    <section className="rss-wrap" aria-label={t.refusalStagesTitle}>
      <div className="rss">
        {/* ── sticky accumulating funnel ── */}
        <div className="rss__visual">
          <svg viewBox="0 0 360 560" role="img" aria-label={L.ariaFunnel} className="bp-anim">
            <defs>
              <pattern id="rss-hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="7" stroke="var(--bp-line-faint)" strokeWidth="1.4" />
              </pattern>
            </defs>

            {/* inadmissible region hatch, revealed stage by stage */}
            {stages.map((s, k) => {
              const shown = k <= active;
              const y0 = k === 0 ? 26 : STAGE_Y[k - 1];
              const y1 = STAGE_Y[k];
              const wTop = k === 0 ? HALF[0] : HALF[k - 1];
              const wBot = HALF[k];
              return (
                <g key={s.num} style={{ opacity: shown ? 1 : 0.13, transition: 'opacity .35s ease' }}>
                  <polygon
                    points={`10,${y0} ${180 - wTop},${y0} ${180 - wBot},${y1} 10,${y1}`}
                    fill="url(#rss-hatch)" stroke="none"
                  />
                  <polygon
                    points={`350,${y0} ${180 + wTop},${y0} ${180 + wBot},${y1} 350,${y1}`}
                    fill="url(#rss-hatch)" stroke="none"
                  />
                  {/* funnel walls */}
                  <line x1={180 - wTop} y1={y0} x2={180 - wBot} y2={y1} stroke="var(--bp-line)" strokeWidth="1.6" />
                  <line x1={180 + wTop} y1={y0} x2={180 + wBot} y2={y1} stroke="var(--bp-line)" strokeWidth="1.6" />
                  {/* gate bar */}
                  <line
                    x1={180 - wBot - 22} y1={y1} x2={180 + wBot + 22} y2={y1}
                    stroke={k === active ? 'var(--bp-accent)' : 'var(--bp-ink-soft)'}
                    strokeWidth={k === active ? 3 : 2}
                  />
                  <text x={180 - wBot - 30} y={y1 + 4} textAnchor="end"
                    fontFamily="var(--bp-mono)" fontSize="12"
                    fill={k === active ? 'var(--bp-accent)' : 'var(--bp-ink-soft)'}>
                    {s.num}
                  </text>
                </g>
              );
            })}

            {/* evidence in */}
            <text x="180" y="14" textAnchor="middle" fontFamily="var(--bp-mono)" fontSize="11" fill="var(--bp-ink-soft)">
              {L.evidence} ▾
            </text>

            {/* medium change after S4: one hardwired line to the actuator */}
            <g style={{ opacity: active >= stages.length - 1 ? 1 : 0.13, transition: 'opacity .35s ease' }}>
              <line x1="180" y1={STAGE_Y[4]} x2="180" y2="482" stroke="var(--bp-accent)" strokeWidth="3.4" />
              <line x1="168" y1="452" x2="192" y2="452" stroke="var(--bp-accent)" strokeWidth="1.4" />
              <line x1="171" y1="458" x2="189" y2="458" stroke="var(--bp-accent)" strokeWidth="1.4" />
              {/* isolation gap glyph */}
              <circle cx="180" cy="440" r="7" fill="none" stroke="var(--bp-accent)" strokeWidth="1.6" />
              <text x="196" y="444" fontFamily="var(--bp-mono)" fontSize="10.5" fill="var(--bp-ink-soft)">
                {L.hardwired}
              </text>
              {/* measured chip — solid fill per standings grammar */}
              <rect x="126" y="492" width="108" height="22" rx="3" fill="var(--bp-accent)" />
              <text x="180" y="507" textAnchor="middle" fontFamily="var(--bp-mono)" fontSize="10.5" fill="var(--bp-paper)">
                {L.veto}
              </text>
              <polygon points="180,530 171,518 189,518" fill="var(--bp-ink)" />
              <text x="180" y="550" textAnchor="middle" fontFamily="var(--bp-mono)" fontSize="11" fill="var(--bp-ink-soft)">
                {L.actuator}
              </text>
            </g>
          </svg>
        </div>

        {/* ── steps: existing copy, demoted to captions ── */}
        <div className="rss__steps">
          {stages.map((s, k) => (
            <div
              key={s.num}
              className={`rss-step${k <= active ? ' is-active' : ''}`}
              data-idx={k}
              data-kind="stage"
              ref={(el) => { stageRefs.current[k] = el; }}
            >
              <p className="rss-step__num">{s.num}</p>
              <h3 className="rss-step__title">{s.title}</h3>
              <p className="rss-step__body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── G1–G6 conformance ring ── */}
      <div className="rss rss--ring" aria-label={L.ringTitle}>
        <div className="rss__visual">
          <svg viewBox="0 0 220 220" role="img" aria-label={`${L.ringTitle} — ${L.ringOf(ringCount, criteria.length)}`}>
            {criteria.map((c, i) => {
              const filled = i < ringCount;
              return (
                <circle
                  key={i}
                  cx="110" cy="110" r={R}
                  fill="none"
                  stroke={filled ? 'var(--bp-accent)' : 'var(--bp-line-faint)'}
                  strokeWidth={filled ? 15 : 8}
                  strokeDasharray={`${SEG - GAP} ${C - SEG + GAP}`}
                  strokeDashoffset={-(i * SEG)}
                  style={{ transition: 'stroke .3s ease, stroke-width .3s ease' }}
                  transform="rotate(-90 110 110)"
                />
              );
            })}
            <text x="110" y="104" textAnchor="middle" fontFamily="var(--bp-mono)" fontSize="22" fill="var(--bp-ink)">
              {L.ringOf(ringCount, criteria.length)}
            </text>
            <text x="110" y="126" textAnchor="middle" fontFamily="var(--bp-mono)" fontSize="10" fill="var(--bp-ink-soft)">
              G1–G6
            </text>
          </svg>
        </div>
        <div className="rss__steps">
          {criteria.map((c, i) => {
            const dash = c.indexOf('—') > -1 ? c.indexOf('—') : c.indexOf(':');
            const head = dash > -1 ? c.slice(0, dash).trim() : `G${i + 1}`;
            const body = dash > -1 ? c.slice(dash + 1).trim() : c;
            return (
              <div
                key={i}
                className={`rss-step${i < ringCount ? ' is-active' : ''}`}
                data-idx={i}
                data-kind="crit"
                ref={(el) => { critRefs.current[i] = el; }}
              >
                <p className="rss-step__num">{head}</p>
                <p className="rss-step__body">{body}</p>
              </div>
            );
          })}
          {t.refusalStandingsNote && (
            <p className="bp-figcaption"><span>{t.refusalStandingsNote}</span></p>
          )}
          <StandingsLegend />
        </div>
      </div>
    </section>
  );
}
