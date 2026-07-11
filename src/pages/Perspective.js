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

      <figure style={{ margin: '2.5rem auto 0', maxWidth: '1100px', padding: '0 1rem' }}>
        <img src="/docs/svg/plates/P12_narrowing_funnel.svg" alt="" loading="lazy"
             style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid rgba(128,128,128,0.25)', background: '#fcfcfb' }} />
        <figcaption className="section-block__note" style={{ marginTop: '0.6rem', textAlign: 'center' }}>
          {lang === 'en'
          ? 'Fig. V-01 — The essays in one figure: possibility narrows through six gates; authority only contracts.'
          : 'شکل V-01 — جان کلام جستارها در یک شکل: فضای امکان از شش دروازه می‌گذرد و تنگ می‌شود؛ اختیار تنها منقبض می‌شود.'}
        </figcaption>
      </figure>

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
