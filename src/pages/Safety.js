import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import SectionBlock from '../components/SectionBlock';
import FAQAccordion from '../components/FAQAccordion';
import CTABand from '../components/CTABand';
import { SafetyLayersVisual } from '../components/AbstractVisual';
import './Page.css';

export default function Safety() {
  const { lang } = useLang();
  const t = copy[lang].safety;

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: copy[lang].breadcrumb.safety },
      ]} />
      <Hero
        eyebrow={lang === 'en' ? 'Safety' : 'ایمنی'}
        h1={t.heroH1}
        subhead={t.heroSub}
      />

      <SectionBlock
        eyebrow={t.philEyebrow}
        title={t.philTitle}
        body={t.philBody}
        gray
      >
        <SafetyLayersVisual />
      </SectionBlock>

      <section className="safety-layers">
        <div className="container">
          <p className="section-eyebrow">{t.layersEyebrow}</p>
          <h2 className="section-title">{t.layersTitle}</h2>
          {t.layersIntro && <p className="section-block__body">{t.layersIntro}</p>}
          <div className="safety-layers__grid">
            {[
              { num: lang === 'en' ? 'Layer 1' : 'لایه ۱', title: t.layer1Title, body: t.layer1Body },
              { num: lang === 'en' ? 'Layer 2' : 'لایه ۲', title: t.layer2Title, body: t.layer2Body },
              { num: lang === 'en' ? 'Layer 3' : 'لایه ۳', title: t.layer3Title, body: t.layer3Body },
              { num: lang === 'en' ? 'Layer 4' : 'لایه ۴', title: t.layer4Title, body: t.layer4Body },
            ].map((layer, i) => (
              <div key={i} className="layer-card">
                <p className="layer-card__num">{layer.num}</p>
                <h3 className="layer-card__title">{layer.title}</h3>
                <p className="layer-card__body">{layer.body}</p>
              </div>
            ))}
          </div>
          {t.layersOutro && <p className="section-block__body">{t.layersOutro}</p>}
        </div>
      </section>

      <SectionBlock
        eyebrow={t.validationEyebrow}
        title={t.validationTitle}
        body={t.validationBody}
        points={t.validationPoints}
        note={t.validationNote}
        gray
        alt
      />

      <SectionBlock
        title={t.pathTitle}
        body={t.pathBody}
      />

      <FAQAccordion title={t.faqTitle} items={t.faqs} />

      <CTABand
        title={lang === 'en' ? 'Safety is an engineering commitment, not a feature set.' : 'ایمنی یک تعهد مهندسی است، نه یک مجموعه ویژگی.'}
        body={lang === 'en' ? 'If you are building systems where that distinction matters, we would like to talk.' : 'اگر شما در حال ساخت سیستم‌هایی هستید که این تمایز در آنها اهمیت دارد، خوشحال می‌شویم گفتگو کنیم.'}
        cta1={lang === 'en' ? 'Safety Inquiry' : 'پرس‌وجوی ایمنی'}
        cta1To={`/${lang}/contact`}
      />
    </main>
  );
}
