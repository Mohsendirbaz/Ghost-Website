import './Badge.css';

/**
 * Badge Component
 * Small count or status indicator
 *
 * @param {ReactNode} children - Badge content (usually a number or short text)
 * @param {string} variant - 'count' | 'status' | 'new' | 'dot' (default: 'count')
 * @param {string} color - 'primary' | 'success' | 'warning' | 'danger' | 'neutral' (default: 'primary')
 * @param {string} className - Additional CSS classes
 */
export default function Badge({
  children,
  variant = 'count',
  color = 'primary',
  className = '',
}) {
  const classNames = [
    'badge',
    `badge--${variant}`,
    `badge--${color}`,
    className
  ].filter(Boolean).join(' ');

  if (variant === 'dot') {
    return <span className={classNames} aria-label="Notification indicator" />;
  }

  return (
    <span className={classNames}>
      {children}
    </span>
  );
}
