import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
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
    { label: t.nav.science,         to: `/${lang}/science`,      iconKey: 'science'         },
    { label: t.nav.safety,          to: `/${lang}/safety`,       iconKey: 'safety'          },
    { label: t.nav.partners,        to: `/${lang}/partners`,     iconKey: 'partners'        },
    { label: t.nav.company,         to: `/${lang}/company`,      iconKey: 'company'         },
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
  const location = useLocation();
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
          <button className="footer__lang-btn" onClick={toggleLang}>
            {t.nav.switchLang}
          </button>
        </div>

        {/* Labelled icon nav */}
        <div className="footer__col footer__col--nav">
          <h3 className="footer__col-title">{t.footer.pages}</h3>
          <nav aria-label="Footer navigation">
            <ul className="footer__nav-list">
              {pages.map((p) => (
                <li key={p.to}>
                  <Link
                    to={p.to}
                    className="footer__nav-item"
                    aria-label={p.label}
                    aria-current={location.pathname === p.to ? 'page' : undefined}
                  >
                    <span className="footer__nav-icon" aria-hidden="true">
                      {NAV_ICONS[p.iconKey]}
                    </span>
                    <span className="footer__nav-label">{p.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Legal + contact */}
        <div className="footer__col">
          <h3 className="footer__col-title">{t.footer.legal}</h3>
          <ul className="footer__links">
            <li><span className="footer__link">{t.footer.privacy}</span></li>
            <li><span className="footer__link">{t.footer.terms}</span></li>
          </ul>
          <div className="footer__contact">
            <a href="mailto:contact@ghostautonomy.com" className="footer__link">
              contact@ghostautonomy.com
            </a>
            <a href="mailto:press@ghostautonomy.com" className="footer__link">
              press@ghostautonomy.com
            </a>
          </div>
        </div>

      </div>

      <div className="footer__bottom">
        <div className="container">
          <p className="footer__copy">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
