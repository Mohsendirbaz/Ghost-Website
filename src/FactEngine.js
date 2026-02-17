// FactEngine.js (Simplified: visitor retention with single-button UX)
//
// Design philosophy:
// - Show a fact immediately to engage visitors who might leave
// - Single primary action: "Save this" to keep facts they like
// - No opt-in/opt-out complexity, no "never show" nagging
// - Simple localStorage: only saved facts (IDs only)
// - Reset button to clear saved facts
//
// Reads facts from: /data/facts.bundle.json (static bundle, never mutated)

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './styles/FactEngine.css';

const FACTS_BUNDLE_URL = '/data/facts.bundle.json';

// Simplified localStorage keys
const LS = {
    SAVED_BOARD: 'ga_saved_facts_board_v1'
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
                        lang = 'en', // 'en' | 'fa'
                        dir,         // optional: set dir at container level
                        context = null, // optional: { tags:[], path, ... } for context-aware fact selection
                        onNavigate = null // optional: (path) => void for CTA navigation
                    }) => {
    const [facts, setFacts] = useState([]);
    const [currentFact, setCurrentFact] = useState(null);
    const [loading, setLoading] = useState(true);

    // Visitor saved facts (personal board - IDs only)
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

    // Persist saved board only
    useEffect(() => safeSetJSON(LS.SAVED_BOARD, savedBoard), [savedBoard]);

    // Weighted selection with light context preference (optional)
    // Excludes already-saved facts to prevent duplicates
    const pickFact = useCallback((avoidId = null) => {
        if (!facts || facts.length === 0) return null;

        // Build set of saved fact IDs for efficient lookup
        const savedIds = new Set(savedBoard.map(x => String(x.factId)));

        // Filter out: current fact (avoidId) AND already-saved facts
        const usable = facts.filter(f => {
            const fid = String(f.id);
            return fid !== String(avoidId || '') && !savedIds.has(fid);
        });

        // If all facts are saved, allow showing them again (fallback)
        if (usable.length === 0) {
            const fallback = facts.filter(f => String(f.id) !== String(avoidId || ''));
            if (fallback.length === 0) return facts[0];
            // Pick from fallback without saved-filter
            const randomFallback = fallback[Math.floor(Math.random() * fallback.length)];
            return randomFallback;
        }

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
    }, [facts, context, savedBoard]);

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

    // Initialize first fact on load
    useEffect(() => {
        if (loading) return;
        if (!currentFact && facts.length > 0) {
            showNewFact(pickFact(null));
        }
    }, [loading, currentFact, facts.length, pickFact, showNewFact]);

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

    const handleRemoveFromBoard = useCallback((factId) => {
        const id = String(factId);
        setSavedBoard(prev => prev.filter(x => String(x.factId) !== id));
    }, []);

    const handleGenerateAnother = useCallback(() => {
        if (!currentFact) {
            showNewFact(pickFact(null));
            return;
        }
        const next = pickFact(currentFact.id);
        showNewFact(next);
    }, [currentFact, pickFact, showNewFact]);

    const handleReset = useCallback(() => {
        // Clear saved board
        try {
            localStorage.removeItem(LS.SAVED_BOARD);
        } catch {
            // ignore (private mode / blocked storage)
        }

        // Reset state
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

    // Simplified single-view UI
    return (
        <div className="fact-engine-container" dir={dir}>
            <div className="fact-engine-header">
                <h3>{lang === 'fa' ? 'نکته‌ای برای شما' : 'A fact for you'}</h3>
            </div>

            <div className="fact-engine-body">
                {!loading && currentFact && (
                    <div className={`fact-card ${isNewFact ? 'new-fact' : ''}`}>
                        <p className="fact-text" dir="auto">{factText}</p>

                        <div className="fact-footer">
                            <div className="fact-actions">
                                {!isSaved(currentFact.id) ? (
                                    <button className="fact-btn pin-btn" onClick={handleSaveToBoard}>
                                        {lang === 'fa' ? '💾 ذخیره این' : '💾 Save this'}
                                    </button>
                                ) : (
                                    <button className="fact-btn saved-btn" disabled>
                                        {lang === 'fa' ? '✓ ذخیره شد' : '✓ Saved'}
                                    </button>
                                )}

                                <button className="fact-btn" onClick={handleGenerateAnother}>
                                    {lang === 'fa' ? 'یکی دیگر' : 'Another'}
                                </button>

                                {currentFact?.cta?.path && (
                                    <button className="fact-btn cta-btn" onClick={handleCTA}>
                                        {ctaLabel || (lang === 'fa' ? 'بیشتر' : 'Learn more')}
                                    </button>
                                )}

                                <button className="fact-btn reset-btn" onClick={handleReset}>
                                    {lang === 'fa' ? '🔄 بازنشانی' : '🔄 Reset'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {savedBoard.length > 0 && (
                    <div className="saved-facts-board">
                        <div className="board-header">
                            <h4>{lang === 'fa' ? '📌 نکته‌های ذخیره شده' : '📌 Saved Facts Board'}</h4>
                            <span className="board-count">
                                {lang === 'fa'
                                    ? `${savedBoard.length} نکته`
                                    : `${savedBoard.length} fact${savedBoard.length > 1 ? 's' : ''}`}
                            </span>
                        </div>
                        <div className="board-items">
                            {savedBoard.map((entry) => {
                                const savedFact = facts.find(f => String(f.id) === String(entry.factId));
                                if (!savedFact) return null;
                                const savedFactText = normalizeFactText(savedFact, lang);
                                
                                return (
                                    <div key={entry.factId} className="board-item">
                                        <p className="board-item-text" dir="auto">{savedFactText}</p>
                                        <button 
                                            className="board-item-remove" 
                                            onClick={() => handleRemoveFromBoard(entry.factId)}
                                            aria-label={lang === 'fa' ? 'حذف' : 'Remove'}
                                        >
                                            {lang === 'fa' ? '✕ حذف' : '✕ Remove'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FactEngine;
