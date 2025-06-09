import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import LandingPage from './pages/LandingPage';
import Dashboard from './components/Dashboard';
import Documentation from './pages/Documentation';
import Blog from './pages/Blog';
import Roadmap from './pages/Roadmap';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;