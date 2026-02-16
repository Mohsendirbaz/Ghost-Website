import { useEffect, useRef, useState, useCallback } from 'react';
import { useLang } from '../context/LanguageContext';
import { COLLECTIONS, CATEGORIES, CLAIMS, DIAGRAM_TYPES } from '../data/diagrams';
import { copy } from '../data/copy';
import './DiagramViewer.css';

let mermaidInstance = null;
let mermaidLoading = null;

function getMermaid() {
  if (mermaidInstance) return Promise.resolve(mermaidInstance);
  if (mermaidLoading) return mermaidLoading;
  mermaidLoading = import('mermaid').then(mod => {
    const m = mod.default;
    m.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#FF6B35',
        primaryTextColor: '#1A1D23',
        primaryBorderColor: '#E5E7EB',
        lineColor: '#6B7280',
        secondaryColor: '#F8F9FA',
        tertiaryColor: '#EEF2FF',
        background: '#FFFFFF',
        mainBkg: '#FFFFFF',
        nodeBorder: '#E5E7EB',
        clusterBkg: '#F8F9FA',
        titleColor: '#1A1D23',
        edgeLabelBackground: '#FFFFFF',
        fontFamily: 'Inter, Vazirmatn, sans-serif',
        fontSize: '13px',
      },
      flowchart: { curve: 'basis', useMaxWidth: true, htmlLabels: true },
      sequence: { useMaxWidth: true },
    });
    mermaidInstance = m;
    return m;
  });
  return mermaidLoading;
}

let idCounter = 0;

export default function DiagramViewer({ diagram, t }) {
  const { lang } = useLang();
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const idRef = useRef(`mermaid-${++idCounter}`);
  const info = diagram[lang];
  const ui = t || copy[lang].architecture;

  const renderDiagram = useCallback(async (container) => {
    if (!container || rendered) return;
    setLoading(true);
    setError(false);
    try {
      const m = await getMermaid();
      const id = idRef.current;
      const { svg } = await m.render(id, diagram.mermaid);
      if (container) {
        container.innerHTML = svg;
        // Make SVG responsive
        const svgEl = container.querySelector('svg');
        if (svgEl) {
          svgEl.removeAttribute('height');
          svgEl.setAttribute('width', '100%');
          svgEl.style.maxWidth = '100%';
        }
        setRendered(true);
      }
    } catch (err) {
      console.warn('Mermaid render error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [diagram.mermaid, rendered]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || rendered) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observerRef.current?.disconnect();
          renderDiagram(container);
        }
      },
      { rootMargin: '200px' }
    );
    observerRef.current.observe(container);

    return () => observerRef.current?.disconnect();
  }, [renderDiagram, rendered]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const collection = COLLECTIONS[diagram.collection]?.[lang] ?? diagram.collection;
  const category = CATEGORIES[diagram.category]?.[lang] ?? diagram.category;
  const diagramType = DIAGRAM_TYPES[diagram.type]?.[lang] ?? diagram.type;

  return (
    <>
      <article className="diagram-card" aria-label={info.title}>
        <div className="diagram-card__header">
          <div className="diagram-card__meta">
            <span className="diagram-card__badge diagram-card__badge--collection">{collection}</span>
            <span className="diagram-card__badge diagram-card__badge--type">{diagramType}</span>
          </div>
          <h3 className="diagram-card__title">{info.title}</h3>
          <p className="diagram-card__desc">{info.description}</p>
        </div>

        <div
          className={`diagram-card__canvas${loading ? ' is-loading' : ''}${error ? ' is-error' : ''}`}
          onClick={rendered ? openModal : undefined}
          role={rendered ? 'button' : undefined}
          tabIndex={rendered ? 0 : undefined}
          onKeyDown={rendered ? (e) => e.key === 'Enter' && openModal() : undefined}
          aria-label={rendered ? ui.zoomLabel : undefined}
          title={rendered ? ui.zoomLabel : undefined}
        >
          {loading && (
            <div className="diagram-card__loading" aria-live="polite">
              <span className="diagram-card__spinner" aria-hidden="true" />
              <span className="sr-only">Loading diagram…</span>
            </div>
          )}
          {error && (
            <div className="diagram-card__error">
              <span>⚠ Could not render diagram</span>
            </div>
          )}
          <div ref={containerRef} className="diagram-card__svg-wrap" />
          {rendered && (
            <div className="diagram-card__zoom-hint" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 2h4v4M6 14H2v-4M14 2l-5 5M2 14l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          )}
        </div>

        <footer className="diagram-card__footer">
          <span className="diagram-card__category-label">{category}</span>
          {diagram.claims.length > 0 && (
            <ul className="diagram-card__claims" aria-label={ui.claimsLabel}>
              {diagram.claims.map(claimKey => (
                <li key={claimKey} className="diagram-card__claim">
                  {CLAIMS[claimKey]?.[lang] ?? claimKey}
                </li>
              ))}
            </ul>
          )}
        </footer>
      </article>

      {modalOpen && (
        <div
          className="diagram-modal"
          role="dialog"
          aria-modal="true"
          aria-label={info.title}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="diagram-modal__inner">
            <div className="diagram-modal__header">
              <h2 className="diagram-modal__title">{info.title}</h2>
              <button
                className="diagram-modal__close"
                onClick={closeModal}
                aria-label={ui.closeLabel}
              >
                ✕
              </button>
            </div>
            <div className="diagram-modal__body">
              <p className="diagram-modal__desc">{info.description}</p>
              <ModalDiagram source={diagram.mermaid} title={info.title} />
            </div>
            <div className="diagram-modal__footer">
              <span className="diagram-card__badge diagram-card__badge--collection">{collection}</span>
              <span className="diagram-card__badge diagram-card__badge--type">{diagramType}</span>
              <span className="diagram-card__category-label">{category}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ModalDiagram({ source, title }) {
  const containerRef = useRef(null);
  const idRef = useRef(`mermaid-modal-${++idCounter}`);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    getMermaid().then(m => {
      m.render(idRef.current, source).then(({ svg }) => {
        if (container) {
          container.innerHTML = svg;
          const svgEl = container.querySelector('svg');
          if (svgEl) {
            svgEl.removeAttribute('height');
            svgEl.setAttribute('width', '100%');
            svgEl.style.maxWidth = '100%';
          }
        }
      }).catch(err => console.warn('Modal render error:', err));
    });
  }, [source]);

  return (
    <div ref={containerRef} className="diagram-modal__svg-wrap" aria-label={title} />
  );
}
