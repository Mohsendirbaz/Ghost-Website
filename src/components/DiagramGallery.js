import { useState, useMemo } from 'react';
import { useLang } from '../context/LanguageContext';
import { diagrams, COLLECTIONS, CATEGORIES, CLAIMS, DIAGRAM_TYPES } from '../data/diagrams';
import { copy } from '../data/copy';
import DiagramViewer from './DiagramViewer';
import './DiagramGallery.css';

export default function DiagramGallery() {
  const { lang } = useLang();
  const t = copy[lang].architecture;

  const [search, setSearch] = useState('');
  const [activeCollection, setActiveCollection] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [activeClaim, setActiveClaim] = useState('all');

  const collectionKeys = Object.keys(COLLECTIONS);
  const categoryKeys = Object.keys(CATEGORIES);
  const typeKeys = Object.keys(DIAGRAM_TYPES);
  const claimKeys = Object.keys(CLAIMS);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return diagrams.filter(d => {
      if (activeCollection !== 'all' && d.collection !== activeCollection) return false;
      if (activeCategory !== 'all' && d.category !== activeCategory) return false;
      if (activeType !== 'all' && d.type !== activeType) return false;
      if (activeClaim !== 'all' && !d.claims.includes(activeClaim)) return false;
      if (q) {
        const info = d[lang];
        const haystack = `${info.title} ${info.description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [search, activeCollection, activeCategory, activeType, activeClaim, lang]);

  const hasActiveFilter =
    search !== '' ||
    activeCollection !== 'all' ||
    activeCategory !== 'all' ||
    activeType !== 'all' ||
    activeClaim !== 'all';

  function clearFilters() {
    setSearch('');
    setActiveCollection('all');
    setActiveCategory('all');
    setActiveType('all');
    setActiveClaim('all');
  }

  return (
    <div className="diagram-gallery">
      {/* ── Filter sidebar ── */}
      <aside className="diagram-gallery__filters" aria-label={t.filterTitle}>
        <div className="dg-filter-block">
          <label className="dg-filter-label" htmlFor="dg-search">
            {t.filterTitle}
          </label>
          <div className="dg-search-wrap">
            <svg className="dg-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              id="dg-search"
              type="search"
              className="dg-search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
            />
          </div>
        </div>

        <FilterGroup
          label={t.filterCollection}
          value={activeCollection}
          onChange={setActiveCollection}
          allLabel={t.filterAll}
          options={collectionKeys.map(k => ({ value: k, label: COLLECTIONS[k][lang] }))}
        />

        <FilterGroup
          label={t.filterCategory}
          value={activeCategory}
          onChange={setActiveCategory}
          allLabel={t.filterAll}
          options={categoryKeys.map(k => ({ value: k, label: CATEGORIES[k][lang] }))}
        />

        <FilterGroup
          label={t.filterType}
          value={activeType}
          onChange={setActiveType}
          allLabel={t.filterAll}
          options={typeKeys.map(k => ({ value: k, label: DIAGRAM_TYPES[k][lang] }))}
        />

        <FilterGroup
          label={t.filterClaims}
          value={activeClaim}
          onChange={setActiveClaim}
          allLabel={t.filterAll}
          options={claimKeys.map(k => ({ value: k, label: CLAIMS[k][lang] }))}
          highlightAll
        />

        {hasActiveFilter && (
          <button className="dg-clear-btn" onClick={clearFilters}>
            {t.clearFilters}
          </button>
        )}
      </aside>

      {/* ── Grid ── */}
      <section className="diagram-gallery__grid" aria-label="Diagrams" aria-live="polite">
        {filtered.length === 0 ? (
          <div className="diagram-gallery__empty">
            <p>{t.noResults}</p>
            {hasActiveFilter && (
              <button className="dg-clear-btn dg-clear-btn--inline" onClick={clearFilters}>
                {t.clearFilters}
              </button>
            )}
          </div>
        ) : (
          filtered.map(d => (
            <DiagramViewer key={d.id} diagram={d} t={t} />
          ))
        )}
      </section>
    </div>
  );
}

function FilterGroup({ label, value, onChange, allLabel, options, highlightAll }) {
  return (
    <div className="dg-filter-block">
      <span className="dg-filter-label">{label}</span>
      <div className="dg-chip-group" role="group" aria-label={label}>
        <button
          className={`dg-chip${value === 'all' ? ' dg-chip--active' : ''}${highlightAll && value === 'all' ? ' dg-chip--primary' : ''}`}
          onClick={() => onChange('all')}
          aria-pressed={value === 'all'}
        >
          {allLabel}
        </button>
        {options.map(opt => (
          <button
            key={opt.value}
            className={`dg-chip${value === opt.value ? ' dg-chip--active' : ''}`}
            onClick={() => onChange(opt.value)}
            aria-pressed={value === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
