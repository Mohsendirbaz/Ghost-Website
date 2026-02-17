/**
 * SignalRegimePlot.jsx
 *
 * Multi-channel waveform visualization showing signal regimes and Dirac delta impulses.
 *
 * The signal model used here:
 *   s(t) = A · sin(2πf·t) + Σ cᵢ · δ(t − tᵢ)
 *
 * where δ(t − tᵢ) is the Dirac delta sampled at injection events, and the integral
 * identity  ∫ δ(t − t₀) · f(t) dt = f(t₀)  defines the impulse response.
 *
 * Simulation modes drive the signal frequency f:
 *   slow   → f = 0.025 (long-period, low-bandwidth regime)
 *   normal → f = 0.10  (standard regime)
 *   fast   → f = 0.35  (high-frequency / high-bandwidth regime)
 *
 * A traffic-burst injection triggers a Dirac-like impulse spike on the affected
 * channel, decaying exponentially: δ_approx(t) = c · e^(−κ·Δt).
 */

import { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import './SignalRegimePlot.css';

// ── Constants ─────────────────────────────────────────────────────────────────

const HISTORY_LEN  = 180;   // rolling-window samples
const TICK_MS      = 80;    // approx sample period (ms)
const IMPULSE_PEAK = 8.5;   // Dirac spike amplitude
const IMPULSE_DECAY = 0.022; // exponential decay rate per ms

const MODE_FREQ = { slow: 0.025, normal: 0.10, fast: 0.35 };

const CHANNEL_COLORS = {
  'channel-1': '#FF9800',   // HIGH  → amber
  'channel-2': '#4CAF50',   // NORMAL → green
  'channel-3': '#E91E63',   // CRITICAL → rose
  'channel-4': '#2196F3',   // LOW   → blue
};

const PRIORITY_AMPLITUDE = {
  CRITICAL: 4.5,
  HIGH:     3.0,
  NORMAL:   2.0,
  LOW:      1.2,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function getColor(channelId) {
  return CHANNEL_COLORS[channelId] || '#9C27B0';
}

function baseAmp(channel) {
  return PRIORITY_AMPLITUDE[channel.priority] ?? 2.0;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SignalRegimePlot({
  channels,
  isRunning,
  simulationMode = 'normal',
  lastDisturbanceTime = null,
}) {
  const svgRef      = useRef(null);
  const historyRef  = useRef({});   // channelId → Float32Array-like ring buffer
  const tickRef     = useRef(0);
  const rafRef      = useRef(null);

  // ── Waveform generation ────────────────────────────────────────────────────

  const sample = useCallback((channel) => {
    const freq  = MODE_FREQ[simulationMode] ?? MODE_FREQ.normal;
    const amp   = baseAmp(channel);
    const t     = tickRef.current;

    // Base periodic signal (priority-scaled)
    const periodic = amp * Math.sin(2 * Math.PI * freq * t)
                   + (amp * 0.3) * Math.sin(4 * Math.PI * freq * t + 0.7); // harmonic

    // Queue-driven noise modulation
    const qNoise = (channel.queue?.length ?? 0) * 0.04 * (Math.random() - 0.5);

    // Dirac impulse component — exponential approximation δ_approx
    let impulse = 0;
    if (lastDisturbanceTime && channel.priority === 'CRITICAL') {
      const dt = Date.now() - lastDisturbanceTime;
      if (dt >= 0 && dt < 1800) {
        impulse = IMPULSE_PEAK * Math.exp(-IMPULSE_DECAY * dt);
      }
    }

    return periodic + qNoise + impulse;
  }, [simulationMode, lastDisturbanceTime]);

  // ── D3 render ─────────────────────────────────────────────────────────────

  const draw = useCallback(() => {
    const svg = d3.select(svgRef.current);
    if (!svgRef.current) return;

    const W = svgRef.current.clientWidth  || 900;
    const H = svgRef.current.clientHeight || 340;
    const m = { top: 24, right: 24, bottom: 54, left: 56 };
    const iW = W - m.left - m.right;
    const iH = H - m.top  - m.bottom;

    svg.selectAll('*').remove();

    const root = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

    // Background grid
    root.append('rect')
      .attr('width', iW).attr('height', iH)
      .attr('fill', '#0b1120').attr('rx', 4);

    // Subtle horizontal grid lines
    const yRange = [-6, 6];
    const yScale = d3.scaleLinear().domain(yRange).range([iH, 0]);
    const xScale = d3.scaleLinear().domain([0, HISTORY_LEN - 1]).range([0, iW]);

    const gridTicks = [-5, -2.5, 0, 2.5, 5];
    root.selectAll('.grid-h')
      .data(gridTicks)
      .enter().append('line')
        .attr('class', 'grid-h')
        .attr('x1', 0).attr('x2', iW)
        .attr('y1', d => yScale(d)).attr('y2', d => yScale(d))
        .attr('stroke', '#1e2d50').attr('stroke-width', d => d === 0 ? 1.5 : 0.6);

    // Plot channel waveforms
    const channelList = channels || [];
    channelList.forEach(ch => {
      const hist = historyRef.current[ch.id];
      if (!hist || hist.length < 2) return;

      const line = d3.line()
        .x((_, i) => xScale(i))
        .y(v => yScale(v))
        .curve(d3.curveCatmullRom.alpha(0.5));

      root.append('path')
        .datum(hist)
        .attr('fill', 'none')
        .attr('stroke', getColor(ch.id))
        .attr('stroke-width', 1.8)
        .attr('opacity', 0.88)
        .attr('d', line);

      // Moving "now" dot
      const last = hist[hist.length - 1];
      root.append('circle')
        .attr('cx', xScale(hist.length - 1))
        .attr('cy', yScale(last))
        .attr('r', 3.5)
        .attr('fill', getColor(ch.id))
        .attr('opacity', 0.95);
    });

    // Zero line label
    root.append('text')
      .attr('x', -4).attr('y', yScale(0) + 4)
      .attr('text-anchor', 'end')
      .attr('font-size', '10px').attr('fill', '#4a6080')
      .text('0');

    // Y axis ticks (minimal)
    [-5, 5].forEach(v => {
      root.append('text')
        .attr('x', -4).attr('y', yScale(v) + 4)
        .attr('text-anchor', 'end')
        .attr('font-size', '10px').attr('fill', '#4a6080')
        .text(v > 0 ? `+${v}` : v);
    });

    // X axis label
    root.append('text')
      .attr('x', iW / 2).attr('y', iH + 42)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px').attr('fill', '#6b84a8')
      .text('Time  →');

    // Y axis label
    root.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -iH / 2).attr('y', -44)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px').attr('fill', '#6b84a8')
      .text('Signal Amplitude');

    // Legend
    channelList.forEach((ch, idx) => {
      const lx = idx * (iW / (channelList.length || 1)) + 8;
      const lg = root.append('g').attr('transform', `translate(${lx}, ${iH + 16})`);
      lg.append('line').attr('x1', 0).attr('x2', 18).attr('y1', 0).attr('y2', 0)
        .attr('stroke', getColor(ch.id)).attr('stroke-width', 2.5);
      lg.append('text').attr('x', 22).attr('y', 4)
        .attr('font-size', '10px').attr('fill', '#8faad0')
        .text(`${ch.id} (${ch.priority})`);
    });

    // Mode badge (top-right)
    const modeLabelMap = { slow: 'SLOW  f=0.025', normal: 'NORMAL  f=0.10', fast: 'FAST  f=0.35' };
    root.append('text')
      .attr('x', iW - 4).attr('y', 16)
      .attr('text-anchor', 'end')
      .attr('font-size', '10.5px').attr('fill', '#4da3ff')
      .attr('font-family', 'monospace')
      .text(`mode: ${modeLabelMap[simulationMode] ?? simulationMode}`);

  }, [channels, simulationMode]);

  // ── Animation loop ─────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isRunning) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    let last = 0;

    const loop = (ts) => {
      rafRef.current = requestAnimationFrame(loop);
      if (ts - last < TICK_MS) return;
      last = ts;

      tickRef.current++;

      (channels || []).forEach(ch => {
        if (!historyRef.current[ch.id]) historyRef.current[ch.id] = [];
        historyRef.current[ch.id].push(sample(ch));
        if (historyRef.current[ch.id].length > HISTORY_LEN) {
          historyRef.current[ch.id].shift();
        }
      });

      draw();
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isRunning, channels, sample, draw]);

  // Draw once on mount / when stopped to show last state
  useEffect(() => {
    if (!isRunning) draw();
  }, [isRunning, draw]);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="signal-regime-plot">
      <div className="srp-header">
        <div className="srp-title">
          <span className="srp-title-main">Signal Regime Visualization</span>
          <span className="srp-title-sub">
            Adaptive waveform · Dirac impulse injection
          </span>
        </div>
        <div className="srp-formula">
          <span className="srp-formula-text">
            s(t)&nbsp;=&nbsp;A·sin(2πft)&nbsp;+&nbsp;Σ&nbsp;c<sub>i</sub>·δ(t&nbsp;−&nbsp;t<sub>i</sub>)
          </span>
          <span className="srp-formula-sep">·</span>
          <span className="srp-formula-text">
            ∫&nbsp;δ(t&nbsp;−&nbsp;t<sub>0</sub>)·f(t)&nbsp;dt&nbsp;=&nbsp;f(t<sub>0</sub>)
          </span>
        </div>
      </div>

      <div className="srp-canvas-wrap">
        {!isRunning && (
          <div className="srp-paused-overlay">
            <span>Start simulation to see live waveforms</span>
          </div>
        )}
        <svg ref={svgRef} className="srp-svg" />
      </div>

      <div className="srp-footer">
        <div className="srp-regime-key">
          <span className="srp-regime-label">Regime key:</span>
          <span className="srp-regime-item srp-slow">Slow  (f=0.025, long-period)</span>
          <span className="srp-regime-item srp-normal">Normal  (f=0.10, standard)</span>
          <span className="srp-regime-item srp-fast">Fast  (f=0.35, high-freq)</span>
          <span className="srp-regime-item srp-impulse">⚡ Burst  (Dirac δ impulse)</span>
        </div>
      </div>
    </div>
  );
}
