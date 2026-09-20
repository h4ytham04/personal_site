import React from 'react';
import "./index.css";
import {Routes, Route, useLocation } from "react-router-dom";
import Home from './routes/home';
import Career from './routes/career';
import Extras from './routes/extras';
import Navbar from './components/navbar';

function App() {
  const location = useLocation();

  const noNavbar = location.pathname === "/";
  return (
    <>
      {!noNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/career" element={<Career />} />
        <Route path="/extras" element={<Extras />} />
      </Routes>
    </>
  );
}

export default App;
