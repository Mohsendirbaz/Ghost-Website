import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import { HeroSecondary } from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import SectionBlock from '../components/SectionBlock';
import SectionBlockSticky from '../components/SectionBlockSticky';
import StatsBand from '../components/StatsBand';
import CTABand from '../components/CTABand';
import { EpuVisual } from '../components/AbstractVisual';
import './Page.css';

export default function Technology() {
  const { lang } = useLang();
  const t = copy[lang].technology;

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: copy[lang].breadcrumb.technology },
      ]} />
      <HeroSecondary
        eyebrow={lang === 'en' ? 'Technology' : 'فناوری'}
        h1={t.heroH1}
        subhead={t.heroSub}
      />

      <SectionBlock
        eyebrow={t.challengeEyebrow}
        title={t.challengeTitle}
        body={t.challengeBody}
        gray
      />

      <SectionBlockSticky
        eyebrow={t.approachEyebrow}
        title={t.approachTitle}
        body={t.approachBody}
        visualPosition="right"
      >
        <EpuVisual />
      </SectionBlockSticky>

      <StatsBand stats={[
        { value: '100', suffix: 'x', label: lang === 'en' ? 'More Efficient than GPU' : 'کارآمدتر از GPU' },
        { value: '10', suffix: 'x', label: lang === 'en' ? 'Lower Power Consumption' : 'مصرف انرژی کمتر' },
        { value: '1000', suffix: '+', label: lang === 'en' ? 'Physics Calculations/sec' : 'محاسبات فیزیکی در ثانیه' },
        { value: '99.99', suffix: '%', label: lang === 'en' ? 'Reliability' : 'قابلیت اطمینان' },
      ]} />

      <SectionBlock
        eyebrow={t.epuEyebrow}
        title={t.epuTitle}
        body={t.epuBody}
        points={t.epuPoints}
        note={t.epuNote}
        gray
      />

      <section className="tech-note-section" style={{padding:'var(--space-10) 0', background:'var(--color-bg)'}}>
        <div className="container">
          <div className="tech-note">
            <p>{t.ctaNote}</p>
            <a href={`/${lang}/contact`} className="btn btn-primary">{t.ctaBtn}</a>
          </div>
        </div>
      </section>

      <CTABand
        title={lang === 'en' ? 'Ready to explore a fundamentally different approach?' : 'آماده‌اید تا رویکردی بنیادین متفاوت را کاوش کنید؟'}
        cta1={lang === 'en' ? 'Contact Us' : 'تماس با ما'}
        cta1To={`/${lang}/contact`}
        cta2={lang === 'en' ? 'Our Science' : 'علم ما'}
        cta2To={`/${lang}/science`}
      />
    </main>
  );
}
