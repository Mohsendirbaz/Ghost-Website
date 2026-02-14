import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider, useLang } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Technology from './pages/Technology';
import Science from './pages/Science';
import Safety from './pages/Safety';
import Partners from './pages/Partners';
import Company from './pages/Company';
import Contact from './pages/Contact';
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
          <Route path="/fa" element={<Home />} />
          <Route path="/fa/technology" element={<Technology />} />
          <Route path="/fa/science" element={<Science />} />
          <Route path="/fa/safety" element={<Safety />} />
          <Route path="/fa/partners" element={<Partners />} />
          <Route path="/fa/company" element={<Company />} />
          <Route path="/fa/contact" element={<Contact />} />
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
        <AppShell />
      </LanguageProvider>
    </BrowserRouter>
  );
}
