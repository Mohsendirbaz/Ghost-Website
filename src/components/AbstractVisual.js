import './AbstractVisual.css';

/* Reusable abstract SVG visuals — no IP-sensitive details */

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

export function SafetyLayersVisual() {
  return (
    <div className="abstract-visual">
      <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#004E89" stopOpacity="1"/>
            <stop offset="100%" stopColor="#0066B3" stopOpacity="1"/>
          </linearGradient>
          <linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#003A66" stopOpacity="1"/>
            <stop offset="100%" stopColor="#004E89" stopOpacity="1"/>
          </linearGradient>
        </defs>
        {/* Layer 4 (bottom) */}
        <rect x="20" y="230" width="360" height="60" rx="10" fill="url(#sg2)" opacity="0.6"/>
        <text x="200" y="267" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="500">Monitoring &amp; Logging</text>
        {/* Layer 3 */}
        <rect x="40" y="170" width="320" height="55" rx="10" fill="url(#sg1)" opacity="0.7"/>
        <text x="200" y="201" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="500">Fault Tolerance</text>
        {/* Layer 2 */}
        <rect x="60" y="110" width="280" height="55" rx="10" fill="url(#sg1)" opacity="0.85"/>
        <text x="200" y="141" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="500">Validation Mechanisms</text>
        {/* Layer 1 (top) */}
        <rect x="80" y="50" width="240" height="55" rx="10" fill="#FF6B35" opacity="0.9"/>
        <text x="200" y="81" textAnchor="middle" fill="white" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600">Physics Enforcement</text>
        {/* Shield icon hint */}
        <path d="M200 20 L215 27 L215 35 Q215 42 200 48 Q185 42 185 35 L185 27 Z" fill="white" opacity="0.2"/>
        {/* Connecting lines */}
        <line x1="200" y1="105" x2="200" y2="110" stroke="white" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3,3"/>
        <line x1="200" y1="165" x2="200" y2="170" stroke="white" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3,3"/>
        <line x1="200" y1="225" x2="200" y2="230" stroke="white" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3,3"/>
      </svg>
    </div>
  );
}

export function PhysicsAbstraction() {
  return (
    <div className="abstract-visual">
      <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="pg1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F7B32B" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#004E89" stopOpacity="0.05"/>
          </radialGradient>
          <linearGradient id="pg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#F7B32B" stopOpacity="0.7"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="160" rx="180" ry="130" fill="url(#pg1)"/>
        {/* Curved field lines */}
        {[0,1,2,3,4,5].map(i => (
          <ellipse key={i} cx="200" cy="160" rx={40+i*28} ry={25+i*18}
            stroke="#004E89" strokeWidth="1" strokeOpacity={0.15+i*0.04} fill="none"/>
        ))}
        {/* Crossing orthogonal curves */}
        {[0,1,2,3,4].map(i => (
          <path key={i}
            d={`M ${60+i*55} 30 Q ${80+i*55} 160 ${60+i*55} 290`}
            stroke="#FF6B35" strokeWidth="1" strokeOpacity="0.12" fill="none"/>
        ))}
        {/* Accent curve */}
        <path d="M 30 200 Q 100 80 200 100 Q 300 120 370 60" stroke="url(#pg2)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M 30 240 Q 120 160 200 180 Q 280 200 370 120" stroke="#004E89" strokeWidth="1.5" fill="none" strokeOpacity="0.5" strokeLinecap="round"/>
        {/* Nodes */}
        <circle cx="200" cy="100" r="6" fill="#FF6B35" opacity="0.8"/>
        <circle cx="120" cy="180" r="4" fill="#F7B32B" opacity="0.7"/>
        <circle cx="280" cy="200" r="4" fill="#F7B32B" opacity="0.7"/>
        <circle cx="200" cy="160" r="8" fill="white" opacity="0.15"/>
      </svg>
    </div>
  );
}

export function FounderPlaceholder() {
  return (
    <div className="founder-visual">
      <div className="founder-visual__avatar">
        <span>MD</span>
      </div>
    </div>
  );
}
