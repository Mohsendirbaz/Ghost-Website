import { useState, useRef, useEffect } from 'react';
import './TabBar.css';

/**
 * TabBar - Horizontal tabs with sliding underline indicator
 * Used for: KB categories, Artifact filters, Section navigation
 */
export default function TabBar({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  className = '',
}) {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (activeIndex >= 0 && tabRefs.current[activeIndex]) {
      const activeElement = tabRefs.current[activeIndex];
      setIndicatorStyle({
        width: activeElement.offsetWidth,
        left: activeElement.offsetLeft,
      });
    }
  }, [activeTab, tabs]);

  const classes = [
    'tab-bar',
    `tab-bar--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="tablist">
      <div className="tab-bar__inner">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={el => (tabRefs.current[index] = el)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            className={`tab-bar__tab ${
              activeTab === tab.id ? 'tab-bar__tab--active' : ''
            }`}
            onClick={() => onChange(tab.id)}
          >
            {tab.icon && <span className="tab-bar__icon">{tab.icon}</span>}
            <span className="tab-bar__label">{tab.label}</span>
            {tab.badge && <span className="tab-bar__badge">{tab.badge}</span>}
          </button>
        ))}
        <div className="tab-bar__indicator" style={indicatorStyle}></div>
      </div>
    </div>
  );
}
