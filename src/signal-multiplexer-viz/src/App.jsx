import { useState, useEffect, useRef } from 'react';
import { MultiplexerEngine } from './simulation/MultiplexerEngine';
import ControlPanel from './components/ControlPanel';
import ChannelVisualization from './components/ChannelVisualization';
import DemultiplexerVisualization from './components/DemultiplexerVisualization';
import SignalRegimePlot from './components/SignalRegimePlot';
import './App.css';

function App() {
  const [engine] = useState(() => new MultiplexerEngine());
  const [state, setState] = useState(engine.getState());
  const [isRunning, setIsRunning] = useState(false);
  const [simulationMode, setSimulationMode] = useState('normal'); // 'slow' | 'normal' | 'fast'
  const [lastDisturbanceTime, setLastDisturbanceTime] = useState(null);
  const optimizationInterval = useRef(null);
  const processingInterval = useRef(null);
  const visualizationInterval = useRef(null);

  // Initialize some test channels
  useEffect(() => {
    engine.createChannel('channel-1', 'HIGH');
    engine.createChannel('channel-2', 'NORMAL');
    engine.createChannel('channel-3', 'CRITICAL');
    engine.createChannel('channel-4', 'LOW');

    // Add some initial signals
    for (let i = 0; i < 5; i++) {
      engine.sendSignal('channel-1', { priority: 'HIGH', data: `signal-${i}` });
      engine.sendSignal('channel-2', { priority: 'NORMAL', data: `signal-${i}` });
    }

    setState(engine.getState());

    // Listen to engine events
    engine.on('snapshot', () => updateState());
    engine.on('problem_formulated', () => updateState());
    engine.on('structure_detected', () => updateState());
    engine.on('solver_selected', () => updateState());
    engine.on('constraints_synthesized', () => updateState());
    engine.on('solution_found', () => updateState());
    engine.on('solution_applied', () => updateState());
    engine.on('channel_created', () => updateState());
    engine.on('signal_enqueued', () => updateState());

    return () => {
      stopSimulation();
    };
  }, []);

  const updateState = () => {
    setState(engine.getState());
  };

  const startSimulation = () => {
    engine.start();
    setIsRunning(true);

    // Run optimization loop every 100ms
    optimizationInterval.current = setInterval(() => {
      engine.reformulateAndSolve();
    }, 100);

    // Process signals every 50ms
    processingInterval.current = setInterval(() => {
      engine.processSignals();
    }, 50);

    // Update visualization every 100ms
    visualizationInterval.current = setInterval(() => {
      updateState();
    }, 100);

    // Inject random signals
    const signalInjector = setInterval(() => {
      const channels = ['channel-1', 'channel-2', 'channel-3', 'channel-4'];
      const priorities = ['CRITICAL', 'HIGH', 'NORMAL', 'LOW'];
      const randomChannel = channels[Math.floor(Math.random() * channels.length)];
      const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];

      if (Math.random() > 0.7) {
        engine.sendSignal(randomChannel, {
          priority: randomPriority,
          data: `auto-signal-${Date.now()}`
        });
      }
    }, 200);

    return () => clearInterval(signalInjector);
  };

  const stopSimulation = () => {
    engine.stop();
    setIsRunning(false);

    if (optimizationInterval.current) {
      clearInterval(optimizationInterval.current);
      optimizationInterval.current = null;
    }

    if (processingInterval.current) {
      clearInterval(processingInterval.current);
      processingInterval.current = null;
    }

    if (visualizationInterval.current) {
      clearInterval(visualizationInterval.current);
      visualizationInterval.current = null;
    }
  };

  const toggleSimulation = () => {
    if (isRunning) {
      stopSimulation();
    } else {
      startSimulation();
    }
  };

  const injectSignal = (channelId, priority) => {
    engine.sendSignal(channelId, {
      priority,
      data: `manual-signal-${Date.now()}`
    });
  };

  const injectDisturbance = () => {
    // Inject a burst of critical signals (Dirac delta impulse event)
    for (let i = 0; i < 10; i++) {
      engine.sendSignal('channel-3', {
        priority: 'CRITICAL',
        data: `disturbance-signal-${i}`
      });
    }
    setLastDisturbanceTime(Date.now());
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Adaptive Signal Multiplexer with Dynamic Problem Formulation</h1>
        <p className="subtitle">
          Real-time visualization of intelligent coordination through continuous optimization
        </p>
      </header>

      <div className="main-content">
        <section className="section">
          <h2>Control Panel</h2>
          <ControlPanel
            isRunning={isRunning}
            onToggle={toggleSimulation}
            onInjectSignal={injectSignal}
            onInjectDisturbance={injectDisturbance}
            channels={state.channels}
            simulationMode={simulationMode}
            onModeChange={setSimulationMode}
          />
        </section>

        <section className="section">
          <h2>Signal Regime Plot</h2>
          <SignalRegimePlot
            channels={state.channels}
            isRunning={isRunning}
            simulationMode={simulationMode}
            lastDisturbanceTime={lastDisturbanceTime}
          />
        </section>

        <section className="section">
          <h2>System State</h2>
          <ChannelVisualization
            channels={state.channels}
            resourceState={state.resourceState}
          />
        </section>

        <section className="section">
          <h2>Signal Demultiplexing &amp; Recovery</h2>
          <DemultiplexerVisualization
            channels={state.channels}
            demuxState={state.demuxState}
          />
        </section>
      </div>

      <footer className="app-footer">
        <p>
          Architecture Philosophy: Signal multiplexing as continuous optimization with dynamic problem formulation,
          structure detection, and adaptive solver selection.
        </p>
      </footer>
    </div>
  );
}

export default App;
