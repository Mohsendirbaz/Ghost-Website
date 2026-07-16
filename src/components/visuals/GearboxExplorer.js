import { useMemo, useRef, useState } from 'react';
import { useLang } from '../../context/LanguageContext';

/**
 * GearboxExplorer — the 325-route selector, playable.
 * The five epistemic stances (named in the published architecture copy:
 * Platonic, Formalist, Structuralist, Instrumentalist, Empiricist) are
 * engaged in an order — a "gear". Ordered non-empty selections over five
 * stances: 5 + 20 + 60 + 120 + 120 = 325 admissible routes, the corpus's
 * own count. Selection commits with hysteresis (the widget resists rapid
 * re-ordering), mirroring the documented behaviour. The explorer computes
 * the real combinatorics — it proposes; it never disposes.
 */

const STANCES = [
  { k: 'P', en: 'Platonic', fa: 'افلاطونی' },
  { k: 'F', en: 'Formalist', fa: 'صورت‌گرا' },
  { k: 'S', en: 'Structuralist', fa: 'ساختارگرا' },
  { k: 'I', en: 'Instrumentalist', fa: 'ابزارگرا' },
  { k: 'E', en: 'Empiricist', fa: 'تجربه‌گرا' },
];

/* Enumerate all 325 ordered non-empty selections, lexicographic. */
function buildRoutes() {
  const routes = [];
  const keys = STANCES.map((s) => s.k);
  const rec = (prefix, remaining) => {
    remaining.forEach((k, i) => {
      const next = [...prefix, k];
      routes.push(next.join(''));
      rec(next, remaining.filter((_, j) => j !== i));
    });
  };
  rec([], keys);
  return routes;
}
const ROUTES = buildRoutes(); // length 325 by construction

export default function GearboxExplorer() {
  const { lang } = useLang();
  const fa = lang === 'fa';
  const [gear, setGear] = useState(['S', 'F']);
  const [settling, setSettling] = useState(false);
  const settleT = useRef(null);

  const name = (k) => {
    const s = STANCES.find((x) => x.k === k);
    return fa ? s.fa : s.en;
  };

  const commit = (next) => {
    setGear(next);
    setSettling(true);
    clearTimeout(settleT.current);
    settleT.current = setTimeout(() => setSettling(false), 650);
  };

  const engage = (k) => !settling && commit([...gear, k]);
  const release = (i) => !settling && commit(gear.filter((_, j) => j !== i));
  const move = (i, d) => {
    if (settling) return;
    const j = i + d;
    if (j < 0 || j >= gear.length) return;
    const next = [...gear];
    [next[i], next[j]] = [next[j], next[i]];
    commit(next);
  };

  const routeIndex = useMemo(
    () => (gear.length ? ROUTES.indexOf(gear.join('')) + 1 : 0),
    [gear]
  );

  const pool = STANCES.filter((s) => !gear.includes(s.k));

  const t = {
    pool: fa ? 'مواضع معرفتی (آزاد)' : 'Epistemic stances (available)',
    train: fa ? 'دندهٔ درگیر — ترتیب یعنی اولویت' : 'Engaged gear — order is authority',
    empty: fa ? 'برای ساخت دنده، یک موضع را درگیر کنید.' : 'Engage a stance to form a gear.',
    route: fa ? 'مسیر' : 'Route',
    of: fa ? 'از ۳۲۵ مسیر مجاز' : 'of 325 admissible routes',
    math: fa ? '۵ + ۲۰ + ۶۰ + ۱۲۰ + ۱۲۰ = ۳۲۵' : '5 + 20 + 60 + 120 + 120 = 325',
    settling: fa ? 'در حال نشست (هیسترزیس) — انتخاب با تأخیر تثبیت می‌شود تا سیستم در مرزهای مبهم نلرزد.' : 'Settling (hysteresis) — selection commits with a delay so the system does not chatter at fuzzy boundaries.',
    up: fa ? 'بالا' : 'up',
    down: fa ? 'پایین' : 'down',
    remove: fa ? 'حذف' : 'remove',
    disposes: fa
      ? 'گیربکس پیشنهاد می‌دهد؛ هرگز حکم نمی‌کند — خروجی آن به همان زنجیرهٔ ایمنی می‌رود و هرگز مجموعهٔ مجاز را بزرگ نمی‌کند.'
      : 'The gearbox proposes; it never disposes — its output feeds the same safety chain and can never enlarge the admissible set.',
  };

  const reading = gear.length
    ? (fa
        ? `اولویت این لحظه: ${gear.map((k, i) => `${i + 1}) ${name(k)}`).join('، ')}؛ مواضع درگیرنشده در این لحظه مشورت نمی‌شوند.`
        : `Authority order for this instant: ${gear.map((k, i) => `${i + 1}) ${name(k)}`).join(', ')}; stances not engaged are not consulted.`)
    : t.empty;

  return (
    <div className={`gbx bp-frame bp-grid-bg${settling ? ' is-settling' : ''}`}>
      <div className="gbx__zones">
        <div>
          <p className="gbx__zone-title">{t.pool}</p>
          <div className="gbx__pool">
            {pool.map((s) => (
              <button
                key={s.k}
                type="button"
                className="gbx-chip"
                onClick={() => engage(s.k)}
                disabled={settling}
              >
                <span className="gbx-chip__k">{s.k}</span> {fa ? s.fa : s.en}
              </button>
            ))}
            {!pool.length && <span className="gbx__zone-title">—</span>}
          </div>
        </div>
        <div>
          <p className="gbx__zone-title">{t.train}</p>
          <div className="gbx__train" aria-live="polite">
            {gear.map((k, i) => (
              <span key={k} className="gbx-gear">
                <span className="gbx-gear__ord">{i + 1}</span>
                <span className="gbx-gear__name">{name(k)}</span>
                <span className="gbx-gear__btns">
                  <button type="button" onClick={() => move(i, -1)} disabled={settling || i === 0} aria-label={`${name(k)} ${t.up}`}>↑</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={settling || i === gear.length - 1} aria-label={`${name(k)} ${t.down}`}>↓</button>
                  <button type="button" onClick={() => release(i)} disabled={settling} aria-label={`${name(k)} ${t.remove}`}>✕</button>
                </span>
              </span>
            ))}
            {!gear.length && <span className="gbx__zone-title">{t.empty}</span>}
          </div>
        </div>
      </div>

      <div className="gbx__meta">
        <span className="gbx__route">
          {gear.length ? `${t.route} #${routeIndex} ${t.of}` : `— ${t.of}`}
        </span>
        <span>{t.math}</span>
      </div>
      <div className="gbx__settle" aria-hidden="true"><div className="gbx__settle-bar" /></div>
      {settling && <p className="gbx__reading" role="status">{t.settling}</p>}
      <p className="gbx__reading">{reading}</p>
      <p className="bp-figcaption"><span>{t.disposes}</span></p>
    </div>
  );
}
