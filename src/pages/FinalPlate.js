import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Breadcrumb from '../components/Breadcrumb';
import { HeroMinimal } from '../components/Hero';
import './Page.css';

/**
 * The Final Plate — the deliberate last page of the website.
 * One exhibit: the EPU poster, the endpoint the whole program points at —
 * "Physics-Enforced. Silicon-Realized." (the footer tagline, pictured).
 * Reached last in every ordering: final nav entry, final sitemap URL,
 * and the closing link in the footer of every page.
 *
 * Standings discipline: the poster states aspiration, not measurement —
 * the plate is framed and labeled PROPOSED. The artwork keeps its own
 * palette in both themes (posters, like covers, are exempt from inversion).
 * Files: public/posters/epu-poster.png (original, supplied by the author);
 * epu-poster.web.jpg (optimized derivative served inline).
 */

const POSTER = '/posters/epu-poster.web.jpg';
const POSTER_FULL = '/posters/epu-poster.jpg';

export default function FinalPlate() {
  const { lang } = useLang();
  const fa = lang === 'fa';
  const [missing, setMissing] = useState(false);

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: fa ? 'برگ پایانی' : 'The Final Plate' },
      ]} />
      <HeroMinimal
        h1={fa ? 'برگ پایانی' : 'The Final Plate'}
        subhead={fa
          ? 'پایان نمایشگاه: واحد پردازش رویداد — معماری محاسباتی‌ای که همهٔ برنامه به آن اشاره می‌کند. فیزیک، در خودِ بستر سخت‌افزار اعمال می‌شود. جایگاه ادعا: پیشنهادی.'
          : 'The end of the exhibition: the Event Processing Unit — the computing architecture the whole program points toward. Physics, enforced at the hardware substrate itself. Standing: proposed.'}
      />

      <section className="section-block" style={{ paddingTop: '1rem' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <p style={{ margin: 0, fontFamily: 'var(--bp-mono)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--bp-ink-soft)' }}>
              {fa ? 'پلاک ۱ از ۱ · پوستر مفهومی · پیشنهادی' : 'Plate 1 of 1 · concept poster · PROPOSED'}
            </p>
            {!missing && (
              <a href={POSTER_FULL} target="_blank" rel="noopener noreferrer" className="btn">
                {fa ? 'تمام‌صفحه ↗' : 'Open full ↗'}
              </a>
            )}
          </div>

          <figure className="bp-frame" style={{ margin: 0, padding: 'clamp(0.6rem, 1.6vw, 1.1rem)', overflow: 'hidden' }}>
            {missing ? (
              <div role="status" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {fa ? 'پلاک در صف است' : 'Plate queued'}
                </p>
                <p className="section-block__note" style={{ marginTop: '0.5rem' }}>
                  {fa
                    ? 'فایل اصلی پوستر هنوز در مخزن قرار نگرفته است؛ به محض افزوده شدن، همین‌جا نمایش داده می‌شود.'
                    : 'The original poster file has not been added to the repository yet; it will appear here the moment it is.'}
                </p>
              </div>
            ) : (
              <img
                src={POSTER}
                onError={() => setMissing(true)}
                alt={fa
                  ? 'پوستر EPU: واحد پردازش رویداد — معماری محاسباتی. «فیزیک در بستر سخت‌افزار اعمال می‌شود.» چهار کاشی: نسبیت عام، دینامیک سیالات محاسباتی، دینامیک حسگری کوانتومی، بهینه‌سازی عاملی بی‌درنگ — و در پایین: پیاده‌سازی از طریق انتگرال‌های مکانیک سماوی.'
                  : 'EPU poster: Event Processing Unit — computing architecture. "Physics enforced at hardware substrate." Four tiles: based on the science of general relativity; computational fluid dynamics; quantum sensing dynamics; real-time agentic optimization — and beneath, implemented via celestial-mechanics integrals.'}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            )}
          </figure>
          <figcaption className="bp-figcaption" style={{ marginTop: '0.75rem' }}>
            {fa
              ? 'واحد پردازش رویداد — معماری محاسباتی. شعار پانوشت سایت، به تصویر: «فیزیک‌مدار. سیلیکون‌شده.» این برگ، جهت‌گیری برنامه را بیان می‌کند، نه اندازه‌گیری را؛ ادعاهای آن با جایگاه «پیشنهادی» ثبت شده‌اند.'
              : 'The Event Processing Unit — computing architecture. The site’s closing line, pictured: “Physics-Enforced. Silicon-Realized.” This plate states the program’s direction, not a measurement; its claims carry the PROPOSED standing.'}
          </figcaption>

          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link className="btn btn-primary" to={`/${lang}`} style={{ textDecoration: 'none' }}>
              {fa ? 'بازگشت به آغاز ⟶' : '⟵ Back to the beginning'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
