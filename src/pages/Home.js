import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import ThreePillars from '../components/ThreePillars';
import SectionBlock from '../components/SectionBlock';
import CTABand from '../components/CTABand';
import { PhysicsAbstraction } from '../components/AbstractVisual';
import './Page.css';

export default function Home() {
  const { lang } = useLang();
  const t = copy[lang].home;

  const pillars = [
    { icon: '⚡', title: t.pillar1Title, body: t.pillar1Body },
    { icon: '🛡', title: t.pillar2Title, body: t.pillar2Body },
    { icon: '⚙️', title: t.pillar3Title, body: t.pillar3Body },
  ];

  return (
    <main id="main-content">
      <Hero
        h1={t.heroH1}
        subhead={t.heroSub}
        cta1={t.cta1}
        cta1To={`/${lang}/contact`}
        cta2={t.cta2}
        cta2To={`/${lang}/technology`}
      />

      <ThreePillars pillars={pillars} />

      <SectionBlock
        eyebrow={t.originEyebrow}
        title={t.originTitle}
        body={t.originBody}
        gray
      >
        <PhysicsAbstraction />
      </SectionBlock>

      <section className="proof-strip">
        <div className="container proof-strip__inner">
          <div className="proof-item">
            <span className="proof-item__icon">🎓</span>
            <span className="proof-item__label">IIT Research Foundation</span>
          </div>
          <div className="proof-item">
            <span className="proof-item__icon">🔬</span>
            <span className="proof-item__label">Physics-First Architecture</span>
          </div>
          <div className="proof-item">
            <span className="proof-item__icon">🛡</span>
            <span className="proof-item__label">ASIL-D Design Principles</span>
          </div>
          <div className="proof-item">
            <span className="proof-item__icon">💡</span>
            <span className="proof-item__label">Purpose-Built EPU</span>
          </div>
        </div>
      </section>

      <CTABand
        title={t.ctaBandTitle}
        cta1={t.ctaBandCta1}
        cta1To={`/${lang}/contact`}
        cta2={t.ctaBandCta2}
        cta2To={`/${lang}/technology`}
      />
    </main>
  );
}
