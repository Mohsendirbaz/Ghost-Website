import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { copy } from '../data/copy';
import { HeroSecondary } from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import SectionBlock from '../components/SectionBlock';
import SectionBlockSticky from '../components/SectionBlockSticky';
import CTABand from '../components/CTABand';
import Figure from '../components/Figure';
import StandingsLegend from '../components/StandingsLegend';
import AgmDemo from '../components/visuals/AgmDemo';
import EnvelopeChart from '../components/visuals/EnvelopeChart';
import './Page.css';

/* Corpus-true figures with explicit standings — replacing the former
   unlabeled marketing multipliers (100×/10×/1000+/99.99%). Values below
   already appear on Home/Safety surfaces and in the published corpus. */
const FIGURES = [
  { v: '~32 ns', chip: 'measured', l: { en: 'analog-veto latency — the corpus’s only measured hardware timing', fa: 'تأخیر وتوی آنالوگ — تنها زمان‌سنجی اندازه‌گیری‌شدهٔ سخت‌افزار در پیکره' } },
  { v: '2', chip: 'proven', l: { en: 'control invariants proven on paper — pose-and-select · monotone funnel', fa: 'دو ناوردای کنترلی اثبات‌شده روی کاغذ — گزینش-و-وضعیت · قیف یکنوا' } },
  { v: '5', chip: null, l: { en: 'refusal stages S0–S4 ahead of a single actuation gate', fa: 'پنج مرحلهٔ امتناع S0–S4 پیش از یک دروازهٔ کنش' } },
  { v: '325', chip: null, l: { en: 'admissible gearbox routes over five epistemic stances', fa: '۳۲۵ مسیر مجاز گیربکس روی پنج موضع معرفتی' } },
];

/**
 * Technology — the program's hub (overhauled 2026-07-17). This page carries
 * the major aspects of the technology at a normal reading depth and hands off
 * to the tab that hosts each one in full. The former standalone Science tab was
 * merged in here (its intellectual foundation and running proofs), so the whole
 * "what Ghost is building, and why it is sound" story lives on one page.
 * /science now redirects here.
 */

