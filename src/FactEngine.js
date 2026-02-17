// FactEngine.js (Revised: visitor-safe, read-only pool, preference-respecting, optional saved board)
//
// Key changes vs current:
// - NO writing of fact pool to localStorage (removes teaSpaceFacts persistence/mutation).
// - Reads facts from a public bundle: /data/facts.bundle.json (static-friendly).
// - Visitor "Save" goes to a personal board (localStorage) without altering global facts.
// - Adds "Never show again" + cooldown + reduced-motion compliance.
// - Keeps optional collapsed UI state, but all interruptions are opt-in-safe.
//
// NOTE: Wire your UI strings to copy.js if your site is bilingual; this file supports a `lang` prop.
//       Ensure the admin tool does NOT ship to public routes.

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './styles/FactEngine.css';

const FACTS_BUNDLE_URL = '/data/facts.bundle.json';

// Visitor preference keys (namespaced; does not store the pool)
const LS = {
    COLLAPSED: 'ga_fact_engine_collapsed_v1',
    NEVER_SHOW: 'ga_retention_never_show_v1',
    DISMISSED_UNTIL: 'ga_retention_dismissed_until_v1',
    OPT_IN: 'ga_retention_opt_in_v1',
    SAVED_BOARD: 'ga_saved_facts_board_v1',
    SHOWN_SESSION: 'ga_retention_shown_session_v1'
};

// Defaults (tune to your UX policy)
const DEFAULTS = {
    // Facts display by default; visitors can opt out via "Never show" button
    optInDefault: true,
    dismissedHours: 24
};

// Utilities (safe localStorage)
function safeGet(key, fallback = null) {
    try {
        const v = localStorage.getItem(key);
        return v === null ? fallback : v;
    } catch {
        return fallback;
    }
}
function safeSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch {
        // ignore (private mode / blocked storage)
    }
}
function safeGetJSON(key, fallback) {
    try {
        const v = localStorage.getItem(key);
        if (!v) return fallback;
        return JSON.parse(v);
    } catch {
        return fallback;
    }
}
function safeSetJSON(key, obj) {
    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch {
        // ignore
    }
}
function nowMs() {
    return Date.now();
}
function prefersReducedMotion() {
    try {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
        return false;
    }
}

// Fact shape supported (read-only bundle):
// {
//   id: "F-000123",
//   text: { en: "...", fa: "..." } OR text: "...",
//   type: "evergreen|study_tip|contextual|dependency_insight",
//   tags: ["..."],
//   cta: { path: "/science", label: { en: "Read more", fa: "بیشتر" } },
//   featured: true,
//   weight: 1
// }

function normalizeFactText(fact, lang) {
    if (!fact) return '';
    if (typeof fact.text === 'string') return fact.text;
    if (fact.text && typeof fact.text === 'object') {
        return fact.text[lang] || fact.text.en || fact.text.fa || '';
    }
    return '';
}

function normalizeCtaLabel(cta, lang) {
    if (!cta) return null;
    if (typeof cta.label === 'string') return cta.label;
    if (cta.label && typeof cta.label === 'object') {
        return cta.label[lang] || cta.label.en || cta.label.fa || null;
    }
    return null;
}

function clampInt(n, min, max) {
    const x = Number.isFinite(n) ? n : min;
    return Math.max(min, Math.min(max, x));
}

