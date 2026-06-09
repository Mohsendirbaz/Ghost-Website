import './Grid.css';

/**
 * Grid Component
 * 12-column responsive grid system
 *
 * @param {number|object} columns - Column count or object with breakpoint values
 *   Examples:
 *   - columns={3} → 3 columns at all breakpoints
 *   - columns={{ mobile: 1, tablet: 2, desktop: 4 }} → responsive columns
 * @param {string} gap - Gap size using spacing tokens (1-16) or custom value
 * @param {string} alignItems - CSS align-items value
 * @param {string} justifyItems - CSS justify-items value
 * @param {ReactNode} children - Grid items
 * @param {string} className - Additional CSS classes
 * @param {string} as - HTML element (div, section, etc.)
 */
export default function Grid({
  columns = 12,
  gap = '4',
  alignItems,
  justifyItems,
  children,
  className = '',
  as: Component = 'div',
  ...rest
}) {
  // Parse columns prop
  const getColumnClass = () => {
    if (typeof columns === 'number') {
      return `grid--cols-${columns}`;
    }
    if (typeof columns === 'object') {
      const classes = [];
      if (columns.mobile) classes.push(`grid--mobile-${columns.mobile}`);
      if (columns.tablet) classes.push(`grid--tablet-${columns.tablet}`);
      if (columns.desktop) classes.push(`grid--desktop-${columns.desktop}`);
      return classes.join(' ');
    }
    return 'grid--cols-12';
  };

  const gapClass = gap.match(/^\d+$/) ? `grid--gap-${gap}` : '';

  const classNames = [
    'grid',
    getColumnClass(),
    gapClass,
    className
  ].filter(Boolean).join(' ');

  const styles = {
    ...(alignItems && { alignItems }),
    ...(justifyItems && { justifyItems }),
    ...(!gap.match(/^\d+$/) && { gap }) // Custom gap value
  };

  return (
    <Component className={classNames} style={styles} {...rest}>
      {children}
    </Component>
  );
}

/**
 * GridItem Component
 * Individual grid item with span control
 *
 * @param {number|object} span - Column span or object with breakpoint values
 *   Examples:
 *   - span={6} → spans 6 columns at all breakpoints
 *   - span={{ mobile: 12, tablet: 6, desktop: 4 }} → responsive span
 * @param {ReactNode} children - Item content
 * @param {string} className - Additional CSS classes
 * @param {string} as - HTML element (div, section, etc.)
 */
export function GridItem({
  span,
  children,
  className = '',
  as: Component = 'div',
  ...rest
}) {
  const getSpanClass = () => {
    if (!span) return '';

    if (typeof span === 'number') {
      return `grid-item--span-${span}`;
    }

    if (typeof span === 'object') {
      const classes = [];
      if (span.mobile) classes.push(`grid-item--mobile-span-${span.mobile}`);
      if (span.tablet) classes.push(`grid-item--tablet-span-${span.tablet}`);
      if (span.desktop) classes.push(`grid-item--desktop-span-${span.desktop}`);
      return classes.join(' ');
    }

    return '';
  };

  const classNames = [
    'grid-item',
    getSpanClass(),
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  );
}
