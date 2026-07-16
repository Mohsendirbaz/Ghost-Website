import { useEffect, useRef, useState } from 'react';

/**
 * NarrowingHero — "The Narrowing."
 * A field of candidate trajectories flows through the five refusal gates
 * S0→S4; at each gate the admissible envelope contracts and inadmissible
 * candidates are deflected away. The risk slider tightens the envelope
 * live. Canvas only — no library additions.
 *
 * Honesty note: this is a CONCEPTUAL ILLUSTRATION of the monotone law
 * (the admissible set only contracts); the counts shown are the counts of
 * this simulation, not vehicle data. The caption says so on-screen.
 *
 * Discipline: pauses when offscreen or tab-hidden; renders a single
 * static frame under prefers-reduced-motion; theme-aware via CSS vars.
 */

const GATES = [0.16, 0.32, 0.48, 0.64, 0.8];
const GATE_LABELS = ['S0', 'S1', 'S2', 'S3', 'S4'];
const N = 46;

function readPalette() {
  const cs = getComputedStyle(document.documentElement);
  const v = (name, fb) => (cs.getPropertyValue(name) || '').trim() || fb;
  return {
    ink: v('--bp-ink', '#14314f'),
    soft: v('--bp-ink-soft', '#3d5a78'),
    line: v('--bp-line', 'rgba(20,49,79,.55)'),
    faint: v('--bp-line-faint', 'rgba(20,49,79,.18)'),
    accent: v('--bp-accent', '#2a78d6'),
    paper: v('--bp-paper', '#f7f6f1'),
  };
}

/* Envelope half-height (fraction of H/2) after gate k, at risk r∈[0,1]. */
function gateHalf(k, r) {
  const base = 0.92 * Math.pow(0.68, k + 1);
  return base * (1 - 0.55 * r) + 0.045;
}
function halfAt(x, r) {
  // piecewise: before first gate full, then holds the last passed gate's value
  let h = 0.92 * (1 - 0.35 * r) + 0.045;
  for (let k = 0; k < GATES.length; k++) {
    if (x >= GATES[k]) h = gateHalf(k, r);
  }
  return h;
}

function makeParticle(i, rng) {
  return {
    x: -rng() * 0.5,
    y0: (rng() * 2 - 1) * 0.92,
    v: 0.0016 + rng() * 0.0022,
    ph: rng() * Math.PI * 2,
    amp: 0.03 + rng() * 0.05,
    culledAt: -1, // gate index where deflected, -1 = alive
    cullX: 0,
    cullY: 0,
    fade: 1,
  };
}

