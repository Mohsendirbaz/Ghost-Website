import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import SectionBlock from '../components/SectionBlock';
import CTABand from '../components/CTABand';
import './Page.css';

export default function Methods() {
  const { lang } = useLang();
  const t = copy[lang].methods;

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: copy[lang].nav.methods },
      ]} />
      <Hero
        eyebrow={t.heroEyebrow}
        h1={t.heroH1}
        subhead={t.heroSub}
      />

      <figure style={{ margin: '2.5rem auto 0', maxWidth: '1100px', padding: '0 1rem' }}>
        <img src="/docs/svg/plates/P8_methods_pipeline.svg" alt="" loading="lazy"
             style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid rgba(128,128,128,0.25)', background: '#fcfcfb' }} />
        <figcaption className="section-block__note" style={{ marginTop: '0.6rem', textAlign: 'center' }}>
          {lang === 'en'
          ? 'Fig. M-01 — One gate for every public claim: formulate, derive, witness, stand, publish.'
          : 'شکل M-01 — یک دروازه برای هر ادعای عمومی: صورت‌بندی، استنتاج، گواهی، تعیین جایگاه، انتشار.'}
        </figcaption>
      </figure>

      <SectionBlock
        eyebrow={t.kteEyebrow}
        title={t.kteTitle}
        body={t.kteBody}
        gray
      />

      <SectionBlock
        eyebrow={t.discoveryEyebrow}
        title={t.discoveryTitle}
        body={t.discoveryBody}
        alt
      />

      <SectionBlock
        eyebrow={t.auditEyebrow}
        title={t.auditTitle}
        body={t.auditBody}
        note={t.auditNote}
        gray
      />

      <SectionBlock
        eyebrow={t.sixEyebrow}
        title={t.sixTitle}
        body={t.sixBody}
      />

      <CTABand
        title={t.ctaBandTitle}
        cta1={t.ctaBtn}
        cta1To={`/${lang}/contact`}
        cta2={lang === 'en' ? 'Multi-Agent Laboratory' : 'آزمایشگاه چند-عامله'}
        cta2To={`/${lang}/multi-agent-system`}
      />
    </main>
  );
}
