import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light-theme';
    const saved = localStorage.getItem('preferred-theme');
    if (saved === 'light-theme' || saved === 'dark-theme') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark-theme'
      : 'light-theme';
  });

  // Apply theme class to <html>, update meta theme-color, and persist to localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(theme);
    localStorage.setItem('preferred-theme', theme);

    // Keep browser chrome / PWA status bar in sync with theme
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark-theme' ? '#121a2e' : '#FF6B35'
      );
    }
  }, [theme]);

  // Respond to OS-level prefers-color-scheme changes
  // Only auto-switch if user hasn't manually selected a theme
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      const saved = localStorage.getItem('preferred-theme');
      if (!saved) {
        setTheme(e.matches ? 'dark-theme' : 'light-theme');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () =>
    setTheme((t) => (t === 'dark-theme' ? 'light-theme' : 'dark-theme'));

  const isDark = theme === 'dark-theme';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
