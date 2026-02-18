/**
 * src/pages/Artifacts.js
 * Artifact Library — browse / gallery page
 * Route: /en/artifacts  /fa/artifacts
 *
 * Lists all registered Claude public artifacts.
 * Each card links to the per-artifact viewer at /[lang]/artifacts/[slug].
 */
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import AddToCartButton from '../components/AddToCartButton';
import {
    ARTIFACTS, ARTIFACT_CATEGORIES, ALL_ARTIFACT_TAGS,
} from '../data/artifacts';
import '../styles/artifacts.css';

// ─── Sub-components ──────────────────────────────────────────────────────────

function ArtifactCard({ artifact, lang }) {
    const navigate = useNavigate();
    const isRtl    = lang === 'fa';
    const title    = isRtl ? artifact.fa.title  : artifact.en.title;
    const desc     = isRtl ? artifact.fa.description : artifact.en.description;
    const catKey   = artifact.category;
    const cat      = ARTIFACT_CATEGORIES[catKey];
    const catLabel = cat ? (isRtl ? cat.fa : cat.en) : catKey;

    const cartItem = artifact.localFile ? {
        id:       `artifact-${artifact.id}`,
        filename:  artifact.localFile.type === 'html'
            ? (artifact.localFile.filenames?.[lang] || `${artifact.slug}-${lang}.html`)
            : (artifact.localFile.filename || `${artifact.slug}.${artifact.localFile.type}`),
        path:      artifact.localFile.type === 'html'
            ? artifact.localFile.paths?.[lang]
            : artifact.localFile.path,
        type:      artifact.localFile.type,
        title:     { en: artifact.en.title, fa: artifact.fa.title },
        category:  artifact.category,
        keywords:  artifact.tags || [],
    } : null;

    return (
        <div
            className="artifact-card"
            role="button"
            tabIndex={0}
            aria-label={title}
            onClick={() => navigate(`/${lang}/artifacts/${artifact.slug}`)}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/${lang}/artifacts/${artifact.slug}`)}
        >
            <div className="artifact-card__preview" aria-hidden="true">
                <svg className="artifact-card__preview-icon" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                </svg>
            </div>
            <div className="artifact-card__body">
                <span className={`artifact-card__cat artifact-card__cat--${catKey}`}>
                    {catLabel}
                </span>
                <div className="artifact-card__title">{title}</div>
                {desc && <p className="artifact-card__desc">{desc}</p>}
                {(artifact.tags || []).length > 0 && (
                    <div className="artifact-card__chips">
                        {artifact.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="kb-chip">{tag}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className="artifact-card__footer">
                <span className="artifact-card__view-btn">
                    {isRtl ? 'مشاهده' : 'View'}
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </span>
                {cartItem && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <AddToCartButton item={cartItem} variant="compact" />
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Artifacts() {
    const { lang } = useLang();
    const t = copy[lang]?.artifacts || {};
    const isRtl = lang === 'fa';

    const [query,      setQuery]      = useState('');
    const [activeTags, setActiveTags] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');

    const toggleTag = (tag) => {
        setActiveTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        return ARTIFACTS.filter((a) => {
            const titleEn = a.en.title.toLowerCase();
            const titleFa = a.fa.title;
            const descEn  = a.en.description.toLowerCase();
            const matchQuery = !q || titleEn.includes(q) || titleFa.includes(q) || descEn.includes(q) ||
                (a.tags || []).some((t) => t.toLowerCase().includes(q));
            const matchTags = activeTags.length === 0 ||
                activeTags.every((t) => (a.tags || []).includes(t));
            const matchCat = !activeCategory || a.category === activeCategory;
            return matchQuery && matchTags && matchCat;
        });
    }, [query, activeTags, activeCategory]);

    const categories = Object.entries(ARTIFACT_CATEGORIES);

    return (
        <main id="main-content" className="artifact-browse">

            {/* ── Hero ── */}
            <div className="artifact-hero">
                <div className="artifact-hero__inner">
                    <div className="artifact-hero__eyebrow">
                        {isRtl ? 'کتابخانه دارایی‌ها' : 'Asset Library'}
                    </div>
                    <h1 className="artifact-hero__title">
                        {t.heroTitle || (isRtl ? 'دارایی‌های تعاملی' : 'Interactive Artifacts')}
                    </h1>
                    <p className="artifact-hero__sub">
                        {t.heroSub || (isRtl
                            ? 'تصویرسازی‌ها، نمودارها و ابزارهای تعاملی مرتبط با معماری Ghost Autonomy'
                            : 'Visualizations, diagrams, and interactive tools related to Ghost Autonomy architecture'
                        )}
                    </p>

                    {/* Search */}
                    <div className="artifact-search-wrap">
                        <div className="kb-search">
                            <input
                                type="search"
                                className="kb-search__input"
                                placeholder={isRtl ? 'جستجو در دارایی‌ها...' : 'Search artifacts...'}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                aria-label={isRtl ? 'جستجو' : 'Search artifacts'}
                            />
                            <button type="button" className="kb-search__btn" aria-label="Search">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="artifact-body">

                {/* ── Refine rail ── */}
                <aside className="artifact-refine" aria-label={isRtl ? 'فیلترها' : 'Filters'}>
                    <div className="kb-refine__heading">{isRtl ? 'فیلتر' : 'Refine'}</div>

                    {/* Category filter */}
                    <div className="kb-refine__group">
                        <div className="kb-refine__group-label">{isRtl ? 'دسته‌بندی' : 'Category'}</div>
                        <ul className="kb-facet-list">
                            <li className="kb-facet-item">
                                <input
                                    type="radio"
                                    id="cat-all"
                                    name="category"
                                    checked={!activeCategory}
                                    onChange={() => setActiveCategory('')}
                                />
                                <label htmlFor="cat-all">{isRtl ? 'همه' : 'All'}</label>
                            </li>
                            {categories.map(([key, labels]) => (
                                <li key={key} className="kb-facet-item">
                                    <input
                                        type="radio"
                                        id={`cat-${key}`}
                                        name="category"
                                        checked={activeCategory === key}
                                        onChange={() => setActiveCategory(key)}
                                    />
                                    <label htmlFor={`cat-${key}`}>{isRtl ? labels.fa : labels.en}</label>
                                    <span className="kb-facet-count">
                                        {ARTIFACTS.filter((a) => a.category === key).length}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tag filter */}
                    {ALL_ARTIFACT_TAGS.length > 0 && (
                        <div className="kb-refine__group">
                            <div className="kb-refine__group-label">{isRtl ? 'برچسب‌ها' : 'Topics'}</div>
                            <ul className="kb-facet-list">
                                {ALL_ARTIFACT_TAGS.map((tag) => (
                                    <li key={tag} className="kb-facet-item">
                                        <input
                                            type="checkbox"
                                            id={`atag-${tag}`}
                                            checked={activeTags.includes(tag)}
                                            onChange={() => toggleTag(tag)}
                                        />
                                        <label htmlFor={`atag-${tag}`}>{tag}</label>
                                    </li>
                                ))}
                            </ul>
                            {activeTags.length > 0 && (
                                <button
                                    className="artifact-clear-btn"
                                    onClick={() => setActiveTags([])}
                                >
                                    {isRtl ? 'پاک‌کردن' : 'Clear'}
                                </button>
                            )}
                        </div>
                    )}
                </aside>

                {/* ── Gallery ── */}
                <div className="artifact-gallery">
                    <p className="artifact-count">
                        {isRtl
                            ? <><strong>{filtered.length}</strong> دارایی</>
                            : <><strong>{filtered.length}</strong> artifact{filtered.length !== 1 ? 's' : ''}</>
                        }
                    </p>

                    {filtered.length === 0 ? (
                        <div className="kb-empty">
                            <svg className="kb-empty__icon" viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                <line x1="8" y1="11" x2="14" y2="11" />
                            </svg>
                            <div className="kb-empty__title">
                                {isRtl ? 'نتیجه‌ای یافت نشد' : 'No artifacts found'}
                            </div>
                            <p>{isRtl ? 'کلمه کلیدی دیگری را امتحان کنید.' : 'Try a different keyword or clear filters.'}</p>
                        </div>
                    ) : (
                        <div className="artifact-grid">
                            {filtered.map((artifact) => (
                                <ArtifactCard key={artifact.id} artifact={artifact} lang={lang} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