export default function Technology() {
  const { lang } = useLang();
  const { isDark } = useTheme();
  const fa = lang === 'fa';
  const t = copy[lang].technology;
  const sci = copy[lang].science;
  const vdSrc = `/docs/html/simulation/vehicle-dynamics.html?theme=${isDark ? 'dark' : 'light'}`;

  // Major aspects — each hosted in full on another tab (the hub referral)
  const HUB = [
    { to: `/${lang}/safety`, en: ['Safety', 'The refusal stack: five stages S0–S4 ahead of one actuation gate, and the ~32 ns analog veto.'], fa: ['ایمنی', 'پشتهٔ امتناع: پنج مرحلهٔ S0–S4 پیش از یک دروازهٔ کنش، و وتوی آنالوگ ~۳۲ نانوثانیه.'] },
    { to: `/${lang}/architecture`, en: ['Architecture', 'The Epistemic Gearbox — 325 admissible routes over five epistemic stances, module identities withheld.'], fa: ['معماری', 'گیربکس معرفتی — ۳۲۵ مسیر مجاز روی پنج موضع معرفتی؛ هویت ماژول‌ها پوشیده.'] },
    { to: `/${lang}/simulation`, en: ['Simulation', 'The planning-stack instruments, integrating live in your browser.'], fa: ['شبیه‌سازی', 'ابزارهای سطح برنامه‌ریزی، زنده در مرورگر شما.'] },
    { to: `/${lang}/multi-agent-system`, en: ['Multi-Agent System', 'The event-sourced research laboratory that produced the corpus.'], fa: ['سیستم چند-عامله', 'آزمایشگاه پژوهشی رویدادمحور که پیکره را تولید کرد.'] },
    { to: `/${lang}/memory`, en: ['Memory Wing', 'The Memory Module — recall under covenant, retrieval that pays its own price.'], fa: ['بال حافظه', 'ماژول حافظه — فراخوانی تحت میثاق، بازیابی‌ای که بهای خود را می‌پردازد.'] },
    { to: `/${lang}/knowledge-base`, en: ['Knowledge Base', 'The full corpus — 8 parts, 43 chapters, navigable.'], fa: ['پایگاه دانش', 'پیکرهٔ کامل — ۸ بخش، ۴۳ فصل، قابل پیمایش.'] },
    { to: `/${lang}/library/assets`, en: ['Technical Library', 'Papers and primary sources, each with its scope and limits.'], fa: ['کتابخانهٔ فنی', 'مقالات و منابع اولیه، هر یک با دامنه و حدود خود.'] },
    { to: `/${lang}/methods`, en: ['Research Methods', 'The meta-method and the external prior-art audit — including where it calls our framings decorative.'], fa: ['روش‌شناسی پژوهش', 'فرامتد و ممیزی بیرونی پیشینه — از جمله آن‌جا که چارچوب‌های ما را تزئینی می‌خواند.'] },
  ];

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: copy[lang].breadcrumb.technology },
      ]} />
      <HeroSecondary
        eyebrow={lang === 'en' ? 'Technology' : 'فناوری'}
        h1={t.heroH1}
        subhead={t.heroSub}
      />

      {/* The technology, running — planning-level dynamics live from the Bench */}
      <section className="section-block" style={{ paddingTop: '1.5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <h2 className="section-title" style={{ margin: 0 }}>
              {fa ? 'فناوری، در حال اجرا' : 'The Technology, Running'}
            </h2>
            <span style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <Link className="btn" to={`/${lang}/simulation?view=vehicle`} style={{ textDecoration: 'none' }}>
                {fa ? 'ورود به میز شبیه‌سازی' : 'Enter the Simulation Bench'} ↗
              </Link>
              <a href={vdSrc} target="_blank" rel="noopener noreferrer" className="btn">
                {fa ? 'تمام‌صفحه ↗' : 'Open full ↗'}
              </a>
            </span>
          </div>
          <p className="section-block__body">
            {fa
              ? 'دوچرخهٔ سینماتیکی سطح برنامه‌ریزی با ورودی‌های تکانه و نرخ فرمان — همین حالا در مرورگر شما انتگرال‌گیری می‌شود. مانور را عوض کنید، قیدها را جابه‌جا کنید، روی زمان پیمایش کنید.'
              : 'The planning-level kinematic bicycle with jerk and steering-rate inputs — integrating in your browser right now. Change the maneuver, move the bounds, scrub the timeline.'}
          </p>
          <div className="bp-frame" style={{ overflow: 'hidden' }}>
            <iframe
              key={isDark ? 'd' : 'l'}
              src={vdSrc}
              title={fa ? 'دینامیک خودرو' : 'Vehicle Dynamics'}
              style={{ width: '100%', height: 'clamp(440px, 72vh, 860px)', border: 0, display: 'block' }}
            />
          </div>
        </div>
      </section>

      <SectionBlock
        eyebrow={t.challengeEyebrow}
        title={t.challengeTitle}
        body={t.challengeBody}
        gray
      />

      {/* Our approach — physics at the hardware level, with the EPU poster */}
      <SectionBlockSticky
        eyebrow={t.approachEyebrow}
        title={t.approachTitle}
        body={t.approachBody}
        visualPosition="right"
      >
        <Link to={`/${lang}/epu`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <figure className="bp-frame" style={{ margin: 0, padding: 'clamp(0.5rem, 1.2vw, 0.9rem)', overflow: 'hidden' }}>
            <img
              src="/posters/epu-poster.web.jpg"
              alt={fa ? 'پوستر EPU — فیزیک در بستر سخت‌افزار اعمال می‌شود' : 'EPU poster — physics enforced at the hardware substrate'}
              loading="lazy"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </figure>
          <p className="bp-figcaption" style={{ marginTop: '0.6rem' }}>
            {fa ? 'پوستر مفهومی EPU · پیشنهادی — برگ پایانی سایت ←' : 'The EPU concept poster · PROPOSED — the site’s closing exhibit →'}
          </p>
        </Link>
      </SectionBlockSticky>

      {/* ── The scientific foundation — merged from the former Science tab ── */}
      <SectionBlock
        eyebrow={fa ? 'بنیان علمی' : 'The Scientific Foundation'}
        title={fa ? 'از نظریه تا سیلیکون' : 'From Theory to Silicon'}
        body={[sci.originsBody, sci.mathBody]}
        points={sci.mathPoints}
        alt
      />

      {/* Proofs that run — the mathematics argued by execution, not prose */}
      <section className="section-block">
        <div className="container">
          <h2 className="section-title">{fa ? 'اثبات‌هایی که اجرا می‌شوند' : 'Proofs That Run'}</h2>
          <p className="section-block__body">
            {fa
              ? 'اولیهٔ مرکزی چارچوب و انضباط مرکزی آن، به‌جای ادعا، به نمایش: تکرار AGM که در مرورگر شما به‌دقت ماشین همگرا می‌شود، و نتایج مطالعهٔ موردی که تنها درون پاکتِ اثبات‌شده رسم شده‌اند.'
              : 'The framework’s central primitive and its central discipline, shown rather than asserted: the AGM iteration converging to machine precision in your browser, and the case-study results drawn only inside the envelope where they were demonstrated.'}
          </p>
        </div>
      </section>
      <AgmDemo />
      <EnvelopeChart />
      <StandingsLegend />

      {/* The manuscript discipline — proven / measured / not-claimed */}
      <SectionBlock
        eyebrow={sci.manuscriptEyebrow}
        title={sci.manuscriptTitle}
        body={sci.manuscriptBody}
        note={fa
          ? 'اسناد کامل و مجموعه‌داده‌ها در کتابخانهٔ فنی؛ ممیزی بیرونی پیشینه در صفحهٔ روش‌شناسی پژوهش.'
          : 'The full documents and datasets are in the Technical Library; the external prior-art audit is on the Research Methods page.'}
        gray
      />

      {/* EPU architecture */}
      <SectionBlock
        eyebrow={t.epuEyebrow}
        title={t.epuTitle}
        body={t.epuBody}
        points={t.epuPoints}
        note={t.epuNote}
      />

      {/* Honest figures band */}
      <section className="bp-stats-band">
        <div className="container">
          <div className="bp-stats">
            {FIGURES.map((f, i) => (
              <div className="bp-stat" key={i}>
                <p className="bp-stat__v">{f.v}</p>
                {f.chip && (
                  <span className={`standing-chip standing-chip--${f.chip}`}>
                    {lang === 'fa' ? (f.chip === 'measured' ? 'اندازه‌گیری‌شده' : 'اثبات‌شده') : f.chip}
                  </span>
                )}
                <p className="bp-stat__l">{lang === 'fa' ? f.l.fa : f.l.en}</p>
              </div>
            ))}
          </div>
          <StandingsLegend />
          <p className="bp-stats-note">
            {lang === 'en'
              ? 'Every figure above is traceable to the published corpus; projected quantities are never rendered solid.'
              : 'هر رقم بالا به پیکرهٔ منتشرشده قابل ردیابی است؛ کمیت‌های برآوردی هرگز توپر نمایش داده نمی‌شوند.'}
          </p>
        </div>
      </section>

      {/* ── The stack, end to end — the hub: each aspect hosted on its own tab ── */}
      <section className="section-block section-block--gray">
        <div className="container">
          <p className="section-eyebrow">{fa ? 'پشته، سرتاسر' : 'The Stack, End to End'}</p>
          <h2 className="section-title">{fa ? 'کجا عمیق‌تر شویم' : 'Where to Go Deeper'}</h2>
          <p className="section-block__body">
            {fa
              ? 'این صفحه جنبه‌های اصلی را در عمقی متعارف پوشش می‌دهد. هر جنبه، خانهٔ کامل خود را در یکی از زبانه‌های دیگر دارد — از آن‌جا وارد شوید.'
              : 'This page carries the major aspects at a normal depth. Each one has its full home on another tab — enter it there.'}
          </p>
          <div className="safety-layers__grid" style={{ marginTop: '1.25rem' }}>
            {HUB.map((h) => {
              const l = fa ? h.fa : h.en;
              return (
                <Link key={h.to} to={h.to} className="layer-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <h3 className="layer-card__title">{l[0]}</h3>
                  <p className="layer-card__body">{l[1]}</p>
                  <p className="layer-card__num" style={{ marginTop: '0.75rem' }}>{fa ? 'ورود →' : 'Enter →'}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="tech-note-section" style={{ padding: 'var(--space-10) 0', background: 'var(--color-bg)' }}>
        <div className="container">
          <div className="tech-note">
            <p>{t.ctaNote}</p>
            <a href={`/${lang}/contact`} className="btn btn-primary">{t.ctaBtn}</a>
          </div>
        </div>
      </section>

      <CTABand
        title={lang === 'en' ? 'Ready to explore a fundamentally different approach?' : 'آماده‌اید تا رویکردی بنیادین متفاوت را کاوش کنید؟'}
        cta1={lang === 'en' ? 'Contact Us' : 'تماس با ما'}
        cta1To={`/${lang}/contact`}
        cta2={lang === 'en' ? 'The Founder' : 'بنیان‌گذار'}
        cta2To={`/${lang}/bio`}
      />
    </main>
  );
}
