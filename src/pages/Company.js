import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import SectionBlock from '../components/SectionBlock';
import CTABand from '../components/CTABand';
import './Page.css';

export default function Company() {
  const { lang } = useLang();
  const t = copy[lang].company;

  return (
    <main id="main-content">
      <Hero
        eyebrow={lang === 'en' ? 'Company' : 'شرکت'}
        h1={t.heroH1}
        subhead={t.heroSub}
      />

      <SectionBlock
        eyebrow={t.storyEyebrow}
        title={t.storyTitle}
        body={t.storyBody}
        gray
      />

      <section style={{padding:'var(--space-12) 0', background:'var(--color-bg)'}}>
        <div className="container">
          <p className="section-eyebrow">{t.founderEyebrow}</p>
          <h2 className="section-title" style={{marginBottom:'var(--space-6)'}}>{lang === 'en' ? 'Leadership' : 'رهبری'}</h2>
          <div className="founder-card">
            <div className="founder-card__avatar">MD</div>
            <div>
              <h3 className="founder-card__name">{t.founderTitle}</h3>
              <p className="founder-card__role">{t.founderRole}</p>
              <p className="founder-card__bio">{t.founderBio}</p>
            </div>
          </div>
        </div>
      </section>

      <SectionBlock
        eyebrow={t.careersEyebrow}
        title={t.careersTitle}
        body={t.careersBody}
        gray
      >
        <div style={{display:'flex', justifyContent:'center'}}>
          <Link to={`/${lang}/contact`} className="btn btn-primary" style={{fontSize:'var(--text-lg)', padding:'16px 40px'}}>
            {t.careersBtn}
          </Link>
        </div>
      </SectionBlock>

      <CTABand
        title={lang === 'en' ? 'Want to learn more about Ghost Autonomy?' : 'می‌خواهید بیشتر درباره Ghost Autonomy بدانید؟'}
        cta1={lang === 'en' ? 'Contact Us' : 'تماس با ما'}
        cta1To={`/${lang}/contact`}
        cta2={lang === 'en' ? 'Our Technology' : 'فناوری ما'}
        cta2To={`/${lang}/technology`}
      />
    </main>
  );
}
