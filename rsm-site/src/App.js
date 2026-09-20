import React from 'react';
import "./index.css";
import {Routes, Route } from "react-router-dom";
import Home from './routes/home';
import Navbar from './components/navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
