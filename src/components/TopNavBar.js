import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import './TopNavBar.css';

export default function TopNavBar() {
  const { lang } = useLang();
  const location = useLocation();
  const t = copy[lang].nav;
  const isRtl = lang === 'fa';
  const trackRef = useRef(null);

  // All 15 pages flattened, grouped with separators
  const groups = [
    {
      id: 'company',
      links: [
        { label: t.home,       to: `/${lang}` },
        { label: t.technology, to: `/${lang}/technology` },
        { label: t.science,    to: `/${lang}/science` },
        { label: t.safety,     to: `/${lang}/safety` },
        { label: t.bio,        to: `/${lang}/bio` },
        { label: t.contact,    to: `/${lang}/contact` },
      ],
    },
    {
      id: 'research',
      links: [
        { label: t.perspective,  to: `/${lang}/perspective` },
        { label: t.architecture, to: `/${lang}/architecture` },
        { label: t.knowledgeBase, to: `/${lang}/knowledge-base` },
        { label: t.memoryWing, to: `/${lang}/memory` },
      ],
    },
    {
      id: 'resources',
      links: [
        { label: t.artifacts,       to: `/${lang}/artifacts` },
        { label: t.libraryAssets,   to: `/${lang}/library/assets` },
        { label: t.documentArchive, to: `/${lang}/library` },
      ],
    },
  ];

  return (
    <nav
      className={`topnav${isRtl ? ' topnav--rtl' : ''}`}
      aria-label={isRtl ? 'ناوبری سریع' : 'Quick navigation'}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="topnav__track" ref={trackRef}>
        {groups.map((group, gi) => (
          <div key={group.id} className="topnav__group">
            {gi > 0 && <span className="topnav__sep" aria-hidden="true" />}
            {group.links.map((link) => {
              const isActive =
                link.to === `/${lang}`
                  ? location.pathname === `/${lang}` || location.pathname === `/${lang}/`
                  : location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`topnav__link${isActive ? ' topnav__link--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );
}
