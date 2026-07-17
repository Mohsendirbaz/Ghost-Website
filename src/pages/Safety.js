import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import SectionBlock from '../components/SectionBlock';
import FAQAccordion from '../components/FAQAccordion';
import CTABand from '../components/CTABand';
import Figure from '../components/Figure';
import RefusalScrollStory from '../components/visuals/RefusalScrollStory';
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

      {t.plateRefusal && (
        <Figure num="S-01" src={t.plateRefusal.src} caption={t.plateRefusal.caption} />
      )}

      <SectionBlock
        eyebrow={t.philEyebrow}
        title={t.philTitle}
        body={t.philBody}
        gray
      />

      {/* Four layers, one figure — the prose grid demoted to a caption */}
      <Figure
        num="S-04"
        src="/docs/svg/plates/P14_safety_layers.svg"
        caption={lang === 'en'
          ? 'Four layers between intent and actuation; the measured veto guards the innermost boundary.'
          : 'چهار لایه میان قصد و کنش؛ وتوی اندازه‌گیری‌شده از درونی‌ترین مرز پاسداری می‌کند.'}
      />
      {t.layersIntro && (
        <details className="bp-details">
          <summary>{lang === 'en' ? 'Read the four layers in full' : 'متن کامل چهار لایه'}</summary>
          <p className="section-block__body">{t.layersIntro}</p>
          {[
            { num: lang === 'en' ? 'Layer 1' : 'لایه ۱', title: t.layer1Title, body: t.layer1Body },
            { num: lang === 'en' ? 'Layer 2' : 'لایه ۲', title: t.layer2Title, body: t.layer2Body },
            { num: lang === 'en' ? 'Layer 3' : 'لایه ۳', title: t.layer3Title, body: t.layer3Body },
            { num: lang === 'en' ? 'Layer 4' : 'لایه ۴', title: t.layer4Title, body: t.layer4Body },
          ].map((layer, i) => (
            <p key={i} className="section-block__body">
              <strong>{layer.num} — {layer.title}.</strong> {layer.body}
            </p>
          ))}
          {t.layersOutro && <p className="section-block__body">{t.layersOutro}</p>}
        </details>
      )}

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
        eyebrow={t.refusalEyebrow}
        title={t.refusalTitle}
        body={t.refusalBody}
        note={t.refusalNote}
      />

      {/* The refusal chain, watched rather than read — stages accumulate
          as you scroll; the criteria fill a conformance ring. */}
      {t.refusalStages && <RefusalScrollStory />}

      {t.plateCriteria && (
        <Figure num="S-02" src={t.plateCriteria.src} caption={t.plateCriteria.caption} />
      )}

      {t.plateMemory && (
        <Figure num="S-03" src={t.plateMemory.src} caption={t.plateMemory.caption} />
      )}

      <p className="bp-details">
        <Link className="hm-link hm-link--primary" to={`/${lang}/exhibition`}>
          {lang === 'en'
            ? 'The price of recall, instrumented — visit the Memory Wing →'
            : 'بهای فراخوانی، ابزارمند — دیدار از بال حافظه ←'}
        </Link>
      </p>

      <SectionBlock
        title={t.pathTitle}
        body={t.pathBody}
      />

      <p className="bp-details">
        <Link className="btn btn-primary" to={`/${lang}/exhibition?view=stack`}>
          {lang === 'en' ? 'You have read the chain. Now watch it refuse →' : 'زنجیره را خواندید؛ اکنون امتناعش را تماشا کنید ←'}
        </Link>
      </p>

      <FAQAccordion title={t.faqTitle} items={t.faqs} />

      <CTABand
        title={lang === 'en' ? 'Safety is an engineering commitment, not a feature set.' : 'ایمنی یک تعهد مهندسی است، نه یک مجموعه ویژگی.'}
        body={lang === 'en' ? 'If you are building systems where that distinction matters, we would like to talk.' : 'اگر شما در حال ساخت سیستم‌هایی هستید که این تمایز در آنها اهمیت دارد، خوشحال می‌شویم گفتگو کنیم.'}
        cta1={lang === 'en' ? 'Safety Inquiry' : 'پرس‌وجوی ایمنی'}
        cta1To={`/${lang}/contact`}
        cta2={lang === 'en' ? 'Watch the chain refuse — live' : 'تماشای زندهٔ زنجیرهٔ امتناع'}
        cta2To={`/${lang}/exhibition?view=stack`}
      />
    </main>
  );
}
