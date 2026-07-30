import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { copy } from '../data/copy';
import { getNavGroups } from '../data/navConfig';
import { KB_PARTS as kbParts } from '../data/knowledgeBase';
import { MAJOR_WORKS } from '../data/majorWorks';
import { CRITICAL_ASSETS, HIGH_ASSETS, flattenAssets, buildAssetPath } from '../data/libraryAssets';
import { ARTIFACTS } from '../data/artifacts';
import './SearchOverlay.css';

/**
 * Site search — rebuilt 2026-07-22.
 * Previously the overlay searched page labels and KB chapter titles only, by
 * bare substring: a query for any of the 21 published documents, any artifact,
 * or any instrument description returned nothing. It now searches ONE scored
 * index built from the site's own registries (per the target-architecture
 * "one definition, many renderings" rule):
 *   pages (from navConfig — the shared nav registry, no private copy),
 *   instruments (MAJOR_WORKS), documents (the full Technical Library),
 *   artifacts (the gallery), and Knowledge Base chapters.
 * Matching: normalized (Persian ي/ك → ی/ک, ZWNJ-insensitive, diacritic-
 * insensitive), multi-term AND, scored (label prefix > word start > substring
 * > tags > description), grouped with localized group labels, keyboard-
 * navigable across all groups.
 */

// ─── Text normalization (EN + FA robust) ─────────────────────────────────────

function norm(s) {
  if (!s) return '';
  return String(s)
    .toLowerCase()
    .replace(/‌/g, '')            // ZWNJ (نیم‌فاصله) — match with or without
    .replace(/[ي]/g, 'ی')    // Arabic yeh → Persian yeh
    .replace(/[ك]/g, 'ک')    // Arabic kaf → Persian kaf
    .normalize('NFD')
    .replace(/[̀-ًͯ-ٟ]/g, ''); // latin + arabic diacritics
}

// ─── Scoring ─────────────────────────────────────────────────────────────────

function scoreEntry(entry, terms) {
  let total = 0;
  for (const term of terms) {
    let s = 0;
    if (entry._label.startsWith(term)) s = 100;
    else if (entry._label.includes(' ' + term) || entry._label.includes('‌' + term)) s = 80;
    else if (entry._label.includes(term)) s = 60;
    else if (entry._keywords.split(' ').some((k) => k.startsWith(term))) s = 40;
    else if (entry._keywords.includes(term)) s = 30;
    else if (entry._desc.includes(term)) s = 20;
    if (s === 0) return 0;             // every term must match somewhere (AND)
    total += s;
  }
  return total;
}

// ─── Index builders (one entry shape for every source) ───────────────────────

function makeEntry(label, desc, keywords, path) {
  return {
    label, desc, path,
    _label: norm(label), _desc: norm(desc), _keywords: norm(keywords),
  };
}

function pick(field, lang) {
  if (field == null) return '';
  if (typeof field === 'object') return field[lang] || field.en || '';
  return field;
}

function buildIndex(lang) {
  const t = copy[lang].nav;
  const isRtl = lang === 'fa';

  // Pages — from the shared nav registry (single source of truth)
  const pages = getNavGroups(t, lang, isRtl).flatMap((g) =>
    g.links.map((l) => makeEntry(l.label, l.desc || '', g.label, l.to))
  );

  // Instruments — the major works, deep-linked into open viewers
  const works = MAJOR_WORKS.map((w) => {
    const l = lang === 'fa' ? w.fa : w.en;
    return makeEntry(l.t, l.k, `${w.key} ${w.wing || ''}`, `/${lang}${w.enter}`);
  });

  // Documents — the full Technical Library (both tiers, honest statuses kept)
  const documents = flattenAssets([CRITICAL_ASSETS, HIGH_ASSETS]).map((a) =>
    makeEntry(
      pick(a.title, lang),
      pick(a.description, lang),
      `${(a.tags || []).join(' ')} ${a.filename || ''} ${pick(a.categoryName, lang)}`,
      buildAssetPath(lang, a.slug)
    )
  );

  // Artifacts — the interactive gallery
  const artifacts = ARTIFACTS.map((a) =>
    makeEntry(
      (a[lang] && a[lang].title) || (a.en && a.en.title) || a.slug,
      (a[lang] && a[lang].description) || (a.en && a.en.description) || '',
      `${(a.tags || []).join(' ')} ${a.category || ''}`,
      `/${lang}/artifacts/${a.slug}`
    )
  );

  // Knowledge Base chapters
  const kb = [];
  (kbParts || []).forEach((part) => {
    (part.chapters || []).forEach((chapter) => {
      kb.push(makeEntry(chapter.title, part.title, '', `/${lang}/knowledge-base/${part.slug}/${chapter.slug}`));
    });
  });

  return { pages, works, documents, artifacts, kb };
}

// ─── Search across all groups ────────────────────────────────────────────────

const GROUP_ORDER = ['pages', 'works', 'documents', 'artifacts', 'kb'];
const GROUP_CAPS = { pages: 5, works: 5, documents: 6, artifacts: 4, kb: 6 };

function runSearch(query, index) {
  const empty = { pages: [], works: [], documents: [], artifacts: [], kb: [] };
  const q = norm(query.trim());
  if (q.length < 2) return empty;
  const terms = q.split(/\s+/).filter(Boolean);

  const out = {};
  for (const key of GROUP_ORDER) {
    out[key] = index[key]
      .map((e) => ({ e, s: scoreEntry(e, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, GROUP_CAPS[key])
      .map((r) => r.e);
  }
  return out;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SearchOverlay({ lang, onClose }) {
  const t = copy[lang].nav;
  const fa = lang === 'fa';
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const index = useMemo(() => buildIndex(lang), [lang]);
  const results = useMemo(() => runSearch(query, index), [query, index]);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { setActiveIdx(-1); }, [query]);

  const GROUP_LABELS = {
    pages: fa ? 'صفحات' : 'Pages',
    works: fa ? 'ابزارهای زنده' : 'Live instruments',
    documents: fa ? 'اسناد و مقالات' : 'Documents & papers',
    artifacts: fa ? 'آرتیفکت‌ها' : 'Artifacts',
    kb: fa ? 'پایگاه دانش' : 'Knowledge Base',
  };

  const groups = GROUP_ORDER
    .map((key) => ({ key, label: GROUP_LABELS[key], items: results[key] }))
    .filter((g) => g.items.length > 0);
  const allResults = groups.flatMap((g) => g.items);
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
      } else if (allResults.length > 0) {
        navigate(allResults[0].path);   // Enter with no selection opens the top hit
        onClose();
      }
    }
  }

  function handleSelect(path) {
    navigate(path);
    onClose();
  }

  let runningIdx = -1;

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
            {groups.map((group) => (
              <div className="search-overlay__group" key={group.key}>
                <div className="search-overlay__group-label">{group.label}</div>
                {group.items.map((item) => {
                  runningIdx += 1;
                  const idx = runningIdx;
                  return (
                    <button
                      key={`${group.key}-${item.path}`}
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
            ))}
          </div>
        )}

        {query.trim().length >= 2 && !hasResults && (
          <div className="search-overlay__empty">
            {fa ? 'نتیجه‌ای یافت نشد' : 'No results found'}
          </div>
        )}
      </div>
    </div>
  );
}
