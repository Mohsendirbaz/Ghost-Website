import { useState } from 'react';
import './Tooltip.css';

/**
 * Tooltip Component
 * Position-aware tooltip that appears on hover/focus
 *
 * @param {ReactNode} children - Element that triggers the tooltip
 * @param {string} content - Tooltip text
 * @param {string} position - 'top' | 'bottom' | 'left' | 'right' (default: 'top')
 * @param {number} delay - Delay before showing tooltip in ms (default: 200)
 */
export default function Tooltip({
  children,
  content,
  position = 'top',
  delay = 200,
}) {
  const [isVisible, setIsVisible] = useState(false);
  let timeoutId = null;

  const showTooltip = () => {
    timeoutId = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutId);
    setIsVisible(false);
  };

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && content && (
        <span className={`tooltip tooltip--${position}`} role="tooltip">
          {content}
        </span>
      )}
    </div>
  );
}
