import './Button.css';

/**
 * Button Component
 *
 * Reusable button with multiple variants and states.
 *
 * @param {string} variant - primary | secondary | tertiary | outline | ghost | icon-only
 * @param {string} size - sm | md | lg
 * @param {boolean} loading - Shows spinner when true
 * @param {boolean} disabled - Disables button
 * @param {boolean} fullWidth - Button takes full width of container
 * @param {ReactNode} icon - Icon element (SVG)
 * @param {ReactNode} children - Button text/content
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler
 * @param {string} type - button | submit | reset
 * @param {string} ariaLabel - Accessibility label
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  children,
  className = '',
  onClick,
  type = 'button',
  ariaLabel,
  ...rest
}) {
  const classNames = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    loading && 'btn--loading',
    fullWidth && 'btn--full-width',
    disabled && 'btn--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-busy={loading}
      {...rest}
    >
      {loading && (
        <span className="btn__spinner" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="3" strokeLinecap="round"
              style={{
                strokeDasharray: '60',
                strokeDashoffset: '20',
                animation: 'spin 1s linear infinite'
              }}
            />
          </svg>
        </span>
      )}
      {!loading && icon && <span className="btn__icon">{icon}</span>}
      {children && <span className="btn__text">{children}</span>}
    </button>
  );
}
