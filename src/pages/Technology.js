import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import { HeroSecondary } from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import SectionBlock from '../components/SectionBlock';
import SectionBlockSticky from '../components/SectionBlockSticky';
import CTABand from '../components/CTABand';
import Figure from '../components/Figure';
import StandingsLegend from '../components/StandingsLegend';
import { EpuVisual } from '../components/AbstractVisual';
import './Page.css';

/* Corpus-true figures with explicit standings — replacing the former
   unlabeled marketing multipliers (100×/10×/1000+/99.99%), which had no
   traceable source and rendered as solid fact against the site's own
   claim discipline. Values below already appear on Home/Safety surfaces
   and in the published corpus. */
const FIGURES = [
  { v: '~32 ns', chip: 'measured', l: { en: 'analog-veto latency — the corpus’s only measured hardware timing', fa: 'تأخیر وتوی آنالوگ — تنها زمان‌سنجی اندازه‌گیری‌شدهٔ سخت‌افزار در پیکره' } },
  { v: '2', chip: 'proven', l: { en: 'control invariants proven on paper — pose-and-select · monotone funnel', fa: 'دو ناوردای کنترلی اثبات‌شده روی کاغذ — گزینش-و-وضعیت · قیف یکنوا' } },
  { v: '5', chip: null, l: { en: 'refusal stages S0–S4 ahead of a single actuation gate', fa: 'پنج مرحلهٔ امتناع S0–S4 پیش از یک دروازهٔ کنش' } },
  { v: '325', chip: null, l: { en: 'admissible gearbox routes over five epistemic stances', fa: '۳۲۵ مسیر مجاز گیربکس روی پنج موضع معرفتی' } },
];

export default function Technology() {
  const { lang } = useLang();
  const t = copy[lang].technology;

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

      <Figure
        num="T-01"
        src="/docs/svg/Epistemic_Gearbox_Stack.svg"
        caption={lang === 'en'
          ? 'The Epistemic Gearbox blueprint as published: module identities are deliberately withheld; the steering logic and the safety boundary are not.'
          : 'نقشهٔ گیربکس معرفتی به همان صورت منتشرشده: هویت ماژول‌ها عمداً پوشیده است؛ منطق فرمان و مرز ایمنی نه.'}
      />

      <SectionBlock
        eyebrow={t.challengeEyebrow}
        title={t.challengeTitle}
        body={t.challengeBody}
        gray
      />

      <SectionBlockSticky
        eyebrow={t.approachEyebrow}
        title={t.approachTitle}
        body={t.approachBody}
        visualPosition="right"
      >
        <EpuVisual />
      </SectionBlockSticky>

      {/* Honest figures band — every number standings-labeled or plainly structural */}
      <section className="bp-stats-band">
        <div className="container">
          <div className="bp-stats">
            {FIGURES.map((f, i) => (
              <div className="bp-stat" key={i}>
                <p className="bp-stat__v">{f.v}</p>
                {f.chip && (
                  <span className={`standing-chip standing-chip--${f.chip}`}>
                    {lang === 'fa'
                      ? (f.chip === 'measured' ? 'اندازه‌گیری‌شده' : 'اثبات‌شده')
                      : f.chip}
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

      <SectionBlock
        eyebrow={t.epuEyebrow}
        title={t.epuTitle}
        body={t.epuBody}
        points={t.epuPoints}
        note={t.epuNote}
        gray
      />

      <section className="tech-note-section" style={{padding:'var(--space-10) 0', background:'var(--color-bg)'}}>
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
        cta2={lang === 'en' ? 'Our Science' : 'علم ما'}
        cta2To={`/${lang}/science`}
      />
    </main>
  );
}
