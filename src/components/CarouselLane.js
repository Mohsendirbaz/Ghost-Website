import { useRef } from 'react';
import './CarouselLane.css';

/**
 * CarouselLane - Netflix-style horizontal scroll
 * Used for: KB chapter browsing, artifact galleries
 */
export default function CarouselLane({ title, items, renderCard, seeAllLink, className = '' }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const classes = ['carousel-lane', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="carousel-lane__header">
        <h2 className="carousel-lane__title">{title}</h2>
        {seeAllLink && (
          <a href={seeAllLink} className="carousel-lane__see-all">
            See All →
          </a>
        )}
      </div>

      <div className="carousel-lane__wrapper">
        <button
          className="carousel-lane__nav carousel-lane__nav--left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div ref={scrollRef} className="carousel-lane__track">
          {items.map((item, index) => (
            <div key={index} className="carousel-lane__item">
              {renderCard(item)}
            </div>
          ))}
        </div>

        <button
          className="carousel-lane__nav carousel-lane__nav--right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  );
}
