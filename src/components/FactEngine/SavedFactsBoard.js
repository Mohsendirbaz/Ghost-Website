import { useState, useEffect } from 'react';
import Drawer from '../ui/Drawer';
import FactCard from './FactCard';
import './SavedFactsBoard.css';

/**
 * SavedFactsBoard - Drawer displaying all saved facts
 * Allows removal, clear all, and export
 */
export default function SavedFactsBoard({ open, onClose }) {
  const [savedFacts, setSavedFacts] = useState([]);

  useEffect(() => {
    if (open) {
      const saved = JSON.parse(localStorage.getItem('ghost-saved-facts') || '[]');
      // Sort by most recently saved
      setSavedFacts(saved.sort((a, b) => b.savedAt - a.savedAt));
    }
  }, [open]);

  const handleRemove = (factId) => {
    const updated = savedFacts.filter(f => f.id !== factId);
    setSavedFacts(updated);
    localStorage.setItem('ghost-saved-facts', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm('Remove all saved facts?')) {
      setSavedFacts([]);
      localStorage.removeItem('ghost-saved-facts');
    }
  };

  const handleExport = () => {
    const text = savedFacts.map(f => `• ${f.text}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ghost-autonomy-facts.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      position="right"
      title={`Saved Facts (${savedFacts.length})`}
    >
      <div className="saved-facts-board">
        {savedFacts.length === 0 ? (
          <div className="saved-facts-board__empty">
            <svg width="48" height="48" viewBox="0 0 20 20" fill="none">
              <path d="M5 7L10 12L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 3V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <h3>No saved facts yet</h3>
            <p>Save interesting facts as you explore the site</p>
          </div>
        ) : (
          <>
            <div className="saved-facts-board__actions">
              <button
                className="saved-facts-board__action-btn saved-facts-board__action-btn--export"
                onClick={handleExport}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3V12M10 12L7 9M10 12L13 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Export as Text
              </button>
              <button
                className="saved-facts-board__action-btn saved-facts-board__action-btn--clear"
                onClick={handleClearAll}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Clear All
              </button>
            </div>

            <div className="saved-facts-board__grid">
              {savedFacts.map((fact) => (
                <FactCard
                  key={fact.id}
                  fact={fact}
                  onRemove={handleRemove}
                  saved
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
}
