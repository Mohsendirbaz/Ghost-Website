import React, { useState, useMemo } from 'react';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import {
    SYSTEM_INFO,
    ALL_CATEGORIES,
    getAllComponents,
    searchComponents
} from '../data/multiAgentSystem';
import './MultiAgentSystem.css';

export default function MultiAgentSystem() {
    const { lang } = useLang();
    const [expandedCategories, setExpandedCategories] = useState(new Set(['core-multiagent-system']));
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('all');

    // Get all unique tags
    const allTags = useMemo(() => {
        const tags = new Set();
        getAllComponents().forEach(component => {
            component.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, []);

    // Filter components based on search and tag
    const filteredComponents = useMemo(() => {
        let components = getAllComponents();

        // Apply search filter
        if (searchQuery.trim()) {
            components = searchComponents(searchQuery, lang);
        }

        // Apply tag filter
        if (selectedTag !== 'all') {
            components = components.filter(comp =>
                comp.tags.includes(selectedTag)
            );
        }

        return components;
    }, [searchQuery, selectedTag, lang]);

    // Group filtered components by category
    const filteredByCategory = useMemo(() => {
        const grouped = {};
        filteredComponents.forEach(component => {
            if (!grouped[component.categoryId]) {
                grouped[component.categoryId] = [];
            }
            grouped[component.categoryId].push(component);
        });
        return grouped;
    }, [filteredComponents]);

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

    const expandAll = () => {
        setExpandedCategories(new Set(ALL_CATEGORIES.map(cat => cat.id)));
    };

    const collapseAll = () => {
        setExpandedCategories(new Set());
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedTag('all');
    };

    return (
        <main id="main-content" className="multi-agent-system-page">
            {/* Hero Section */}
            <section className="mas-hero">
                <div className="mas-hero-content container">
                    <h1 className="mas-hero-title">
                        {SYSTEM_INFO.systemName}
                    </h1>
                    <p className="mas-hero-description">
                        {SYSTEM_INFO.systemDescription[lang]}
                    </p>
                    <div className="mas-hero-stats">
                        <div className="stat-item">
                            <div className="stat-value">{SYSTEM_INFO.totalFiles}</div>
                            <div className="stat-label">
                                {lang === 'en' ? 'Components' : 'اجزا'}
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">{ALL_CATEGORIES.length}</div>
                            <div className="stat-label">
                                {lang === 'en' ? 'Categories' : 'دسته‌ها'}
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">{SYSTEM_INFO.keyTechnologies[lang].length}</div>
                            <div className="stat-label">
                                {lang === 'en' ? 'Technologies' : 'فناوری‌ها'}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <figure style={{ margin: '2rem auto 0', maxWidth: '1160px', padding: '0 1rem' }}>
              <div style={{ border: '1px solid rgba(128,128,128,0.3)', borderRadius: '10px', overflow: 'hidden', background: '#0d1117' }}>
                <iframe src="/docs/html/Multi_Agent_Research_Laboratory.html" title="Multi-Agent Research Laboratory" loading="lazy"
                        style={{ width: '100%', height: '72vh', border: 0, display: 'block' }} />
              </div>
              <figcaption style={{ marginTop: '0.6rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-secondary, #5b6b7b)' }}>
                {lang === 'en'
                ? 'Fig. L-01 — The Multi-Agent Research Laboratory, live — the coordination fabric this catalogue documents.'
                : 'شکل L-01 — آزمایشگاه پژوهشی چند-عامله، به‌صورت زنده — بافت هماهنگی‌ای که این فهرست مستند می‌کند.'}
              </figcaption>
            </figure>

            {/* Architecture Layers Section */}
            <section className="mas-architecture-section container">
                <h2 className="section-title">
                    {lang === 'en' ? 'Architectural Layers' : 'لایه‌های معماری'}
                </h2>
                <div className="architecture-layers">
                    {SYSTEM_INFO.architecturalLayers[lang].map((layer, index) => (
                        <div key={index} className="architecture-layer">
                            <div className="layer-number">{index + 1}</div>
                            <div className="layer-text">{layer}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Key Technologies Section */}
            <section className="mas-technologies-section container">
                <h2 className="section-title">
                    {lang === 'en' ? 'Key Technologies' : 'فناوری‌های کلیدی'}
                </h2>
                <div className="technologies-grid">
                    {SYSTEM_INFO.keyTechnologies[lang].map((tech, index) => (
                        <div key={index} className="tech-badge">
                            {tech}
                        </div>
                    ))}
                </div>
            </section>

            {/* Search and Filters Section */}
            <section className="mas-filters-section container">
                <div className="filters-header">
                    <h2 className="section-title">
                        {lang === 'en' ? 'Component Library' : 'کتابخانه اجزا'}
                    </h2>
                    <div className="filter-actions">
                        <button onClick={expandAll} className="btn-secondary">
                            {lang === 'en' ? 'Expand All' : 'باز کردن همه'}
                        </button>
                        <button onClick={collapseAll} className="btn-secondary">
                            {lang === 'en' ? 'Collapse All' : 'بستن همه'}
                        </button>
                        {(searchQuery || selectedTag !== 'all') && (
                            <button onClick={clearFilters} className="btn-clear">
                                {lang === 'en' ? 'Clear Filters' : 'پاک کردن فیلترها'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder={lang === 'en' ? 'Search components...' : 'جستجوی اجزا...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="search-clear"
                            aria-label={lang === 'en' ? 'Clear search' : 'پاک کردن جستجو'}
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Tag Filter */}
                <div className="tag-filter">
                    <label className="tag-filter-label">
                        {lang === 'en' ? 'Filter by tag:' : 'فیلتر بر اساس برچسب:'}
                    </label>
                    <div className="tag-buttons">
                        <button
                            className={`tag-btn ${selectedTag === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedTag('all')}
                        >
                            {lang === 'en' ? 'All' : 'همه'}
                        </button>
                        {allTags.slice(0, 15).map(tag => (
                            <button
                                key={tag}
                                className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
                                onClick={() => setSelectedTag(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                {(searchQuery || selectedTag !== 'all') && (
                    <div className="results-count">
                        {lang === 'en'
                            ? `Found ${filteredComponents.length} component${filteredComponents.length !== 1 ? 's' : ''}`
                            : `${filteredComponents.length} جزء یافت شد`
                        }
                    </div>
                )}
            </section>

            {/* Categories and Components */}
            <section className="mas-components-section container">
                {ALL_CATEGORIES.map(category => {
                    const categoryComponents = filteredByCategory[category.id] || [];
                    const isExpanded = expandedCategories.has(category.id);
                    const isFiltered = searchQuery || selectedTag !== 'all';

                    // Hide category if no components match filter
                    if (isFiltered && categoryComponents.length === 0) {
                        return null;
                    }

                    return (
                        <div key={category.id} className="category-section">
                            <div
                                className="category-header"
                                onClick={() => toggleCategory(category.id)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        toggleCategory(category.id);
                                    }
                                }}
                            >
                                <div className="category-header-left">
                                    <span className="category-icon">{category.icon}</span>
                                    <h3 className="category-name">{category.name[lang]}</h3>
                                    <span className="category-count">
                                        {isFiltered
                                            ? `${categoryComponents.length}/${category.count}`
                                            : category.count
                                        }
                                    </span>
                                </div>
                                <div className="category-header-right">
                                    <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
                                        ▼
                                    </span>
                                </div>
                            </div>

                            {isExpanded && (
                                <>
                                    <p className="category-description">
                                        {category.description[lang]}
                                    </p>
                                    <div className="components-grid">
                                        {(isFiltered ? categoryComponents : category.components).map(component => (
                                            <div key={component.id} className="component-card">
                                                <div className="component-header">
                                                    <h4 className="component-title">
                                                        {component.title[lang]}
                                                    </h4>
                                                    <span className="component-status">
                                                        {component.status}
                                                    </span>
                                                </div>
                                                <div className="component-meta">
                                                    <code className="component-path">
                                                        {component.component}
                                                    </code>
                                                </div>
                                                <div className="component-tags">
                                                    {component.tags.map(tag => (
                                                        <span
                                                            key={tag}
                                                            className="component-tag"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedTag(tag);
                                                            }}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </section>

            {/* No Results */}
            {filteredComponents.length === 0 && (searchQuery || selectedTag !== 'all') && (
                <section className="no-results container">
                    <p>
                        {lang === 'en'
                            ? 'No components found matching your filters.'
                            : 'هیچ جزئی با فیلترهای شما یافت نشد.'}
                    </p>
                    <button onClick={clearFilters} className="btn-primary">
                        {lang === 'en' ? 'Clear Filters' : 'پاک کردن فیلترها'}
                    </button>
                </section>
            )}
        </main>
    );
}
