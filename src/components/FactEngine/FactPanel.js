import { useState, useEffect } from 'react';
import { getRandomFact } from '../../data/facts';
import FactCard from './FactCard';
import './FactPanel.css';

/**
 * FactPanel - Bottom-anchored fact strip
 * Rotates through facts automatically or manually
 * Always visible engagement mechanic
 */
export default function FactPanel({ tags = [], onOpenSaved, className = '' }) {
  const [currentFact, setCurrentFact] = useState(null);
  const [savedFacts, setSavedFacts] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  // Load saved facts from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ghost-saved-facts') || '[]');
    setSavedFacts(saved);
  }, []);

  // Initialize first fact
  useEffect(() => {
    setCurrentFact(getRandomFact(tags));
  }, [tags]);

  // Auto-advance every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFact(getRandomFact(tags));
    }, 12000);

    return () => clearInterval(timer);
  }, [tags]);

  const handleNext = () => {
    setCurrentFact(getRandomFact(tags));
  };

  const handleSave = (fact) => {
    const updated = [...savedFacts, { ...fact, savedAt: Date.now() }];
    setSavedFacts(updated);
    localStorage.setItem('ghost-saved-facts', JSON.stringify(updated));
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || !currentFact) return null;

  const classes = ['fact-panel', className].filter(Boolean).join(' ');

  const isSaved = savedFacts.some(f => f.id === currentFact.id);

  return (
    <div className={classes}>
      <div className="fact-panel__inner container">
        <div className="fact-panel__label">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 3L12.5 8L18 9L14 13L15 18.5L10 16L5 18.5L6 13L2 9L7.5 8L10 3Z" fill="currentColor"/>
          </svg>
          <span>Did you know?</span>
        </div>

        <div className="fact-panel__content">
          <FactCard fact={currentFact} onSave={handleSave} saved={isSaved} compact />
        </div>

        <div className="fact-panel__controls">
          <button
            className="fact-panel__button"
            onClick={handleNext}
            aria-label="Next fact"
            title="Next fact"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M14 10L8 6V14L14 10Z" fill="currentColor"/>
              <path d="M15 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <button
            className="fact-panel__button"
            onClick={onOpenSaved}
            aria-label={`View saved facts (${savedFacts.length})`}
            title={`View saved facts (${savedFacts.length})`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 7L10 12L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 3V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {savedFacts.length > 0 && (
              <span className="fact-panel__badge">{savedFacts.length}</span>
            )}
          </button>

          <button
            className="fact-panel__button fact-panel__button--close"
            onClick={handleDismiss}
            aria-label="Dismiss fact panel"
            title="Dismiss fact panel"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
