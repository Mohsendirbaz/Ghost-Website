import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HeroPrimary.css';

/**
 * HeroPrimary - Full viewport hero with animated particle background
 * Used for: Home, Technology pages
 */
export default function HeroPrimary({
  eyebrow,
  h1,
  subhead,
  cta1,
  cta1To,
  cta2,
  cta2To,
  particleCount = 50,
  particleColor = '#FF6B35'
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particleColor;
            ctx.globalAlpha = 0.2 * (1 - distance / 150);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particleCount, particleColor]);

  return (
    <section className="hero-primary">
      <canvas ref={canvasRef} className="hero-primary__canvas" aria-hidden="true" />
      <div className="hero-primary__overlay" />
      <div className="container hero-primary__content">
        {eyebrow && <p className="hero-primary__eyebrow">{eyebrow}</p>}
        <h1 className="hero-primary__h1">{h1}</h1>
        {subhead && <p className="hero-primary__sub">{subhead}</p>}
        {(cta1 || cta2) && (
          <div className="hero-primary__ctas">
            {cta1 && (
              <Link to={cta1To || '#'} className="btn btn-primary">
                {cta1}
              </Link>
            )}
            {cta2 && (
              <Link to={cta2To || '#'} className="btn btn-secondary">
                {cta2}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
