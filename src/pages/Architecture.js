import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import CTABand from '../components/CTABand';
import DiagramGallery from '../components/DiagramGallery';
import './Page.css';
import './Architecture.css';

export default function Architecture() {
  const { lang } = useLang();
  const t = copy[lang].architecture;

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: copy[lang].breadcrumb.architecture },
      ]} />
      <Hero
        eyebrow={t.heroEyebrow}
        h1={t.heroH1}
        subhead={t.heroSub}
      />

      <section className="architecture-gallery-section">
        <div className="container">
          <DiagramGallery />
        </div>
      </section>

      <CTABand
        title={t.ctaBandTitle}
        cta1={t.ctaBtn}
        cta1To={`/${lang}/contact`}
        cta2={lang === 'en' ? 'Our Technology' : 'فناوری ما'}
        cta2To={`/${lang}/technology`}
      />
    </main>
  );
}
