/**
 * src/pages/LibraryAssetViewer.js
 * Per-asset viewer for Library of Assets
 * Routes: /en/library/assets/:slug  /fa/library/assets/:slug
 *
 * Displays asset metadata + inline document viewer (PDF / HTML / MD).
 * File path resolved from the library manifest; falls back to targetUrl
 * when it references an actual file (not a viewer route).
 */
import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Breadcrumb from '../components/Breadcrumb';
import AddToCartButton from '../components/AddToCartButton';
import {
    CRITICAL_ASSETS,
    HIGH_ASSETS,
    ASSET_STATUS,
    STATUS_ICONS,
    flattenAssets,
} from '../data/libraryAssets';
import { useLibraryManifest } from '../data/libraryManifest';
import './LibraryAssetViewer.css';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isActualFilePath(url) {
    if (!url) return false;
    // Viewer routes contain /library/assets/; real file URLs don't
    return !url.includes('/library/assets/');
}

function resolveFilePath(asset, manifestData) {
    if (!asset) return null;

    // 1. targetUrl that points to an actual file (e.g. /docs/pdf/…)
    if (isActualFilePath(asset.targetUrl)) {
        return encodeURI(asset.targetUrl);
    }

    // 2. Manifest lookup by exact filename
    if (manifestData?.files) {
        const entry = manifestData.files.find(
            (f) => f.filename === asset.filename
        );
        if (entry?.path) return encodeURI(entry.path);
    }

    return null;
}

// ─── PDF Viewer ───────────────────────────────────────────────────────────────

function PdfViewer({ path, title, isRtl }) {
    const [state, setState] = useState('loading');
    const [blobUrl, setBlobUrl] = useState(null);
    const blobRef = useRef(null);

    useEffect(() => {
        setState('loading');
        setBlobUrl(null);
        const ctrl = new AbortController();

        fetch(path, { signal: ctrl.signal })
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.blob();
            })
            .then((blob) => {
                if (blobRef.current) URL.revokeObjectURL(blobRef.current);
                const url = URL.createObjectURL(blob);
                blobRef.current = url;
                setBlobUrl(url);
                setState('ready');
            })
            .catch((err) => {
                if (err.name !== 'AbortError') setState('error');
            });

        return () => {
            ctrl.abort();
            if (blobRef.current) {
                URL.revokeObjectURL(blobRef.current);
                blobRef.current = null;
            }
        };
    }, [path]);

    if (state === 'error') {
        return (
            <div className="lav-doc-overlay lav-doc-overlay--error">
                <span aria-hidden="true">⚠</span>
                <p>{isRtl ? 'خطا در بارگذاری فایل' : 'Could not load file'}</p>
                <a href={path} download className="lav-download-link">
                    {isRtl ? 'دانلود مستقیم' : 'Download directly'}
                </a>
            </div>
        );
    }

    return (
        <div className="lav-embed-body">
            {state === 'loading' && (
                <div className="lav-doc-overlay" aria-live="polite">
                    <div className="lav-spinner" aria-hidden="true" />
                    <p>{isRtl ? 'در حال بارگذاری...' : 'Loading…'}</p>
                </div>
            )}
            {blobUrl && (
                <iframe
                    src={blobUrl}
                    title={title}
                    className="lav-pdf-embed"
                    aria-label={title}
                />
            )}
        </div>
    );
}

// ─── HTML Viewer ──────────────────────────────────────────────────────────────

function HtmlViewer({ path, title, isRtl }) {
    const [state, setState] = useState('loading');
    const [srcdoc, setSrcdoc] = useState('');

    useEffect(() => {
        setState('loading');
        setSrcdoc('');

        fetch(encodeURI(path))
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.text();
            })
            .then((html) => {
                setSrcdoc(html);
                setState('ready');
            })
            .catch(() => setState('error'));
    }, [path]);

    if (state === 'error') {
        return (
            <div className="lav-doc-overlay lav-doc-overlay--error">
                <span aria-hidden="true">⚠</span>
                <p>{isRtl ? 'خطا در بارگذاری فایل' : 'Could not load file'}</p>
                <a href={path} download className="lav-download-link">
                    {isRtl ? 'دانلود مستقیم' : 'Download directly'}
                </a>
            </div>
        );
    }

    if (state === 'loading') {
        return (
            <div className="lav-doc-overlay" aria-live="polite">
                <div className="lav-spinner" aria-hidden="true" />
                <p>{isRtl ? 'در حال بارگذاری...' : 'Loading…'}</p>
            </div>
        );
    }

    return (
        <div className="lav-embed-body">
            <iframe
                srcdoc={srcdoc}
                title={title}
                className="lav-html-embed"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                aria-label={title}
            />
        </div>
    );
}

