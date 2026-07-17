import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { LanguageProvider, useLang } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/ui/Toast';
import Header from './components/Header';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import CartWidget from './components/CartWidget';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import { FactPanel, SavedFactsBoard } from './components/FactEngine';
import CookieBanner from './components/CookieBanner';
import CommandBar from './components/CommandBar';
import Home from './pages/Home';
import Technology from './pages/Technology';
import Science from './pages/Science';
import Safety from './pages/Safety';
import Partners from './pages/Partners';
import Company from './pages/Company';
import Contact from './pages/Contact';
import Perspective from './pages/Perspective';
import Architecture from './pages/Architecture';
import KnowledgeBase from './pages/KnowledgeBase';
import KnowledgeBaseReader from './pages/KnowledgeBaseReader';
import Artifacts from './pages/Artifacts';
import ArtifactViewer from './pages/ArtifactViewer';
import LibraryAssets from './pages/LibraryAssets';
import LibraryAssetViewer from './pages/LibraryAssetViewer';
import LibraryBrowse from './pages/LibraryBrowse';
import MultiAgentSystem from './pages/MultiAgentSystem';
import Invest from './pages/Invest';
import Bio from './pages/Bio';
import Methods from './pages/Methods';
import Exhibition from './pages/Exhibition';
import './styles/global.css';
import './styles/blueprint.css';
import './App.css';

const BASE_URL = process.env.REACT_APP_SITE_URL || 'https://ghost-website-kappa.vercel.app';

