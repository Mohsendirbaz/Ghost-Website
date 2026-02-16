import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import './Header.css';

export default function Header() {
  const { lang, toggleLang } = useLang();
  const t = copy[lang].nav;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: t.home, to: `/${lang}` },
    { label: t.technology, to: `/${lang}/technology` },
    { label: t.science, to: `/${lang}/science` },
    { label: t.safety, to: `/${lang}/safety` },
    { label: t.partners, to: `/${lang}/partners` },
    { label: t.company, to: `/${lang}/company` },
    { label: t.contact, to: `/${lang}/contact` },
    { label: t.perspective, to: `/${lang}/perspective` },
    { label: t.architecture, to: `/${lang}/architecture` },
  ];

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`} role="banner">
      <div className="container header__inner">
        <Link to={`/${lang}`} className="header__logo" aria-label="Ghost Autonomy Home">
          <span className="logo-mark">GA</span>
          <span className="logo-word">Ghost Autonomy</span>
        </Link>

        <nav className={`header__nav${menuOpen ? ' header__nav--open' : ''}`} aria-label="Main navigation">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`header__nav-link${location.pathname === link.to ? ' active' : ''}`}
              aria-current={location.pathname === link.to ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

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
            className={`header__burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
