import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import CTABand from '../components/CTABand';
import './Page.css';

export default function Perspective() {
  const { lang } = useLang();
  const t = copy[lang].perspective;

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: copy[lang].breadcrumb.perspective },
      ]} />
      <Hero
        eyebrow={t.heroEyebrow}
        h1={t.heroH1}
        subhead={t.heroSub}
      />

      <article className="essay">
        <div className="container essay__inner">
          <p className="essay__subtitle">{t.subtitle}</p>
          <div className="essay__body">
            {t.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      <article className="essay essay--alt">
        <div className="container essay__inner">
          <p className="essay__eyebrow">{t.hypeEyebrow}</p>
          <p className="essay__subtitle">{t.hypeSubtitle}</p>
          <div className="essay__body">
            {t.hypeParas.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      <article className="essay essay--alt">
        <div className="container essay__inner">
          <p className="essay__eyebrow">{t.contEyebrow}</p>
          <p className="essay__subtitle">{t.contSubtitle}</p>
          <div className="essay__body">
            {t.contParas.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      <CTABand
        title={lang === 'en'
          ? 'Want to see how this research became silicon?'
          : 'می‌خواهید ببینید این تحقیق چگونه به سیلیکون تبدیل شد؟'}
        cta1={t.ctaBtn}
        cta1To={`/${lang}/technology`}
        cta2={lang === 'en' ? 'Our Science' : 'علم ما'}
        cta2To={`/${lang}/science`}
      />
    </main>
  );
}
