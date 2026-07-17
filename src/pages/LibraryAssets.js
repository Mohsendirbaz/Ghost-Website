import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Breadcrumb from '../components/Breadcrumb';
import { CRITICAL_ASSETS, HIGH_ASSETS, ASSET_STATUS } from '../data/libraryAssets';
import './Page.css';

/**
 * The Technical Library — redesigned to the home page's grammar:
 * monospace eyebrows, blueprint frames, a shelf of real covers, honest
 * counts computed from the data itself, and per-asset standings chips.
 * Assets that are not READY say so instead of pretending.
 */

const TIERS = [CRITICAL_ASSETS, HIGH_ASSETS];

const STATUS_LABEL = {
  [ASSET_STATUS.READY]: null, // ready is the default; no badge noise
  [ASSET_STATUS.IN_PROGRESS]: { en: 'in progress', fa: 'در حال آماده‌سازی' },
  [ASSET_STATUS.QUEUED]: { en: 'queued', fa: 'در صف' },
  [ASSET_STATUS.NEEDS_REVIEW]: { en: 'in review', fa: 'در بازبینی' },
  [ASSET_STATUS.BLOCKED]: { en: 'held', fa: 'متوقف' },
};

function matches(asset, q) {
  if (!q) return true;
  const hay = [
    asset.title?.en, asset.title?.fa,
    asset.description?.en, asset.description?.fa,
    (asset.tags || []).join(' '),
    asset.filename,
  ].join(' ').toLowerCase();
  return q.toLowerCase().split(/\s+/).every((w) => hay.includes(w));
}

export default function LibraryAssets() {
  const { lang } = useLang();
  const fa = lang === 'fa';
  const [q, setQ] = useState('');

  const total = useMemo(
    () => TIERS.reduce((n, t) => n + t.categories.reduce((m, c) => m + c.assets.length, 0), 0),
    []
  );

  const t = {
    eyebrow: fa ? 'منابع · کتابخانهٔ فنی' : 'Resources · Technical Library',
    h1: fa ? 'کتابخانهٔ فنی' : 'The Technical Library',
    lead: fa
      ? `${total} سند منتخب که ادعاهای برنامه را حمل می‌کنند — هر یک با جلد، جایگاه و متن کامل. آرشیو کامل اسناد جداگانه در دسترس است.`
      : `${total} curated documents carrying the program's claims — each with its cover, standing, and full text. The complete Document Archive is available separately.`,
    filter: fa ? 'جست‌وجو در کتابخانه…' : 'Filter the library…',
    empty: fa ? 'سندی با این جست‌وجو یافت نشد.' : 'No documents match this filter.',
    archive: fa ? 'آرشیو کامل اسناد' : 'Complete Document Archive',
  };

  const nothingMatches = q && TIERS.every((tier) =>
    tier.categories.every((c) => c.assets.every((a) => !matches(a, q)))
  );

  return (
    <main id="main-content" className="hm">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: t.h1 },
      ]} />

      <section className="hm-hero" style={{ paddingBlockEnd: '0.5rem' }}>
        <p className="hm-eyebrow">{t.eyebrow}</p>
        <h1 className="hm-h1" style={{ maxWidth: '24ch' }}>{t.h1}</h1>
        <p className="hm-sub">{t.lead}</p>
        <p className="hm-links">
          <input
            type="search"
            className="tl-filter"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.filter}
            aria-label={t.filter}
          />
          <Link className="hm-link" to={`/${lang}/library`}>
            {t.archive} {fa ? '←' : '→'}
          </Link>
        </p>
      </section>

      {TIERS.map((tier) => {
        const cats = tier.categories
          .map((c) => ({ ...c, shown: c.assets.filter((a) => matches(a, q)) }))
          .filter((c) => c.shown.length > 0);
        if (!cats.length) return null;
        return (
          <section key={tier.id} className="tl-tier">
            <p className="hm-eyebrow">
              {fa ? tier.name.fa : tier.name.en} · {fa ? tier.description.fa : tier.description.en}
            </p>
            {cats.map((cat) => (
              <div key={cat.id} className="tl-cat">
                <h2 className="tl-cat__title">{fa ? cat.name.fa : cat.name.en}</h2>
                <div className="bp-shelf">
                  {cat.shown.map((a) => {
                    const badge = STATUS_LABEL[a.status];
                    return (
                      <Link key={a.slug} className="bp-shelf-card" to={`/${lang}/library/assets/${a.slug}`}>
                        <span className={`bp-frame bp-shelf-card__cover${a.cover ? '' : ' bp-shelf-card__cover--text'}`}>
                          {a.cover ? (
                            <img src={a.cover} alt={fa ? a.title.fa : a.title.en} loading="lazy" />
                          ) : (
                            <span className="bp-shelf-card__mono">{fa ? a.title.fa : a.title.en}</span>
                          )}
                        </span>
                        <span className="tl-meta">
                          <span className="tl-meta__type">{(a.type || '').toUpperCase()}{a.lang ? ` · ${a.lang.toUpperCase()}` : ''}</span>
                          {badge && <span className="standing-chip">{fa ? badge.fa : badge.en}</span>}
                        </span>
                        <span className="bp-shelf-card__t">{fa ? a.title.fa : a.title.en}</span>
                        <span className="bp-shelf-card__d">{fa ? a.description.fa : a.description.en}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        );
      })}

      {nothingMatches && (
        <section className="tl-tier"><p className="hm-sub">{t.empty}</p></section>
      )}
    </main>
  );
}
