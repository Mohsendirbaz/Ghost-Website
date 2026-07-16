import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import SectionBlock from '../components/SectionBlock';
import CTABand from '../components/CTABand';
import Figure from '../components/Figure';
import StandingsLegend from '../components/StandingsLegend';
import AgmDemo from '../components/visuals/AgmDemo';
import EnvelopeChart from '../components/visuals/EnvelopeChart';
import './Page.css';

export default function Science() {
  const { lang } = useLang();
  const t = copy[lang].science;

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: copy[lang].breadcrumb.science },
      ]} />
      <Hero
        eyebrow={lang === 'en' ? 'Science' : 'علم'}
        h1={t.heroH1}
        subhead={t.heroSub}
      />

      <SectionBlock
        eyebrow={t.originsEyebrow}
        title={t.originsTitle}
        body={t.originsBody}
        gray
      />

      {/* Proofs that run — the mathematics argued by execution, not prose */}
      <section className="section-block">
        <div className="container">
          <h2 className="section-title">
            {lang === 'en' ? 'Proofs That Run' : 'اثبات‌هایی که اجرا می‌شوند'}
          </h2>
          <p className="section-block__body">
            {lang === 'en'
              ? 'The framework’s central primitive and its central discipline, shown rather than asserted: the AGM iteration converging in your browser, and the case-study results drawn inside the only envelope where they were demonstrated.'
              : 'اولیهٔ مرکزی چارچوب و انضباط مرکزی آن، به‌جای ادعا، به نمایش: تکرار AGM که در مرورگر شما همگرا می‌شود، و نتایج مطالعهٔ موردی که درون تنها پاکتی رسم شده‌اند که در آن اثبات شده‌اند.'}
          </p>
        </div>
      </section>
      <AgmDemo />
      <EnvelopeChart />
      <StandingsLegend />

      <SectionBlock
        eyebrow={t.mathEyebrow}
        title={t.mathTitle}
        body={t.mathBody}
        points={t.mathPoints}
        alt
      />

      <SectionBlock
        eyebrow={t.bridgeEyebrow}
        title={t.bridgeTitle}
        body={t.bridgeBody}
        gray
      />

      {t.plateManuscript && (
        <Figure num="C-01" src={t.plateManuscript.src} caption={t.plateManuscript.caption} />
      )}

      <SectionBlock
        eyebrow={t.manuscriptEyebrow}
        title={t.manuscriptTitle}
        body={t.manuscriptBody}
        note={t.manuscriptNote}
        alt
      />

      <SectionBlock
        eyebrow={t.papersEyebrow}
        title={t.papersTitle}
        body={t.papersBody}
        points={t.papersPoints}
        note={t.papersNote}
        gray
      />

      <CTABand
        title={lang === 'en' ? 'Interested in research collaboration or academic partnership?' : 'علاقه‌مند به همکاری تحقیقاتی یا شراکت دانشگاهی؟'}
        cta1={t.ctaBtn}
        cta1To={`/${lang}/contact`}
      />
    </main>
  );
}
