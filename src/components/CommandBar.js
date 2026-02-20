import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import './CommandBar.css';

/**
 * CommandBar - ⌘K command palette
 * Quick navigation and actions
 */
export default function CommandBar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();

  // Toggle with ⌘K / Ctrl+K
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleNavigate = useCallback((path) => {
    navigate(path);
    setOpen(false);
    setSearch('');
  }, [navigate]);

  const handleAction = useCallback((action) => {
    action();
    setOpen(false);
    setSearch('');
  }, []);

  if (!open) return null;

  const pages = [
    { label: 'Home', path: `/${lang}` },
    { label: 'Technology', path: `/${lang}/technology` },
    { label: 'Science', path: `/${lang}/science` },
    { label: 'Safety', path: `/${lang}/safety` },
    { label: 'Partners', path: `/${lang}/partners` },
    { label: 'Company', path: `/${lang}/company` },
    { label: 'Contact', path: `/${lang}/contact` },
    { label: 'Knowledge Base', path: `/${lang}/knowledge-base` },
    { label: 'Artifacts', path: `/${lang}/artifacts` },
    { label: 'Library', path: `/${lang}/library` },
  ];

  return (
    <div className="command-bar-overlay" onClick={() => setOpen(false)}>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command Menu"
        className="command-bar"
        onClick={(e) => e.stopPropagation()}
      >
        <Command.Input
          value={search}
          onValueChange={setSearch}
          placeholder="Type a command or search..."
          className="command-bar__input"
        />
        <Command.List className="command-bar__list">
          <Command.Empty className="command-bar__empty">No results found.</Command.Empty>

          <Command.Group heading="Pages" className="command-bar__group">
            {pages.map((page) => (
              <Command.Item
                key={page.path}
                onSelect={() => handleNavigate(page.path)}
                className="command-bar__item"
              >
                <span>{page.label}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Actions" className="command-bar__group">
            <Command.Item
              onSelect={() => handleAction(() => setTheme(theme === 'light' ? 'dark' : 'light'))}
              className="command-bar__item"
            >
              <span>Toggle Theme ({theme === 'light' ? 'Dark' : 'Light'})</span>
            </Command.Item>
            <Command.Item
              onSelect={() => handleAction(() => setLang(lang === 'en' ? 'fa' : 'en'))}
              className="command-bar__item"
            >
              <span>Switch Language ({lang === 'en' ? 'فارسی' : 'English'})</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </div>
  );
}
