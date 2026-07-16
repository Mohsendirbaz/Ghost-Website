import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import CTABand from '../components/CTABand';
import Figure from '../components/Figure';
import './Page.css';

/* Reading time from the actual paragraph text — an honest editorial
   ornament (≈200 wpm EN, ≈180 wpm FA). */
function readingTime(paras, lang) {
  const words = (paras || []).join(' ').split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / (lang === 'fa' ? 180 : 200)));
  return lang === 'fa' ? `≈ ${mins} دقیقه مطالعه` : `≈ ${mins} min read`;
}

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

      <Figure
        num="V-01"
        src="/docs/svg/plates/P12_narrowing_funnel.svg"
        caption={lang === 'en'
          ? 'The essays in one figure: possibility narrows through six gates; authority only contracts.'
          : 'جان کلام جستارها در یک شکل: فضای امکان از شش دروازه می‌گذرد و تنگ می‌شود؛ اختیار تنها منقبض می‌شود.'}
      />

      <article className="essay essay--editorial">
        <div className="container essay__inner">
          <p className="essay__meta">{readingTime(t.paragraphs, lang)}</p>
          <p className="essay__subtitle">{t.subtitle}</p>
          <div className="essay__body">
            {t.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      <article className="essay essay--alt essay--editorial">
        <div className="container essay__inner">
          <p className="essay__eyebrow">{t.hypeEyebrow}</p>
          <p className="essay__meta">{readingTime(t.hypeParas, lang)}</p>
          <p className="essay__subtitle">{t.hypeSubtitle}</p>
          <div className="essay__body">
            {t.hypeParas.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      <article className="essay essay--alt essay--editorial">
        <div className="container essay__inner">
          <p className="essay__eyebrow">{t.contEyebrow}</p>
          <p className="essay__meta">{readingTime(t.contParas, lang)}</p>
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
