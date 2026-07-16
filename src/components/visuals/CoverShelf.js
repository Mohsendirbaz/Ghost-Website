import { Link } from 'react-router-dom';
import { CRITICAL_ASSETS, HIGH_ASSETS, flattenAssets } from '../../data/libraryAssets';

/**
 * CoverShelf — the corpus made spatial.
 * Renders the given documents as a shelf of real cover thumbnails
 * (rendered page-1 images already in /public/covers), replacing text
 * rows. Assets without a cover fall back to a typographic card.
 */

let slugMapCache = null;
function slugMap() {
  if (!slugMapCache) {
    slugMapCache = new Map();
    try {
      flattenAssets([CRITICAL_ASSETS, HIGH_ASSETS]).forEach((a) => {
        if (a && a.slug) slugMapCache.set(a.slug, a);
      });
    } catch (e) {
      /* shelf degrades to typographic cards */
    }
  }
  return slugMapCache;
}

export default function CoverShelf({ docs = [], lang = 'en' }) {
  const assets = slugMap();
  return (
    <div className="bp-shelf">
      {docs.map((doc) => {
        const asset = assets.get(doc.slug);
        const cover = asset && asset.cover;
        return (
          <Link key={doc.slug} className="bp-shelf-card" to={`/${lang}/library/assets/${doc.slug}`}>
            <span className={`bp-frame bp-shelf-card__cover${cover ? '' : ' bp-shelf-card__cover--text'}`}>
              {cover ? (
                <img src={cover} alt={doc.title} loading="lazy" />
              ) : (
                <span className="bp-shelf-card__mono">{doc.title}</span>
              )}
            </span>
            <span className="bp-shelf-card__t">{doc.title}</span>
            <span className="bp-shelf-card__d">{doc.desc}</span>
          </Link>
        );
      })}
    </div>
  );
}