const FactEngine = ({
                        // Optional integration points for your larger website model:
                        lang = 'en', // 'en' | 'fa'
                        dir,         // if you want to set dir at container level; else rely on <html dir="...">
                        context = null, // optional: { tags:[], collectionId, diagramType, path, dependencies:[] }
                        onNavigate = null // optional: (path) => void; if absent, uses window.location.assign
                    }) => {
    const [facts, setFacts] = useState([]);
    const [currentFact, setCurrentFact] = useState(null);
    const [loading, setLoading] = useState(true);

    // Collapsed UI state (not sensitive)
    const [isCollapsed, setIsCollapsed] = useState(safeGet(LS.COLLAPSED, 'false') === 'true');

    // Preference state
    const [neverShow, setNeverShow] = useState(safeGet(LS.NEVER_SHOW, 'false') === 'true');
    const [optIn, setOptIn] = useState(safeGet(LS.OPT_IN, String(DEFAULTS.optInDefault)) === 'true');

    // Visitor board (personal)
    const [savedBoard, setSavedBoard] = useState(() => safeGetJSON(LS.SAVED_BOARD, []));

    const reducedMotion = useMemo(() => prefersReducedMotion(), []);
    const [isNewFact, setIsNewFact] = useState(false);
    const animTimerRef = useRef(null);

    // Load read-only facts bundle
    useEffect(() => {
        let cancelled = false;

        async function loadBundle() {
            setLoading(true);
            try {
                const res = await fetch(FACTS_BUNDLE_URL, { cache: 'no-cache' });
                if (!res.ok) throw new Error(`facts bundle fetch failed (${res.status})`);
                const payload = await res.json();

                const list = Array.isArray(payload?.facts) ? payload.facts : (Array.isArray(payload) ? payload : []);
                // Basic validation: must have id + text
                const cleaned = list
                    .filter(f => f && (typeof f.id === 'string' || typeof f.id === 'number'))
                    .map(f => ({
                        ...f,
                        id: String(f.id),
                        weight: clampInt(f.weight ?? 1, 1, 10),
                        featured: Boolean(f.featured)
                    }));

                if (!cancelled) setFacts(cleaned);
            } catch (e) {
                // Fail closed: disable module quietly if bundle missing/malformed
                if (!cancelled) setFacts([]);
                // Optional: console.warn for devs; avoid noisy errors in prod
                console.warn('[FactEngine] disabled (facts bundle not available):', e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadBundle();
        return () => {
            cancelled = true;
            if (animTimerRef.current) clearTimeout(animTimerRef.current);
        };
    }, []);

    // Persist simple preferences
    useEffect(() => safeSet(LS.COLLAPSED, String(isCollapsed)), [isCollapsed]);
    useEffect(() => safeSet(LS.NEVER_SHOW, String(neverShow)), [neverShow]);
    useEffect(() => safeSet(LS.OPT_IN, String(optIn)), [optIn]);
    useEffect(() => safeSetJSON(LS.SAVED_BOARD, savedBoard), [savedBoard]);

    const dismissedUntilMs = useMemo(() => {
        const raw = safeGet(LS.DISMISSED_UNTIL, null);
        const v = raw ? Number(raw) : null;
        return Number.isFinite(v) ? v : null;
    }, []);

    const isSuppressed = useMemo(() => {
        if (neverShow) return true;
        if (!optIn) return true; // strict mode: no prompts unless explicitly enabled
        if (dismissedUntilMs && dismissedUntilMs > nowMs()) return true;
        return false;
    }, [neverShow, optIn, dismissedUntilMs]);

    const setDismissCooldown = useCallback((hours = DEFAULTS.dismissedHours) => {
        const until = nowMs() + hours * 60 * 60 * 1000;
        safeSet(LS.DISMISSED_UNTIL, String(until));
    }, []);

    // Weighted selection with light context preference (optional)
    const pickFact = useCallback((avoidId = null) => {
        if (!facts || facts.length === 0) return null;

        const usable = facts.filter(f => String(f.id) !== String(avoidId || ''));
        if (usable.length === 0) return facts[0];

        // Context boost (general, optional; keeps module reusable)
        const ctxTags = Array.isArray(context?.tags) ? new Set(context.tags.map(String)) : null;

        const scored = usable.map(f => {
            let score = (f.weight ?? 1);
            if (f.featured) score += 3;

            if (ctxTags && Array.isArray(f.tags)) {
                let overlap = 0;
                for (const t of f.tags) if (ctxTags.has(String(t))) overlap++;
                score += Math.min(3, overlap); // cap boost
            }
            return { f, score: Math.max(1, score) };
        });

        // Roulette wheel selection
        const total = scored.reduce((s, x) => s + x.score, 0);
        let r = Math.random() * total;
        for (const x of scored) {
            r -= x.score;
            if (r <= 0) return x.f;
        }
        return scored[scored.length - 1].f;
    }, [facts, context]);

    const showNewFact = useCallback((nextFact) => {
        setCurrentFact(nextFact);

        // Animation only if motion is allowed
        if (!reducedMotion) {
            setIsNewFact(true);
            if (animTimerRef.current) clearTimeout(animTimerRef.current);
            animTimerRef.current = setTimeout(() => setIsNewFact(false), 350);
        } else {
            setIsNewFact(false);
        }
    }, [reducedMotion]);

    // Initialize first fact if allowed
    useEffect(() => {
        if (loading) return;
        if (isSuppressed) return;
        if (!currentFact && facts.length > 0) {
            showNewFact(pickFact(null));
        }
    }, [loading, isSuppressed, currentFact, facts.length, pickFact, showNewFact]);

    // Visitor board helpers
    const isSaved = useCallback((factId) => {
        return savedBoard.some(x => String(x.factId) === String(factId));
    }, [savedBoard]);

    const handleSaveToBoard = useCallback(() => {
        if (!currentFact) return;
        const id = String(currentFact.id);
        if (isSaved(id)) return;

        const entry = {
            factId: id,
            savedAt: Math.floor(Date.now() / 1000),
            // Optional contextRef for your Carousel/Perusal model:
            contextRef: context?.path ? { path: context.path } : undefined
        };
        setSavedBoard(prev => [entry, ...prev].slice(0, 200)); // cap to prevent unbounded growth
    }, [currentFact, isSaved, context]);

    const handleRemoveFromBoard = useCallback(() => {
        if (!currentFact) return;
        const id = String(currentFact.id);
        setSavedBoard(prev => prev.filter(x => String(x.factId) !== id));
    }, [currentFact]);

    const handleGenerateAnother = useCallback(() => {
        if (!currentFact) {
            showNewFact(pickFact(null));
            return;
        }
        const next = pickFact(currentFact.id);
        showNewFact(next);
    }, [currentFact, pickFact, showNewFact]);

    const handleNeverShow = useCallback(() => {
        setNeverShow(true);
        setDismissCooldown(24 * 365 * 10); // effectively forever without needing another key
        setCurrentFact(null);
    }, [setDismissCooldown]);

    const handleToggleOptIn = useCallback(() => {
        setOptIn(v => {
            const newValue = !v;
            // If turning on, generate a new fact; if turning off, clear current fact
            if (newValue && facts.length > 0) {
                showNewFact(pickFact(null));
            } else {
                setCurrentFact(null);
            }
            return newValue;
        });
    }, [facts, pickFact, showNewFact]);

    const handleReset = useCallback(() => {
        // Clear all localStorage keys
        try {
            localStorage.removeItem(LS.COLLAPSED);
            localStorage.removeItem(LS.NEVER_SHOW);
            localStorage.removeItem(LS.DISMISSED_UNTIL);
            localStorage.removeItem(LS.OPT_IN);
            localStorage.removeItem(LS.SAVED_BOARD);
            localStorage.removeItem(LS.SHOWN_SESSION);
        } catch {
            // ignore (private mode / blocked storage)
        }

        // Reset state to defaults
        setIsCollapsed(false);
        setNeverShow(false);
        setOptIn(DEFAULTS.optInDefault);
        setSavedBoard([]);

        // Generate a new fact if facts are available
        if (facts.length > 0) {
            showNewFact(pickFact(null));
        } else {
            setCurrentFact(null);
        }
    }, [facts, pickFact, showNewFact]);

    const handleCTA = useCallback(() => {
        if (!currentFact?.cta?.path) return;
        const path = String(currentFact.cta.path);

        // If multilingual routes are language-prefixed, construct here
        const normalized = path.startsWith('/') ? path : `/${path}`;
        const finalPath = (lang === 'fa' || lang === 'en') ? `/${lang}${normalized}` : normalized;

        if (typeof onNavigate === 'function') onNavigate(finalPath);
        else window.location.assign(finalPath);
    }, [currentFact, lang, onNavigate]);

    const factText = useMemo(() => normalizeFactText(currentFact, lang), [currentFact, lang]);
    const ctaLabel = useMemo(() => normalizeCtaLabel(currentFact?.cta, lang), [currentFact, lang]);

    // If suppressed, render a minimal opt-in toggle (no interruption)
    if (isSuppressed) {
        return (
            <div className="fact-engine-container" dir={dir}>
                <div className="fact-engine-header" onClick={() => setIsCollapsed(!isCollapsed)}>
                    <h3>Fact Engine</h3>
                    <div className={`fact-engine-toggle ${isCollapsed ? 'collapsed' : ''}`}>▼</div>
                </div>

                <div className={`fact-engine-body ${isCollapsed ? 'collapsed' : ''}`}>
                    <div className="fact-card">
                        <p className="fact-text">
                            {lang === 'fa'
                                ? 'اگر دوست دارید، هنگام خروج یک نکته آموزشی کوتاه نمایش داده شود.'
                                : 'If you want, we can show a short learning note when you’re leaving.'}
                        </p>

                        <div className="fact-footer">
                            <div className="fact-actions">
                                <button className="fact-btn pin-btn" onClick={handleToggleOptIn}>
                                    {optIn ? (lang === 'fa' ? 'غیرفعال' : 'Disable') : (lang === 'fa' ? 'فعال‌سازی' : 'Enable')}
                                </button>
                                <button className="fact-btn unpin-btn" onClick={handleNeverShow}>
                                    {lang === 'fa' ? 'دیگر نشان نده' : 'Never show'}
                                </button>
                                <button className="fact-btn" onClick={handleReset}>
                                    {lang === 'fa' ? 'بازنشانی' : 'Reset'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Normal (opted-in) view
    return (
        <div className="fact-engine-container" dir={dir}>
            <div className="fact-engine-header" onClick={() => setIsCollapsed(!isCollapsed)}>
                <h3>Fact Engine</h3>
                <div className={`fact-engine-toggle ${isCollapsed ? 'collapsed' : ''}`}>▼</div>
            </div>

            <div className={`fact-engine-body ${isCollapsed ? 'collapsed' : ''}`}>
                {!loading && currentFact && (
                    <div className={`fact-card ${isNewFact ? 'new-fact' : ''}`}>
                        <p className="fact-text" dir="auto">{factText}</p>

                        <div className="fact-footer">
                            <div className="fact-actions">
                                {currentFact?.cta?.path && (
                                    <button className="fact-btn pin-btn" onClick={handleCTA}>
                                        {ctaLabel || (lang === 'fa' ? 'بیشتر' : 'Learn more')}
                                    </button>
                                )}

                                {!isSaved(currentFact.id) ? (
                                    <button className="fact-btn pin-btn" onClick={handleSaveToBoard}>
                                        {lang === 'fa' ? 'ذخیره' : 'Save'}
                                    </button>
                                ) : (
                                    <button className="fact-btn unpin-btn" onClick={handleRemoveFromBoard}>
                                        {lang === 'fa' ? 'حذف از ذخیره‌ها' : 'Remove'}
                                    </button>
                                )}

                                <button className="fact-btn" onClick={handleGenerateAnother}>
                                    {lang === 'fa' ? 'یکی دیگر' : 'Another'}
                                </button>

                                <button className="fact-btn unpin-btn" onClick={handleNeverShow}>
                                    {lang === 'fa' ? 'دیگر نشان نده' : 'Never show'}
                                </button>

                                <button className="fact-btn" onClick={handleReset}>
                                    {lang === 'fa' ? 'بازنشانی' : 'Reset'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Optional: quick link to saved board, if your site provides a route */}
                {savedBoard.length > 0 && (
                    <div className="pinned-facts-section">
                        <div className="pinned-facts-header">
                            {lang === 'fa' ? 'یادداشت‌های ذخیره‌شده' : 'Saved Facts'}
                        </div>
                        <div className="fact-card pinned">
                            <p className="fact-text">
                                {lang === 'fa'
                                    ? `${savedBoard.length} مورد ذخیره شده دارید.`
                                    : `You have ${savedBoard.length} saved facts.`}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FactEngine;