function LangSync() {
  const { setLang } = useLang();
  const location = useLocation();

  useEffect(() => {
    const segment = location.pathname.split('/')[1];
    if (segment === 'fa') setLang('fa');
    else if (segment === 'en') setLang('en');
  }, [location.pathname, setLang]);

  // Inject hreflang alternate links for SEO
  useEffect(() => {
    const pathname = location.pathname;
    // Swap /en/ ↔ /fa/ for alternate
    const enPath = pathname.startsWith('/fa')
      ? pathname.replace(/^\/fa/, '/en')
      : pathname.startsWith('/en') ? pathname : `/en${pathname}`;
    const faPath = pathname.startsWith('/en')
      ? pathname.replace(/^\/en/, '/fa')
      : pathname.startsWith('/fa') ? pathname : `/fa${pathname}`;

    // Remove any existing hreflang links
    document.querySelectorAll('link[hreflang]').forEach((el) => el.remove());

    const addLink = (hreflang, href) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = `${BASE_URL}${href}`;
      document.head.appendChild(link);
    };

    addLink('en', enPath);
    addLink('fa', faPath);
    addLink('x-default', enPath);
  }, [location.pathname]);

  return null;
}

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function AppShell() {
  const location = useLocation();
  const [savedFactsOpen, setSavedFactsOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ghost-cookie-consent');
    if (consent === 'accepted') {
      setAnalyticsEnabled(true);
    }
  }, []);

  return (
    <>
      <LangSync />
      <TopNavBar />
      <ScrollProgress />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <CartWidget />
      <BackToTop />
      <CommandBar />
      <FactPanel onOpenSaved={() => setSavedFactsOpen(true)} />
      <SavedFactsBoard open={savedFactsOpen} onClose={() => setSavedFactsOpen(false)} />
      <CookieBanner
        onAccept={() => setAnalyticsEnabled(true)}
        onReject={() => setAnalyticsEnabled(false)}
      />
      <div className="page-wrapper">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/en" replace />} />
          <Route path="/en" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/en/technology" element={<PageTransition><Technology /></PageTransition>} />
          <Route path="/en/science" element={<PageTransition><Science /></PageTransition>} />
          <Route path="/en/safety" element={<PageTransition><Safety /></PageTransition>} />
          <Route path="/en/partners" element={<PageTransition><Partners /></PageTransition>} />
          <Route path="/en/company" element={<PageTransition><Company /></PageTransition>} />
          <Route path="/en/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/en/perspective" element={<PageTransition><Perspective /></PageTransition>} />
          <Route path="/en/methods" element={<PageTransition><Methods /></PageTransition>} />
          <Route path="/en/exhibition" element={<PageTransition><Exhibition /></PageTransition>} />
          <Route path="/en/architecture" element={<PageTransition><Architecture /></PageTransition>} />
          {/* Knowledge Base — browse index */}
          <Route path="/en/knowledge-base" element={<PageTransition><KnowledgeBase /></PageTransition>} />
          <Route path="/fa/knowledge-base" element={<PageTransition><KnowledgeBase /></PageTransition>} />
          {/* Knowledge Base — reader (Part → Chapter → Section) */}
          <Route path="/en/knowledge-base/:partSlug" element={<PageTransition><KnowledgeBaseReader /></PageTransition>} />
          <Route path="/fa/knowledge-base/:partSlug" element={<PageTransition><KnowledgeBaseReader /></PageTransition>} />
          <Route path="/en/knowledge-base/:partSlug/:chapterSlug" element={<PageTransition><KnowledgeBaseReader /></PageTransition>} />
          <Route path="/fa/knowledge-base/:partSlug/:chapterSlug" element={<PageTransition><KnowledgeBaseReader /></PageTransition>} />
          <Route path="/en/knowledge-base/:partSlug/:chapterSlug/:sectionSlug" element={<PageTransition><KnowledgeBaseReader /></PageTransition>} />
          <Route path="/fa/knowledge-base/:partSlug/:chapterSlug/:sectionSlug" element={<PageTransition><KnowledgeBaseReader /></PageTransition>} />
          {/* Artifact library */}
          <Route path="/en/artifacts" element={<PageTransition><Artifacts /></PageTransition>} />
          <Route path="/fa/artifacts" element={<PageTransition><Artifacts /></PageTransition>} />
          <Route path="/en/artifacts/:slug" element={<PageTransition><ArtifactViewer /></PageTransition>} />
          <Route path="/fa/artifacts/:slug" element={<PageTransition><ArtifactViewer /></PageTransition>} />
          {/* Library Assets — browse */}
          <Route path="/en/library/assets" element={<PageTransition><LibraryAssets /></PageTransition>} />
          <Route path="/fa/library/assets" element={<PageTransition><LibraryAssets /></PageTransition>} />
          {/* Library Assets — per-asset viewer */}
          <Route path="/en/library/assets/:slug" element={<PageTransition><LibraryAssetViewer /></PageTransition>} />
          <Route path="/fa/library/assets/:slug" element={<PageTransition><LibraryAssetViewer /></PageTransition>} />
          {/* Document Archive */}
          <Route path="/en/library" element={<PageTransition><LibraryBrowse /></PageTransition>} />
          <Route path="/fa/library" element={<PageTransition><LibraryBrowse /></PageTransition>} />
          {/* Multi-Agent System */}
          <Route path="/en/multi-agent-system" element={<PageTransition><MultiAgentSystem /></PageTransition>} />
          <Route path="/fa/multi-agent-system" element={<PageTransition><MultiAgentSystem /></PageTransition>} />
          {/* Invest / Crowdsourcing */}
          <Route path="/en/invest" element={<PageTransition><Invest /></PageTransition>} />
          <Route path="/fa/invest" element={<PageTransition><Invest /></PageTransition>} />
          {/* Bio / Founder */}
<Route path="/en/bio" element={<PageTransition><Bio /></PageTransition>} />
<Route path="/en/bio/:section" element={<PageTransition><Bio /></PageTransition>} />
<Route path="/fa/bio" element={<PageTransition><Bio /></PageTransition>} />
<Route path="/fa/bio/:section" element={<PageTransition><Bio /></PageTransition>} />
          <Route path="/fa" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/fa/technology" element={<PageTransition><Technology /></PageTransition>} />
          <Route path="/fa/science" element={<PageTransition><Science /></PageTransition>} />
          <Route path="/fa/safety" element={<PageTransition><Safety /></PageTransition>} />
          <Route path="/fa/partners" element={<PageTransition><Partners /></PageTransition>} />
          <Route path="/fa/company" element={<PageTransition><Company /></PageTransition>} />
          <Route path="/fa/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/fa/perspective" element={<PageTransition><Perspective /></PageTransition>} />
          <Route path="/fa/methods" element={<PageTransition><Methods /></PageTransition>} />
          <Route path="/fa/exhibition" element={<PageTransition><Exhibition /></PageTransition>} />
          <Route path="/fa/architecture" element={<PageTransition><Architecture /></PageTransition>} />
          <Route path="*" element={<Navigate to="/en" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
      {analyticsEnabled && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <LanguageProvider>
            <CartProvider>
              <AppShell />
            </CartProvider>
          </LanguageProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
