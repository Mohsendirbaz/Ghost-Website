import { useLang } from '../context/LanguageContext';

/**
 * StandingsLegend — the evidentiary seam as a reusable component.
 * One encoding sitewide: measured = solid fill, proven = solid outline,
 * projected = dashed, proposed = hatched, gamble = dotted.
 * Pattern-coded (not hue-coded) so the encoding survives color blindness
 * and monochrome printing.
 */
const TERMS = [
  { key: 'measured', en: 'measured', fa: 'اندازه‌گیری‌شده' },
  { key: 'proven', en: 'proven', fa: 'اثبات‌شده' },
  { key: 'projected', en: 'projected', fa: 'برآوردی' },
  { key: 'proposed', en: 'proposed', fa: 'پیشنهادی' },
  { key: 'gamble', en: 'gamble', fa: 'ریسک‌پذیرفته' },
];

export default function StandingsLegend({ compact = false }) {
  const { lang } = useLang();
  const title = lang === 'fa' ? 'جایگاه ادعاها' : 'Evidentiary standings';
  const shown = compact ? TERMS.slice(0, 3) : TERMS;
  return (
    <aside className="bp-legend" aria-label={title}>
      <span className="bp-legend__title">{title}</span>
      {shown.map((t) => (
        <span key={t.key} className={`standing-chip standing-chip--${t.key}`}>
          {lang === 'fa' ? t.fa : t.en}
        </span>
      ))}
    </aside>
  );
}
