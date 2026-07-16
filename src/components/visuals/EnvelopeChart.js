import { useLang } from '../../context/LanguageContext';

/**
 * EnvelopeChart — the R² results drawn INSIDE their operating envelope,
 * with the region outside explicitly hatched "no claim". Values are the
 * manuscript's own (gasification case study, June 2026 revision):
 * envelope 600–900 °C × ER 0.2–0.5 (S/B 0–1.5 stated in caption),
 * R² ≈ 0.78–0.87 within the demonstrated envelope, reported as
 * preliminary. The non-claims are the chart's most prominent annotation.
 */

export default function EnvelopeChart() {
  const { lang } = useLang();
  const fa = lang === 'fa';

  // plot geometry: T 500–1000 °C (x), ER 0.1–0.6 (y)
  const W = 640; const H = 340; const PL = 60; const PB = 44; const PT = 16; const PR = 18;
  const x = (T) => PL + ((T - 500) / 500) * (W - PL - PR);
  const y = (er) => H - PB - ((er - 0.1) / 0.5) * (H - PT - PB);

  const t = {
    title: fa ? 'پاکت عملیاتی — و ناحیهٔ بدون ادعا' : 'The operating envelope — and the no-claim region',
    xlab: fa ? 'دما (°C)' : 'temperature (°C)',
    ylab: fa ? 'نسبت هم‌ارزی ER' : 'equivalence ratio ER',
    env: fa ? 'پاکت اثبات‌شده در مطالعهٔ موردی' : 'demonstrated envelope',
    r2: 'R² ≈ 0.78–0.87',
    r2sub: fa ? 'درون پاکت — مقدماتی' : 'within envelope — preliminary',
    noclaim: fa ? 'بدون ادعا' : 'no claim',
    standing: fa ? 'اندازه‌گیری‌شده (درون پاکت)' : 'measured (within envelope)',
    note: fa
      ? 'اعداد از بازنگری ژوئن ۲۰۲۶ دست‌نوشتهٔ علمی: مطالعهٔ موردی گازی‌سازی، ۶۰۰–۹۰۰ درجه، ER ۰.۲–۰.۵، S/B ۰–۱.۵. بیرون از پاکت هاشور خورده است — چیزی که اندازه‌گیری نشده، ادعا نمی‌شود.'
      : 'Figures from the June 2026 manuscript revision: gasification case study over 600–900 °C, ER 0.2–0.5, S/B 0–1.5. Outside the envelope is hatched — what was not measured is not claimed.',
  };

  return (
    <div className="inst bp-frame" dir="ltr">
      <div className="inst__head" dir={fa ? 'rtl' : 'ltr'}>
        <h3 className="inst__title">{t.title}</h3>
        <span className="standing-chip standing-chip--measured">{t.standing}</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t.title}>
        <defs>
          <pattern id="env-hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="var(--bp-line-faint)" strokeWidth="1.6" />
          </pattern>
        </defs>

        {/* the whole plane is no-claim by default */}
        <rect x={PL} y={PT} width={W - PL - PR} height={H - PT - PB} fill="url(#env-hatch)" />
        {/* the demonstrated envelope clears the hatch */}
        <rect x={x(600)} y={y(0.5)} width={x(900) - x(600)} height={y(0.2) - y(0.5)} fill="var(--bp-paper)" stroke="var(--bp-accent)" strokeWidth="2.2" />

        {/* axes */}
        <line x1={PL} y1={PT} x2={PL} y2={H - PB} stroke="var(--bp-line)" strokeWidth="1.5" />
        <line x1={PL} y1={H - PB} x2={W - PR} y2={H - PB} stroke="var(--bp-line)" strokeWidth="1.5" />
        {[500, 600, 700, 800, 900, 1000].map((T) => (
          <g key={T}>
            <line x1={x(T)} y1={H - PB} x2={x(T)} y2={H - PB + 5} stroke="var(--bp-line)" strokeWidth="1.2" />
            <text x={x(T)} y={H - PB + 18} textAnchor="middle" fontFamily="var(--bp-mono)" fontSize="10" fill="var(--bp-ink-soft)">{T}</text>
          </g>
        ))}
        {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6].map((er) => (
          <g key={er}>
            <line x1={PL - 5} y1={y(er)} x2={PL} y2={y(er)} stroke="var(--bp-line)" strokeWidth="1.2" />
            <text x={PL - 9} y={y(er) + 3.5} textAnchor="end" fontFamily="var(--bp-mono)" fontSize="10" fill="var(--bp-ink-soft)">{er.toFixed(1)}</text>
          </g>
        ))}
        <text x={(PL + W - PR) / 2} y={H - 8} textAnchor="middle" fontFamily="var(--bp-mono)" fontSize="11" fill="var(--bp-ink-soft)">{t.xlab}</text>
        <text x={16} y={(PT + H - PB) / 2} textAnchor="middle" fontFamily="var(--bp-mono)" fontSize="11" fill="var(--bp-ink-soft)" transform={`rotate(-90 16 ${(PT + H - PB) / 2})`}>{t.ylab}</text>

        {/* annotations */}
        <text x={x(750)} y={y(0.38)} textAnchor="middle" fontFamily="var(--bp-mono)" fontSize="17" fill="var(--bp-ink)">{t.r2}</text>
        <text x={x(750)} y={y(0.33)} textAnchor="middle" fontFamily="var(--bp-mono)" fontSize="10.5" fill="var(--bp-ink-soft)">{t.r2sub}</text>
        <text x={x(750)} y={y(0.47)} textAnchor="middle" fontFamily="var(--bp-mono)" fontSize="10.5" fill="var(--bp-accent)">{t.env} · 600–900 °C × ER 0.2–0.5</text>
        <text x={x(950)} y={y(0.55)} textAnchor="middle" fontFamily="var(--bp-mono)" fontSize="11" fill="var(--bp-ink-soft)">{t.noclaim}</text>
        <text x={x(545)} y={y(0.15)} textAnchor="middle" fontFamily="var(--bp-mono)" fontSize="11" fill="var(--bp-ink-soft)">{t.noclaim}</text>
      </svg>

      <p className="inst__note" dir={fa ? 'rtl' : 'ltr'}>{t.note}</p>
    </div>
  );
}
