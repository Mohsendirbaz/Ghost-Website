import { Component } from 'react';

/** Minimal top-level error boundary: a crash in any page renders a calm
    fallback instead of a blank screen. */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Unhandled UI error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: '60vh', display: 'grid', placeContent: 'center', textAlign: 'center', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
          <p style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.7 }}>
            UNHANDLED FAULT · خطای مدیریت‌نشده
          </p>
          <h1 style={{ fontSize: '1.4rem', margin: '0.6rem 0' }}>Something failed to render.</h1>
          <p style={{ opacity: 0.75, marginBottom: '1.2rem' }}>چیزی در نمایش صفحه خراب شد.</p>
          <p>
            <a href="/" style={{ color: '#2a78d6' }}>Reload — بارگذاری دوباره</a>
          </p>
        </main>
      );
    }
    return this.props.children;
  }
}
