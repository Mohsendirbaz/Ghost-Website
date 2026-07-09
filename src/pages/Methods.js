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
