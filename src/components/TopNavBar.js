import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import { getNavGroups } from '../data/navConfig';
import './TopNavBar.css';

/**
 * TopNavBar — the fixed strip above the header, rebuilt 2026-07-17 as a
 * MULTI-LEVEL bar. Instead of trying to inline every page (which silently
 * dropped items when the site grew past the strip width), it now shows the
 * three menu groups as top-level triggers, each opening a dropdown that
 * mirrors the complete mega-menu. Fed by the shared navConfig, so it can
 * never fall behind the header menu again. A standalone Home link leads for
 * one-tap return.
 */

const Caret = () => (
  <svg className="topnav__caret" viewBox="0 0 10 6" width="9" height="6" aria-hidden="true">
    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function TopNavBar() {
  const { lang } = useLang();
  const location = useLocation();
  const t = copy[lang].nav;
  const isRtl = lang === 'fa';
  const groups = getNavGroups(t, lang, isRtl);
  const homeLink = groups[0].links[0]; // Company → Home

  const [openGroup, setOpenGroup] = useState(null);
  const barRef = useRef(null);
  const hoverTimer = useRef(null);

  // Close on route change
  useEffect(() => { setOpenGroup(null); }, [location]);

  // Close on outside click / Escape
  useEffect(() => {
    if (!openGroup) return undefined;
    const onDown = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) setOpenGroup(null);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpenGroup(null); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openGroup]);

  const isActive = (to) =>
    to === `/${lang}`
      ? location.pathname === `/${lang}` || location.pathname === `/${lang}/`
      : location.pathname.startsWith(to);

  const groupActive = (g) => g.links.some((l) => isActive(l.to));

  // Desktop hover intent (touch uses click)
  const openOnHover = (id) => { clearTimeout(hoverTimer.current); setOpenGroup(id); };
  const closeOnLeave = () => { hoverTimer.current = setTimeout(() => setOpenGroup(null), 140); };

  return (
    <nav
      className={`topnav${isRtl ? ' topnav--rtl' : ''}`}
      aria-label={isRtl ? 'ناوبری کامل' : 'Full navigation'}
      dir={isRtl ? 'rtl' : 'ltr'}
      ref={barRef}
    >
      <div className="topnav__track">
        <Link
          to={homeLink.to}
          className={`topnav__home${isActive(homeLink.to) ? ' topnav__link--active' : ''}`}
        >
          {homeLink.label}
        </Link>

        {groups.map((group) => {
          const open = openGroup === group.id;
          return (
            <div
              key={group.id}
              className="topnav__group"
              onMouseEnter={() => openOnHover(group.id)}
              onMouseLeave={closeOnLeave}
            >
              <button
                type="button"
                className={`topnav__trigger${open ? ' is-open' : ''}${groupActive(group) ? ' topnav__link--active' : ''}`}
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpenGroup(open ? null : group.id)}
              >
                {group.label}
                <Caret />
              </button>

              <div className={`topnav__menu${open ? ' is-open' : ''}`} role="menu" aria-label={group.label}>
                {group.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    role="menuitem"
                    className={`topnav__menu-item${isActive(link.to) ? ' is-active' : ''}`}
                    onClick={() => setOpenGroup(null)}
                    aria-current={isActive(link.to) ? 'page' : undefined}
                  >
                    <span className="topnav__menu-label">{link.label}</span>
                    {link.desc && <span className="topnav__menu-desc">{link.desc}</span>}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
