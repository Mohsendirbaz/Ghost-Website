import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider, useLang } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartWidget from './components/CartWidget';
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
import './styles/global.css';
import './App.css';

function LangSync() {
  const { setLang } = useLang();
  const location = useLocation();

  useEffect(() => {
    const segment = location.pathname.split('/')[1];
    if (segment === 'fa') setLang('fa');
    else if (segment === 'en') setLang('en');
  }, [location.pathname, setLang]);

  return null;
}

function AppShell() {
  return (
    <>
      <LangSync />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <CartWidget />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Navigate to="/en" replace />} />
          <Route path="/en" element={<Home />} />
          <Route path="/en/technology" element={<Technology />} />
          <Route path="/en/science" element={<Science />} />
          <Route path="/en/safety" element={<Safety />} />
          <Route path="/en/partners" element={<Partners />} />
          <Route path="/en/company" element={<Company />} />
          <Route path="/en/contact" element={<Contact />} />
          <Route path="/en/perspective" element={<Perspective />} />
          <Route path="/en/architecture" element={<Architecture />} />
          {/* Knowledge Base — browse index */}
          <Route path="/en/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/fa/knowledge-base" element={<KnowledgeBase />} />
          {/* Knowledge Base — reader (Part → Chapter → Section) */}
          <Route path="/en/knowledge-base/:partSlug" element={<KnowledgeBaseReader />} />
          <Route path="/fa/knowledge-base/:partSlug" element={<KnowledgeBaseReader />} />
          <Route path="/en/knowledge-base/:partSlug/:chapterSlug" element={<KnowledgeBaseReader />} />
          <Route path="/fa/knowledge-base/:partSlug/:chapterSlug" element={<KnowledgeBaseReader />} />
          <Route path="/en/knowledge-base/:partSlug/:chapterSlug/:sectionSlug" element={<KnowledgeBaseReader />} />
          <Route path="/fa/knowledge-base/:partSlug/:chapterSlug/:sectionSlug" element={<KnowledgeBaseReader />} />
          {/* Artifact library */}
          <Route path="/en/artifacts" element={<Artifacts />} />
          <Route path="/fa/artifacts" element={<Artifacts />} />
          <Route path="/en/artifacts/:slug" element={<ArtifactViewer />} />
          <Route path="/fa/artifacts/:slug" element={<ArtifactViewer />} />
          {/* Library Assets */}
          <Route path="/en/library/assets" element={<LibraryAssets />} />
          <Route path="/fa/library/assets" element={<LibraryAssets />} />
          <Route path="/fa" element={<Home />} />
          <Route path="/fa/technology" element={<Technology />} />
          <Route path="/fa/science" element={<Science />} />
          <Route path="/fa/safety" element={<Safety />} />
          <Route path="/fa/partners" element={<Partners />} />
          <Route path="/fa/company" element={<Company />} />
          <Route path="/fa/contact" element={<Contact />} />
          <Route path="/fa/perspective" element={<Perspective />} />
          <Route path="/fa/architecture" element={<Architecture />} />
          <Route path="*" element={<Navigate to="/en" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <AppShell />
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
