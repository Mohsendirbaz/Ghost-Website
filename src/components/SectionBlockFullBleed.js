import './SectionBlockFullBleed.css';

/**
 * SectionBlockFullBleed - Edge-to-edge section block
 * Breaks out of container for dramatic visual impact
 * Used for: Hero-adjacent sections, visual breaks
 */
export default function SectionBlockFullBleed({
  eyebrow,
  title,
  body,
  children,
  backgroundImage,
  overlay = true,
  className = '',
}) {
  const style = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  const classes = [
    'section-block-full-bleed',
    backgroundImage ? 'section-block-full-bleed--has-bg' : '',
    overlay ? 'section-block-full-bleed--overlay' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} style={style}>
      <div className="section-block-full-bleed__content">
        <div className="container">
          {eyebrow && (
            <span className="section-block-full-bleed__eyebrow">{eyebrow}</span>
          )}
          {title && <h2 className="section-block-full-bleed__title">{title}</h2>}
          {body && <div className="section-block-full-bleed__body">{body}</div>}
          {children && <div className="section-block-full-bleed__children">{children}</div>}
        </div>
      </div>
    </section>
  );
}
