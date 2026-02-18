/**
 * src/pages/KnowledgeBase.js
 * Knowledge Base — Browse / Index page
 * Route: /en/knowledge-base  /fa/knowledge-base
 *
 * Layout: hero band → [refine rail | lanes]
 * Search switches the lanes into a results list.
 */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import { KB_PARTS, ALL_NODES, ALL_TAGS, buildPath, resolveHref } from '../data/knowledgeBase';
import { injectJsonLd, removeJsonLd, buildIndexGraph } from '../utils/jsonld';
import '../styles/knowledgeBase.css';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SCOPE_ALL      = 'all';
const SCOPE_PARTS    = 'parts';
const SCOPE_CHAPTERS = 'chapters';
const SCOPE_SECTIONS = 'sections';

function matchesQuery(node, query) {
    const q = query.toLowerCase();
    return (
        node.title?.en?.toLowerCase().includes(q) ||
        node.title?.fa?.includes(q) ||
        node.description?.en?.toLowerCase().includes(q) ||
        (node.tags || []).some((t) => t.toLowerCase().includes(q))
    );
}

function matchesTags(node, activeTags) {
    if (activeTags.length === 0) return true;
    return activeTags.every((t) => (node.tags || []).includes(t));
}

function matchesScope(node, scope) {
    if (scope === SCOPE_ALL) return true;
    if (scope === SCOPE_PARTS)    return node.nodeType === 'part';
    if (scope === SCOPE_CHAPTERS) return node.nodeType === 'chapter';
    if (scope === SCOPE_SECTIONS) return ['section', 'subsection'].includes(node.nodeType);
    return true;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DocumentCard({ node, lang, style }) {
    const isRtl = lang === 'fa';
    const title    = isRtl ? node.title.fa : node.title.en;
    const titleAlt = isRtl ? node.title.en : node.title.fa;
    const desc     = node.description?.[isRtl ? 'fa' : 'en'];

    // Parts from KB_PARTS carry no nodeType — handle them explicitly.
    // All chapter / section nodes passed here come from ALL_NODES (enriched).
    const href = node.nodeType
        ? resolveHref(node, lang)
        : buildPath(lang, node.slug); // raw part from KB_PARTS lane

    const isPartCard = node.nodeType === 'part' || !node.nodeType;

    return (
        <Link
            to={href}
            className={`kb-card${isPartCard ? ' kb-card--part' : ''}`}
            style={{ '--kb-accent': node.accentColor || 'var(--color-primary)', ...style }}
        >
            {!isPartCard && <div className="kb-card__accent-bar" />}
            <div className="kb-card__body">
                <div className="kb-card__number">
                    {isPartCard ? `Part ${node.number}` : `§${node.number}`}
                </div>
                <div className="kb-card__title">{title}</div>
                {titleAlt && <span className="kb-card__title-fa">{titleAlt}</span>}
                {desc && <p className="kb-card__hook">{desc}</p>}
                {(node.tags || []).length > 0 && (
                    <div className="kb-card__chips">
                        {(node.tags || []).slice(0, 3).map((tag) => (
                            <span key={tag} className="kb-chip">{tag}</span>
                        ))}
                    </div>
                )}
                {isPartCard && (
                    <div className="kb-card__chapter-count">
                        {(node.chapters || []).length} chapters · p. {node.pageStart}
                    </div>
                )}
            </div>
            {!isPartCard && (
                <div className="kb-card__meta">
                    <span className="kb-card__page">p. {node.pageStart}</span>
                    <span className="kb-card__type"
                          style={{ '--kb-accent': node.accentColor || 'var(--color-primary)' }}>
            {node.nodeType}
          </span>
                </div>
            )}
        </Link>
    );
}

function CarouselLane({ title, nodes, lang, accent, isParts }) {
    return (
        <div className={`kb-lane${isParts ? ' kb-lane--parts' : ''}`}>
            <div className="kb-lane__header">
                <div className="kb-lane__accent" style={{ background: accent || 'var(--color-primary)' }} />
                <h2 className="kb-lane__title">{title}</h2>
            </div>
            <div className="kb-lane__track">
                {nodes.map((node) => (
                    <DocumentCard key={node.id} node={node} lang={lang} />
                ))}
            </div>
        </div>
    );
}

function ResultRow({ node, lang }) {
    const isRtl = lang === 'fa';
    const title = isRtl ? node.title.fa : node.title.en;
    const desc  = node.description?.[isRtl ? 'fa' : 'en'];
    const breadcrumbText = (node.breadcrumb || [])
        .map((b) => (isRtl ? b.fa : b.en))
        .join(' › ');

    const href = resolveHref(node, lang);

    return (
        <Link to={href} className="kb-result-row">
      <span className={`kb-result-row__type-badge kb-result-row__type-badge--${node.nodeType}`}>
        {node.nodeType}
      </span>
            <div className="kb-result-row__main">
                <div className="kb-result-row__title">{title}</div>
                {breadcrumbText && (
                    <div className="kb-result-row__breadcrumb">{breadcrumbText}</div>
                )}
                {desc && <div className="kb-result-row__description">{desc}</div>}
            </div>
        </Link>
    );
}

// ─── TAG count helper ─────────────────────────────────────────────────────────

function buildTagCounts(nodes) {
    const counts = {};
    nodes.forEach((n) => (n.tags || []).forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
    return counts;
}

// ─── Main page component ──────────────────────────────────────────────────────

export default function KnowledgeBase() {
    const { lang } = useLang();
    const t = copy[lang]?.knowledgeBase || {};
    const isRtl = lang === 'fa';

    const [searchParams, setSearchParams] = useSearchParams();
    const [query,      setQuery]      = useState(searchParams.get('q') || '');
    const [scope,      setScope]      = useState(SCOPE_ALL);
    const [activeTags, setActiveTags] = useState([]);
    const [inputValue, setInputValue] = useState(query);

    // JSON-LD
    useEffect(() => {
        injectJsonLd(buildIndexGraph(KB_PARTS));
        return () => removeJsonLd();
    }, []);

    // Sync URL search param
    useEffect(() => {
        const q = searchParams.get('q') || '';
        setQuery(q);
        setInputValue(q);
    }, [searchParams]);

    const handleSearch = useCallback((e) => {
        e?.preventDefault();
        const q = inputValue.trim();
        setQuery(q);
        if (q) setSearchParams({ q });
        else setSearchParams({});
    }, [inputValue, setSearchParams]);

    const toggleTag = (tag) => {
        setActiveTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    // Filtered results
    const results = useMemo(() => {
        if (!query && activeTags.length === 0 && scope === SCOPE_ALL) return [];
        return ALL_NODES.filter(
            (n) =>
                matchesScope(n, scope) &&
                matchesTags(n, activeTags) &&
                (query ? matchesQuery(n, query) : true)
        );
    }, [query, scope, activeTags]);

    const isSearchMode = query.length > 0 || activeTags.length > 0;

    const tagCounts = useMemo(() => buildTagCounts(ALL_NODES), []);

    // Lane data
    const allChapters = useMemo(() => KB_PARTS.flatMap((p) =>
        (p.chapters || []).map((ch) => ({
            ...ch,
            nodeType: 'chapter',
            partSlug: p.slug,
            breadcrumb: [p.title, ch.title],
            accentColor: p.accentColor,
        }))
    ), []);

    const techChapters = useMemo(() =>
            allChapters.filter((ch) =>
                (ch.tags || []).some((t) => ['PICAPD-ISA', 'Queen-Bee', 'Byzantine-fault-tolerance', 'physics-computing', 'bilinear-form'].includes(t))
            ),
        [allChapters]);

    const validationChapters = useMemo(() =>
            allChapters.filter((ch) => (ch.tags || []).some((t) => ['validation', 'benchmark', 'ASIL-D'].includes(t))),
        [allChapters]);

    const scopeLabels = {
        [SCOPE_ALL]:      isRtl ? 'همه' : 'All',
        [SCOPE_PARTS]:    isRtl ? 'بخش‌ها' : 'Parts',
        [SCOPE_CHAPTERS]: isRtl ? 'فصل‌ها' : 'Chapters',
        [SCOPE_SECTIONS]: isRtl ? 'بخش‌ها' : 'Sections',
    };

    // Top tags for refine rail (sorted by count, top 20)
    const topTags = useMemo(() =>
            ALL_TAGS
                .map((tag) => ({ tag, count: tagCounts[tag] || 0 }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 20),
        [tagCounts]);

    return (
        <main id="main-content" className="kb-browse">

            {/* ── Hero band ── */}
            <div className="kb-hero">
                <div className="kb-hero__inner">
                    <div className="kb-hero__eyebrow">
                        {isRtl ? 'پایگاه دانش' : 'Knowledge Base'}
                    </div>
                    <h1 className="kb-hero__title">
                        {t.heroTitle || (isRtl ? 'مستندات Ghost Autonomy' : 'Ghost Autonomy Documentation')}
                    </h1>
                    <p className="kb-hero__sub">
                        {t.heroSub || (isRtl
                                ? '۸ بخش · ۴۷ فصل · معماری PICAPD ISA، کندوی ملکه و مبانی فیزیک‌الهام‌گرفته'
                                : '8 parts · 47 chapters · PICAPD ISA, Queen Bee architecture, physics-inspired foundations'
                        )}
                    </p>

                    {/* Search */}
                    <div className="kb-search-wrap">
                        <form className="kb-search" onSubmit={handleSearch}>
                            <input
                                type="search"
                                className="kb-search__input"
                                placeholder={isRtl ? 'جستجو در اسناد...' : 'Search documentation...'}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                aria-label={isRtl ? 'جستجو' : 'Search knowledge base'}
                                lang={lang}
                            />
                            <button type="submit" className="kb-search__btn" aria-label="Search">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </button>
                        </form>

                        <div className="kb-scope-tabs" role="group" aria-label="Filter scope">
                            {Object.entries(scopeLabels).map(([key, label]) => (
                                <button
                                    key={key}
                                    className={`kb-scope-tab${scope === key ? ' active' : ''}`}
                                    onClick={() => setScope(key)}
                                    aria-pressed={scope === key}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="kb-body">

                {/* ── Refine rail ── */}
                <aside className="kb-refine" aria-label={isRtl ? 'فیلترها' : 'Filters'}>
                    <div className="kb-refine__heading">{isRtl ? 'فیلتر' : 'Refine'}</div>

                    <div className="kb-refine__group">
                        <div className="kb-refine__group-label">{isRtl ? 'برچسب‌ها' : 'Topics'}</div>
                        <ul className="kb-facet-list">
                            {topTags.map(({ tag, count }) => (
                                <li key={tag} className="kb-facet-item">
                                    <input
                                        type="checkbox"
                                        id={`facet-${tag}`}
                                        checked={activeTags.includes(tag)}
                                        onChange={() => toggleTag(tag)}
                                    />
                                    <label htmlFor={`facet-${tag}`}>{tag}</label>
                                    <span className="kb-facet-count">{count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {activeTags.length > 0 && (
                        <button
                            style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}
                            onClick={() => setActiveTags([])}
                        >
                            {isRtl ? 'پاک‌کردن فیلترها' : 'Clear filters'}
                        </button>
                    )}
                </aside>

                {/* ── Main content ── */}
                <div className="kb-content">

                    {/* ── Search / filter results ── */}
                    {isSearchMode && (
                        <div className="kb-results">
                            <p className="kb-results__count">
                                {isRtl
                                    ? <><strong>{results.length}</strong> نتیجه یافت شد</>
                                    : <><strong>{results.length}</strong> results found</>
                                }
                            </p>

                            {results.length === 0 ? (
                                <div className="kb-empty">
                                    <svg className="kb-empty__icon" viewBox="0 0 24 24" aria-hidden="true">
                                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        <line x1="8" y1="11" x2="14" y2="11" />
                                    </svg>
                                    <div className="kb-empty__title">{isRtl ? 'نتیجه‌ای یافت نشد' : 'No results found'}</div>
                                    <p>{isRtl ? 'کلمه کلیدی دیگری را امتحان کنید.' : 'Try a different keyword or clear filters.'}</p>
                                </div>
                            ) : (
                                <div className="kb-results__list">
                                    {results.map((node) => (
                                        <ResultRow key={node.id} node={node} lang={lang} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Browse lanes ── */}
                    {!isSearchMode && (
                        <div className="kb-lanes">

                            <CarouselLane
                                title={isRtl ? 'همه بخش‌ها' : 'All Parts'}
                                nodes={KB_PARTS}
                                lang={lang}
                                isParts
                            />

                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}