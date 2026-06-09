import { useState, useEffect } from 'react';
import './AnchorNav.css';

/**
 * AnchorNav - Sticky section jumper with scroll-spy
 * Automatically highlights active section based on scroll position
 * Used for: Long pages (Safety, Science)
 */
export default function AnchorNav({ sections, className = '' }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const headerOffset = 80; // Account for sticky header
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const classes = ['anchor-nav', className].filter(Boolean).join(' ');

  return (
    <nav className={classes} aria-label="Page sections">
      <div className="anchor-nav__inner">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`anchor-nav__item ${
              activeSection === section.id ? 'anchor-nav__item--active' : ''
            }`}
            onClick={() => scrollToSection(section.id)}
            aria-label={`Jump to ${section.label}`}
          >
            <span className="anchor-nav__dot"></span>
            <span className="anchor-nav__label">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
