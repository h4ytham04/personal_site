import "./navbar.css";
import React from "react";

const Navbar = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/Career">Career</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/extras">extras</a></li>
        </ul>
      </nav>
      <div className="hamburger">☰</div>
    </header>
  );
};

export default Navbar;
