import React, { useEffect, useState } from 'react';
import "./index.css";
import {Routes, Route, useLocation } from "react-router-dom";
import { FaMoon, FaSun } from 'react-icons/fa';
import Home from './routes/home';
import Career from './routes/career';
import Extras from './routes/extras';
import Projects from './routes/projects';
import Contact from './routes/contact';
import Navbar from './components/navbar';

function App() {
  const location = useLocation();
  // routes render from displayLocation so the old page stays until the slash covers the screen
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState('idle');
  const [darkHour, setDarkHour] = useState(() => localStorage.getItem('darkHour') === '1');

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayLocation(location);
      return undefined;
    }
    setPhase('covering');
    const swap = setTimeout(() => {
      setDisplayLocation(location);
      setPhase('uncovering');
    }, 380);
    const done = setTimeout(() => setPhase('idle'), 850);
    return () => {
      clearTimeout(swap);
      clearTimeout(done);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    document.documentElement.dataset.theme = darkHour ? 'dark-hour' : 'day';
    localStorage.setItem('darkHour', darkHour ? '1' : '0');
  }, [darkHour]);

  const noNavbar = displayLocation.pathname === "/";
  return (
    <>
      {!noNavbar && <Navbar />}
      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/career" element={<Career />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/extras" element={<Extras />} />
      </Routes>

      <div className={`page-transition ${phase}`} aria-hidden="true">
        <div className="page-transition-band page-transition-band--accent" />
        <div className="page-transition-band" />
      </div>

      <button
        type="button"
        className="theme-toggle"
        aria-pressed={darkHour}
        onClick={() => setDarkHour((v) => !v)}
      >
        {darkHour ? <FaSun /> : <FaMoon />}
        <span>DARK HOUR {darkHour ? 'ON' : 'OFF'}</span>
      </button>
    </>
  );
}

export default App;
