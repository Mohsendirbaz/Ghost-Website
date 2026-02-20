import './QuoteBlock.css';

/**
 * QuoteBlock - Large pull quote with attribution
 * Used for: Testimonials, key insights
 */
export default function QuoteBlock({ quote, author, role, image, className = '' }) {
  const classes = ['quote-block', className].filter(Boolean).join(' ');

  return (
    <blockquote className={classes}>
      <div className="quote-block__mark">"</div>
      <p className="quote-block__text">{quote}</p>
      {(author || role || image) && (
        <footer className="quote-block__footer">
          {image && (
            <div className="quote-block__avatar">
              <img src={image} alt={author} />
            </div>
          )}
          <div className="quote-block__attribution">
            {author && <cite className="quote-block__author">{author}</cite>}
            {role && <span className="quote-block__role">{role}</span>}
          </div>
        </footer>
      )}
    </blockquote>
  );
}
