import './Typography.css';

/**
 * Display Component
 * Largest heading, used for hero sections and page titles
 *
 * @param {ReactNode} children - Text content
 * @param {string} className - Additional CSS classes
 * @param {string} as - HTML element (h1, h2, etc.)
 */
export function Display({ children, className = '', as: Component = 'h1', ...rest }) {
  return (
    <Component className={`typography typography--display ${className}`} {...rest}>
      {children}
    </Component>
  );
}

/**
 * Heading Component
 * Section headings with multiple size variants
 *
 * @param {string} level - 1 | 2 | 3 | 4 | 5 | 6
 * @param {ReactNode} children - Text content
 * @param {string} className - Additional CSS classes
 */
export function Heading({ level = 2, children, className = '', ...rest }) {
  const Component = `h${level}`;
  return (
    <Component className={`typography typography--heading-${level} ${className}`} {...rest}>
      {children}
    </Component>
  );
}

/**
 * Body Component
 * Standard paragraph text with size variants
 *
 * @param {string} size - sm | md | lg
 * @param {ReactNode} children - Text content
 * @param {string} className - Additional CSS classes
 * @param {string} as - HTML element (p, span, div)
 */
export function Body({ size = 'md', children, className = '', as: Component = 'p', ...rest }) {
  return (
    <Component className={`typography typography--body typography--body-${size} ${className}`} {...rest}>
      {children}
    </Component>
  );
}

/**
 * Caption Component
 * Small supporting text, metadata, labels
 *
 * @param {ReactNode} children - Text content
 * @param {string} className - Additional CSS classes
 * @param {string} as - HTML element (span, p, div)
 */
export function Caption({ children, className = '', as: Component = 'span', ...rest }) {
  return (
    <Component className={`typography typography--caption ${className}`} {...rest}>
      {children}
    </Component>
  );
}

/**
 * Code Component
 * Inline code or code blocks
 *
 * @param {ReactNode} children - Code content
 * @param {boolean} block - If true, renders as <pre><code>, else <code>
 * @param {string} className - Additional CSS classes
 */
export function Code({ children, block = false, className = '', ...rest }) {
  if (block) {
    return (
      <pre className={`typography typography--code typography--code-block ${className}`} {...rest}>
        <code>{children}</code>
      </pre>
    );
  }

  return (
    <code className={`typography typography--code typography--code-inline ${className}`} {...rest}>
      {children}
    </code>
  );
}

/**
 * Overline Component
 * Small uppercase labels (eyebrows)
 *
 * @param {ReactNode} children - Text content
 * @param {string} className - Additional CSS classes
 * @param {string} as - HTML element (span, p, div)
 */
export function Overline({ children, className = '', as: Component = 'span', ...rest }) {
  return (
    <Component className={`typography typography--overline ${className}`} {...rest}>
      {children}
    </Component>
  );
}
