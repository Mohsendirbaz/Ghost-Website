import './Tag.css';

/**
 * Tag Component
 * Pill-shaped chip with optional close button
 *
 * @param {string} label - Tag text
 * @param {function} onRemove - Called when remove button is clicked (if provided, shows X button)
 * @param {string} color - 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral' (default: 'neutral')
 * @param {string} variant - 'filled' | 'outlined' (default: 'filled')
 * @param {string} size - 'sm' | 'md' | 'lg' (default: 'md')
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler for the entire tag
 */
export default function Tag({
  label,
  onRemove,
  color = 'neutral',
  variant = 'filled',
  size = 'md',
  className = '',
  onClick,
}) {
  const classNames = [
    'tag',
    `tag--${color}`,
    `tag--${variant}`,
    `tag--${size}`,
    onClick && 'tag--clickable',
    className
  ].filter(Boolean).join(' ');

  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) onRemove();
  };

  return (
    <span
      className={classNames}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <span className="tag__label">{label}</span>
      {onRemove && (
        <button
          className="tag__remove"
          onClick={handleRemove}
          aria-label={`Remove ${label}`}
          type="button"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>
      )}
    </span>
  );
}
