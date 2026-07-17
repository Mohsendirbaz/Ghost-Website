import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { copy } from '../data/copy';
import './Footer.css';

// ─── Icon map (stroke-only SVGs, 20×20 viewBox) ───────────────────────────────

const NAV_ICONS = {
  home: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M7 18v-6h6v6" />
    </svg>
  ),
  technology: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="16" height="10" rx="1" />
      <path d="M6 9h2m4 0h2M6 12h2m4 0h2" />
    </svg>
  ),
  science: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3v6L3 16h14L13 9V3" /><path d="M7 3h6" />
    </svg>
  ),
  safety: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V5l7-3z" />
      <path d="M7 10l2 2 4-4" />
    </svg>
  ),
  partners: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="3" /><circle cx="13" cy="7" r="3" />
      <path d="M2 17c0-3 2-4 5-4m6 0c3 0 5 1 5 4" />
    </svg>
  ),
  company: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="11" rx="1" />
      <path d="M6 7V5a4 4 0 018 0v2" /><path d="M10 12v2" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="16" height="12" rx="1.5" />
      <path d="M2 7l8 5 8-5" />
    </svg>
  ),
  perspective: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="10" cy="10" rx="8" ry="5" /><circle cx="10" cy="10" r="2" />
    </svg>
  ),
  architecture: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="13" width="16" height="3" rx="0.5" />
      <rect x="4" y="8.5" width="12" height="3" rx="0.5" />
      <rect x="6" y="4" width="8" height="3" rx="0.5" />
    </svg>
  ),
  knowledgeBase: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2h9l3 3v13H4V2z" /><path d="M13 2v3h3" /><path d="M7 9h6M7 12h4" />
    </svg>
  ),
  artifacts: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="7" height="7" rx="1" />
      <rect x="11" y="2" width="7" height="7" rx="1" />
      <rect x="2" y="11" width="7" height="7" rx="1" />
      <rect x="11" y="11" width="7" height="7" rx="1" />
    </svg>
  ),
  libraryAssets: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h4v12H4zM10 4h6v4h-6zM10 11h6v5h-6z" />
    </svg>
  ),
  documentArchive: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="11" rx="1" />
      <path d="M2 7l2-4h12l2 4" /><path d="M7 12h6" />
    </svg>
  ),
};

// ─── Nav pages with icon keys ─────────────────────────────────────────────────

function buildPages(t, lang) {
  return [
    { label: t.nav.home,            to: `/${lang}`,              iconKey: 'home'            },
    { label: t.nav.technology,      to: `/${lang}/technology`,   iconKey: 'technology'      },
    { label: t.nav.safety,          to: `/${lang}/safety`,       iconKey: 'safety'          },
    { label: t.nav.contact,         to: `/${lang}/contact`,      iconKey: 'contact'         },
    { label: t.nav.perspective,     to: `/${lang}/perspective`,  iconKey: 'perspective'     },
    { label: t.nav.architecture,    to: `/${lang}/architecture`, iconKey: 'architecture'    },
    { label: t.nav.knowledgeBase,   to: `/${lang}/knowledge-base`, iconKey: 'knowledgeBase' },
    { label: t.nav.artifacts,       to: `/${lang}/artifacts`,    iconKey: 'artifacts'       },
    { label: t.nav.libraryAssets,   to: `/${lang}/library/assets`, iconKey: 'libraryAssets' },
    { label: t.nav.documentArchive, to: `/${lang}/library`,      iconKey: 'documentArchive' },
  ];
}

// ─── Footer component ─────────────────────────────────────────────────────────

export default function Footer() {
  const { lang, toggleLang } = useLang();
  const { isDark, toggleTheme } = useTheme();
  const t = copy[lang];
  const pages = buildPages(t, lang);

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <Link to={`/${lang}`} className="footer__logo" aria-label="Ghost Autonomy Home">
            <span className="logo-mark">GA</span>
            <span className="logo-word">Ghost Autonomy</span>
          </Link>
          <p className="footer__tagline">{t.footer.tagline}</p>
          <div className="footer__toggles">
            <button
              className="footer__theme-btn"
              onClick={toggleTheme}
              aria-label={t.nav.themeToggleAriaLabel}
              aria-pressed={isDark}
            >
              {isDark ? t.nav.switchToLight : t.nav.switchToDark}
            </button>
            <button className="footer__lang-btn" onClick={toggleLang}>
              {t.nav.switchLang}
            </button>
          </div>
        </div>

        {/* Icon nav */}
        <div className="footer__col footer__col--nav">
          <h3 className="footer__col-title">{t.footer.pages}</h3>
          <div className="footer__icon-nav">
            {pages.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="footer__icon-link"
                aria-label={p.label}
                data-tooltip={p.label}
              >
                {NAV_ICONS[p.iconKey]}
              </Link>
            ))}
          </div>
        </div>

        {/* Legal + contact */}
        <div className="footer__col">
          <h3 className="footer__col-title">{t.footer.legal}</h3>
          <ul className="footer__links">
            <li><Link className="footer__link" to={`/${lang}/privacy`}>{t.footer.privacy}</Link></li>
            <li><Link className="footer__link" to={`/${lang}/terms`}>{t.footer.terms}</Link></li>
          </ul>
          <div className="footer__contact">
            <a href="mailto:dirbaz.sharif@gmail.com" className="footer__link">
              dirbaz.sharif@gmail.com
            </a>
            <a href="tel:+13129255930" className="footer__link">
              Dr. Mohsen Dirbaz · +1-312-925-5930
            </a>
          </div>
        </div>

      </div>

      <div className="footer__bottom">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
          <p className="footer__copy">{t.footer.copyright}</p>
          <Link className="footer__link" to={`/${lang}/epu`}>{t.footer.finalPlate} →</Link>
        </div>
      </div>
    </footer>
  );
}
