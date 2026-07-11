import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { copy } from '../data/copy';
import { KB_PARTS as kbParts } from '../data/knowledgeBase';
import './SearchOverlay.css';

// ─── Build static page index ──────────────────────────────────────────────────

function buildPageIndex(lang) {
  const t = copy[lang].nav;
  return [
    { label: t.home,            path: `/${lang}`,              type: 'page' },
    { label: t.technology,      path: `/${lang}/technology`,   type: 'page' },
    { label: t.science,         path: `/${lang}/science`,      type: 'page' },
    { label: t.safety,          path: `/${lang}/safety`,       type: 'page' },
    { label: t.partners,        path: `/${lang}/partners`,     type: 'page' },
    { label: t.company,         path: `/${lang}/company`,      type: 'page' },
    { label: t.contact,         path: `/${lang}/contact`,      type: 'page' },
    { label: t.perspective,     path: `/${lang}/perspective`,  type: 'page' },
    { label: t.architecture,    path: `/${lang}/architecture`, type: 'page' },
    { label: t.knowledgeBase,   path: `/${lang}/knowledge-base`, type: 'page' },
    { label: t.artifacts,       path: `/${lang}/artifacts`,    type: 'page' },
    { label: t.libraryAssets,    path: `/${lang}/library/assets`,     type: 'page' },
    { label: t.documentArchive,  path: `/${lang}/library`,            type: 'page' },
    { label: t.multiAgentSystem, path: `/${lang}/multi-agent-system`, type: 'page' },
    { label: t.methods,          path: `/${lang}/methods`,            type: 'page' },
    { label: t.exhibition,       path: `/${lang}/exhibition`,         type: 'page' },
    { label: t.invest,           path: `/${lang}/invest`,             type: 'page' },
    { label: t.bio,              path: `/${lang}/bio`,                type: 'page' },
  ];
}

// ─── Build KB chapter index ───────────────────────────────────────────────────

function buildKbIndex(lang) {
  const results = [];
  (kbParts || []).forEach((part) => {
    (part.chapters || []).forEach((chapter) => {
      results.push({
        label: chapter.title,
        desc: part.title,
        path: `/${lang}/knowledge-base/${part.slug}/${chapter.slug}`,
        type: 'kb',
      });
    });
  });
  return results;
}

// ─── Simple substring search ──────────────────────────────────────────────────

function search(query, pageIndex, kbIndex) {
  if (!query || query.trim().length < 2) return { pages: [], kb: [] };
  const q = query.toLowerCase();

  const pages = pageIndex.filter((item) =>
    item.label.toLowerCase().includes(q)
  );

  const kb = kbIndex.filter((item) =>
    item.label.toLowerCase().includes(q) ||
    (item.desc && item.desc.toLowerCase().includes(q))
  );

  return { pages: pages.slice(0, 5), kb: kb.slice(0, 8) };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SearchOverlay({ lang, onClose }) {
  const t = copy[lang].nav;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ pages: [], kb: [] });
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Build indexes once
  const pageIndex = buildPageIndex(lang);
  const kbIndex = buildKbIndex(lang);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Update results as query changes
  useEffect(() => {
    setResults(search(query, pageIndex, kbIndex));
    setActiveIdx(-1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, lang]);

  // Flatten all results for keyboard navigation
  const allResults = [...results.pages, ...results.kb];
  const hasResults = allResults.length > 0 && query.trim().length >= 2;

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, allResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      if (activeIdx >= 0 && allResults[activeIdx]) {
        navigate(allResults[activeIdx].path);
        onClose();
      }
    }
  }

  function handleSelect(path) {
    navigate(path);
    onClose();
  }

  return (
    <div className="search-overlay" role="search" aria-label={t.searchAriaLabel}>
      <div className="container search-overlay__inner">
        <div className="search-overlay__field">
          <svg
            className="search-overlay__icon"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="M13.5 13.5L17 17" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            className="search-overlay__input"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label={t.searchAriaLabel}
            aria-controls="search-results"
            aria-activedescendant={activeIdx >= 0 ? `search-result-${activeIdx}` : undefined}
          />
          <button
            className="search-overlay__close"
            onClick={onClose}
            aria-label={copy[lang].nav.close}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <line x1="5" y1="5" x2="15" y2="15" />
              <line x1="15" y1="5" x2="5" y2="15" />
            </svg>
          </button>
        </div>

        {hasResults && (
          <div id="search-results" className="search-overlay__results" role="listbox" aria-label={t.searchAriaLabel}>
            {results.pages.length > 0 && (
              <div className="search-overlay__group">
                <div className="search-overlay__group-label">Pages</div>
                {results.pages.map((item, i) => (
                  <button
                    key={item.path}
                    id={`search-result-${i}`}
                    className={`search-overlay__result${activeIdx === i ? ' active' : ''}`}
                    role="option"
                    aria-selected={activeIdx === i}
                    onClick={() => handleSelect(item.path)}
                  >
                    <span className="search-overlay__result-label">{item.label}</span>
                  </button>
                ))}
              </div>
            )}

            {results.kb.length > 0 && (
              <div className="search-overlay__group">
                <div className="search-overlay__group-label">Knowledge Base</div>
                {results.kb.map((item, i) => {
                  const idx = results.pages.length + i;
                  return (
                    <button
                      key={item.path}
                      id={`search-result-${idx}`}
                      className={`search-overlay__result${activeIdx === idx ? ' active' : ''}`}
                      role="option"
                      aria-selected={activeIdx === idx}
                      onClick={() => handleSelect(item.path)}
                    >
                      <span className="search-overlay__result-label">{item.label}</span>
                      {item.desc && (
                        <span className="search-overlay__result-desc">{item.desc}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {query.trim().length >= 2 && !hasResults && (
          <div className="search-overlay__empty">
            {lang === 'fa' ? 'نتیجه‌ای یافت نشد' : 'No results found'}
          </div>
        )}
      </div>
    </div>
  );
}
