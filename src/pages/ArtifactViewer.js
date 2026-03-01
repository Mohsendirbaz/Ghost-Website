/**
 * src/pages/ArtifactViewer.js
 * Single artifact viewer
 * Route: /[lang]/artifacts/:slug
 *
 * Content strategy:
 *   localFile.type === 'markdown' → MarkdownViewer (react-markdown + remark-gfm)
 *   localFile.type === 'pdf'      → PdfViewer (native embed + download button)
 *   (no localFile)                → ExternalViewer (direct Claude link)
 *
 * Tabs:
 *   Preview — the document content
 *   Info    — metadata; external links show "Not available" for local files
 */
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLang } from '../context/LanguageContext';
import { ARTIFACT_BY_SLUG, ARTIFACT_CATEGORIES, artifactUrl } from '../data/artifacts';
import AddToCartButton from '../components/AddToCartButton';
import '../styles/artifacts.css';

const TAB_PREVIEW = 'preview';
const TAB_INFO    = 'info';

// ─── Markdown viewer ──────────────────────────────────────────────────────────

function MarkdownViewer({ path, isRtl }) {
    const [state,   setState]   = useState('loading'); // 'loading' | 'ready' | 'error'
    const [content, setContent] = useState('');

    useEffect(() => {
        setState('loading');
        setContent('');
        fetch(path)
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.text();
            })
            .then((text) => { setContent(text); setState('ready'); })
            .catch(() => setState('error'));
    }, [path]);

    if (state === 'loading') {
        return (
            <div className="artifact-doc-overlay" aria-live="polite">
                <div className="artifact-spinner" aria-label={isRtl ? 'در حال بارگذاری...' : 'Loading…'} />
                <p>{isRtl ? 'در حال بارگذاری سند...' : 'Loading document…'}</p>
            </div>
        );
    }

    if (state === 'error') {
        return (
            <div className="artifact-doc-overlay artifact-doc-overlay--error" aria-live="assertive">
                <p>{isRtl ? 'خطا در بارگذاری سند.' : 'Failed to load document.'}</p>
            </div>
        );
    }

    return (
        <div className="artifact-md-wrap" dir={isRtl ? 'rtl' : 'ltr'}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // Wrap every table in a scrollable container
                    table: ({ node, ...props }) => (
                        <div className="artifact-md-table-scroll">
                            <table {...props} />
                        </div>
                    ),
                    // Open external links in new tab
                    a: ({ node, children, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer">{children}</a>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

// ─── HTML dashboard viewer ────────────────────────────────────────────────────

function HtmlViewer({ path, title, isRtl }) {
    const [loaded, setLoaded] = useState(false);
    // encodeURI handles spaces and special chars while preserving path slashes
    const src = encodeURI(path);

    return (
        <div className="artifact-html-wrap">
            <div className="artifact-embed-body">
                <iframe
                    src={src}
                    title={title}
                    className="artifact-html-embed"
                    onLoad={() => setLoaded(true)}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                    aria-label={title}
                />
                {!loaded && (
                    <div className="artifact-overlay-loading" aria-live="polite">
                        <div className="artifact-spinner" aria-label={isRtl ? 'در حال بارگذاری...' : 'Loading…'} />
                        <p>{isRtl ? 'در حال بارگذاری داشبورد...' : 'Loading dashboard…'}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── PDF viewer ───────────────────────────────────────────────────────────────

function PdfViewer({ path, filename, title, isRtl }) {
    const [loaded, setLoaded] = useState(false);
    const src = encodeURI(path);

    return (
        <div className="artifact-pdf-wrap">
            <div className="artifact-pdf-toolbar">
                <a
                    href={path}
                    download={filename || ''}
                    className="artifact-pdf-download"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {isRtl ? 'دانلود PDF' : 'Download PDF'}
                </a>
            </div>
            <div className="artifact-embed-body">
                <iframe
                    src={src}
                    className="artifact-pdf-embed"
                    title={title}
                    aria-label={title}
                    onLoad={() => setLoaded(true)}
                />
                {!loaded && (
                    <div className="artifact-overlay-loading" aria-live="polite">
                        <div className="artifact-spinner" aria-label={isRtl ? 'در حال بارگذاری...' : 'Loading…'} />
                        <p>{isRtl ? 'در حال بارگذاری PDF...' : 'Loading PDF…'}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Main viewer ──────────────────────────────────────────────────────────────

export default function ArtifactViewer() {
    const { lang }    = useLang();
    const { slug }    = useParams();
    const navigate    = useNavigate();
    const isRtl       = lang === 'fa';

    const artifact = ARTIFACT_BY_SLUG[slug];

    const [tab, setTab] = useState(TAB_PREVIEW);

    // 404 guard
    useEffect(() => {
        if (!artifact) navigate(`/${lang}/artifacts`, { replace: true });
    }, [artifact, navigate, lang]);

    // Reset tab on slug change
    useEffect(() => {
        setTab(TAB_PREVIEW);
    }, [slug]);

    if (!artifact) return null;

    const title   = isRtl ? artifact.fa.title       : artifact.en.title;
    const desc    = isRtl ? artifact.fa.description  : artifact.en.description;
    const catKey  = artifact.category;
    const cat     = ARTIFACT_CATEGORIES[catKey];
    const catLabel = cat ? (isRtl ? cat.fa : cat.en) : catKey;
    const lf      = artifact.localFile; // null for Claude artifacts
    const isLocal = !!lf;

    // External Claude URL — only valid for UUID-identified artifacts
    const externalUrl = !isLocal ? artifactUrl(artifact.id) : null;

    // For HTML artifacts the path is language-keyed; for others use lf.path
    const localPath = isLocal
        ? (lf.type === 'html' ? lf.paths[lang] : lf.path)
        : null;

    // Topbar action: open in new tab
    const openHref = isLocal ? localPath : externalUrl;

    return (
        <main id="main-content" className="artifact-viewer-page">

            {/* ── Top bar ── */}
            <div className="artifact-viewer-topbar">
                <nav className="kb-breadcrumb" aria-label={isRtl ? 'مسیر' : 'Breadcrumb'}>
                    <Link to={`/${lang}/artifacts`} className="kb-breadcrumb__item">
                        {isRtl ? 'کتابخانه دارایی‌ها' : 'Asset Library'}
                    </Link>
                    <span className="kb-breadcrumb__sep" aria-hidden="true">›</span>
                    <span className="kb-breadcrumb__item kb-breadcrumb__item--current" aria-current="page">{title}</span>
                </nav>

                <div className="artifact-viewer-topbar__actions">
                    <a
                        href={openHref}
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
                        {isLocal ? (
                            <span className="artifact-viewer-source-label">
                                {{ pdf: 'PDF Document', markdown: 'Markdown Document', html: 'Interactive Dashboard' }[lf.type] || lf.type}
                            </span>
                        ) : (
                            <a
                                href={externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="artifact-viewer-source-link"
                            >
                                Claude Artifact · {artifact.id.slice(0, 8)}…
                            </a>
                        )}
                    </div>

                    {isLocal && (
                        <div className="artifact-viewer-meta" style={{ marginTop: 'var(--space-2)' }}>
                            <div className="kb-aside__heading">{isRtl ? 'دانلود' : 'Download'}</div>
                            <AddToCartButton
                                item={{
                                    id: lf.type === 'html'
                                        ? `artifact-${artifact.id}-${lang}`
                                        : `artifact-${artifact.id}`,
                                    filename: lf.type === 'html'
                                        ? (lf.filenames?.[lang] || `${artifact.slug}-${lang}.html`)
                                        : (lf.filename || `${artifact.slug}.${lf.type}`),
                                    path: lf.type === 'html'
                                        ? lf.paths[lang].replace(/^\//, '')
                                        : lf.path.replace(/^\//, ''),
                                    type: lf.type,
                                    title: { en: artifact.en.title, fa: artifact.fa.title },
                                    category: artifact.category,
                                    keywords: artifact.tags || [],
                                    addedAt: Date.now(),
                                }}
                                variant="compact"
                            />
                        </div>
                    )}
                </aside>

                {/* ── Right: content area ── */}
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
                        <div className="artifact-content-panel" role="tabpanel">
                            {isLocal && lf.type === 'markdown' && (
                                <MarkdownViewer path={lf.path} isRtl={isRtl} />
                            )}
                            {isLocal && lf.type === 'pdf' && (
                                <PdfViewer
                                    path={lf.path}
                                    filename={lf.filename}
                                    title={title}
                                    isRtl={isRtl}
                                />
                            )}
                            {isLocal && lf.type === 'html' && (
                                <HtmlViewer
                                    path={localPath}
                                    title={title}
                                    isRtl={isRtl}
                                />
                            )}
                            {!isLocal && (
                                <div className="artifact-doc-overlay">
                                    <svg viewBox="0 0 24 24" className="artifact-ext-icon" aria-hidden="true">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                    <p className="artifact-ext-label">
                                        {isRtl
                                            ? 'این دارایی در Claude قابل مشاهده است'
                                            : 'This artifact is hosted on Claude'}
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

                                <dt>{isRtl ? 'نوع' : 'Type'}</dt>
                                <dd>
                                    {isLocal
                                        ? ({ pdf: 'PDF Document', markdown: 'Markdown Document', html: 'Interactive Dashboard' }[lf.type] || lf.type)
                                        : 'Claude Artifact'}
                                </dd>

                                <dt>{isRtl ? 'شناسه' : 'ID'}</dt>
                                <dd className="artifact-info-dl__mono">{artifact.id}</dd>

                                <dt>{isRtl ? 'لینک مستقیم' : 'Direct link'}</dt>
                                <dd>
                                    {isLocal ? (
                                        <span className="artifact-info-na">
                                            {isRtl ? 'در دسترس نیست' : 'Not available'}
                                        </span>
                                    ) : (
                                        <a
                                            href={externalUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="artifact-info-link"
                                        >
                                            {externalUrl}
                                        </a>
                                    )}
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
