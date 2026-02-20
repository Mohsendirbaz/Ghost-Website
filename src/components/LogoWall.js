import './LogoWall.css';

/**
 * LogoWall - Partner/client logo showcase with marquee
 * Infinite scroll animation
 * Used for: Partner logos, client testimonials
 */
export default function LogoWall({ logos, title, className = '' }) {
  const classes = ['logo-wall', className].filter(Boolean).join(' ');

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className={classes}>
      {title && <h2 className="logo-wall__title">{title}</h2>}
      <div className="logo-wall__track">
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className="logo-wall__item">
            {logo.link ? (
              <a href={logo.link} target="_blank" rel="noopener noreferrer">
                <img src={logo.src} alt={logo.alt} />
              </a>
            ) : (
              <img src={logo.src} alt={logo.alt} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
