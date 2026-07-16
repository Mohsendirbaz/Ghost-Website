import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import SectionBlock from '../components/SectionBlock';
import ComparisonTable from '../components/ComparisonTable';
import CTABand from '../components/CTABand';
import DiagramGallery from '../components/DiagramGallery';
import Figure from '../components/Figure';
import StandingsLegend from '../components/StandingsLegend';
import GearboxExplorer from '../components/visuals/GearboxExplorer';
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

      {/* The two invariants — organizing thesis */}
      <SectionBlock
        eyebrow={t.invariantsEyebrow}
        title={t.invariantsTitle}
        body={t.invariantsBody}
        gray
      />

      {/* Blueprint register */}
      {t.blueprints && (
        <section className="safety-layers">
          <div className="container">
            <p className="section-eyebrow">{t.blueprintsEyebrow}</p>
            <h2 className="section-title">{t.blueprintsTitle}</h2>
            <p className="section-block__body">{t.blueprintsIntro}</p>
            <div className="safety-layers__grid">
              {t.blueprints.map((bp, i) => (
                <div key={i} className="layer-card">
                  <p className="layer-card__num">{bp.num}</p>
                  <h3 className="layer-card__title">{bp.title}</h3>
                  <p className="layer-card__body">{bp.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* von Neumann crosswalk */}
      {t.crosswalkRows && (
        <section className="section-block section-block--gray">
          <div className="container">
            <p className="section-eyebrow">{t.crosswalkEyebrow}</p>
            <h2 className="section-title">{t.crosswalkTitle}</h2>
            <p className="section-block__body">{t.crosswalkIntro}</p>
            <ComparisonTable
              columns={[t.crosswalkColumn]}
              rows={t.crosswalkRows}
              highlightColumn={-1}
            />
          </div>
        </section>
      )}

      {/* Epistemic gearbox — the concept, then the concept made playable */}
      <SectionBlock
        eyebrow={t.gearboxEyebrow}
        title={t.gearboxTitle}
        body={t.gearboxBody}
        note={t.gearboxNote}
        alt
      />
      <GearboxExplorer />

      {/* Blueprint SVG figures */}
      {t.figures && (
        <section className="section-block">
          <div className="container">
            <h2 className="section-title">{t.figuresTitle}</h2>
          </div>
          {t.figures.map((fig, i) => (
            <Figure key={i} src={fig.src} caption={fig.caption} wide />
          ))}
          <StandingsLegend />
        </section>
      )}

      {/* Interactive diagram gallery (existing feature) */}
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
