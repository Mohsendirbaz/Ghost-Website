import './AbstractVisual.css';

/* Reusable abstract SVG visual — no IP-sensitive details.
   Janitorial note (2026-07-16): SafetyLayersVisual, PhysicsAbstraction and
   FounderPlaceholder were removed as unused after the Wave-1 visual rework;
   EpuVisual remains in service on Technology until a blueprint-grammar
   replacement ships. */

export function EpuVisual() {
  return (
    <div className="abstract-visual">
      <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Flowing energy layers */}
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#004E89" stopOpacity="0.8"/>
          </linearGradient>
          <linearGradient id="g2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#004E89" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#F7B32B" stopOpacity="0.6"/>
          </linearGradient>
          <filter id="blur1">
            <feGaussianBlur stdDeviation="3"/>
          </filter>
        </defs>
        {/* Background glow */}
        <ellipse cx="200" cy="150" rx="180" ry="120" fill="url(#g2)" opacity="0.15" filter="url(#blur1)"/>
        {/* Processing stages */}
        <rect x="20" y="110" width="70" height="80" rx="12" fill="url(#g1)" opacity="0.9"/>
        <rect x="115" y="90" width="70" height="120" rx="12" fill="url(#g1)" opacity="0.85"/>
        <rect x="210" y="70" width="70" height="160" rx="12" fill="url(#g1)" opacity="0.8"/>
        <rect x="305" y="100" width="70" height="100" rx="12" fill="#F7B32B" opacity="0.7"/>
        {/* Connecting hairlines */}
        <line x1="90" y1="150" x2="115" y2="150" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
        <line x1="185" y1="150" x2="210" y2="150" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
        <line x1="280" y1="150" x2="305" y2="150" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
        {/* Flow dots */}
        <circle cx="102" cy="150" r="3" fill="white" opacity="0.6"/>
        <circle cx="197" cy="150" r="3" fill="white" opacity="0.6"/>
        <circle cx="292" cy="150" r="3" fill="white" opacity="0.6"/>
        {/* Labels */}
        <text x="55" y="265" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="Inter, sans-serif">Input</text>
        <text x="150" y="265" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="Inter, sans-serif">Process</text>
        <text x="245" y="265" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="Inter, sans-serif">Validate</text>
        <text x="340" y="265" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="Inter, sans-serif">Output</text>
      </svg>
    </div>
  );
}
