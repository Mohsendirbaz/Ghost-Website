/**
 * src/pages/ArtifactViewer.js
 * Single artifact viewer
 * Route: /[lang]/artifacts/:slug
 *
 * Embeds the Claude public artifact in an iframe with:
 *  - "Preview" tab — sandboxed iframe
 *  - "Info"    tab — metadata (title, description, tags)
 *  - "Open in new tab" always visible as fallback
 *
 * If the iframe is blocked by the host's CSP/X-Frame-Options, the error
 * state is shown automatically with a direct link.
 */
import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { ARTIFACT_BY_SLUG, ARTIFACT_CATEGORIES, artifactUrl } from '../data/artifacts';
import '../styles/artifacts.css';

const TAB_PREVIEW = 'preview';
const TAB_INFO    = 'info';

export default function ArtifactViewer() {
    const { lang }    = useLang();
    const { slug }    = useParams();
    const navigate    = useNavigate();
    const isRtl       = lang === 'fa';

    const artifact = ARTIFACT_BY_SLUG[slug];

    const [tab,          setTab]          = useState(TAB_PREVIEW);
    const [iframeState,  setIframeState]  = useState('loading'); // 'loading' | 'ready' | 'error'

    // 404 guard
    useEffect(() => {
        if (!artifact) navigate(`/${lang}/artifacts`, { replace: true });
    }, [artifact, navigate, lang]);

    // Reset iframe state on slug change
    useEffect(() => {
        setIframeState('loading');
        setTab(TAB_PREVIEW);
    }, [slug]);

    const handleLoad  = useCallback(() => setIframeState('ready'),  []);
    const handleError = useCallback(() => setIframeState('error'), []);

    if (!artifact) return null;

    const title   = isRtl ? artifact.fa.title       : artifact.en.title;
    const desc    = isRtl ? artifact.fa.description  : artifact.en.description;
    const catKey  = artifact.category;
    const cat     = ARTIFACT_CATEGORIES[catKey];
    const catLabel = cat ? (isRtl ? cat.fa : cat.en) : catKey;
    const externalUrl = artifactUrl(artifact.id);

    return (
        <main id="main-content" className="artifact-viewer-page">

            {/* ── Top bar ── */}
            <div className="artifact-viewer-topbar">
                <nav className="kb-breadcrumb" aria-label={isRtl ? 'مسیر' : 'Breadcrumb'}>
                    <Link to={`/${lang}/artifacts`} className="kb-breadcrumb__item">
                        {isRtl ? 'کتابخانه دارایی‌ها' : 'Asset Library'}
                    </Link>
                    <span className="kb-breadcrumb__sep" aria-hidden="true">›</span>
                    <span className="kb-breadcrumb__item kb-breadcrumb__item--current">{title}</span>
                </nav>

                <div className="artifact-viewer-topbar__actions">
                    <a
                        href={externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="artifact-external-btn"
                        aria-label={isRtl ? 'باز کردن در تب جدید' : 'Open in new tab'}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        {isRtl ? 'باز کردن' : 'Open in new tab'}
                    </a>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="artifact-viewer-layout">

                {/* ── Left: metadata sidebar ── */}
                <aside className="artifact-viewer-sidebar">
                    <span className={`artifact-card__cat artifact-card__cat--${catKey}`}>
                        {catLabel}
                    </span>
                    <h1 className="artifact-viewer-title">{title}</h1>
                    {desc && <p className="artifact-viewer-desc">{desc}</p>}

                    {(artifact.tags || []).length > 0 && (
                        <div className="artifact-viewer-tags">
                            <div className="kb-aside__heading">{isRtl ? 'برچسب‌ها' : 'Topics'}</div>
                            <div className="artifact-viewer-tag-list">
                                {artifact.tags.map((tag) => (
                                    <Link
                                        key={tag}
                                        to={`/${lang}/artifacts?q=${encodeURIComponent(tag)}`}
                                        className="kb-chip"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="artifact-viewer-meta">
                        <div className="kb-aside__heading">{isRtl ? 'منبع' : 'Source'}</div>
                        <a
                            href={externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="artifact-viewer-source-link"
                        >
                            Claude Artifact · {artifact.id.slice(0, 8)}…
                        </a>
                    </div>
                </aside>

                {/* ── Right: iframe area ── */}
                <div className="artifact-viewer-main">

                    {/* Tabs */}
                    <div className="artifact-tabs" role="tablist">
                        <button
                            role="tab"
                            className={`artifact-tab${tab === TAB_PREVIEW ? ' active' : ''}`}
                            aria-selected={tab === TAB_PREVIEW}
                            onClick={() => setTab(TAB_PREVIEW)}
                        >
                            {isRtl ? 'پیش‌نمایش' : 'Preview'}
                        </button>
                        <button
                            role="tab"
                            className={`artifact-tab${tab === TAB_INFO ? ' active' : ''}`}
                            aria-selected={tab === TAB_INFO}
                            onClick={() => setTab(TAB_INFO)}
                        >
                            {isRtl ? 'اطلاعات' : 'Info'}
                        </button>
                    </div>

                    {/* Preview panel */}
                    {tab === TAB_PREVIEW && (
                        <div className="artifact-iframe-wrap" role="tabpanel">
                            {/* Loading spinner */}
                            {iframeState === 'loading' && (
                                <div className="artifact-iframe-overlay" aria-live="polite">
                                    <div className="artifact-spinner" aria-label={isRtl ? 'در حال بارگذاری...' : 'Loading…'} />
                                    <p>{isRtl ? 'در حال بارگذاری دارایی...' : 'Loading artifact…'}</p>
                                </div>
                            )}

                            {/* Error fallback */}
                            {iframeState === 'error' && (
                                <div className="artifact-iframe-overlay artifact-iframe-overlay--error" aria-live="assertive">
                                    <svg className="kb-empty__icon" viewBox="0 0 24 24" aria-hidden="true">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    <div className="kb-empty__title">
                                        {isRtl ? 'نمی‌توان در اینجا نمایش داد' : 'Cannot preview here'}
                                    </div>
                                    <p>
                                        {isRtl
                                            ? 'این دارایی در iframe نمایش داده نمی‌شود. آن را در تب جدید باز کنید.'
                                            : 'This artifact cannot be embedded. Open it directly to view.'
                                        }
                                    </p>
                                    <a
                                        href={externalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        {isRtl ? 'باز کردن در Claude' : 'Open in Claude'}
                                    </a>
                                </div>
                            )}

                            {/* The iframe — always mounted so onLoad fires.
                                src points to our server-side proxy which strips
                                X-Frame-Options / frame-ancestors from the upstream
                                claude.ai response so the browser allows the embed. */}
                            <iframe
                                src={`/api/artifact-proxy?id=${artifact.id}`}
                                className="artifact-iframe"
                                title={title}
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                loading="lazy"
                                onLoad={handleLoad}
                                onError={handleError}
                                style={{ visibility: iframeState === 'ready' ? 'visible' : 'hidden' }}
                            />
                        </div>
                    )}

                    {/* Info panel */}
                    {tab === TAB_INFO && (
                        <div className="artifact-info-panel" role="tabpanel">
                            <h2>{isRtl ? 'درباره این دارایی' : 'About this artifact'}</h2>
                            <dl className="artifact-info-dl">
                                <dt>{isRtl ? 'عنوان' : 'Title'}</dt>
                                <dd>{title}</dd>

                                <dt>{isRtl ? 'دسته‌بندی' : 'Category'}</dt>
                                <dd>{catLabel}</dd>

                                <dt>{isRtl ? 'شناسه' : 'Artifact ID'}</dt>
                                <dd className="artifact-info-dl__mono">{artifact.id}</dd>

                                <dt>{isRtl ? 'لینک مستقیم' : 'Direct link'}</dt>
                                <dd>
                                    <a
                                        href={externalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="artifact-info-link"
                                    >
                                        {externalUrl}
                                    </a>
                                </dd>

                                {desc && (
                                    <>
                                        <dt>{isRtl ? 'توضیحات' : 'Description'}</dt>
                                        <dd>{desc}</dd>
                                    </>
                                )}

                                {(artifact.tags || []).length > 0 && (
                                    <>
                                        <dt>{isRtl ? 'برچسب‌ها' : 'Topics'}</dt>
                                        <dd>
                                            <div className="artifact-viewer-tag-list">
                                                {artifact.tags.map((t) => (
                                                    <span key={t} className="kb-chip">{t}</span>
                                                ))}
                                            </div>
                                        </dd>
                                    </>
                                )}
                            </dl>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
