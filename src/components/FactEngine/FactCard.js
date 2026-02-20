import './FactCard.css';

/**
 * FactCard - Formalized fact card component
 * Used in: FactPanel, SavedFactsBoard, FactToast
 */
export default function FactCard({
  fact,
  onSave,
  onRemove,
  saved = false,
  compact = false,
  className = '',
}) {
  const classes = [
    'fact-card',
    compact ? 'fact-card--compact' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="fact-card__content">
        <p className="fact-card__text">{fact.text}</p>
        {!compact && fact.tags && fact.tags.length > 0 && (
          <div className="fact-card__tags">
            {fact.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="fact-card__tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="fact-card__actions">
        {saved ? (
          <button
            className="fact-card__action fact-card__action--remove"
            onClick={() => onRemove?.(fact.id)}
            aria-label="Remove from saved facts"
            title="Remove from saved facts"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        ) : (
          <button
            className="fact-card__action fact-card__action--save"
            onClick={() => onSave?.(fact)}
            aria-label="Save this fact"
            title="Save this fact"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 7L10 12L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 3V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
