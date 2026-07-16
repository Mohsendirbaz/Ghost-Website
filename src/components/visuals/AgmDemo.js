import { useMemo, useState } from 'react';
import { useLang } from '../../context/LanguageContext';

/**
 * AgmDemo — "the proven primitive, running in your browser."
 * The visitor picks a modulus k; the widget runs the real arithmetic–
 * geometric mean iteration a←(a+b)/2, b←√(ab) from a₀=1, b₀=√(1−k²)
 * and plots |aₙ−bₙ| on a log axis. Quadratic convergence to machine
 * precision in a handful of steps is visible, not asserted. The complete
 * elliptic integral follows as K(k) = π / (2·AGM(1, √(1−k²))).
 * Everything on screen is computed live — nothing is a recording.
 */

function iterate(k) {
  let a = 1;
  let b = Math.sqrt(1 - k * k);
  const rows = [{ n: 0, a, b, gap: Math.abs(a - b) }];
  for (let n = 1; n <= 9; n++) {
    const an = (a + b) / 2;
    const bn = Math.sqrt(a * b);
    a = an; b = bn;
    rows.push({ n, a, b, gap: Math.abs(a - b) });
    if (Math.abs(a - b) === 0) break;
  }
  return { rows, agm: (a + b) / 2 };
}

function matchedPrefix(a, b) {
  const sa = a.toFixed(15);
  const sb = b.toFixed(15);
  let i = 0;
  while (i < sa.length && sa[i] === sb[i]) i++;
  return [sa.slice(0, i), sa.slice(i), sb.slice(i)];
}

export default function AgmDemo() {
  const { lang } = useLang();
  const fa = lang === 'fa';
  const [k, setK] = useState(0.8);
  const { rows, agm } = useMemo(() => iterate(k), [k]);
  const K = Math.PI / (2 * agm);

  // log-plot geometry
  const W = 640; const H = 300; const PL = 56; const PB = 34; const PT = 14; const PR = 16;
  const floor = 1e-17;
  const x = (n) => PL + (n / 9) * (W - PL - PR);
  const y = (gap) => {
    const lg = Math.log10(Math.max(gap, floor));
    return PT + ((0 - lg) / 17) * (H - PT - PB); // 1e0 top → 1e-17 bottom
  };
  const pts = rows.map((r) => `${x(r.n)},${y(r.gap)}`).join(' ');

  const t = {
    title: fa ? 'همگرایی AGM — اثباتی که اجرا می‌شود' : 'AGM convergence — a proof that runs',
    modulus: fa ? 'مدول k' : 'modulus k',
    err: fa ? '|aₙ − bₙ| (لگاریتمی)' : '|aₙ − bₙ| (log scale)',
    iter: fa ? 'گام' : 'iteration',
    result: fa ? 'انتگرال بیضوی کامل' : 'complete elliptic integral',
    note: fa
      ? 'این ابزارک همان تکرار واقعی را در مرورگر شما اجرا می‌کند: همگرایی درجه‌دو تا دقت ماشین در چند گام — اولیهٔ اثبات‌شدهٔ چارچوب توابع خاص. هیچ‌چیز ضبط‌شده نیست.'
      : 'This widget runs the real iteration in your browser: quadratic convergence to machine precision in a handful of steps — the proven primitive of the special-function framework. Nothing is a recording.',
    standing: fa ? 'اثبات‌شده' : 'proven',
  };

  return (
    <div className="inst bp-frame bp-grid-bg" dir="ltr">
      <div className="inst__head" dir={fa ? 'rtl' : 'ltr'}>
        <h3 className="inst__title">{t.title}</h3>
        <span className="standing-chip standing-chip--proven">{t.standing}</span>
      </div>
      <div className="inst__controls" dir={fa ? 'rtl' : 'ltr'}>
        <label>
          {t.modulus} = {k.toFixed(2)}
          <input
            type="range" min="0.05" max="0.995" step="0.005" value={k}
            onChange={(e) => setK(Number(e.target.value))}
            aria-label={t.modulus}
          />
        </label>
        <span>
          {t.result}: K({k.toFixed(2)}) = {K.toPrecision(15)}
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t.err}>
        {/* axes */}
        <line x1={PL} y1={PT} x2={PL} y2={H - PB} stroke="var(--bp-line)" strokeWidth="1.5" />
        <line x1={PL} y1={H - PB} x2={W - PR} y2={H - PB} stroke="var(--bp-line)" strokeWidth="1.5" />
        {[0, -4, -8, -12, -16].map((e) => (
          <g key={e}>
            <line x1={PL} y1={y(Math.pow(10, e))} x2={W - PR} y2={y(Math.pow(10, e))} stroke="var(--bp-line-faint)" strokeWidth="1" />
            <text x={PL - 6} y={y(Math.pow(10, e)) + 3.5} textAnchor="end" fontFamily="var(--bp-mono)" fontSize="10" fill="var(--bp-ink-soft)">
              1e{e}
            </text>
          </g>
        ))}
        {rows.map((r) => (
          <text key={r.n} x={x(r.n)} y={H - PB + 16} textAnchor="middle" fontFamily="var(--bp-mono)" fontSize="10" fill="var(--bp-ink-soft)">
            {r.n}
          </text>
        ))}
        <text x={W - PR} y={H - 6} textAnchor="end" fontFamily="var(--bp-mono)" fontSize="10" fill="var(--bp-ink-soft)">
          {t.iter}
        </text>
        {/* machine-precision floor */}
        <line x1={PL} y1={y(2.2e-16)} x2={W - PR} y2={y(2.2e-16)} stroke="var(--bp-accent)" strokeWidth="1" strokeDasharray="5 4" />
        <text x={W - PR} y={y(2.2e-16) - 5} textAnchor="end" fontFamily="var(--bp-mono)" fontSize="9.5" fill="var(--bp-accent)">
          ε ≈ 2.2e-16
        </text>
        {/* the convergence curve */}
        <polyline points={pts} fill="none" stroke="var(--bp-accent)" strokeWidth="2.2" />
        {rows.map((r) => (
          <circle key={r.n} cx={x(r.n)} cy={y(r.gap)} r="3.4" fill="var(--bp-accent)" />
        ))}
      </svg>

      <div className="inst__readout" aria-label="a and b iterates">
        <table>
          <tbody>
            {rows.slice(0, 6).map((r) => {
              const [match, restA, restB] = matchedPrefix(r.a, r.b);
              return (
                <tr key={r.n}>
                  <td>n={r.n}</td>
                  <td>a = <span className="inst__match">{match}</span>{restA}</td>
                  <td>b = <span className="inst__match">{match}</span>{restB}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="inst__note" dir={fa ? 'rtl' : 'ltr'}>{t.note}</p>
    </div>
  );
}
