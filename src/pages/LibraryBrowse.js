/**
 * src/pages/LibraryBrowse.js
 * Document Archive — browse the 1,751-file manifest catalog
 * Route: /en/library  /fa/library
 *
 * Layout: hero → [category tabs | file grid]
 * Search switches the grid into a flat results list.
 */
import { useState, useMemo, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import AddToCartButton from '../components/AddToCartButton';
import Breadcrumb from '../components/Breadcrumb';
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

// ─── Pagination ───────────────────────────────────────────────────────────────

// Always returns exactly 7 slots so the bar never changes width.
// null = invisible ghost placeholder to fill the slot.
function buildPageWindow(current, total) {
    if (total <= 1) return [];

    if (total <= 7) {
        const pages = Array.from({ length: total }, (_, i) => i + 1);
        while (pages.length < 7) pages.push(null);
        return pages;
    }

    if (current <= 4)          return [1, 2, 3, 4, 5, '…', total];
    if (current >= total - 3)  return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
    return                            [1, '…', current - 1, current, current + 1, '…', total];
}

function Pagination({ page, totalPages, onChange, lang }) {
    const [jumpValue, setJumpValue] = useState('');
    const isRtl = lang === 'fa';
    const window = buildPageWindow(page, totalPages);

    const handleJump = (e) => {
        e?.preventDefault();
        const n = parseInt(jumpValue, 10);
        if (n >= 1 && n <= totalPages) {
            onChange(n);
            setJumpValue('');
        }
    };

    if (totalPages <= 1) return null;

    const first = (page - 1) * 50 + 1;
    const last  = Math.min(page * 50, (totalPages - 1) * 50 + 50); // approximate

    return (
        <div className="lb-pagination">
            {/* Prev */}
            <button
                className="lb-page-btn lb-page-btn--arrow"
                disabled={page === 1}
                onClick={() => onChange(page - 1)}
                aria-label={isRtl ? 'صفحه قبل' : 'Previous page'}
            >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="10 3 5 8 10 13" />
                </svg>
            </button>

            {/* Page window */}
            <div className="lb-page-window" role="group" aria-label={isRtl ? 'صفحات' : 'Pages'}>
                {window.map((item, idx) => {
                    if (item === null) {
                        return <span key={`ghost-${idx}`} className="lb-page-btn lb-page-btn--ghost" aria-hidden="true" />;
                    }
                    if (typeof item === 'string') {
                        return <span key={`ell-${idx}`} className="lb-page-ellipsis" aria-hidden="true">…</span>;
                    }
                    return (
                        <button
                            key={item}
                            className={`lb-page-btn${item === page ? ' lb-page-btn--active' : ''}`}
                            onClick={() => onChange(item)}
                            aria-current={item === page ? 'page' : undefined}
                            aria-label={`${isRtl ? 'صفحه' : 'Page'} ${item}`}
                        >
                            {item}
                        </button>
                    );
                })}
            </div>

            {/* Next */}
            <button
                className="lb-page-btn lb-page-btn--arrow"
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
                aria-label={isRtl ? 'صفحه بعد' : 'Next page'}
            >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>

            {/* Jump-to */}
            <form className="lb-jump" onSubmit={handleJump} aria-label={isRtl ? 'رفتن به صفحه' : 'Jump to page'}>
                <span className="lb-jump__label">{isRtl ? 'برو به:' : 'Go to:'}</span>
                <input
                    type="number"
                    className="lb-jump__input"
                    min={1}
                    max={totalPages}
                    value={jumpValue}
                    onChange={(e) => setJumpValue(e.target.value)}
                    aria-label={isRtl ? 'شماره صفحه' : 'Page number'}
                    placeholder={`1–${totalPages}`}
                />
                <button type="submit" className="lb-jump__btn" aria-label={isRtl ? 'برو' : 'Go'}>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 3 11 8 6 13" />
                    </svg>
                </button>
            </form>
        </div>
    );
}

// ─── Category tab panel ───────────────────────────────────────────────────────

function CategoryPanel({ files, lang, categoryId }) {
    const [page, setPage] = useState(1);
    const PER_PAGE = 50;
    const totalPages = Math.ceil(files.length / PER_PAGE);
    const visible = files.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    // Reset to page 1 when category or files change
    useEffect(() => { setPage(1); }, [categoryId, files.length]);

    const handlePageChange = (n) => {
        setPage(n);
    };

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
                    ? <><strong>{files.length}</strong> فایل · صفحه <strong>{page}</strong> از <strong>{totalPages}</strong></>
                    : <><strong>{files.length}</strong> files · page <strong>{page}</strong> of <strong>{totalPages}</strong></>
                }
            </p>
            <div className="lb-file-grid">
                {visible.map((f) => (
                    <FileCard key={f.id} file={f} lang={lang} />
                ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} lang={lang} />
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
            <Breadcrumb crumbs={[
                { label: copy[lang].breadcrumb.home, to: `/${lang}` },
                { label: copy[lang].breadcrumb.documentArchive },
            ]} />

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
