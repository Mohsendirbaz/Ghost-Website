import { useState, useMemo } from 'react';
import { useLang } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { copy } from '../data/copy';
import AddToCartButton from '../components/AddToCartButton';
import Breadcrumb from '../components/Breadcrumb';
import {
    CRITICAL_ASSETS,
    HIGH_ASSETS,
    STATUS_ICONS,
    ASSET_STATUS,
    flattenAssets,
    buildAssetPath
} from '../data/libraryAssets';
import './LibraryAssets.css';

export default function LibraryAssets() {
    const { lang } = useLang();
    const navigate = useNavigate();
    const t = copy[lang].libraryAssets || {};

    const [expandedCategories, setExpandedCategories] = useState(new Set(['picapd-isa-en']));
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [languageFilter, setLanguageFilter] = useState('all');

    const allAssets = useMemo(() => {
        return flattenAssets([CRITICAL_ASSETS, HIGH_ASSETS]);
    }, []);

    const filteredAssets = useMemo(() => {
        return allAssets.filter(asset => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesTitle = asset.title[lang]?.toLowerCase().includes(query);
                const matchesDescription = asset.description[lang]?.toLowerCase().includes(query);
                const matchesTags = asset.tags?.some(tag => tag.toLowerCase().includes(query));
                const matchesFilename = asset.filename.toLowerCase().includes(query);
                if (!matchesTitle && !matchesDescription && !matchesTags && !matchesFilename) {
                    return false;
                }
            }

            // Status filter
            if (statusFilter !== 'all' && asset.status !== statusFilter) {
                return false;
            }

            // Language filter
            if (languageFilter !== 'all' && asset.lang !== languageFilter) {
                return false;
            }

            return true;
        });
    }, [allAssets, searchQuery, statusFilter, languageFilter, lang]);

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => {
            const next = new Set(prev);
            if (next.has(categoryId)) {
                next.delete(categoryId);
            } else {
                next.add(categoryId);
            }
            return next;
        });
    };

    const handleAssetClick = (asset) => {
        navigate(buildAssetPath(lang, asset.slug));
    };

    const renderAssetCard = (asset) => (
        <div
            key={asset.id}
            className="asset-card"
            onClick={() => handleAssetClick(asset)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleAssetClick(asset)}
        >
            <div className="asset-card-header">
                <div className="asset-status">
                    <span className="status-icon" title={asset.status}>
                        {STATUS_ICONS[asset.status]}
                    </span>
                    <span className="asset-type-badge">{asset.type.toUpperCase()}</span>
                    <span className="asset-lang-badge" data-lang={asset.lang}>
                        {asset.lang.toUpperCase()}
                    </span>
                </div>
                <div className="asset-priority">P{asset.priority}</div>
            </div>

            <h4 className="asset-title">{asset.title[lang]}</h4>
            <p className="asset-description">{asset.description[lang]}</p>

            <div className="asset-metadata">
                <div className="asset-filename">{asset.filename}</div>
                {asset.bilateralPair && (
                    <div className="asset-bilateral">
                        <span className="bilateral-icon">🔗</span>
                        <span className="bilateral-text">
                            {lang === 'en' ? 'Bilingual pair available' : 'جفت دوزبانه موجود'}
                        </span>
                    </div>
                )}
            </div>

            {asset.tags && asset.tags.length > 0 && (
                <div className="asset-tags">
                    {asset.tags.slice(0, 4).map(tag => (
                        <span key={tag} className="asset-tag">{tag}</span>
                    ))}
                    {asset.tags.length > 4 && (
                        <span className="asset-tag-more">+{asset.tags.length - 4}</span>
                    )}
                </div>
            )}

            <div className="asset-footer">
                <span className="asset-estimate">
                    ⏱️ {asset.processingEstimate}
                </span>
                {(asset.type === 'pdf' || asset.type === 'md' || asset.type === 'html') && (
                    <AddToCartButton
                        item={{
                            id:       `library-${asset.id}`,
                            filename:  asset.filename,
                            path:      asset.targetUrl || `/library/${asset.type}/${asset.filename}`,
                            type:      asset.type,
                            title:     asset.title,
                            category:  asset.categoryId || 'library',
                            keywords:  asset.tags || [],
                        }}
                        variant="compact"
                    />
                )}
            </div>
        </div>
    );

    const renderCategory = (category, tierId) => {
        const isExpanded = expandedCategories.has(category.id);

        // Filter assets in this category
        const categoryAssets = filteredAssets.filter(asset =>
            asset.categoryId === category.id && asset.tierId === tierId
        );

        // If no assets match filters, don't render category
        if (categoryAssets.length === 0 && searchQuery) {
            return null;
        }

        return (
            <div key={category.id} className="library-category">
                <div
                    className="category-header"
                    onClick={() => toggleCategory(category.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && toggleCategory(category.id)}
                >
                    <div className="category-toggle">
                        <span className="toggle-icon">{isExpanded ? '▼' : '▶'}</span>
                        <h3 className="category-name">{category.name[lang]}</h3>
                        <span className="category-count">
                            {categoryAssets.length} / {category.count}
                        </span>
                    </div>
                    {category.source && (
                        <span className="category-source">{category.source}</span>
                    )}
                </div>

                {isExpanded && (
                    <div className="category-content">
                        <div className="assets-grid">
                            {categoryAssets.map(renderAssetCard)}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderTier = (tier) => {
        // Filter categories that have matching assets
        const visibleCategories = tier.categories.filter(category => {
            const categoryAssets = filteredAssets.filter(asset =>
                asset.categoryId === category.id && asset.tierId === tier.id
            );
            return categoryAssets.length > 0;
        });

        if (visibleCategories.length === 0 && searchQuery) {
            return null;
        }

        const tierAssets = filteredAssets.filter(asset => asset.tierId === tier.id);

        return (
            <section key={tier.id} className="library-tier">
                <div className="tier-header">
                    <div className="tier-title-row">
                        <h2 className="tier-name">{tier.name[lang]}</h2>
                        <span className="tier-priority">{tier.priority}</span>
                        <span className="tier-count">
                            {tierAssets.length} / {tier.count} {lang === 'en' ? 'assets' : 'دارایی'}
                        </span>
                    </div>
                    <p className="tier-description">{tier.description[lang]}</p>
                    <div className="tier-meta">
                        <span className="tier-timeline">📅 {tier.timeline}</span>
                    </div>
                </div>

                <div className="tier-categories">
                    {visibleCategories.map(category => renderCategory(category, tier.id))}
                </div>
            </section>
        );
    };

    const stats = useMemo(() => {
        return {
            total: filteredAssets.length,
            ready: filteredAssets.filter(a => a.status === ASSET_STATUS.READY).length,
            inProgress: filteredAssets.filter(a => a.status === ASSET_STATUS.IN_PROGRESS).length,
            needsReview: filteredAssets.filter(a => a.status === ASSET_STATUS.NEEDS_REVIEW).length,
            english: filteredAssets.filter(a => a.lang === 'en').length,
            persian: filteredAssets.filter(a => a.lang === 'fa').length
        };
    }, [filteredAssets]);

    return (
        <main id="main-content" className="library-assets-page">
            <Breadcrumb crumbs={[
                { label: copy[lang].breadcrumb.home, to: `/${lang}` },
                { label: copy[lang].breadcrumb.libraryAssets },
            ]} />
            {/* Hero Section */}
            <section className="library-hero">
                <div className="container">
                    <div className="hero-eyebrow">
                        {lang === 'en' ? 'Library of Assets' : 'کتابخانه دارایی‌ها'}
                    </div>
                    <h1 className="hero-title">
                        {lang === 'en'
                            ? 'Ghost Autonomy Technical Documentation'
                            : 'مستندات فنی Ghost Autonomy'}
                    </h1>
                    <p className="hero-subtitle">
                        {lang === 'en'
                            ? '89 high-value assets: 18 CRITICAL (core PICAPD ISA) + 71 HIGH (technical research)'
                            : '۸۹ دارایی با ارزش بالا: ۱۸ بحرانی (PICAPD ISA اصلی) + ۷۱ بالا (تحقیقات فنی)'}
                    </p>
                </div>
            </section>

            {/* Stats Dashboard */}
            <section className="library-stats">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-value">{stats.total}</div>
                            <div className="stat-label">
                                {lang === 'en' ? 'Total Assets' : 'کل دارایی‌ها'}
                            </div>
                        </div>
                        <div className="stat-card stat-ready">
                            <div className="stat-value">✅ {stats.ready}</div>
                            <div className="stat-label">
                                {lang === 'en' ? 'Ready' : 'آماده'}
                            </div>
                        </div>
                        <div className="stat-card stat-progress">
                            <div className="stat-value">🔄 {stats.inProgress}</div>
                            <div className="stat-label">
                                {lang === 'en' ? 'In Progress' : 'در حال انجام'}
                            </div>
                        </div>
                        <div className="stat-card stat-review">
                            <div className="stat-value">⚠️ {stats.needsReview}</div>
                            <div className="stat-label">
                                {lang === 'en' ? 'Needs Review' : 'نیاز به بررسی'}
                            </div>
                        </div>
                        <div className="stat-card stat-lang">
                            <div className="stat-value">{stats.english} / {stats.persian}</div>
                            <div className="stat-label">
                                {lang === 'en' ? 'EN / FA' : 'انگلیسی / فارسی'}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="library-filters">
                <div className="container">
                    <div className="filters-row">
                        <div className="search-box">
                            <input
                                type="search"
                                placeholder={
                                    lang === 'en'
                                        ? 'Search assets by title, description, tags, or filename...'
                                        : 'جستجو در دارایی‌ها بر اساس عنوان، توضیحات، برچسب‌ها یا نام فایل...'
                                }
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="search-clear"
                                    aria-label="Clear search"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">
                                {lang === 'en' ? 'Status:' : 'وضعیت:'}
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">{lang === 'en' ? 'All' : 'همه'}</option>
                                <option value={ASSET_STATUS.READY}>
                                    ✅ {lang === 'en' ? 'Ready' : 'آماده'}
                                </option>
                                <option value={ASSET_STATUS.IN_PROGRESS}>
                                    🔄 {lang === 'en' ? 'In Progress' : 'در حال انجام'}
                                </option>
                                <option value={ASSET_STATUS.QUEUED}>
                                    ⏳ {lang === 'en' ? 'Queued' : 'در صف'}
                                </option>
                                <option value={ASSET_STATUS.NEEDS_REVIEW}>
                                    ⚠️ {lang === 'en' ? 'Needs Review' : 'نیاز به بررسی'}
                                </option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">
                                {lang === 'en' ? 'Language:' : 'زبان:'}
                            </label>
                            <select
                                value={languageFilter}
                                onChange={(e) => setLanguageFilter(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">{lang === 'en' ? 'All' : 'همه'}</option>
                                <option value="en">{lang === 'en' ? 'English' : 'انگلیسی'}</option>
                                <option value="fa">{lang === 'en' ? 'Persian' : 'فارسی'}</option>
                            </select>
                        </div>

                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setStatusFilter('all');
                                setLanguageFilter('all');
                            }}
                            className="filters-reset"
                        >
                            {lang === 'en' ? 'Reset Filters' : 'بازنشانی فیلترها'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Assets Hierarchy */}
            <section className="library-hierarchy">
                <div className="container">
                    {renderTier(CRITICAL_ASSETS)}
                    {renderTier(HIGH_ASSETS)}

                    {filteredAssets.length === 0 && searchQuery && (
                        <div className="no-results">
                            <p>
                                {lang === 'en'
                                    ? `No assets found matching "${searchQuery}"`
                                    : `هیچ دارایی‌ای با "${searchQuery}" یافت نشد`}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
