import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import LandingPage from './pages/LandingPage';
import Dashboard from './components/Dashboard';
import Documentation from './pages/Documentation';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Features from './pages/Features';
import Integrations from './pages/Integrations';
import Enterprise from './pages/Enterprise';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Partners from './pages/Partners';
import Security from './pages/Security';
import Compliance from './pages/Compliance';
import Guides from './pages/Guides';
import Changelog from './pages/Changelog';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/features" element={<Features />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/security" element={<Security />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/changelog" element={<Changelog />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;