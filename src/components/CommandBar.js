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

  const pageLabels = lang === 'fa' ? {
    home:             'خانه',
    technology:       'فناوری',
    science:          'علم',
    safety:           'ایمنی',
    partners:         'شرکا',
    company:          'شرکت',
    contact:          'تماس',
    perspective:      'دیدگاه',
    architecture:     'معماری',
    knowledgeBase:    'پایگاه دانش',
    artifacts:        'گالری آثار',
    library:          'آرشیو اسناد',
    libraryAssets:    'کتابخانه فنی',
    multiAgentSystem: 'سیستم چندعاملی',
    invest:           'سرمایه‌گذاری',
    bio:              'بیوگرافی',
  } : {
    home:             'Home',
    technology:       'Technology',
    science:          'Science',
    safety:           'Safety',
    partners:         'Partners',
    company:          'Company',
    contact:          'Contact',
    perspective:      'Perspective',
    architecture:     'Architecture',
    knowledgeBase:    'Knowledge Base',
    artifacts:        'Artifact Gallery',
    library:          'Document Archive',
    libraryAssets:    'Technical Library',
    multiAgentSystem: 'Multi-Agent System',
    invest:           'Invest',
    bio:              'Bio',
  };

  const pages = [
    { label: pageLabels.home,             path: `/${lang}` },
    { label: pageLabels.technology,       path: `/${lang}/technology` },
    { label: pageLabels.science,          path: `/${lang}/science` },
    { label: pageLabels.safety,           path: `/${lang}/safety` },
    { label: pageLabels.partners,         path: `/${lang}/partners` },
    { label: pageLabels.company,          path: `/${lang}/company` },
    { label: pageLabels.contact,          path: `/${lang}/contact` },
    { label: pageLabels.perspective,      path: `/${lang}/perspective` },
    { label: pageLabels.architecture,     path: `/${lang}/architecture` },
    { label: pageLabels.knowledgeBase,    path: `/${lang}/knowledge-base` },
    { label: pageLabels.artifacts,        path: `/${lang}/artifacts` },
    { label: pageLabels.libraryAssets,    path: `/${lang}/library/assets` },
    { label: pageLabels.library,          path: `/${lang}/library` },
    { label: pageLabels.multiAgentSystem, path: `/${lang}/multi-agent-system` },
    { label: pageLabels.invest,           path: `/${lang}/invest` },
    { label: pageLabels.bio,              path: `/${lang}/bio` },
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
