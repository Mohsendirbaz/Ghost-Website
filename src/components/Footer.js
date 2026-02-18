import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import './Footer.css';

export default function Footer() {
  const { lang, toggleLang } = useLang();
  const t = copy[lang];

  const pages = [
    { label: t.nav.home, to: `/${lang}` },
    { label: t.nav.technology, to: `/${lang}/technology` },
    { label: t.nav.science, to: `/${lang}/science` },
    { label: t.nav.safety, to: `/${lang}/safety` },
    { label: t.nav.partners, to: `/${lang}/partners` },
    { label: t.nav.company, to: `/${lang}/company` },
    { label: t.nav.contact, to: `/${lang}/contact` },
    { label: t.nav.perspective, to: `/${lang}/perspective` },
    { label: t.nav.architecture, to: `/${lang}/architecture` },
    { label: t.nav.knowledgeBase, to: `/${lang}/knowledge-base` },
    { label: t.nav.artifacts, to: `/${lang}/artifacts` },
    { label: t.nav.libraryAssets, to: `/${lang}/library/assets` },
    { label: t.nav.documentArchive, to: `/${lang}/library` },
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
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

        <div className="footer__col">
          <h3 className="footer__col-title">{t.footer.pages}</h3>
          <ul className="footer__links">
            {pages.map(p => (
              <li key={p.to}>
                <Link to={p.to} className="footer__link">{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>

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
