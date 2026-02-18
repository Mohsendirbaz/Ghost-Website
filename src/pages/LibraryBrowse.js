/**
 * src/pages/LibraryBrowse.js
 * Document Archive — browse the 1,751-file manifest catalog
 * Route: /en/library  /fa/library
 *
 * Layout: hero → [category tabs | file grid]
 * Search switches the grid into a flat results list.
 */
import { useState, useMemo } from 'react';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import AddToCartButton from '../components/AddToCartButton';
import {
    useLibraryManifest,
    useFileSearch,
    CATEGORY_META,
} from '../data/libraryManifest';
import '../styles/libraryBrowse.css';

// ─── File card ────────────────────────────────────────────────────────────────

function FileCard({ file, lang }) {
    const isRtl = lang === 'fa';
    const catMeta = CATEGORY_META[file.category] || { en: file.category, fa: file.category, icon: '📄' };
    const catLabel = isRtl ? catMeta.fa : catMeta.en;

    const sizeLabel = file.sizeBytes
        ? file.sizeBytes > 1024 * 1024
            ? `${(file.sizeBytes / 1024 / 1024).toFixed(1)} MB`
            : `${Math.round(file.sizeBytes / 1024)} KB`
        : '';

    const cartItem = {
        id:        `lib-${file.id}`,
        filename:   file.filename,
        path:       file.path,
        type:       file.type,
        title:      { en: file.title, fa: file.title },
        category:   file.category,
        keywords:   [],
    };

    return (
        <div className="lb-file-card">
            <div className="lb-file-card__icon" aria-hidden="true">
                {file.type === 'pdf' ? '📄' : file.type === 'html' ? '🌐' : '📝'}
            </div>
            <div className="lb-file-card__body">
                <div className="lb-file-card__title">{file.title}</div>
                <div className="lb-file-card__meta">
                    <span className={`lb-badge lb-badge--${file.type}`}>{file.type.toUpperCase()}</span>
                    <span className="lb-file-card__cat">{catLabel}</span>
                    {sizeLabel && <span className="lb-file-card__size">{sizeLabel}</span>}
                </div>
            </div>
            <div className="lb-file-card__actions">
                <a
                    href={file.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lb-view-link"
                    aria-label={`Open ${file.title}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {isRtl ? 'باز کردن' : 'Open'}
                </a>
                <AddToCartButton item={cartItem} variant="compact" />
            </div>
        </div>
    );
}

// ─── Category tab panel ───────────────────────────────────────────────────────

function CategoryPanel({ files, lang, categoryId }) {
    const [page, setPage] = useState(1);
    const PER_PAGE = 50;
    const totalPages = Math.ceil(files.length / PER_PAGE);
    const visible = files.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    if (files.length === 0) {
        return (
            <div className="lb-empty">
                {lang === 'fa' ? 'فایلی در این دسته‌بندی یافت نشد.' : 'No files in this category.'}
            </div>
        );
    }

    return (
        <div>
            <p className="lb-count">
                {lang === 'fa'
                    ? <><strong>{files.length}</strong> فایل</>
                    : <><strong>{files.length}</strong> file{files.length !== 1 ? 's' : ''}</>
                }
            </p>
            <div className="lb-file-grid">
                {visible.map((f) => (
                    <FileCard key={f.id} file={f} lang={lang} />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="lb-pagination">
                    <button
                        className="lb-page-btn"
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        ‹
                    </button>
                    <span className="lb-page-label">{page} / {totalPages}</span>
                    <button
                        className="lb-page-btn"
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function LibraryBrowse() {
    const { lang } = useLang();
    const isRtl = lang === 'fa';
    const t = copy[lang]?.documentArchive || {};

    const { data, loading, error } = useLibraryManifest();

    const [query,       setQuery]       = useState('');
    const [inputValue,  setInputValue]  = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const { results: searchResults } = useFileSearch(query);

    const isSearchMode = query.trim().length >= 2;

    // Build ordered category list from manifest
    const categoryOrder = ['picapd', 'strategic', 'av-research', 'climate', 'thesis-research', 'application', 'knowledge', 'notion', 'misc'];

    const categories = useMemo(() => {
        if (!data) return [];
        return categoryOrder
            .filter((key) => data.categories[key]?.count > 0)
            .map((key) => ({
                key,
                count: data.categories[key]?.count || 0,
                ...CATEGORY_META[key],
            }));
    }, [data]);

    const currentFiles = useMemo(() => {
        if (!data) return [];
        if (activeCategory === 'all') return data.files;
        return data.files.filter((f) => f.category === activeCategory);
    }, [data, activeCategory]);

    const handleSearch = (e) => {
        e?.preventDefault();
        setQuery(inputValue.trim());
    };

    return (
        <main id="main-content" className="lb-browse">

            {/* ── Hero band ── */}
            <div className="lb-hero">
                <div className="lb-hero__inner">
                    <div className="lb-hero__eyebrow">
                        {isRtl ? 'آرشیو مستندات' : 'Document Archive'}
                    </div>
                    <h1 className="lb-hero__title">
                        {t.heroTitle || (isRtl ? 'آرشیو کامل مستندات' : 'Complete Document Archive')}
                    </h1>
                    <p className="lb-hero__sub">
                        {t.heroSub || (isRtl
                            ? `${data ? data.totalFiles.toLocaleString() : '…'} فایل در ۹ دسته‌بندی · PDF، Markdown، HTML`
                            : `${data ? data.totalFiles.toLocaleString() : '…'} files across 9 categories · PDF, Markdown, HTML`
                        )}
                    </p>

                    {/* Search */}
                    <form className="lb-search" onSubmit={handleSearch}>
                        <input
                            type="search"
                            className="lb-search__input"
                            placeholder={isRtl ? 'جستجو در آرشیو...' : 'Search archive...'}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            aria-label={isRtl ? 'جستجو' : 'Search archive'}
                        />
                        <button type="submit" className="lb-search__btn" aria-label="Search">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                        {query && (
                            <button
                                type="button"
                                className="lb-search__clear"
                                onClick={() => { setQuery(''); setInputValue(''); }}
                                aria-label="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </form>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="lb-body">

                {/* Loading / Error */}
                {loading && (
                    <div className="lb-status">{isRtl ? 'در حال بارگذاری...' : 'Loading archive…'}</div>
                )}
                {error && (
                    <div className="lb-status lb-status--error">
                        {isRtl ? 'خطا در بارگذاری فهرست.' : `Failed to load manifest: ${error}`}
                    </div>
                )}

                {data && (
                    <>
                        {/* ── Search results ── */}
                        {isSearchMode ? (
                            <div className="lb-search-results">
                                <p className="lb-count">
                                    {isRtl
                                        ? <><strong>{searchResults.length}</strong> نتیجه</>
                                        : <><strong>{searchResults.length}</strong> result{searchResults.length !== 1 ? 's' : ''}</>
                                    }
                                </p>
                                {searchResults.length === 0 ? (
                                    <div className="lb-empty">
                                        {isRtl ? 'نتیجه‌ای یافت نشد.' : 'No results found. Try a different keyword.'}
                                    </div>
                                ) : (
                                    <div className="lb-file-grid">
                                        {searchResults.map((f) => (
                                            <FileCard key={f.id} file={f} lang={lang} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* ── Category tabs + grid ── */
                            <div className="lb-tabs-layout">
                                <div className="lb-cat-tabs" role="tablist" aria-label={isRtl ? 'دسته‌بندی‌ها' : 'Categories'}>
                                    <button
                                        role="tab"
                                        className={`lb-cat-tab${activeCategory === 'all' ? ' active' : ''}`}
                                        aria-selected={activeCategory === 'all'}
                                        onClick={() => setActiveCategory('all')}
                                    >
                                        <span className="lb-cat-tab__icon">📦</span>
                                        <span className="lb-cat-tab__label">{isRtl ? 'همه' : 'All'}</span>
                                        <span className="lb-cat-tab__count">{data.totalFiles}</span>
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.key}
                                            role="tab"
                                            className={`lb-cat-tab${activeCategory === cat.key ? ' active' : ''}`}
                                            aria-selected={activeCategory === cat.key}
                                            onClick={() => setActiveCategory(cat.key)}
                                        >
                                            <span className="lb-cat-tab__icon">{cat.icon}</span>
                                            <span className="lb-cat-tab__label">{isRtl ? cat.fa : cat.en}</span>
                                            <span className="lb-cat-tab__count">{cat.count}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="lb-panel" role="tabpanel">
                                    <CategoryPanel
                                        files={currentFiles}
                                        lang={lang}
                                        categoryId={activeCategory}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
