import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import SectionBlock from '../components/SectionBlock';
import CTABand from '../components/CTABand';
import './Page.css';

export default function Partners() {
  const { lang } = useLang();
  const t = copy[lang].partners;

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: copy[lang].breadcrumb.partners },
      ]} />
      <Hero
        eyebrow={lang === 'en' ? 'Partners' : 'شرکا'}
        h1={t.heroH1}
        subhead={t.heroSub}
      />

      <figure style={{ margin: '2.5rem auto 0', maxWidth: '1100px', padding: '0 1rem' }}>
        <img src="/docs/svg/plates/P13_partnership_loop.svg" alt="" loading="lazy"
             style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid rgba(128,128,128,0.25)', background: '#fcfcfb' }} />
        <figcaption className="section-block__note" style={{ marginTop: '0.6rem', textAlign: 'center' }}>
          {lang === 'en'
          ? 'Fig. C-01 — A collaboration model, drawn dashed on purpose: proposed, not claimed.'
          : 'شکل C-01 — الگوی همکاری، عمداً خط‌چین: پیشنهادی، نه ادعایی.'}
        </figcaption>
      </figure>

      <SectionBlock
        eyebrow={t.philEyebrow}
        title={t.philTitle}
        body={t.philBody}
        gray
      />

      <SectionBlock
        eyebrow={t.semiEyebrow}
        title={t.semiTitle}
        body={t.semiBody}
        alt
      >
        <div style={{
          width:'100%', maxWidth:400, borderRadius:'var(--radius-3)',
          background:'linear-gradient(135deg,#0a0f1e,#001a3a)',
          padding:'var(--space-6)', display:'flex', flexDirection:'column',
          gap:'var(--space-3)', boxShadow:'var(--shadow-xl)'
        }}>
          {['Semiconductor Ecosystem', 'India ISM Alignment', 'Korea Foundries', 'Quad-Plus Framework'].map((item, i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:'var(--space-2)',
              padding:'var(--space-2) var(--space-3)',
              background:'rgba(255,255,255,0.07)',
              borderRadius:'var(--radius-2)',
              borderInlineStart:'3px solid var(--color-primary)'
            }}>
              <span style={{color:'var(--color-primary)', fontSize:'18px'}}>◆</span>
              <span style={{color:'rgba(255,255,255,0.85)', fontSize:'var(--text-sm)', fontWeight:'var(--weight-medium)'}}>
                {lang === 'en' ? item : ['اکوسیستم نیمه‌هادی','همسویی ISM هند','فوندری‌های کره','چارچوب Quad-Plus'][i]}
              </span>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow={t.oemEyebrow}
        title={t.oemTitle}
        body={t.oemBody}
        gray
      />

      <SectionBlock
        eyebrow={t.researchEyebrow}
        title={t.researchTitle}
        body={t.researchBody}
        alt
      />

      <CTABand
        title={t.ctaBandTitle}
        body={t.ctaBandBody}
        cta1={t.ctaBtn}
        cta1To={`/${lang}/contact`}
      />
    </main>
  );
}
