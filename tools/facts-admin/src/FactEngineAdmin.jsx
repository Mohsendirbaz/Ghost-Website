// FactEngineAdmin.jsx — Ghost Autonomy Facts Admin Tool
//
// PURPOSE: Admin-only editor. NOT part of the public visitor build.
//
// WORKFLOW:
//   1. Run this tool locally: npm run dev  (from tools/facts-admin/)
//   2. Edit / add / delete facts.
//   3. Click "Export facts.bundle.json" to download the bundle.
//   4. Copy the downloaded file to the main project:
//        <project-root>/public/data/facts.bundle.json
//   5. Commit and deploy the main project.
//
// The visitor site reads ONLY that static JSON file; it never receives admin code.

import React, { useEffect, useRef, useState } from 'react';
import './FactEngineAdmin.css';

// In dev mode, vite.config.js proxies /data/ to localhost:3000 so we can
// load the existing bundle from the main project's CRA dev server.
// In practice you can also just place the bundle in tools/facts-admin/public/data/.
const FACTS_BUNDLE_URL = '/data/facts.bundle.json';

const ADMIN_DRAFT_KEY = 'ga_fact_admin_draft_v1';

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
  } catch {}
}

function downloadJson(filename, dataObj) {
  const blob = new Blob([JSON.stringify(dataObj, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function ensureIds(facts) {
  const seen = new Set();
  return facts.map((f, idx) => {
    let id = f?.id ? String(f.id) : `F-${String(idx + 1).padStart(6, '0')}`;
    let k = 1;
    while (seen.has(id)) id = `${id}-${k++}`;
    seen.add(id);
    return { ...f, id };
  });
}

function normalizeIncoming(f) {
  if (!f) return null;
  const textObj = typeof f.text === 'string'
    ? { en: f.text, fa: '' }
    : (f.text && typeof f.text === 'object' ? f.text : { en: '', fa: '' });
  return {
    id: String(f.id ?? ''),
    text: { en: String(textObj.en || ''), fa: String(textObj.fa || '') },
    type: String(f.type || 'evergreen'),
    tags: Array.isArray(f.tags) ? f.tags.map(String) : [],
    cta: f.cta ? { ...f.cta } : null,
    featured: Boolean(f.featured ?? f.isPinned),
    weight: Number.isFinite(Number(f.weight)) ? Math.max(1, Math.min(10, Number(f.weight))) : 1,
  };
}

const EMPTY_FORM = {
  en: '', fa: '', type: 'evergreen', tags: '',
  featured: false, weight: 1,
  ctaPath: '', ctaLabelEn: '', ctaLabelFa: '',
};

export default function FactEngineAdmin() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [exportMsg, setExportMsg] = useState('');
  const addRef = useRef(null);

  // Load bundle + overlay any saved draft
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(FACTS_BUNDLE_URL, { cache: 'no-cache' });
        let baseFacts = [];
        if (res.ok) {
          const payload = await res.json();
          const list = Array.isArray(payload?.facts) ? payload.facts : (Array.isArray(payload) ? payload : []);
          baseFacts = list.map(normalizeIncoming).filter(Boolean);
        }
        const draft = safeGetJSON(ADMIN_DRAFT_KEY, null);
        const draftFacts = Array.isArray(draft?.facts)
          ? draft.facts.map(normalizeIncoming).filter(Boolean)
          : null;
        const merged = ensureIds(draftFacts ?? baseFacts);
        if (!cancelled) setFacts(merged);
      } catch (e) {
        console.warn('[FactEngineAdmin] could not load bundle:', e);
        if (!cancelled) setFacts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Persist admin draft to localStorage (admin-only key, separate from visitor keys)
  useEffect(() => {
    if (!loading) safeSetJSON(ADMIN_DRAFT_KEY, { version: 1, facts });
  }, [facts, loading]);

  const startAdd = () => {
    setEditingId('__new__');
    setForm(EMPTY_FORM);
    setTimeout(() => addRef.current?.focus?.(), 0);
  };

  const startEdit = (fact) => {
    setEditingId(fact.id);
    setForm({
      en: String(fact.text?.en || ''),
      fa: String(fact.text?.fa || ''),
      type: String(fact.type || 'evergreen'),
      tags: Array.isArray(fact.tags) ? fact.tags.join(', ') : '',
      featured: Boolean(fact.featured),
      weight: Number(fact.weight || 1),
      ctaPath: String(fact.cta?.path || ''),
      ctaLabelEn: String(fact.cta?.label?.en || ''),
      ctaLabelFa: String(fact.cta?.label?.fa || ''),
    });
  };

  const cancelEdit = () => { setEditingId(null); setForm(EMPTY_FORM); };

  const saveEdit = () => {
    const en = form.en.trim();
    const fa = form.fa.trim();
    if (!en && !fa) return; // require at least one language

    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
    const ctaPath = form.ctaPath.trim();

    const next = {
      id: editingId === '__new__' ? '' : editingId,
      text: { en, fa },
      type: form.type,
      tags,
      featured: Boolean(form.featured),
      weight: Math.max(1, Math.min(10, Number(form.weight || 1))),
      cta: ctaPath
        ? { path: ctaPath, label: { en: form.ctaLabelEn.trim() || 'Learn more', fa: form.ctaLabelFa.trim() || 'بیشتر' } }
        : null,
    };

    setFacts(prev => {
      if (editingId === '__new__') return ensureIds([...prev, next]);
      return prev.map(f => String(f.id) === String(editingId) ? { ...next, id: f.id } : f);
    });
    cancelEdit();
  };

  const deleteFact = (id) => {
    if (!window.confirm('Delete this fact?')) return;
    setFacts(prev => prev.filter(f => String(f.id) !== String(id)));
  };

  const clearDraft = () => {
    if (!window.confirm('Discard draft and reload from bundle?')) return;
    try { localStorage.removeItem(ADMIN_DRAFT_KEY); } catch {}
    window.location.reload();
  };

  const exportBundle = () => {
    const bundle = {
      version: 1,
      generatedAt: new Date().toISOString(),
      facts: ensureIds(facts).map(f => ({
        id: String(f.id),
        text: { en: String(f.text?.en || ''), fa: String(f.text?.fa || '') },
        type: String(f.type || 'evergreen'),
        tags: Array.isArray(f.tags) ? f.tags.map(String) : [],
        featured: Boolean(f.featured),
        weight: Math.max(1, Math.min(10, Number(f.weight || 1))),
        cta: f.cta
          ? { path: String(f.cta.path || ''), label: { en: String(f.cta.label?.en || ''), fa: String(f.cta.label?.fa || '') } }
          : null,
      })),
    };
    downloadJson('facts.bundle.json', bundle);
    setExportMsg('Downloaded! Copy to public/data/facts.bundle.json in the main project and commit.');
    setTimeout(() => setExportMsg(''), 8000);
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm(s => ({ ...s, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })),
  });

  return (
    <div className="fact-admin-container">
      <div className="fact-admin-header">
        <h2 className="fact-admin-title">Ghost Autonomy — Facts Admin</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="reset-all-btn" onClick={startAdd}>+ Add Fact</button>
          <button className="reset-all-btn" onClick={exportBundle}>↓ Export facts.bundle.json</button>
          <button className="reset-all-btn" onClick={clearDraft}>Reset Draft</button>
        </div>
      </div>

      {exportMsg && (
        <div style={{ padding: '10px 16px', marginBottom: 16, background: '#d1fae5', borderRadius: 8, fontSize: '0.875rem', color: '#065f46' }}>
          {exportMsg}
        </div>
      )}

      <div className="facts-summary">
        <div className="summary-card">
          <div className="summary-number">{facts.length}</div>
          <div className="summary-label">Total Facts</div>
        </div>
        <div className="summary-card">
          <div className="summary-number">{facts.filter(f => f.featured).length}</div>
          <div className="summary-label">Featured</div>
        </div>
      </div>

      {editingId && (
        <div className="add-fact-section">
          <h3>{editingId === '__new__' ? 'Add New Fact' : `Edit Fact (${editingId})`}</h3>
          <div className="add-fact-form">
            <textarea ref={addRef} placeholder="English text (required if Persian is empty)" {...field('en')} />
            <textarea placeholder="Persian text / متن فارسی (اختیاری)" dir="rtl" {...field('fa')} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <label>
                Type
                <select {...field('type')}>
                  <option value="evergreen">evergreen</option>
                  <option value="study_tip">study_tip</option>
                  <option value="contextual">contextual</option>
                  <option value="dependency_insight">dependency_insight</option>
                </select>
              </label>

              <label>
                Weight (1–10)
                <input type="number" min="1" max="10" {...field('weight')} />
              </label>

              <label style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" checked={form.featured} onChange={e => setForm(s => ({ ...s, featured: e.target.checked }))} />
                Featured (boosted selection weight + star badge)
              </label>

              <label>
                Tags (comma-separated)
                <input type="text" placeholder="physics, safety, architecture" {...field('tags')} />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <label>
                CTA Path (e.g. /science)
                <input type="text" placeholder="/science" {...field('ctaPath')} />
              </label>
              <label>
                CTA Label EN
                <input type="text" placeholder="Learn more" {...field('ctaLabelEn')} />
              </label>
              <label>
                CTA Label FA
                <input type="text" placeholder="بیشتر" dir="rtl" {...field('ctaLabelFa')} />
              </label>
            </div>

            <div className="fact-edit-actions">
              <button className="fact-admin-btn fact-save-btn" onClick={saveEdit}>Save</button>
              <button className="fact-admin-btn fact-cancel-btn" onClick={cancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="facts-list-section">
        <h3>Facts Draft ({facts.length})</h3>

        {loading ? (
          <div className="no-facts-message">Loading bundle…</div>
        ) : facts.length === 0 ? (
          <div className="no-facts-message">No facts yet. Click "+ Add Fact" to start.</div>
        ) : (
          <ul className="fact-admin-list">
            {facts.map(fact => (
              <li key={fact.id} className="fact-admin-item">
                <div className="fact-admin-content">
                  <p className="fact-admin-text">
                    <strong>{fact.id}</strong> [{fact.type}] — {String(fact.text?.en || fact.text?.fa || '').slice(0, 160)}
                    {String(fact.text?.en || '').length > 160 ? '…' : ''}
                  </p>
                  <div className="fact-admin-stats">
                    {fact.featured && (
                      <div className="fact-admin-pinned">
                        <span>⭐</span><span>Featured</span>
                      </div>
                    )}
                    <div className="fact-admin-agrees">weight: {fact.weight}</div>
                    {fact.tags?.length > 0 && (
                      <div className="fact-admin-agrees">tags: {fact.tags.join(', ')}</div>
                    )}
                    {fact.cta?.path && (
                      <div className="fact-admin-agrees">cta → {fact.cta.path}</div>
                    )}
                  </div>
                </div>
                <div className="fact-admin-actions">
                  <button className="fact-admin-btn fact-admin-edit-btn" onClick={() => startEdit(fact)}>Edit</button>
                  <button className="fact-admin-btn fact-admin-delete-btn" onClick={() => deleteFact(fact.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div style={{ marginTop: 16, padding: '12px 14px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, fontSize: '0.8rem', color: '#0c4a6e' }}>
          <strong>Publish flow:</strong> Export → copy <code>facts.bundle.json</code> to{' '}
          <code>public/data/facts.bundle.json</code> in the main project → commit → deploy.
          <br />
          The visitor site reads this file read-only; no admin code or draft state ever ships.
        </div>
      </div>
    </div>
  );
}
