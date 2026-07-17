import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import './Page.css';

/** 404 — a real page instead of a silent redirect, so broken inbound
    links are visible to visitors and to analytics alike. */
export default function NotFound() {
  const { lang } = useLang();
  const fa = lang === 'fa';
  const { pathname } = useLocation();
  const arrow = fa ? '←' : '→';
  return (
    <main id="main-content" className="hm">
      <section className="hm-hero" style={{ minHeight: '46vh' }}>
        <p className="hm-eyebrow">404 · {fa ? 'یافت نشد' : 'not found'}</p>
        <h1 className="hm-h1">{fa ? 'بیرون از مجموعهٔ مجاز.' : 'Outside the admissible set.'}</h1>
        <p className="hm-sub">
          {fa
            ? `نشانی «${pathname}» به هیچ صفحه‌ای نمی‌رسد. مقصدهای مجاز از این‌جا:`
            : `The address “${pathname}” reaches no page. Admissible destinations from here:`}
        </p>
        <p className="hm-links">
          <Link className="hm-link hm-link--primary" to={`/${lang}`}>{fa ? 'خانه' : 'Home'} {arrow}</Link>
          <Link className="hm-link" to={`/${lang}/exhibition`}>{fa ? 'نمایشگاه' : 'The Exhibition'} {arrow}</Link>
          <Link className="hm-link" to={`/${lang}/library`}>{fa ? 'آرشیو اسناد' : 'Document Archive'} {arrow}</Link>
        </p>
      </section>
    </main>
  );
}
