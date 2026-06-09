import { useState } from 'react';
import './FAQAccordion.css';

export default function FAQAccordion({ title, items }) {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq">
      <div className="container">
        {title && <h2 className="section-title faq__title">{title}</h2>}
        <div className="faq__list">
          {items.map((item, i) => (
            <div key={i} className={`faq__item${open === i ? ' faq__item--open' : ''}`}>
              <button
                className="faq__question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className="faq__chevron" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              <div className="faq__answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
