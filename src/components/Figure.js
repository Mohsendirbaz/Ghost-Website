/**
 * Figure — blueprint-framed, numbered figure.
 * Replaces the repeated inline-styled <figure> blocks. Plates (technical
 * drawings, dark-on-light) get `invert` so dark mode renders them as
 * cyanotype instead of a glowing light card; covers/photos omit it.
 * Styles live in styles/blueprint.css (imported once in App.js).
 */
export default function Figure({ num, src, alt = '', caption, invert = true, wide = false, children }) {
  const classes = [
    'bp-figure',
    wide ? 'bp-figure--wide' : '',
    invert ? 'bp-figure--invert' : '',
  ].filter(Boolean).join(' ');

  return (
    <figure className={classes}>
      <div className="bp-frame">
        {children || <img src={src} alt={alt || caption || ''} loading="lazy" />}
      </div>
      {caption && (
        <figcaption className="bp-figcaption">
          {num && <span className="bp-fignum">Fig. {num}</span>}
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
