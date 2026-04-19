import React from 'react';
import "./index.css";
import Home from "./routes/home";
import Contact from "./routes/contact";
import Projects from "./routes/projects";
import Extras from "./routes/extras";
import {Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/extras" element={<Extras />} />
    </Routes>
  );
}

export default App;
