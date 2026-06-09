import './SectionBlock.css';

export default function SectionBlock({ eyebrow, title, body, points, note, children, alt, gray }) {
  return (
    <section className={`section-block${alt ? ' section-block--alt' : ''}${gray ? ' section-block--gray' : ''}`}>
      <div className="container section-block__inner">
        <div className="section-block__text">
          {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
          {title && <h2 className="section-title">{title}</h2>}
          {body && (Array.isArray(body)
            ? body.map((para, i) => <p key={i} className="section-block__body">{para}</p>)
            : <p className="section-block__body">{body}</p>)}
          {points && (
            <ul className="section-block__points">
              {points.map((pt, i) => (
                <li key={i} className="section-block__point">
                  <span className="section-block__point-dot" />
                  {pt}
                </li>
              ))}
            </ul>
          )}
          {note && <p className="section-block__note">{note}</p>}
        </div>
        {children && <div className="section-block__visual">{children}</div>}
      </div>
    </section>
  );
}