// ─── Markdown Viewer ──────────────────────────────────────────────────────────

function MdViewer({ path, title, isRtl }) {
    const [state, setState] = useState('loading');
    const [text, setText] = useState('');

    useEffect(() => {
        setState('loading');
        setText('');

        fetch(encodeURI(path))
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.text();
            })
            .then((t) => {
                setText(t);
                setState('ready');
            })
            .catch(() => setState('error'));
    }, [path]);

    if (state === 'error') {
        return (
            <div className="lav-doc-overlay lav-doc-overlay--error">
                <span aria-hidden="true">⚠</span>
                <p>{isRtl ? 'خطا در بارگذاری فایل' : 'Could not load file'}</p>
                <a href={path} download className="lav-download-link">
                    {isRtl ? 'دانلود مستقیم' : 'Download directly'}
                </a>
            </div>
        );
    }

    if (state === 'loading') {
        return (
            <div className="lav-doc-overlay" aria-live="polite">
                <div className="lav-spinner" aria-hidden="true" />
                <p>{isRtl ? 'در حال بارگذاری...' : 'Loading…'}</p>
            </div>
        );
    }

    return (
        <div className="lav-embed-body lav-embed-body--md">
            <pre className="lav-md-content" dir={isRtl ? 'rtl' : 'ltr'}>{text}</pre>
        </div>
    );
}

// ─── Status Banner ────────────────────────────────────────────────────────────

function StatusBanner({ status, isRtl }) {
    const labels = {
        [ASSET_STATUS.IN_PROGRESS]: {
            en: 'Document processing in progress — check back soon',
            fa: 'پردازش سند در حال انجام است — به زودی بازگردید',
        },
        [ASSET_STATUS.QUEUED]: {
            en: 'Document queued for processing',
            fa: 'سند در صف پردازش است',
        },
        [ASSET_STATUS.NEEDS_REVIEW]: {
            en: 'Document pending review before publication',
            fa: 'سند در انتظار بررسی پیش از انتشار است',
        },
        [ASSET_STATUS.BLOCKED]: {
            en: 'Document temporarily unavailable',
            fa: 'سند موقتاً در دسترس نیست',
        },
    };
    const label = labels[status];
    if (!label) return null;
    return (
        <div className={`lav-status-banner lav-status-banner--${status}`}>
            <span aria-hidden="true">{STATUS_ICONS[status]}</span>
            <span>{isRtl ? label.fa : label.en}</span>
        </div>
    );
}

// ─── Not Found ────────────────────────────────────────────────────────────────

