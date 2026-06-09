import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import { HeroSecondary } from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import SectionBlock from '../components/SectionBlock';
import SectionBlockFullBleed from '../components/SectionBlockFullBleed';
import Timeline from '../components/Timeline';
import CTABand from '../components/CTABand';
import './Page.css';

export default function Company() {
  const { lang } = useLang();
  const t = copy[lang].company;

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: copy[lang].breadcrumb.company },
      ]} />
      <HeroSecondary
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
            <div style={{flex: 1}}>
              <h3 className="founder-card__name">{t.founderTitle}</h3>
              <p className="founder-card__role">{t.founderRole}</p>
              <p className="founder-card__bio" style={{marginBottom: 'var(--space-4)'}}>{t.founderBio}</p>
              <Link
                to={`/${lang}/bio`}
                className="btn btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: 'var(--text-sm)',
                  padding: '10px 20px'
                }}
              >
                {lang === 'en' ? 'Read Full Bio' : 'خواندن بیوگرافی کامل'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionBlockFullBleed
        eyebrow={lang === 'en' ? 'Our Journey' : 'سفر ما'}
        title={lang === 'en' ? 'Building the Future of Autonomy' : 'ساخت آینده خودکاری'}
        overlay={true}
      >
        <Timeline items={[
          {
            year: '2017',
            title: lang === 'en' ? 'Founded at IIT' : 'تأسیس در IIT',
            description: lang === 'en'
              ? 'Ghost Autonomy born from breakthrough physics research at Illinois Institute of Technology'
              : 'Ghost Autonomy از تحقیقات پیشرفته فیزیک در موسسه فناوری ایلینوی متولد شد',
          },
          {
            year: '2019',
            title: lang === 'en' ? 'EPU Prototype' : 'نمونه اولیه EPU',
            description: lang === 'en'
              ? 'First Euler Processing Unit prototype demonstrates 100x efficiency gains over traditional approaches'
              : 'اولین نمونه اولیه واحد پردازش اویلر 100 برابر بهبود کارایی را نسبت به رویکردهای سنتی نشان داد',
          },
          {
            year: '2021',
            title: lang === 'en' ? 'Production Architecture' : 'معماری تولید',
            description: lang === 'en'
              ? 'EPU architecture finalized and ready for automotive integration'
              : 'معماری EPU نهایی شد و برای ادغام خودرو آماده شد',
          },
          {
            year: '2024',
            title: lang === 'en' ? 'Global Expansion' : 'توسعه جهانی',
            description: lang === 'en'
              ? 'Partnerships with leading automotive manufacturers across three continents'
              : 'مشارکت با تولیدکنندگان خودرو پیشرو در سه قاره',
          },
        ]} />
      </SectionBlockFullBleed>

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
