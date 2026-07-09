import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import { HeroPrimary } from '../components/Hero';
import ThreePillars from '../components/ThreePillars';
import SectionBlock from '../components/SectionBlock';
import CTABand from '../components/CTABand';
import { PhysicsAbstraction } from '../components/AbstractVisual';
import FactEngine from '../FactEngine';
import './Page.css';

export default function Home() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const t = copy[lang].home;

  const pillars = [
    { icon: '⚡', title: t.pillar1Title, body: t.pillar1Body },
    { icon: '🛡', title: t.pillar2Title, body: t.pillar2Body },
    { icon: '⚙️', title: t.pillar3Title, body: t.pillar3Body },
  ];

  return (
    <main id="main-content">
      <HeroPrimary
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

      {t.corpusDocs && (
        <section className="section-block section-block--gray">
          <div className="container">
            <p className="section-eyebrow">{t.corpusEyebrow}</p>
            <h2 className="section-title">{t.corpusTitle}</h2>
            <p className="section-block__body">{t.corpusBody}</p>
            <div className="safety-layers__grid">
              {t.corpusDocs.map((doc, i) => (
                <Link
                  key={i}
                  to={`/${lang}/library/assets/${doc.slug}`}
                  className="layer-card"
                  style={{ textDecoration: 'none' }}
                >
                  <h3 className="layer-card__title">{doc.title}</h3>
                  <p className="layer-card__body">{doc.desc}</p>
                </Link>
              ))}
            </div>
            <p className="section-block__note">{t.corpusNote}</p>
          </div>
        </section>
      )}

      <section className="fact-engine-section container">
        <FactEngine
          lang={lang}
          dir={lang === 'fa' ? 'rtl' : 'ltr'}
          context={{ tags: ['physics', 'fluids', 'general-relativity'], path: `/${lang}` }}
          onNavigate={(path) => navigate(path)}
        />
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
