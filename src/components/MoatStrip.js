import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

/**
 * MoatStrip — the program's original ideas, each linked to its living proof.
 * The moat framing stays claim-disciplined: every card carries an honest
 * status tag (measured / proven / published design / thesis / method) and
 * points at the instrument or page that demonstrates it, not at prose alone.
 */

const MOATS = [
  {
    key: 'veto',
    tag: { cls: 'measured', en: 'measured', fa: 'اندازه‌گیری‌شده' },
    to: (l) => `/${l}/safety`,
    en: { name: 'The analog veto', line: 'A hardwired, electrically isolated guard that reaches the actuator first — ~32 ns, the corpus’s only measured latency.' },
    fa: { name: 'وتوی آنالوگ', line: 'نگهبانی سخت‌سیم و ایزوله که پیش از همه به عملگر می‌رسد — ‏~۳۲ ns، تنها تأخیر اندازه‌گیری‌شدهٔ پیکره.' },
  },
  {
    key: 'narrowing',
    tag: { cls: 'proven', en: 'proven', fa: 'اثبات‌شده' },
    to: (l) => `/${l}/exhibition?view=stack`,
    en: { name: 'The narrowing law', line: 'The admissible-command set only contracts as risk rises — two control invariants proven on paper, refusing live in the exhibition.' },
    fa: { name: 'قانون تنگ‌شدگی', line: 'مجموعهٔ فرمان مجاز با بالارفتن ریسک فقط منقبض می‌شود — دو ناوردای اثبات‌شده روی کاغذ، و امتناعِ زنده در نمایشگاه.' },
  },
  {
    key: 'gearbox',
    tag: { cls: '', en: 'published design', fa: 'طرح منتشرشده' },
    to: (l) => `/${l}/architecture`,
    en: { name: 'The epistemic gearbox', line: 'Formulation itself as the controlled degree of freedom: five stances, 325 admissible routes, selection with hysteresis — playable on the Architecture page.' },
    fa: { name: 'گیربکس معرفتی', line: 'خودِ صورت‌بندی به‌مثابه درجهٔ آزادی تحت کنترل: پنج موضع، ۳۲۵ مسیر مجاز، انتخاب با هیسترزیس — قابل‌بازی در صفحهٔ معماری.' },
  },
  {
    key: 'memory',
    tag: { cls: '', en: 'design · thesis', fa: 'طرح · تز' },
    to: (l) => `/${l}/artifacts/memory-mechanism-spine`,
    en: { name: 'Metabolic memory & the price of recall', line: 'Memory that pays for its persistence: verification burden grows with residence time. The Memory Wing instruments this thesis line.' },
    fa: { name: 'حافظهٔ متابولیک و بهای فراخوانی', line: 'حافظه‌ای که بهای ماندگاری‌اش را می‌پردازد: بار راستی‌آزمایی با زمانِ اقامت رشد می‌کند. «بال حافظه» همین خط تز را ابزارمند می‌کند.' },
  },
  {
    key: 'constitution',
    tag: { cls: '', en: 'published design', fa: 'طرح منتشرشده' },
    to: (l) => `/${l}/exhibition?view=constitution`,
    en: { name: 'The constitution of truth', line: 'A ground truth that can be challenged and corrected — separation of epistemic powers, nothing silent — governing live in the exhibition.' },
    fa: { name: 'قانون اساسی حقیقت', line: 'حقیقتِ بنیادینی که می‌توان به چالش کشید و اصلاح کرد — تفکیک قوای معرفتی، هیچ‌چیز خاموش — با حاکمیتِ زنده در نمایشگاه.' },
  },
  {
    key: 'standings',
    tag: { cls: '', en: 'method', fa: 'روش' },
    to: (l) => `/${l}/methods`,
    en: { name: 'Standings discipline', line: 'Measured, proven, projected, proposed — distinguishable on sight, on every figure this site shows. The honesty is the product.' },
    fa: { name: 'انضباط جایگاه ادعا', line: 'اندازه‌گیری‌شده، اثبات‌شده، برآوردی، پیشنهادی — با یک نگاه قابل‌تشخیص، روی هر شکل این وب‌گاه. صداقت همان محصول است.' },
  },
];

export default function MoatStrip() {
  const { lang } = useLang();
  const fa = lang === 'fa';
  const arrow = fa ? '←' : '→';
  return (
    <section className="moats" aria-label={fa ? 'خندق‌های برنامه' : 'The moats'}>
      <p className="moats__eyebrow">{fa ? 'خندق‌ها' : 'The Moats'}</p>
      <h2 className="moats__title">
        {fa ? 'آنچه این‌جا اصیل است — هر یک با گواهِ زنده‌اش' : 'What is original here — each with its living proof'}
      </h2>
      <div className="moats__grid">
        {MOATS.map((m) => (
          <Link key={m.key} className="moat-card bp-frame" to={m.to(lang)}>
            <span className={`standing-chip${m.tag.cls ? ` standing-chip--${m.tag.cls}` : ''}`}>
              {fa ? m.tag.fa : m.tag.en}
            </span>
            <span className="moat-card__name">{fa ? m.fa.name : m.en.name}</span>
            <span className="moat-card__line">{fa ? m.fa.line : m.en.line}</span>
            <span className="moat-card__go" aria-hidden="true">{arrow}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
