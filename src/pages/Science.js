import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import SectionBlock from '../components/SectionBlock';
import CTABand from '../components/CTABand';
import { PhysicsAbstraction } from '../components/AbstractVisual';
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
      >
        <PhysicsAbstraction />
      </SectionBlock>

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
        <figure style={{ margin: '2.5rem auto 0', maxWidth: '1100px', padding: '0 1rem' }}>
          <img src={t.plateManuscript.src} alt={t.plateManuscript.caption} loading="lazy"
               style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid rgba(128,128,128,0.25)', background: '#fcfcfb' }} />
          <figcaption className="section-block__note" style={{ marginTop: '0.6rem', textAlign: 'center' }}>{t.plateManuscript.caption}</figcaption>
        </figure>
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