export default function NarrowingHero({ lang = 'en' }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [risk, setRisk] = useState(0.35);
  const riskRef = useRef(risk);
  const [counts, setCounts] = useState({ inFlight: N, admissible: 0 });
  riskRef.current = risk;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let palette = readPalette();
    let raf = 0;
    let running = true;
    let visible = true;
    let w = 0;
    let h = 0;
    let seed = 7;
    const rng = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    let particles = Array.from({ length: N }, (_, i) => makeParticle(i, rng));
    let lastCountPush = 0;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(rect.width * dpr));
      h = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = w;
      canvas.height = h;
      draw(true);
    };

    const toPx = (x, y) => [x * w, (h / 2) * (1 + y * 0.94)];

    function drawStatic() {
      const r = riskRef.current;
      ctx.clearRect(0, 0, w, h);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // envelope (the command box) — two converging polylines
      ctx.lineWidth = 1.5 * dpr;
      ctx.strokeStyle = palette.line;
      [1, -1].forEach((s) => {
        ctx.beginPath();
        for (let i = 0; i <= 100; i++) {
          const x = i / 100;
          const [px, py] = toPx(x, s * halfAt(x, r));
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      });

      // hatch the inadmissible region lightly
      ctx.save();
      ctx.strokeStyle = palette.faint;
      ctx.lineWidth = 1 * dpr;
      const step = 26 * dpr;
      for (let gx = -h; gx < w + h; gx += step) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx + h * 0.35, h * 0.35);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(gx, h);
        ctx.lineTo(gx + h * 0.35, h - h * 0.35);
        ctx.stroke();
      }
      // clear the admissible interior of the hatch
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = '#000';
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const x = i / 100;
        const [px, py] = toPx(x, halfAt(x, r));
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      for (let i = 100; i >= 0; i--) {
        const x = i / 100;
        const [px, py] = toPx(x, -halfAt(x, r));
        ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // gates
      ctx.font = `${11 * dpr}px ui-monospace, Menlo, monospace`;
      ctx.textAlign = 'center';
      GATES.forEach((gx, k) => {
        const hg = gateHalf(k, r);
        const [px, pyTop] = toPx(gx, -hg);
        const [, pyBot] = toPx(gx, hg);
        ctx.strokeStyle = palette.ink;
        ctx.lineWidth = 2 * dpr;
        // gate posts extend from envelope outward
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, pyTop);
        ctx.moveTo(px, pyBot);
        ctx.lineTo(px, h);
        ctx.stroke();
        ctx.fillStyle = palette.soft;
        ctx.fillText(GATE_LABELS[k], px, 14 * dpr);
      });

      // actuation gate at the right edge
      const [ax] = toPx(0.965, 0);
      ctx.strokeStyle = palette.accent;
      ctx.lineWidth = 2.5 * dpr;
      const ah = halfAt(0.99, r) * (h / 2) * 0.94;
      ctx.strokeRect(ax - 3 * dpr, h / 2 - ah, 6 * dpr, ah * 2);
    }

    function draw(staticOnly = false) {
      drawStatic();
      const r = riskRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let admissible = 0;
      let inFlight = 0;

      particles.forEach((p) => {
        if (staticOnly && reduced) {
          // advance deterministically so the static frame is representative
          while (p.x < 1 && p.culledAt < 0) step(p, 1);
        }
        const y = p.culledAt >= 0 ? p.cullY : yOf(p, r);
        const x = p.culledAt >= 0 ? p.cullX : p.x;
        if (x < 0) return;
        if (p.culledAt >= 0) {
          // deflected: short fading tick outward
          ctx.globalAlpha = Math.max(p.fade, 0) * 0.6;
          ctx.strokeStyle = palette.soft;
          ctx.lineWidth = 1 * dpr;
          const [px, py] = toPx(x, y);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + 14 * dpr, py + (y > 0 ? 16 : -16) * dpr);
          ctx.stroke();
          ctx.globalAlpha = 1;
        } else if (x <= 1) {
          inFlight += 1;
          if (x > GATES[4]) admissible += 1;
          // trail
          ctx.strokeStyle = x > GATES[4] ? palette.accent : palette.soft;
          ctx.globalAlpha = x > GATES[4] ? 0.85 : 0.5;
          ctx.lineWidth = (x > GATES[4] ? 1.6 : 1) * dpr;
          ctx.beginPath();
          for (let t = 0; t <= 14; t++) {
            const bx = Math.max(0, x - t * 0.012);
            const [px, py] = toPx(bx, yOf({ ...p, x: bx }, r));
            if (t === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });

      const now = performance.now();
      if (now - lastCountPush > 350) {
        lastCountPush = now;
        setCounts({ inFlight, admissible });
      }
    }

    function yOf(p, r) {
      // squeeze toward the envelope as gates pass
      const hx = halfAt(p.x, r);
      const wander = Math.sin(p.x * 14 + p.ph) * p.amp;
      return Math.max(-1, Math.min(1, p.y0 * hx + wander * hx));
    }

    function step(p, dtScale) {
      const r = riskRef.current;
      p.x += p.v * dtScale;
      if (p.culledAt >= 0) {
        p.fade -= 0.015 * dtScale;
        if (p.fade <= 0) Object.assign(p, makeParticle(0, rng), { x: -rng() * 0.3 });
        return;
      }
      for (let k = 0; k < GATES.length; k++) {
        if (p.x >= GATES[k] && p.x - p.v * dtScale < GATES[k]) {
          const hg = gateHalf(k, r);
          if (Math.abs(yOf(p, r)) > hg * 0.985) {
            p.culledAt = k;
            p.cullX = p.x;
            p.cullY = yOf(p, r);
            return;
          }
        }
      }
      if (p.x > 1.04) Object.assign(p, makeParticle(0, rng), { x: -rng() * 0.3 });
    }

    const loop = () => {
      if (!running || !visible) return;
      particles.forEach((p) => step(p, 1));
      draw();
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && running && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(canvas);

    const onVis = () => {
      running = document.visibilityState === 'visible';
      if (running && visible && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    const mo = new MutationObserver(() => {
      palette = readPalette();
      if (reduced) draw(true);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    if (reduced) {
      draw(true);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const fa = lang === 'fa';
  const t = {
    risk: fa ? 'ریسک برآوردی' : 'estimated risk',
    counts: fa
      ? `${counts.inFlight} نامزد در جریان · ${counts.admissible} مجاز پس از S4`
      : `${counts.inFlight} candidates in flight · ${counts.admissible} admissible past S4`,
    caption: fa
      ? 'تصویر مفهومی — مجموعهٔ مجاز تنها منقبض می‌شود؛ انتخاب آزاد است، پیامد کران‌دار.'
      : 'Conceptual illustration — the admissible set only contracts; selection is free, consequence is bounded.',
    aria: fa
      ? 'میدان نامزدهای حرکت که از پنج دروازهٔ امتناع S0 تا S4 عبور می‌کنند و در هر دروازه هرس می‌شوند'
      : 'A field of candidate trajectories flowing through the five refusal gates S0 to S4, pruned at each gate',
  };

  return (
    <div className="nh" ref={wrapRef} dir="ltr">
      <div className="nh__stage bp-frame bp-grid-bg">
        <canvas ref={canvasRef} className="nh__canvas" role="img" aria-label={t.aria} />
        <div className="nh__controls" dir={fa ? 'rtl' : 'ltr'}>
          <label>
            {t.risk}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={risk}
              onChange={(e) => setRisk(Number(e.target.value))}
              aria-label={t.risk}
            />
          </label>
          <span className="nh__count" aria-live="off">{t.counts}</span>
          <span className="nh__caption">{t.caption}</span>
        </div>
      </div>
    </div>
  );
}
