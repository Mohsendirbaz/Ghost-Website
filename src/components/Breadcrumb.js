import { Link } from 'react-router-dom';
import './Breadcrumb.css';

/**
 * Breadcrumb — positional trail with RTL support.
 *
 * Props:
 *   crumbs: Array<{ label: string, to?: string }>
 *           Last item is treated as current page (no link, aria-current="page").
 */
export default function Breadcrumb({ crumbs = [] }) {
  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol className="breadcrumb__list">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={i} className="breadcrumb__item">
              {isLast ? (
                <span className="breadcrumb__current" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link to={crumb.to} className="breadcrumb__link">
                    {crumb.label}
                  </Link>
                  <span className="breadcrumb__sep" aria-hidden="true">›</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