function AssetNotFound({ lang, isRtl }) {
    const navigate = useNavigate();
    return (
        <div className="lav-not-found">
            <div className="lav-not-found__icon" aria-hidden="true">🔍</div>
            <h2>{isRtl ? 'دارایی یافت نشد' : 'Asset Not Found'}</h2>
            <p>
                {isRtl
                    ? 'دارایی مورد نظر در کتابخانه وجود ندارد.'
                    : 'The requested asset was not found in the library.'}
            </p>
            <button className="lav-back-btn" onClick={() => navigate(`/${lang}/library/assets`)}>
                {isRtl ? '← بازگشت به کتابخانه' : '← Back to Library'}
            </button>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LibraryAssetViewer() {
    const { slug } = useParams();
    const { lang } = useLang();
    const navigate = useNavigate();
    const isRtl = lang === 'fa';

    const { data: manifestData, loading: manifestLoading } = useLibraryManifest();

    const allAssets = useMemo(() => flattenAssets([CRITICAL_ASSETS, HIGH_ASSETS]), []);
    const asset = useMemo(() => allAssets.find((a) => a.slug === slug), [allAssets, slug]);

    const filePath = useMemo(
        () => resolveFilePath(asset, manifestData),
        [asset, manifestData]
    );

    if (!asset) {
        return (
            <main id="main-content" className="lav-page">
                <Breadcrumb crumbs={[
                    { label: copy[lang].breadcrumb.home, to: `/${lang}` },
                    { label: copy[lang].breadcrumb.libraryAssets, to: `/${lang}/library/assets` },
                    { label: isRtl ? 'یافت نشد' : 'Not Found' },
                ]} />
                <AssetNotFound lang={lang} isRtl={isRtl} />
            </main>
        );
    }

    const title = asset.title[lang] || asset.title.en;
    const description = asset.description[lang] || asset.description.en;
    const isReady = asset.status === ASSET_STATUS.READY;

    const cartItem = {
        id:       `library-${asset.id}`,
        filename:  asset.filename,
        path:      filePath || asset.targetUrl || `/library/${asset.type}/${asset.filename}`,
        type:      asset.type,
        title:     asset.title,
        category:  asset.categoryId || 'library',
        keywords:  asset.tags || [],
    };

    return (
        <main id="main-content" className="lav-page">
            <Breadcrumb crumbs={[
                { label: copy[lang].breadcrumb.home, to: `/${lang}` },
                { label: copy[lang].breadcrumb.libraryAssets, to: `/${lang}/library/assets` },
                { label: title },
            ]} />

            {/* ── Asset header ── */}
            <div className="lav-header">
                <div className="lav-header__inner">
                    <button
                        className="lav-back-btn"
                        onClick={() => navigate(`/${lang}/library/assets`)}
                        aria-label={isRtl ? 'بازگشت به کتابخانه' : 'Back to Library'}
                    >
                        {isRtl ? '→ کتابخانه' : '← Library'}
                    </button>

                    <div className="lav-header__meta">
                        <div className="lav-header__badges">
                            <span className="lav-badge lav-badge--status">
                                {STATUS_ICONS[asset.status]}&nbsp;{asset.status}
                            </span>
                            <span className={`lav-badge lav-badge--type lav-badge--${asset.type}`}>
                                {asset.type.toUpperCase()}
                            </span>
                            <span className="lav-badge lav-badge--lang">
                                {(asset.lang || lang).toUpperCase()}
                            </span>
                            {asset.priority && (
                                <span className="lav-badge lav-badge--priority">
                                    P{asset.priority}
                                </span>
                            )}
                        </div>

                        <h1 className="lav-header__title">{title}</h1>
                        {description && (
                            <p className="lav-header__desc">{description}</p>
                        )}

                        <div className="lav-header__filename" title={asset.filename}>
                            <span aria-hidden="true">📄</span>
                            {asset.filename}
                        </div>

                        {(asset.tags || []).length > 0 && (
                            <div className="lav-header__tags">
                                {asset.tags.map((tag) => (
                                    <span key={tag} className="lav-tag">{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lav-header__actions">
                        {filePath && (
                            <a
                                href={filePath}
                                download={asset.filename}
                                className="lav-download-btn"
                            >
                                {isRtl ? '⬇ دانلود' : '⬇ Download'}
                            </a>
                        )}
                        <AddToCartButton item={cartItem} variant="compact" />
                    </div>
                </div>
            </div>

            {/* ── Status banner (non-ready assets) ── */}
            {!isReady && <StatusBanner status={asset.status} isRtl={isRtl} />}

            {/* ── Document viewer ── */}
            {isReady && (
                <div className="lav-viewer">
                    {manifestLoading && !manifestData && (
                        <div className="lav-doc-overlay" aria-live="polite">
                            <div className="lav-spinner" aria-hidden="true" />
                            <p>{isRtl ? 'در حال بارگذاری...' : 'Locating file…'}</p>
                        </div>
                    )}

                    {!manifestLoading && !filePath && (
                        <div className="lav-doc-overlay lav-doc-overlay--unavailable">
                            <span aria-hidden="true">📂</span>
                            <p>
                                {isRtl
                                    ? 'این فایل هنوز برای نمایش آنلاین آماده نشده است.'
                                    : 'This file is not yet available for online viewing.'}
                            </p>
                        </div>
                    )}

                    {filePath && asset.type === 'pdf' && (
                        <PdfViewer path={filePath} title={title} isRtl={isRtl} />
                    )}
                    {filePath && asset.type === 'html' && (
                        <HtmlViewer path={filePath} title={title} isRtl={isRtl} />
                    )}
                    {filePath && asset.type === 'md' && (
                        <MdViewer path={filePath} title={title} isRtl={isRtl} />
                    )}
                </div>
            )}

            {/* ── Bilateral pair notice ── */}
            {asset.bilateralPair && (
                <div className="lav-bilateral">
                    <span aria-hidden="true">🔗</span>
                    <span>
                        {isRtl
                            ? `جفت دوزبانه: ${asset.bilateralPair}`
                            : `Bilingual pair: ${asset.bilateralPair}`}
                    </span>
                </div>
            )}
        </main>
    );
}
