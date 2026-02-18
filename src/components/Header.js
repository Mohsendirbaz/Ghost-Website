import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import './Header.css';

// ─── Icons ────────────────────────────────────────────────────────────────────

const Icons = {
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
      <path d="M7 3v6L3 16h14L13 9V3" />
      <path d="M7 3h6" />
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
      <circle cx="7" cy="7" r="3" />
      <circle cx="13" cy="7" r="3" />
      <path d="M2 17c0-3 2-4 5-4m6 0c3 0 5 1 5 4" />
    </svg>
  ),
  company: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="11" rx="1" />
      <path d="M6 7V5a4 4 0 018 0v2" />
      <path d="M10 12v2" />
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
      <ellipse cx="10" cy="10" rx="8" ry="5" />
      <circle cx="10" cy="10" r="2" />
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
      <path d="M4 2h9l3 3v13H4V2z" />
      <path d="M13 2v3h3" />
      <path d="M7 9h6M7 12h4" />
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
      <path d="M2 7l2-4h12l2 4" />
      <path d="M7 12h6" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="6" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="10" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="14" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="6" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="10" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="14" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="6" cy="14" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="10" cy="14" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="14" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="5" y1="5" x2="15" y2="15" />
      <line x1="15" y1="5" x2="5" y2="15" />
    </svg>
  ),
};

// ─── Mega-menu panel ──────────────────────────────────────────────────────────

function MegaMenuPanel({ open, groups, onClose, lang }) {
  const location = useLocation();

  return (
    <>
      {open && (
        <div className="header__backdrop" onClick={onClose} aria-hidden="true" />
      )}
      <nav
        className={`megamenu${open ? ' megamenu--open' : ''}`}
        aria-label="Site navigation"
        aria-hidden={!open}
      >
        <div className="container megamenu__inner">
          {groups.map((group) => (
            <div key={group.id} className="megamenu__group">
              <div className="megamenu__group-title">{group.label}</div>
              {group.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`megamenu__item${location.pathname === link.to ? ' active' : ''}`}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                >
                  <span className="megamenu__item-icon">{Icons[link.iconKey]}</span>
                  <span className="megamenu__item-text">
                    <span className="megamenu__item-label">{link.label}</span>
                    <span className="megamenu__item-desc">{link.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Header() {
  const { lang, toggleLang } = useLang();
  const t = copy[lang].nav;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ESC to close
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setMenuOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Nav groups
  const isRtl = lang === 'fa';
  const navGroups = [
    {
      id: 'company',
      label: isRtl ? 'شرکت' : 'Company',
      links: [
        { label: t.home,        to: `/${lang}`,             iconKey: 'home',        desc: isRtl ? 'صفحه اصلی' : 'Start here' },
        { label: t.technology,  to: `/${lang}/technology`,  iconKey: 'technology',  desc: isRtl ? 'پشته فناوری ما' : 'Our technology stack' },
        { label: t.science,     to: `/${lang}/science`,     iconKey: 'science',     desc: isRtl ? 'علم پشت سیستم' : 'The science behind the system' },
        { label: t.safety,      to: `/${lang}/safety`,      iconKey: 'safety',      desc: isRtl ? 'رویکرد ایمنی' : 'Safety-first approach' },
        { label: t.partners,    to: `/${lang}/partners`,    iconKey: 'partners',    desc: isRtl ? 'همکاران و شرکاء' : 'Collaborators & partners' },
        { label: t.company,     to: `/${lang}/company`,     iconKey: 'company',     desc: isRtl ? 'درباره Ghost Autonomy' : 'About Ghost Autonomy' },
        { label: t.contact,     to: `/${lang}/contact`,     iconKey: 'contact',     desc: isRtl ? 'تماس با ما' : 'Get in touch' },
      ],
    },
    {
      id: 'research',
      label: isRtl ? 'تحقیق و دانش' : 'Research',
      links: [
        { label: t.perspective,   to: `/${lang}/perspective`,   iconKey: 'perspective',   desc: isRtl ? 'دیدگاه صنعت' : 'Industry perspective' },
        { label: t.architecture,  to: `/${lang}/architecture`,  iconKey: 'architecture',  desc: isRtl ? 'معماری سیستم' : 'System architecture deep-dive' },
        { label: t.knowledgeBase, to: `/${lang}/knowledge-base`,iconKey: 'knowledgeBase', desc: isRtl ? '۸ بخش · ۴۷ فصل' : '8 parts · 47 chapters' },
      ],
    },
    {
      id: 'resources',
      label: isRtl ? 'منابع' : 'Resources',
      links: [
        { label: t.artifacts,        to: `/${lang}/artifacts`,      iconKey: 'artifacts',        desc: isRtl ? 'تصویرسازی‌های تعاملی' : 'Interactive visualizations' },
        { label: t.libraryAssets,    to: `/${lang}/library/assets`, iconKey: 'libraryAssets',    desc: isRtl ? 'دارایی‌های فنی منتخب' : 'Curated technical assets' },
        { label: t.documentArchive,  to: `/${lang}/library`,        iconKey: 'documentArchive',  desc: isRtl ? '۱٬۷۵۱ سند آرشیو' : '1,751 archived documents' },
      ],
    },
  ];

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}${menuOpen ? ' header--menu-open' : ''}`} role="banner">
      <div className="container header__inner">
        <Link to={`/${lang}`} className="header__logo" aria-label="Ghost Autonomy Home">
          <span className="logo-mark">GA</span>
          <span className="logo-word">Ghost Autonomy</span>
        </Link>

        <MegaMenuPanel
          open={menuOpen}
          groups={navGroups}
          onClose={() => setMenuOpen(false)}
          lang={lang}
        />

        <div className="header__actions">
          <button
            className="header__lang-btn"
            onClick={toggleLang}
            aria-label={lang === 'en' ? 'Switch to Persian' : 'Switch to English'}
          >
            {t.switchLang}
          </button>
          <Link to={`/${lang}/contact`} className="btn btn-primary header__cta">
            {t.contact}
          </Link>
          <button
            className={`header__menu-btn${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="header__menu-btn-icon">
              {menuOpen ? Icons.close : Icons.menu}
            </span>
            <span className="header__menu-btn-label">
              {menuOpen ? (isRtl ? 'بستن' : 'Close') : (isRtl ? 'منو' : 'Menu')}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
