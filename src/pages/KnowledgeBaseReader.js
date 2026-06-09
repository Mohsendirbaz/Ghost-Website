/**
 * src/pages/KnowledgeBaseReader.js
 * Knowledge Base Reader — three-column reading surface
 * Handles three node types: Part landing, Chapter, Section
 *
 * Routes (registered in App.js):
 *   /en/knowledge-base/:partSlug                          → Part landing
 *   /en/knowledge-base/:partSlug/:chapterSlug             → Chapter reader
 *   /en/knowledge-base/:partSlug/:chapterSlug/:sectionSlug → Section reader
 */
import { useEffect, useMemo, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import {
    KB_PARTS, PART_BY_SLUG, CHAPTER_BY_SLUG, ALL_NODES,
    buildPath, resolveHref,
} from '../data/knowledgeBase';
import {
    injectJsonLd, removeJsonLd,
    buildPartGraph, buildChapterGraph, buildSectionGraph,
} from '../utils/jsonld';
import AddToCartButton from '../components/AddToCartButton';
import '../styles/knowledgeBase.css';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function useSiblings(partSlug, chapterSlug, sectionSlug, lang) {
    return useMemo(() => {
        const flatParts     = KB_PARTS;
        const partIdx       = flatParts.findIndex((p) => p.slug === partSlug);
        const part          = flatParts[partIdx];
        if (!part) return { prev: null, next: null };

        if (!chapterSlug) {
            // Part-level siblings
            const prev = flatParts[partIdx - 1];
            const next = flatParts[partIdx + 1];
            return {
                prev: prev ? { title: prev.title, href: buildPath(lang, prev.slug) } : null,
                next: next ? { title: next.title, href: buildPath(lang, next.slug) } : null,
            };
        }

        const chapters = part.chapters || [];
        const chIdx    = chapters.findIndex((c) => c.slug === chapterSlug);
        const chapter  = chapters[chIdx];
        if (!chapter) return { prev: null, next: null };

        if (!sectionSlug) {
            const prevCh = chapters[chIdx - 1] || (partIdx > 0 ? flatParts[partIdx - 1]?.chapters?.slice(-1)[0] : null);
            const nextCh = chapters[chIdx + 1] || (partIdx < flatParts.length - 1 ? flatParts[partIdx + 1]?.chapters?.[0] : null);
            const prevPart = prevCh ? flatParts.find((p) => (p.chapters || []).some((c) => c.slug === prevCh.slug)) : null;
            const nextPart = nextCh ? flatParts.find((p) => (p.chapters || []).some((c) => c.slug === nextCh.slug)) : null;
            return {
                prev: prevCh && prevPart ? { title: prevCh.title, href: buildPath(lang, prevPart.slug, prevCh.slug) } : null,
                next: nextCh && nextPart ? { title: nextCh.title, href: buildPath(lang, nextPart.slug, nextCh.slug) } : null,
            };
        }

        const sections = chapter.sections || [];
        const secIdx   = sections.findIndex((s) => s.slug === sectionSlug);
        const prevSec  = sections[secIdx - 1];
        const nextSec  = sections[secIdx + 1];
        return {
            prev: prevSec ? { title: prevSec.title, href: buildPath(lang, partSlug, chapterSlug, prevSec.slug) } : null,
            next: nextSec ? { title: nextSec.title, href: buildPath(lang, partSlug, chapterSlug, nextSec.slug) } : null,
        };
    }, [partSlug, chapterSlug, sectionSlug, lang]);
}

// ─── TOC Navigator (left column) ─────────────────────────────────────────────

function TocNav({ part, chapter, section, activeChapterSlug, activeSectionSlug, lang }) {
    const isRtl = lang === 'fa';
    if (!part) return null;

    // Hierarchy-aware back navigation: section→chapter, chapter→part, part→KB index
    const backHref = section
        ? buildPath(lang, part.slug, activeChapterSlug)
        : activeChapterSlug
            ? buildPath(lang, part.slug)
            : `/${lang}/knowledge-base`;
    const backLabel = section
        ? (isRtl ? chapter?.title?.fa : chapter?.title?.en)
        : activeChapterSlug
            ? (isRtl ? part.title.fa : part.title.en)
            : (isRtl ? 'همه بخش‌ها' : 'All parts');

    const partTitle = isRtl ? part.title.fa : part.title.en;

    return (
        <nav className="kb-toc-nav" aria-label={isRtl ? 'جدول محتوا' : 'Table of contents'}>
            <Link to={backHref} className="kb-toc__back">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                {backLabel}
            </Link>

            <Link
                to={buildPath(lang, part.slug)}
                className="kb-toc__part-label"
                style={{ '--kb-accent': part.accentColor || 'var(--color-primary)' }}
            >
                Part {part.number} · {partTitle}
            </Link>

            <ul className="kb-toc__list">
                {(part.chapters || []).map((ch) => {
                    const isChActive = ch.slug === activeChapterSlug;
                    const chHref     = buildPath(lang, part.slug, ch.slug);
                    const chTitle    = isRtl ? ch.title.fa : ch.title.en;

                    return (
                        <li key={ch.id} className="kb-toc__item">
                            <Link
                                to={chHref}
                                className={`kb-toc__link${isChActive && !activeSectionSlug ? ' active' : isChActive && activeSectionSlug ? ' ancestor' : ''}`}
                                data-depth="0"
                                aria-current={isChActive && !activeSectionSlug ? 'page' : undefined}
                            >
                                <span className="kb-toc__number">{ch.number}.</span>
                                {chTitle}
                            </Link>

                            {/* Show sections when chapter is active */}
                            {isChActive && (ch.sections || []).length > 0 && (
                                <ul className="kb-toc__list">
                                    {ch.sections.map((sec) => {
                                        const isSecActive = sec.slug === activeSectionSlug;
                                        const secHref     = buildPath(lang, part.slug, ch.slug, sec.slug);
                                        const secTitle    = isRtl ? sec.title.fa : sec.title.en;

                                        return (
                                            <li key={sec.id} className="kb-toc__item">
                                                <Link
                                                    to={secHref}
                                                    className={`kb-toc__link${isSecActive ? ' active' : ''}`}
                                                    data-depth="1"
                                                    aria-current={isSecActive ? 'page' : undefined}
                                                >
                                                    <span className="kb-toc__number">{sec.number}</span>
                                                    {secTitle}
                                                </Link>

                                                {/* Subsections when section is active */}
                                                {isSecActive && (sec.subsections || []).length > 0 && (
                                                    <ul className="kb-toc__list">
                                                        {sec.subsections.map((sub) => {
                                                            const subTitle = isRtl ? sub.title.fa : sub.title.en;
                                                            return (
                                                                <li key={sub.id} className="kb-toc__item">
                                  <span className="kb-toc__link" data-depth="2" style={{ cursor: 'default' }}>
                                    <span className="kb-toc__number">{sub.number}</span>
                                      {subTitle}
                                  </span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

// ─── Aside (right column) ─────────────────────────────────────────────────────

function ReaderAside({ node, part, chapter, lang }) {
    const isRtl = lang === 'fa';
    const tags  = node?.tags || [];
    const pageRef = node?.pageStart;

    // Related nodes: same tags, different id
    const related = useMemo(() =>
            ALL_NODES
                .filter((n) =>
                    n.id !== node?.id &&
                    (n.tags || []).some((t) => tags.includes(t)) &&
                    ['chapter', 'section'].includes(n.nodeType)
                )
                .slice(0, 6),
        [node, tags]);

    const canonicalUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <aside className="kb-aside" aria-label={isRtl ? 'اطلاعات جانبی' : 'Aside'}>
            {pageRef && (
                <div className="kb-aside__section">
                    <div className="kb-aside__heading">{isRtl ? 'صفحه' : 'Page'}</div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                        {isRtl ? `صفحه ${pageRef}` : `p. ${pageRef}`}
                    </p>
                </div>
            )}

            {tags.length > 0 && (
                <div className="kb-aside__section">
                    <div className="kb-aside__heading">{isRtl ? 'برچسب‌ها' : 'Topics'}</div>
                    <div className="kb-aside__tags">
                        {tags.map((tag) => (
                            <Link
                                key={tag}
                                to={`/${lang}/knowledge-base?q=${encodeURIComponent(tag)}`}
                                className="kb-aside__tag"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {related.length > 0 && (
                <div className="kb-aside__section">
                    <div className="kb-aside__heading">{isRtl ? 'مرتبط' : 'Related'}</div>
                    <ul className="kb-aside__related-list">
                        {related.map((n) => {
                            const relHref  = resolveHref(n, lang);
                            const relTitle = isRtl ? n.title.fa : n.title.en;
                            return (
                                <li key={n.id} className="kb-aside__related-item">
                                    <Link to={relHref} className="kb-aside__related-link">
                                        <span style={{ color: 'var(--color-text-secondary)', marginInlineEnd: 4 }}>§{n.number}</span>
                                        {relTitle}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            {canonicalUrl && (
                <div className="kb-aside__section">
                    <div className="kb-aside__heading">{isRtl ? 'استناد' : 'Cite'}</div>
                    <div className="kb-aside__cite-block">
                        <p className="kb-aside__cite-text">{canonicalUrl}</p>
                    </div>
                </div>
            )}

            {chapter && (
                <div className="kb-aside__section">
                    <div className="kb-aside__heading">{isRtl ? 'دانلود' : 'Download'}</div>
                    <AddToCartButton
                        item={{
                            id: `kb-${chapter.id}`,
                            filename: `${chapter.slug}.pdf`,
                            path: `docs/pdf/${chapter.slug}.pdf`,
                            type: 'pdf',
                            title: chapter.title,
                            category: part.slug,
                            keywords: chapter.tags || [],
                            sizeBytes: undefined,
                            sourceNode: {
                                partSlug: part.slug,
                                chapterSlug: chapter.slug,
                            },
                            addedAt: Date.now(),
                        }}
                        variant="compact"
                    />
                </div>
            )}
        </aside>
    );
}

// ─── Part landing view ────────────────────────────────────────────────────────

function PartView({ part, lang }) {
    const isRtl = lang === 'fa';
    const title = isRtl ? part.title.fa : part.title.en;
    const desc  = isRtl ? part.description?.fa : part.description?.en;

    return (
        <>
            <div
                className="kb-part-hero"
                style={{ '--kb-accent': part.accentColor || 'var(--color-primary)' }}
            >
                <div className="kb-part-hero__roman" aria-hidden="true">{part.number}</div>
                <h1 className="kb-part-hero__title">{title}</h1>
                {desc && <p className="kb-part-hero__description">{desc}</p>}
            </div>

            <div className="kb-chapter-grid">
                {(part.chapters || []).map((chapter) => {
                    const chTitle = isRtl ? chapter.title.fa : chapter.title.en;
                    const chDesc  = isRtl ? chapter.description?.fa : chapter.description?.en;
                    return (
                        <Link
                            key={chapter.id}
                            to={buildPath(lang, part.slug, chapter.slug)}
                            className="kb-card"
                            style={{ '--kb-accent': part.accentColor || 'var(--color-primary)' }}
                        >
                            <div className="kb-card__accent-bar" />
                            <div className="kb-card__body">
                                <div className="kb-card__number">Chapter {chapter.number}</div>
                                <div className="kb-card__title">{chTitle}</div>
                                {chDesc && <p className="kb-card__hook">{chDesc}</p>}
                                {(chapter.tags || []).length > 0 && (
                                    <div className="kb-card__chips">
                                        {chapter.tags.slice(0, 3).map((tag) => (
                                            <span key={tag} className="kb-chip">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="kb-card__meta">
                                <span className="kb-card__page">p. {chapter.pageStart}</span>
                                <span className="kb-card__type" style={{ '--kb-accent': part.accentColor }}>
                  {(chapter.sections || []).length} sections
                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}

// ─── Chapter view ─────────────────────────────────────────────────────────────

function ChapterView({ part, chapter, lang }) {
    const isRtl = lang === 'fa';
    const title    = isRtl ? chapter.title.fa : chapter.title.en;
    const titleAlt = isRtl ? chapter.title.en : chapter.title.fa;
    const desc     = isRtl ? chapter.description?.fa : chapter.description?.en;

    return (
        <div className="kb-reader-surface">
            <div className="kb-reader__header">
                <div className="kb-reader__eyebrow" style={{ '--kb-accent': part.accentColor || 'var(--color-primary)' }}>
                    <span>{isRtl ? `بخش ${part.number}` : `Part ${part.number}`}</span>
                    <span className="kb-reader__number">· Chapter {chapter.number}</span>
                </div>
                <h1 className="kb-reader__title">{title}</h1>
                {titleAlt && (
                    <span className="kb-reader__title-alt">{titleAlt}</span>
                )}
                <div className="kb-reader__meta-row">
          <span className="kb-reader__page-ref">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            p. {chapter.pageStart}
          </span>
                    {(chapter.tags || []).map((t) => (
                        <Link key={t} to={`/${lang}/knowledge-base?q=${encodeURIComponent(t)}`} className="kb-chip">{t}</Link>
                    ))}
                </div>
            </div>

            {desc && <p className="kb-reader__description">{desc}</p>}

            {(chapter.sections || []).length > 0 && (
                <>
                    <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '11px' }}>
                        {isRtl ? 'بخش‌ها' : 'Sections'}
                    </h2>
                    <ul className="kb-section-list">
                        {chapter.sections.map((section) => {
                            const secTitle    = isRtl ? section.title.fa : section.title.en;
                            const secTitleAlt = isRtl ? section.title.en : section.title.fa;
                            return (
                                <li key={section.id} className="kb-section-item">
                                    <Link
                                        to={buildPath(lang, part.slug, chapter.slug, section.slug)}
                                        className="kb-section-link"
                                    >
                    <span className="kb-section-number" style={{ color: part.accentColor || 'var(--color-primary)' }}>
                      {section.number}
                    </span>
                                        <div className="kb-section-title">
                                            <strong>{secTitle}</strong>
                                            {secTitleAlt && <span>{secTitleAlt}</span>}
                                        </div>
                                        <svg className="kb-section-arrow" viewBox="0 0 24 24" aria-hidden="true">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
}

// ─── Section view ─────────────────────────────────────────────────────────────

function SectionView({ part, chapter, section, lang }) {
    const isRtl    = lang === 'fa';
    const title    = isRtl ? section.title.fa : section.title.en;
    const titleAlt = isRtl ? section.title.en : section.title.fa;

    return (
        <div className="kb-reader-surface">
            <div className="kb-reader__header">
                <div className="kb-reader__eyebrow" style={{ '--kb-accent': part.accentColor || 'var(--color-primary)' }}>
                    <span>{isRtl ? `فصل ${chapter.number}` : `Chapter ${chapter.number}`}</span>
                    <span className="kb-reader__number">· §{section.number}</span>
                </div>
                <h1 className="kb-reader__title">{title}</h1>
                {titleAlt && <span className="kb-reader__title-alt">{titleAlt}</span>}
                <div className="kb-reader__meta-row">
          <span className="kb-reader__page-ref">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            p. {section.pageStart}
          </span>
                    {(section.tags || []).map((t) => (
                        <Link key={t} to={`/${lang}/knowledge-base?q=${encodeURIComponent(t)}`} className="kb-chip">{t}</Link>
                    ))}
                </div>
            </div>

            <div className="kb-reader__body">
                <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                    {isRtl
                        ? 'محتوای این بخش از منبع LaTeX/PDF استخراج یا وارد می‌شود.'
                        : 'Content for this section is rendered from the source LaTeX/PDF document or injected via the content pipeline.'}
                </p>
            </div>

            {(section.subsections || []).length > 0 && (
                <>
                    <h2 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 'var(--space-5) 0 var(--space-2)' }}>
                        {isRtl ? 'زیربخش‌ها' : 'Subsections'}
                    </h2>
                    <ul className="kb-subsection-list">
                        {section.subsections.map((sub) => {
                            const subTitle = isRtl ? sub.title.fa : sub.title.en;
                            return (
                                <li key={sub.id} className="kb-subsection-item">
                  <span className="kb-subsection-link">
                    <span className="kb-subsection-number">{sub.number}</span>
                      {subTitle}
                  </span>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
}

// ─── Reader navigation ────────────────────────────────────────────────────────

function ReaderNav({ prev, next, lang }) {
    const isRtl = lang === 'fa';
    if (!prev && !next) return null;

    return (
        <div className="kb-reader-nav" style={{ padding: '0 var(--space-6) var(--space-8)' }}>
            {prev ? (
                <Link to={prev.href} className="kb-reader-nav__btn">
          <span className="kb-reader-nav__dir">
            <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
              {isRtl ? 'قبلی' : 'Previous'}
          </span>
                    <span className="kb-reader-nav__title">
            {isRtl ? prev.title.fa : prev.title.en}
          </span>
                </Link>
            ) : <div />}

            {next && (
                <Link to={next.href} className="kb-reader-nav__btn kb-reader-nav__btn--next">
          <span className="kb-reader-nav__dir">
            {isRtl ? 'بعدی' : 'Next'}
              <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
          </span>
                    <span className="kb-reader-nav__title">
            {isRtl ? next.title.fa : next.title.en}
          </span>
                </Link>
            )}
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function KnowledgeBaseReader() {
    const { lang } = useLang();
    const { partSlug, chapterSlug, sectionSlug } = useParams();
    const navigate = useNavigate();

    const part    = PART_BY_SLUG[partSlug];
    const chapter = chapterSlug ? CHAPTER_BY_SLUG[partSlug]?.[chapterSlug] : null;
    const section = sectionSlug && chapter
        ? (chapter.sections || []).find((s) => s.slug === sectionSlug)
        : null;

    const { prev, next } = useSiblings(partSlug, chapterSlug, sectionSlug, lang);

    // 404-guard
    useEffect(() => {
        if (!part) navigate(`/${lang}/knowledge-base`, { replace: true });
        if (chapterSlug && !chapter) navigate(`/${lang}/knowledge-base/${partSlug}`, { replace: true });
        if (sectionSlug && !section) navigate(`/${lang}/knowledge-base/${partSlug}/${chapterSlug}`, { replace: true });
    }, [part, chapter, section, navigate, lang, partSlug, chapterSlug, sectionSlug]);

    // JSON-LD
    useEffect(() => {
        if (!part) return;
        let graph;
        if (section && chapter) graph = buildSectionGraph(part, chapter, section);
        else if (chapter)        graph = buildChapterGraph(part, chapter);
        else                     graph = buildPartGraph(part);
        injectJsonLd(graph);
        return () => removeJsonLd();
    }, [part, chapter, section]);

    if (!part) return null;

    const isRtl        = lang === 'fa';
    const currentNode  = section || chapter || part;
    const breadcrumbs  = [
        { label: isRtl ? 'پایگاه دانش' : 'Knowledge Base', href: `/${lang}/knowledge-base` },
        { label: isRtl ? part.title.fa : part.title.en, href: buildPath(lang, part.slug) },
        ...(chapter ? [{ label: isRtl ? chapter.title.fa : chapter.title.en, href: buildPath(lang, part.slug, chapter.slug) }] : []),
        ...(section ? [{ label: isRtl ? section.title.fa : section.title.en, href: buildPath(lang, part.slug, chapter.slug, section.slug) }] : []),
    ];

    return (
        <main id="main-content" className="kb-reader-page">

            {/* Top bar */}
            <div className="kb-reader-topbar">
                <nav className="kb-breadcrumb" aria-label={isRtl ? 'مسیر' : 'Breadcrumb'}>
                    {breadcrumbs.map((crumb, i) => (
                        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {i > 0 && <span className="kb-breadcrumb__sep" aria-hidden="true">›</span>}
                            {i < breadcrumbs.length - 1 ? (
                                <Link to={crumb.href} className="kb-breadcrumb__item">{crumb.label}</Link>
                            ) : (
                                <span className="kb-breadcrumb__item kb-breadcrumb__item--current" aria-current="page">{crumb.label}</span>
                            )}
            </span>
                    ))}
                </nav>

                <div className="kb-topbar-actions">
                    <Link
                        to={`/${lang}/knowledge-base?q=${encodeURIComponent(isRtl ? currentNode.title.fa : currentNode.title.en)}`}
                        className="kb-topbar-btn"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        {isRtl ? 'جستجوی مرتبط' : 'Related search'}
                    </Link>
                </div>
            </div>

            {/* Three-column grid */}
            <div className="kb-reader-grid" style={{ '--kb-accent': part.accentColor || 'var(--color-primary)' }}>

                {/* Left: TOC */}
                <TocNav
                    part={part}
                    chapter={chapter}
                    section={section}
                    activeChapterSlug={chapterSlug}
                    activeSectionSlug={sectionSlug}
                    lang={lang}
                />

                {/* Center: Content */}
                <div>
                    {!chapterSlug && <PartView part={part} lang={lang} />}
                    {chapterSlug && !sectionSlug && chapter && (
                        <ChapterView part={part} chapter={chapter} lang={lang} />
                    )}
                    {sectionSlug && section && (
                        <SectionView part={part} chapter={chapter} section={section} lang={lang} />
                    )}
                    <ReaderNav prev={prev} next={next} lang={lang} />
                </div>

                {/* Right: Aside */}
                <ReaderAside node={currentNode} part={part} chapter={chapter} lang={lang} />
            </div>
        </main>
    );
}